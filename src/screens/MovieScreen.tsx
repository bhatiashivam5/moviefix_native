import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import MovieList from './MovieList';

interface MoviesScreenProps { }

const MoviesScreen: React.FC<MoviesScreenProps> = () => {
    const [year, setYear] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number[]>([]);

    const handleCategoryPress = (id: number) => {
        setSelectedCategory(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(categoryId => categoryId !== id)
                : [...prevSelected, id]
        );
    };

    return (
        <View style={styles.container}>
            <Header onCategoryPress={handleCategoryPress} selectedCategory={selectedCategory} />
            <MovieList year={year} selectedCategory={selectedCategory} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#121212',
    }

});

export default MoviesScreen;
