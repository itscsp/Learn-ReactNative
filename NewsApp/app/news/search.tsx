import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import NewsLists from '@/components/Category/NewsLists';
import { WPPostResponse } from '@/types';
import SearchCategories, { Category } from '@/components/Category/SearchCategories';
import Loading from '@/components/UI/Loading';

type Props = {}

const search = (props: Props) => {
    const { query, selectedCategories } = useLocalSearchParams<{ query: string, selectedCategories: string }>();
    const [searchResults, setSearchResults] = useState<WPPostResponse[]>([]);
    const [filteredResults, setFilteredResults] = useState<WPPostResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedCats, setSelectedCats] = useState<Category[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    useEffect(() => {

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

    const performSearch = async (searchTerm: string, categoryIds: number[], pageNum = 1, append = false) => {
        setLoading(true);
        setError(null);
        try {
            let url = `${process.env.EXPO_PUBLIC_API_HOST}posts?_embed&per_page=20&page=${pageNum}`;
            if (searchTerm) {
                url += `&search=${encodeURIComponent(searchTerm)}`;
            }
            if (categoryIds.length > 0) {
                url += `&categories=${categoryIds.join(',')}`;
            }
            const response = await axios.get(url);
            if (append) {
                setSearchResults(prev => [...prev, ...response.data]);
                setFilteredResults(prev => [...prev, ...response.data]);
            } else {
                setSearchResults(response.data);
                setFilteredResults(response.data);
            }
            setHasMore(response.data.length === 20); // If less than 10, no more data
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

    // Helper to determine if it's the initial load
    const isInitialLoad = loading && page === 1;
    const isLoadingMore = loading && page > 1;

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
            {isInitialLoad ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <FlatList
                    style={styles.container}
                    data={filteredResults}
                    renderItem={({ item }) => <NewsLists newsList={[item]} isLoading={false} />}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={() => {
                        if (hasMore && !loading) {
                            const nextPage = page + 1;
                            setPage(nextPage);
                            performSearch(query, selectedCats.map(cat => cat.id), nextPage, true);
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    ListHeaderComponent={
                        <>
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
                        </View>
                        {error && <Text style={{color: 'red'}}>{error}</Text>}
                        {searchResults.length > 0 && (
                            <SearchCategories
                                selectedCategories={selectedCats}
                                onCategoryChange={handleCategoryChange}
                            />
                        )}
                        </>
                    }
                    ListFooterComponent={
                        isLoadingMore ? (
                            <View style={{ padding: 16 }}>
                                <ActivityIndicator size="small" />
                            </View>
                        ) :
                        (!loading && filteredResults.length === 0 && !error && query ? (
                            <View style={styles.searchInfo}>
                                <Text>No results found for "{query}"</Text>
                            </View>
                        ) : null)
                    }
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    searchInfo: {
        paddingHorizontal:20,
        paddingVertical: 10,

    },
    
});

export default search