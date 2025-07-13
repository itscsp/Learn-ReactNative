import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import Searchbar from '@/components/Searchbar'
import axios from 'axios'
import { WPPostResponse } from '@/types'
import BreakingNews from '@/components/BreakingNews'

type Props = {}

const Page = (props: Props) => {
  const {top:safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<WPPostResponse[]>([]);

  const getBreakingNews = async() => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_HOST}posts?per_page=5`);
      const data = response.data;
      if(data && data.length > 0) {
        setBreakingNews(data);
      } else {
        console.log("No Breaking News found");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBreakingNews();
  }, []);

  return (
    <View style={[styles.container, {paddingTop:safeTop}]} >
      <Header />
      <Searchbar />
      { breakingNews.length > 0 ? (
        <View>
          <BreakingNews newsList={breakingNews} />
        </View>
      ) : (
        <Text>No Breaking News available</Text>
      )}
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});