import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Searchbar from '@/components/Searchbar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import axios from 'axios'
import CheckBox from '@/components/Category/CheckBox'

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
  const [categories, setCategories] = useState<{id: number; name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkedCategories, setCheckedCategories] = useState<{[id: number]: boolean}>({});

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_HOST}categories?per_page=100`);
        setCategories(response.data);
        // Initialize checked state for all categories as false
        const initialChecked: {[id: number]: boolean} = {};
        response.data.forEach((cat: {id: number}) => { initialChecked[cat.id] = false; });
        setCheckedCategories(initialChecked);
      } catch (e) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCheck = (id: number) => {
    setCheckedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={[styles.container, {paddingTop: safeTop + 20}]}>
      <Searchbar withHorizontalPadding={false}/>
      <Text style={styles.title}>Categories</Text>
      <ScrollView>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View  style={styles.listContainer}>
            {categories.map((cat) => (
              <CheckBox
                key={cat.id}
                label={cat.name}
                checked={!!checkedCategories[cat.id]}
                onPress={() => handleCheck(cat.id)}
              />
            ))}
        </View>
      )}
      </ScrollView>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:20,
    // justifyContent: "center",
    // alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    color: Colors.black,
  },

  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap:10,

  },
})