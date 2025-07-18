import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NewsListItem from '@/components/Category/NewsListItem';
import { WPPostResponse } from '@/types';
import { Stack } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import Loading from '@/components/UI/Loading';

type Props = {};

const SavedPage = (props: Props) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [newsList, setNewsList] = useState<WPPostResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocued = useIsFocused();

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('bookmark');
        const ids: string[] = token ? JSON.parse(token) : [];
        setBookmarks(ids);

        // Fetch news data for each bookmarked ID
        const requests = ids.map(id =>
          axios.get(`${process.env.EXPO_PUBLIC_API_HOST}posts/${id}?_embed`)
        );
        const responses = await Promise.all(requests);
        setNewsList(responses.map(res => res.data));
      } catch (error) {
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [isFocued]);

  if (loading) {
    return (
      <View style={styles.container}>
       <Loading size={'large'} />
      </View>
    );
  }

  if (newsList.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No saved news found.</Text>
      </View>
    );
  }

  return (
    <>
    <Stack.Screen
    options={{
      headerShown:true,
    }}
    />
    <View style={styles.listContainer}>
      <FlatList
        data={newsList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <NewsListItem post={item} loading={loading} />}
      />
    </View>
    </>
  );
};

export default SavedPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
  },
  listContainer: {
    flex: 1,
    marginVertical:20,
  },
});