import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GenerList from './GenerList';

const Header: React.FC<{ onCategoryPress: (id: number) => void; selectedCategory: number[] }> = ({ onCategoryPress, selectedCategory }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>MovieFix</Text>
            <GenerList onPress={onCategoryPress} selectedCategory={selectedCategory} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        backgroundColor: '#1e1e1e',
    },
    title: {
        fontSize: 28,
        color: '#F00',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
    },
});

export default Header;
