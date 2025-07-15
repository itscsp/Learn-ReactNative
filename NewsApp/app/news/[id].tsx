import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { WPPostResponse } from "@/types";
import axios from "axios";
import Loading from "@/components/UI/Loading";
import { Colors } from "@/constants/Colors";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

type Props = {};

const NewsDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [newsData, setNewsData] = useState<WPPostResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (id) {
      getSingleNews(id);
    }
  }, [id]);

  const getSingleNews = async (newsId: string) => {
    setIsLoading(true);
    try {
      const url = `${process.env.EXPO_PUBLIC_API_HOST}posts/${newsId}?_embed`;
      const response = await axios.get(url);
      setNewsData(response.data);
    } catch (error) {
      setNewsData(undefined);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFeaturedImageUrl = (newsData: WPPostResponse | undefined): string => {
    let imageUrl = "https://via.placeholder.com/300x160?text=No+Image";
    if (!newsData) return imageUrl;
    const embedded = (newsData as any)._embedded;
    if (
      embedded &&
      embedded["wp:featuredmedia"] &&
      Array.isArray(embedded["wp:featuredmedia"]) &&
      embedded["wp:featuredmedia"][0]?.source_url
    ) {
      imageUrl = embedded["wp:featuredmedia"][0].source_url;
    }
    return imageUrl;
  };

  const getRelativeDate = (dateString: string): string => {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 1) return 'Today';
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 21) return '2 weeks ago';
    // 3 weeks or more, show the date
    return date.toLocaleDateString();
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
        headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
                <Ionicons name="bookmark-outline" size={22} />
                {/* <Ionicons name="bookmark" size={22} /> */}
            </TouchableOpacity>
        ),
        title: ''
      }}
      />
      
        {isLoading ? ( 
          <Loading size={'large'} />
        ) : newsData ? (
          <ScrollView style={styles.contentContainer} contentContainerStyle={styles.container}>
            {/* Title */}
            <Text style={styles.title}>{newsData.title?.rendered}</Text>
            {/* Date & Author */}
            <Text style={styles.meta}>
              {newsData.date ? getRelativeDate(newsData.date) : ''}
              {(newsData as any)._embedded?.author?.[0]?.name ? ` • ${(newsData as any)._embedded.author[0].name}` : ''}
            </Text>
            {/* Featured Image */}
            <Image source={{ uri: getFeaturedImageUrl(newsData) }} style={styles.image} resizeMode="cover" />
            {/* Content */}
            {newsData.content?.rendered ? (
              <RenderHtml
                contentWidth={width - 40}
                source={{ html: newsData.content.rendered }}
                baseStyle={styles.content}
              />
            ) : null}
          </ScrollView>
        ) : (
          <Text>No news found.</Text>
        )}
     
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        // Removed flex:1 to allow scrolling
        // Only use padding/margin here
    },
    contentContainer: {
        flex: 1, // Only the ScrollView should have flex:1
        marginHorizontal:20,

    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
        backgroundColor: Colors.lightGrey,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginVertical: 10,
    },
    meta: {
        fontSize: 14,
        color: Colors.darkGrey,
        marginBottom: 16,
    },
    content: {
        fontSize: 14,
        color: Colors.black,
        lineHeight: 24,
        marginBottom:30
    },
})

export default NewsDetails;
