import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Subtitle({title}) {
  return (
   <View style={styles.subtitleContainer}>
           <Text style={styles.subtitle}>{title}</Text>
         </View>
  )
}

const styles = StyleSheet.create({
     subtitle: {
    color: "#ffacacff",
    fontSize: 18,
    fontWeight: "bold",
    margin: 8,
    textAlign: "center",
  },

  subtitleContainer: {
    padding: 6,
    margin: 4,
    marginHorizontal: 12,
    marginVertical:4,
    borderBottomColor:  "#ffacacff",
    borderBottomWidth: 2,
  },
})