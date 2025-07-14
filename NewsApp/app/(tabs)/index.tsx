import { StyleSheet, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/UI/Header'
import Searchbar from '@/components/Searchbar'
import axios from 'axios'
import { WPPostResponse } from '@/types'
import BreakingNews from '@/components/Slider/BreakingNews'
import Categories from '@/components/Category/Categories'
import NewsLists from '@/components/Category/NewsLists'


type Props = {}

const Page = (props: Props) => {
  const {top:safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<WPPostResponse[]>([]);
  const [newsList, setNewsList] = useState<WPPostResponse[]>([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [isNewsLoading, setIsNewsLoading] = useState(false);


  const getNewsByCategory = async (slug: string) => {
    setIsNewsLoading(true);
    try {
      let url = `${process.env.EXPO_PUBLIC_API_HOST}posts?_embed&per_page=20`;
      if (slug && slug !== 'all') {
        // Fetch category by slug to get its ID
        const catRes = await axios.get(`${process.env.EXPO_PUBLIC_API_HOST}categories?slug=${slug}`);
        const catData = catRes.data;
        if (Array.isArray(catData) && catData.length > 0 && catData[0].id) {
          url += `&categories=${catData[0].id}`;
        } else {
          setNewsList([]);
          setIsNewsLoading(false);
          return;
        }
      }
      const response = await axios.get(url);
      const data = response.data;
      if (data && data.length > 0) {
        setNewsList(data);
      } else {
        setNewsList([]);
      }
    } catch (error) {
      setNewsList([]);
      console.error(error);
    } finally {
      setIsNewsLoading(false);
    }
  };

  const onCatChange = (slugString: string) => {
    getNewsByCategory(slugString);
  }

  useEffect(() => {
    // On initial load, fetch all news and set both breakingNews and newsList
    const fetchInitialNews = async () => {
      setIsTrendingLoading(true);
      setIsNewsLoading(true);
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_HOST}posts?_embed&per_page=20`);
        const data = response.data;
        if (data && data.length > 0) {
          setBreakingNews(data.slice(0, 5));
          setNewsList(data);
        } else {
          setBreakingNews([]);
          setNewsList([]);
        }
      } catch (error) {
        setBreakingNews([]);
        setNewsList([]);
        console.error(error);
      } finally {
        setIsTrendingLoading(false);
        setIsNewsLoading(false);
      }
    };
    fetchInitialNews();
  }, []);

  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <Searchbar />
        <View>
        <BreakingNews isLoading={isTrendingLoading} newsList={breakingNews} />
      </View>
      <Categories onCategoryChange={onCatChange} />
      <NewsLists newsList={newsList} isLoading={isNewsLoading} />
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});