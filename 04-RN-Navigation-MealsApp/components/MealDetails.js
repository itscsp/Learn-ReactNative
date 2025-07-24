import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function MealDetails({duration, complexity, affordability, style, textStyles}) {
  return (
    <View style={[styles.details, style]}>
                <Text style={[styles.detailsItem, textStyles]}>{duration}m</Text>
                <Text style={[styles.detailsItem, textStyles]}>{complexity}</Text>
                <Text style={[styles.detailsItem, textStyles]}>{affordability}</Text>
              </View>
  )
}

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailsItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
