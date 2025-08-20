import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ErrorOverlay() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Newtwork error. Please check you internet connection.</Text>
    </View>
  )
}

const styles  = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding: 24,
    },

    text: {
      color: 'black',
      fontSize:18,
    }
})