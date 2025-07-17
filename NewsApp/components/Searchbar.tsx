import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native';
import { TextInput, View, StyleSheet } from 'react-native';

type Props = {
  withHorizontalPadding: boolean;
  setSearchParams: (params: string) => void;
  onFocus?: () => void; // already optional
};

const Searchbar = ({ withHorizontalPadding, setSearchParams, onFocus }: Props) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if(search.length > 2) {
      setSearchParams(search);
    }
    else {
      setSearchParams('');
    }
  }

  const handleTextChange = (text: string) => {
    setSearch(text);
    setSearchParams(text);
  }

  return (
    <View style={[styles.container, withHorizontalPadding && {paddingHorizontal: 10}]}>
      <View style={styles.searchBar}>
       
        <TextInput 
          style={styles.searchText} 
          placeholder="Search news..."
          value={search} 
          onChangeText={handleTextChange} 
          onSubmitEditing={handleSearch}
          placeholderTextColor={Colors.lightGrey} 
          autoCapitalize='none' 
          autoComplete='off'
          autoCorrect={false}
          autoFocus={true}
          onFocus={onFocus}
        />
         <Ionicons name="search-outline" size={24} color={Colors.lightGrey} />
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