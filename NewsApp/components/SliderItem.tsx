import { WPPostResponse } from '@/types'
import React from 'react'
import { View } from 'react-native'

type Props = {
  item: WPPostResponse
}


import { Text } from 'react-native'

const SliderItem = ({item}: Props) => {
  return (
    <View>
      <Text>{item.title.rendered}</Text>
    </View>
  )
}

export default SliderItem