import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface MovieCardProps {
    title: string;
    image: string;
    genre: string;
    vote_average: number
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image, genre }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.textCard}>
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
        borderRadius: 2,
        overflow: 'hidden',
    },
    textCard: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    image: {
        width: '100%',
        height: 220,
        objectFit: "cover"
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row'
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
