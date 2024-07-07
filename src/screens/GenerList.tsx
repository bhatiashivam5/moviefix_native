import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from '../services/tmdbApi';
import { Genre } from './MovieList';

type Props = {
    onPress: (id: number) => void,
    selectedCategory: number[]
}

const GenerList: React.FC<Props> = ({ onPress, selectedCategory }) => {
    const {
        data: genres,
    } = useQuery<Genre[]>({
        queryKey: ['genres'],
        queryFn: fetchGenres,
    });

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {genres?.map((genre: any) => (
                <Pressable
                    key={genre.id}
                    style={({ pressed }: { pressed: boolean }) => [
                        styles.categoryButton,
                        selectedCategory.includes(genre.id) && styles.selectedCategory,
                        pressed ? styles.pressedCategory : null,
                    ]}
                    onPress={() => onPress(genre.id)}
                >
                    <Text style={styles.categoryText}>{genre.name}</Text>
                </Pressable>
            ))}
        </ScrollView>
    )
}

export default GenerList

const styles = StyleSheet.create({
    categories: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#484848',
        marginRight: 10,
    },
    pressedCategory: {
        opacity: 0.7,
    },
    selectedCategory: {
        backgroundColor: '#F00',
    },
    categoryText: {
        color: '#FFF',
        fontSize: 14,
        textTransform: 'capitalize',
    }
})