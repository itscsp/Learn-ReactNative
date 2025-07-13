import { View, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { SharedValue } from 'react-native-reanimated';
import { WPPostResponse } from '@/types';
import { Colors } from '@/constants/Colors';

type Props = {
    items: Array<WPPostResponse>;
    scrollX: SharedValue<number>;
    paginationIndex: number;
}

const Pagination = ({items,paginationIndex,  scrollX}: Props) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: paginationIndex === index ? Colors.tint : Colors.darkGrey }
          ]}
        />
      ))}
    </View>
  )
}

export default Pagination



const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginHorizontal: 4,
  },
});