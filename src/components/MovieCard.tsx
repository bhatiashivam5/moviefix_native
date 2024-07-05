import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface MovieCardProps {
    title: string;
    image: string;
    genre: string;
    vote_average: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image, genre }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.titleContainer}>
                    <Text style={styles.genre}>{genre}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5,
        backgroundColor: '#424242',
        borderRadius: 4,
        overflow: 'hidden',
    },
    textContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    image: {
        width: '100%',
        height: 220,
    },
    titleContainer: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        margin: 5,
        color: '#fff',
    },
    genre: {
        fontSize: 10,
        color: '#fff',
        marginHorizontal: 5,
    },
});

export default MovieCard;
