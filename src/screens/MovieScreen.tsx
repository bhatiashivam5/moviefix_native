import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, ScrollView, Pressable } from 'react-native';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchMovies, fetchGenres } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    genre_ids: number[];
    vote_average: number;
    overview: string;
    release_date: string;
}

interface Genre {
    id: number;
    name: string;
}

const MoviesScreen: React.FC = () => {
    const [year, setYear] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number[]>([]);

    const {
        data: movies,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ['movies', year, selectedCategory],
        queryFn: ({ pageParam = 1 }) => fetchMovies(year, pageParam, selectedCategory),
        getNextPageParam: (lastPage, pages) => lastPage.length ? pages.length + 1 : undefined,
        initialPageParam: 1,
    });



    const { data: genres, isLoading: isGenresLoading, isError: isGenresError } = useQuery<Genre[]>({
        queryKey: ['genres'],
        queryFn: fetchGenres,
    });

    const handleCategoryPress = (id: number) => {
        setSelectedCategory(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(categoryId => categoryId !== id)
                : [...prevSelected, id]
        );
    };

    const groupMoviesByYear = (movies: Movie[]) => {
        return movies.reduce((acc: { [key: string]: Movie[] }, movie) => {
            const movieYear = new Date(movie.release_date).getFullYear();
            if (!acc[movieYear]) {
                acc[movieYear] = [];
            }
            acc[movieYear].push(movie);
            return acc;
        }, {});
    };

    const renderMovie = ({ item }: { item: Movie }) => (
        <MovieCard
            title={item.title}
            image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            vote_average={item.vote_average}
            genre={item.genre_ids.map(id => genres?.find(g => g.id === id)?.name).filter(Boolean).join(', ')}
        />
    );

    const renderYear = ({ item }: { item: string }) => (
        <View style={styles.yearSection}>
            <Text style={styles.yearTitle}>{item}</Text>
            <FlatList
                data={groupedMovies[item]}
                renderItem={renderMovie}
                numColumns={2}
                keyExtractor={(movie) => movie.id.toString()}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
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

    const groupedMovies = groupMoviesByYear(movies?.pages?.flat() || []);
    const years = Object.keys(groupedMovies).sort((a, b) => Number(b) - Number(a));

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>MovieFix</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
                    {genres?.map((genre) => (
                        <Pressable
                            key={genre.id}
                            style={({ pressed }) => [
                                styles.categoryButton,
                                selectedCategory.includes(genre.id) && styles.selectedCategory,
                                pressed && styles.pressedCategory,
                            ]}
                            onPress={() => handleCategoryPress(genre.id)}
                        >
                            <Text style={styles.categoryText}>{genre.name}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={years}
                    renderItem={renderYear}
                    keyExtractor={(item) => item}
                    onEndReached={() => {
                        if (hasNextPage) fetchNextPage();
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" color="#0000ff" /> : null}
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
        padding: 10,
        backgroundColor: '#232323',
    },
    categories: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    categoryButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#484848',
        marginRight: 10,
    },
    pressedCategory: {
        opacity: 0.5,
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
        marginBottom: 10,
    },
    yearSection: {
        marginBottom: 20,
    },
    yearTitle: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 10,
    },
});

export default MoviesScreen;
