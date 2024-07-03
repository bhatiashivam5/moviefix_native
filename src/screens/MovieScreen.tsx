import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchMovies, fetchGenres } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    genre_ids: number[];
    overview: string;
}

interface Genre {
    id: number;
    name: string;
}
const MoviesScreen: React.FC = () => {
    const [year, setYear] = useState(2012);
    //const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState<number>(1);
    const {
        data: movies,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ['movies', year, selectedCategory],
        queryFn: ({ pageParam = 1 }) => fetchMovies(year, pageParam),
        getNextPageParam: (lastPage, pages) => lastPage.length ? pages.length + 1 : undefined,
        initialPageParam: 1,
    });

    const { data: genres, isLoading: isGenresLoading, isError: isGenresError } = useQuery<Genre[]>({
        queryKey: ['genres'],
        queryFn: fetchGenres,
    });

    console.log(movies?.pages?.flat(), "??????????????????")

    const renderMovie = ({ item }: { item: Movie }) => (
        <MovieCard
            title={item.title}
            image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            genre={item.genre_ids.map(id => genres?.find(g => g.id === id)?.name).filter(Boolean).join(', ')}
        />
    );

    if (isLoading || isGenresLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (isError || isGenresError) {
        return (
            <View style={styles.centered}>
                <Text>Error loading movies or genres</Text>
            </View>
        );
    }

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>MovieFix</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
                    {genres?.map((genre) => (
                        <TouchableOpacity
                            key={genre?.id}
                            style={[styles.categoryButton, selectedCategory === genre?.id && styles.selectedCategory]}
                            onPress={() => setSelectedCategory(genre?.id)}
                        >
                            <Text style={styles.categoryText}>{genre?.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={movies?.pages?.flat() || []}
                    renderItem={renderMovie}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={() => {
                        if (hasNextPage) fetchNextPage();
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#121212',
    },
    header: {
        color: '#F00',
        fontSize: 24,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'left',
        backgroundColor: '#232323'
    },
    categories: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    categoryButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#484848',
        marginRight: 10,
    },
    selectedCategory: {
        backgroundColor: '#F00',
    },
    categoryText: {
        color: '#FFF',
        fontSize: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        color: '#F00',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 20,
    },
});

export default MoviesScreen;
