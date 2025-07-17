import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import NewsLists from '@/components/Category/NewsLists';
import { WPPostResponse } from '@/types';
import SearchCategories, { Category } from '@/components/Category/SearchCategories';
import Loading from '@/components/UI/Loading';
import { Colors } from '@/constants/Colors';

type Props = {}

const search = (props: Props) => {
    const { query, selectedCategories } = useLocalSearchParams<{ query: string, selectedCategories: string }>();
    const [searchResults, setSearchResults] = useState<WPPostResponse[]>([]);
    const [filteredResults, setFilteredResults] = useState<WPPostResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCats, setSelectedCats] = useState<Category[]>([]);
    
    useEffect(() => {
        console.log('Search Page - Query:', query);
        console.log('Search Page - Categories:', selectedCategories);
        const searchTerm = query || '';
        const categoryIds = selectedCats.map(cat => cat.id);
        if (searchTerm || categoryIds.length > 0) {
            performSearch(searchTerm, categoryIds);
        } else {
            setSearchResults([]);
            setFilteredResults([]);
        }
    }, [query, selectedCats]);

    useEffect(() => {
        if (selectedCategories) {
            try {
                setSelectedCats(JSON.parse(selectedCategories));
            } catch {
                setSelectedCats([]);
            }
        }
    }, [selectedCategories]);

    const performSearch = async (searchTerm: string, categoryIds: number[]) => {
        setLoading(true);
        setError(null);
        try {
            let url = `${process.env.EXPO_PUBLIC_API_HOST}posts?_embed&per_page=50`;
            if (searchTerm) {
                url += `&search=${encodeURIComponent(searchTerm)}`;
            }
            if (categoryIds.length > 0) {
                url += `&categories=${categoryIds.join(',')}`;
            }
            const response = await axios.get(url);
            setSearchResults(response.data);
            setFilteredResults(response.data);
        } catch (err: any) {
            setError('Failed to fetch search results');
            setSearchResults([]);
            setFilteredResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (categoryId: number | null) => {
        if (categoryId === null) {
            setFilteredResults(searchResults);
        } else {
            setFilteredResults(
                searchResults.filter(post => post.categories && post.categories.includes(categoryId))
            );
        }
    };


    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={22} />
                        </TouchableOpacity>
                    ),
                    title: 'Search'
                }}
            />
            <ScrollView style={styles.container}>
                <View style={styles.searchInfo}>
                    {query ? (
                        <Text style={{fontSize:16, fontWeight: '600'}}>
                            Search results for: "{query}"
                        </Text>
                    ) : (
                        <Text style={{fontSize:16, fontWeight: '600'}}>
                            {selectedCats.length > 0 ? 'Results by Category' : 'Results'}
                        </Text>
                    )}
                    {loading && <Loading size="large" />}
                    {error && <Text style={{color: 'red'}}>{error}</Text>}
                </View>
                
                {searchResults.length > 0 && (
                    <>
                        <SearchCategories
                            selectedCategories={selectedCats}
                            onCategoryChange={handleCategoryChange}
                        />
                        <NewsLists newsList={filteredResults} isLoading={loading} />
                    </>
                )}
                
                {!loading && searchResults.length === 0 && !error && query && (
                    <View>
                        <Text>No results found for "{query}"</Text>
                    </View>
                )}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    searchInfo: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
});

export default search