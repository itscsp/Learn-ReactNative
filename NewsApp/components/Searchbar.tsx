import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Platform } from 'react-native';
import { TextInput, View, StyleSheet } from 'react-native';

type Props = {
  withHorizontalPadding:boolean
}

const Searchbar = ({withHorizontalPadding}: Props) => {
  return (
    <View style={[styles.container, withHorizontalPadding && {paddingHorizontal: 10}]}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color={Colors.lightGrey} />
        <TextInput style={styles.searchText} placeholder="Search" placeholderTextColor={Colors.lightGrey} autoCapitalize='none' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  //  marginHorizontal: 10,
   marginTop: 10,
  },

  searchBar: {
    backgroundColor: "#e4e4e4",
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
  },
  
  searchText: {
    fontSize:14,
    flex:1,
    color: Colors.darkGrey,

  }
});

export default Searchbar;