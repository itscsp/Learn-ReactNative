import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

type Props = {}

const search = (props: Props) => {
    const {query, categories} = useLocalSearchParams<{query: string, categories: string}>();
    console.log(query, categories);
  return (
    <View>
      <Text>search</Text>
    </View>
  )
}

export default search