import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface MovieCardProps {
    title: string;
    image: string;
    genre: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image, genre }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.textCard}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.genre}>{genre}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5,
        backgroundColor: '#424242',
        borderRadius: 2,
        overflow: 'hidden',
    },
    textCard: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    image: {
        width: '100%',
        height: 150,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 5,
        color: '#fff'
    },
    genre: {
        fontSize: 14,
        color: '#fff',
        marginHorizontal: 5,
    },
    description: {
        fontSize: 12,
        color: '#fff',
        margin: 5,
    },
});

export default MovieCard;
