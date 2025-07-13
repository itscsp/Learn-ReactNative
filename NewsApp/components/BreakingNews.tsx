import { Colors } from '@/constants/Colors'
import { WPPostResponse } from '@/types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native'
import SliderItem from './SliderItem'

type Props = {
    newsList:Array<WPPostResponse>
}

const BreakingNews = ({newsList}:Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.sliderWrapper}>
        <FlatList data={newsList} keyExtractor={(item) => item.id.toString()}  renderItem={({item}) => {
            return <SliderItem item={item} />
        }} />
      </View>
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
        width: '100%',
        flex:1,
        justifyContent: 'center',
    },
})