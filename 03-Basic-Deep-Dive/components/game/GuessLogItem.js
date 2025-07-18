import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import color from '../../constant/colors'

export default function GuessLogItem({roundNumber, guess}) {
  return (
    <View style={styles.listItem}>
      <Text>#{roundNumber}</Text>
      <Text>Oppenent's Guess: {guess}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    listItem: {
        borderColor: color.accent500,
        borderWidth:1,
        borderRadius:10,
        padding:12,
        marginVertical:8,
        backgroundColor: color.accent500,
        flexDirection:"row",
        justifyContent: 'space-between',
        width:'100%',
    },

    itemText: {
        fontFamily: 'open-sans'
    }
})