import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SectionList, ScrollView, ListRenderItemInfo, FlatList, SafeAreaView } from 'react-native';

interface Movie {
    title: string;
    rating: string;
    image: string;
}

interface MovieSection {
    year: string;
    data: Movie[];
}

const categories = ['All', 'Action', 'Comedy', 'Horror', 'Drama', 'Sci-Fi'];

const moviesByYear: MovieSection[] = [
    {
        year: '2022',
        data: Array(2).fill({ title: 'Title', rating: 'Ratings', image: 'Image' })
    },
    {
        year: '2014',
        data: Array(4).fill({ title: 'Title', rating: 'Ratings', image: 'Image' })
    },
    {
        year: '2022',
        data: Array(2).fill({ title: 'Title', rating: 'Ratings', image: 'Image' })
    },
    {
        year: '2014',
        data: Array(4).fill({ title: 'Title', rating: 'Ratings', image: 'Image' })
    }
];

const MovieFixApp: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

    const renderMovieItem = ({ item }: ListRenderItemInfo<Movie>) => (
        <View style={styles.movieItem}>
            <View style={styles.imagePlaceholder}>
                <Text>{item.image}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.rating}>{item.rating}</Text>
        </View>
    );

    const renderSectionHeader = ({ section: { year } }: { section: MovieSection }) => (
        <Text style={styles.sectionHeader}>{year}</Text>
    );

    const renderSection = ({ section }: { section: MovieSection }) => (
        <FlatList
            data={section.data}
            renderItem={renderMovieItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.movieList}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>MOVIEFIX</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text style={styles.categoryText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <SectionList
                sections={moviesByYear}
                keyExtractor={(item, index) => index.toString()}
                renderItem={() => null}
                renderSectionHeader={renderSectionHeader}
                renderSectionFooter={renderSection}
                contentContainerStyle={styles.movieList}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    headerContainer: {
        backgroundColor: '#242424',
        padding: 10,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    header: {
        color: '#F00',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10
    },
    categories: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    categoryButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#444',
        marginRight: 10,
    },
    selectedCategory: {
        backgroundColor: '#F00',
    },
    categoryText: {
        color: '#FFF',
        fontSize: 16,
    },
    movieList: {
        paddingHorizontal: 10
    },
    movieItem: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'red'
    },
    imagePlaceholder: {
        width: '100%',
        aspectRatio: 0.75,
        backgroundColor: '#555',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 5
    },
    title: {
        color: '#FFF',
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'left'
    },
    rating: {
        color: '#AAA',
        fontSize: 10,
        textAlign: 'left'
    },
    sectionHeader: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10
    },
});


export default MovieFixApp;
