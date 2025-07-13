import { Colors } from '@/constants/Colors'
import { WPPostResponse } from '@/types'
import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native'
import SliderItem from './SliderItem'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

type Props = {
    newsList:Array<WPPostResponse>
    isLoading:boolean
}

const BreakingNews = ({isLoading, newsList}:Props) => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<WPPostResponse>>();
  const { width } = Dimensions.get("window");

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    }
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      {isLoading ?
      <ActivityIndicator size="large" />
      :
      <View style={styles.sliderWrapper}>
        <Animated.FlatList 
          ref={ref}
          data={newsList}
          keyExtractor={(_, index) =>  `list_item${index}`}
          renderItem={({item, index}) => <SliderItem item={item} index={index} scrollX={scrollX} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          decelerationRate={0}
        />
      </View>
  }
    </View>
  )
}

export default BreakingNews

const styles = StyleSheet.create({
    container: {
        marginBottom:10
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        color: Colors.black,
    },
    sliderWrapper: {
        justifyContent: 'center',
    },

})