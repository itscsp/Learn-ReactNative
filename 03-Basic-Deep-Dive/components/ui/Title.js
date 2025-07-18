
import { Text, View, StyleSheet } from "react-native";
import color from "../../constant/colors";
import React from 'react'

export default function Title({ children }) {
  return (
    <View style={styles.titleContainer}>
    <Text style={styles.title}>{children}</Text>
</View>
  )
}



const styles = StyleSheet.create({
    titleContainer: {
        marginVertical: 8,
        padding: 4,
    },
    title: {
      fontFamily: 'open-sans-bold',
        fontSize: 26,
        fontWeight: 'bold',
        color: color.primary700,
        textAlign: 'center',
    },
});

