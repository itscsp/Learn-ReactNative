import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function List({ data }) {
  return data.map((dataPoint) => (
    <View key={dataPoint} style={styles.listItem}>
      <Text style={styles.itemList}> {dataPoint}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical:8,
    marginHorizontal:12,
    backgroundColor: '#e2b497'
  },
  itemList: {
    color: '#351401',
    textAlign: 'center'
  }
});
