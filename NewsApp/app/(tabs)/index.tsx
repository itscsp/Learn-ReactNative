import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/UI/Header";
import Searchbar from "@/components/Searchbar";
import axios from "axios";
import { WPPostResponse } from "@/types";
import BreakingNews from "@/components/Slider/BreakingNews";
import Categories from "@/components/Category/Categories";
import NewsListItem from "@/components/Category/NewsListItem";
import Loading from "@/components/UI/Loading";
import { router } from "expo-router";


type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<WPPostResponse[]>([]);
  const [newsList, setNewsList] = useState<WPPostResponse[]>([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<string>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [categorySlug, setCategorySlug] = useState("all");

  const getNewsByCategory = async (
    slug: string,
    pageNum = 1,
    append = false
  ) => {
    setIsNewsLoading(true);
    try {
      let url = `${process.env.EXPO_PUBLIC_API_HOST}posts?_embed&per_page=20&page=${pageNum}`;
      if (slug && slug !== "all") {
        // Fetch category by slug to get its ID
        const catRes = await axios.get(
          `${process.env.EXPO_PUBLIC_API_HOST}categories?slug=${slug}`
        );
        const catData = catRes.data;
        if (Array.isArray(catData) && catData.length > 0 && catData[0].id) {
          url += `&categories=${catData[0].id}`;
        } else {
          setNewsList([]);
          setIsNewsLoading(false);
          setHasMore(false);
          return;
        }
      }
      const response = await axios.get(url);
      const data = response.data;
      if (append) {
        setNewsList((prev) => [...prev, ...data]);
      } else {
        setNewsList(data);
      }
      setHasMore(data.length === 20);
    } catch (error) {
      setNewsList([]);
      setHasMore(false);
      console.error(error);
    } finally {
      setIsNewsLoading(false);
      setIsInitialLoad(false);
    }
  };

  const onCatChange = (slugString: string) => {
    setCategorySlug(slugString);
    setPage(1);
    setHasMore(true);
    setNewsList([]); // Clear previous news
    getNewsByCategory(slugString, 1, false);
  };

  useEffect(() => {
    // On initial load, fetch all news and set both breakingNews and newsList
    const fetchInitialNews = async () => {
      setIsTrendingLoading(true);
      setIsNewsLoading(true);
      setIsInitialLoad(true);
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_HOST}posts?_embed&per_page=20&page=1`
        );
        const data = response.data;
        if (data && data.length > 0) {
          setBreakingNews(data.slice(0, 5));
          setNewsList(data);
          setHasMore(data.length === 20);
        } else {
          setBreakingNews([]);
          setNewsList([]);
          setHasMore(false);
        }
      } catch (error) {
        setBreakingNews([]);
        setNewsList([]);
        setHasMore(false);
        console.error(error);
      } finally {
        setIsTrendingLoading(false);
        setIsNewsLoading(false);
        setIsInitialLoad(false);
      }
    };
    fetchInitialNews();
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !isNewsLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      getNewsByCategory(categorySlug, nextPage, true);
    }
  };

  // Loader logic
  const isLoadingMore = isNewsLoading && page > 1;

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      {isInitialLoad ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={newsList}
          renderItem={({ item }) => (
            <NewsListItem post={item} loading={isNewsLoading} />
          )}
          keyExtractor={(item) => `${item.id}-${categorySlug}`}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            <>
              <Header />
              <TouchableOpacity onPress={() => router.push("/(tabs)/discover")}>
                <Searchbar
                  from={"home"}
                  withHorizontalPadding={true}
                  setSearchParams={setSearchParams}
                />
              </TouchableOpacity>
              <View>
                <BreakingNews
                  isLoading={isTrendingLoading}
                  newsList={breakingNews}
                />
              </View>
              <Categories onCategoryChange={onCatChange} />
            </>
          }
          ListFooterComponent={
            isLoadingMore ? (
              <View style={{ padding: 16 }}>
                <ActivityIndicator size="small" />
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
