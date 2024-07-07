import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react'
import { fetchGenres, fetchMovies } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    genre_ids: number[];
    vote_average: number;
    overview: string;
    release_date: string;
}

export interface Genre {
    id: number;
    name: string;
}

const MovieList: React.FC<{ year: number | null; selectedCategory: number[] }> = ({ year, selectedCategory }) => {
    const {
        data: movies,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isMoviesLoading,
        isError: isMoviesError,
    } = useInfiniteQuery({
        queryKey: ['movies', year, selectedCategory],
        queryFn: ({ pageParam = 1 }) => fetchMovies(year, pageParam, selectedCategory),
        getNextPageParam: (lastPage, pages) => lastPage.length ? pages.length + 1 : undefined,
        initialPageParam: 1,
    });

    const {
        data: genres,
        isLoading: isGenresLoading,
        isError: isGenresError,
    } = useQuery({
        queryKey: ['genres'],
        queryFn: fetchGenres,
    });

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

    if (isMoviesLoading || isGenresLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (isMoviesError || isGenresError) {
        return (
            <View style={styles.centered}>
                <Text>Error loading movies or genres</Text>
            </View>
        );
    }

    const groupedMovies = groupMoviesByYear(movies?.pages?.flat() || []);
    const years = Object.keys(groupedMovies).sort((a, b) => Number(b) - Number(a));

    return (
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
    );
};

export default MovieList

const styles = StyleSheet.create({
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
    columnWrapper: {
        justifyContent: 'space-between',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})