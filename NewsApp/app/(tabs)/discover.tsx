import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Searchbar from '@/components/Searchbar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import axios from 'axios'
import CheckBox from '@/components/Category/CheckBox'
import { Link } from 'expo-router'
import Loading from '@/components/UI/Loading'
import { Category } from '@/components/Category/SearchCategories';
import { useLocalSearchParams } from 'expo-router';

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
  const [categories, setCategories] = useState<{id: number; name: string; slug: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkedCategories, setCheckedCategories] = useState<{[id: number]: boolean}>({});
  const [searchParams, setSearchParams] = useState<string>('');

  const { query, selectedCategories } = useLocalSearchParams<{ query: string, selectedCategories: string }>();
  const [selectedCats, setSelectedCats] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_HOST}categories?per_page=50`);
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

  useEffect(() => {
    if (selectedCategories) {
      try {
        setSelectedCats(JSON.parse(selectedCategories));
      } catch {
        setSelectedCats([]);
      }
    }
  }, [selectedCategories]);

  const handleCheck = (id: number) => {
    setCheckedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearch = (searchParams: string) => {
    setSearchParams(searchParams || '');
  }

  useEffect(() => {
    console.log('searchParams', searchParams);
  }, [searchParams]);
  
  const hasSearchText = searchParams && searchParams.trim().length > 2;
  const hasSelectedCategories = Object.values(checkedCategories).some(checked => checked);
  const isDisabled = !hasSearchText && !hasSelectedCategories;

  return (
    <View style={[styles.container, {paddingTop: safeTop + 20}]}>
      <Searchbar withHorizontalPadding={false} setSearchParams={handleSearch} />
      <Text style={styles.title}>Categories</Text>
      <ScrollView>
      {loading ? (
       <Loading size="large" />
      ) : (
        <View  style={styles.listContainer}>
            {categories.map((cat) => (
              <CheckBox
                key={cat.id}
                id={cat.id}
                name={cat.name}
                slug={cat.slug}
                checked={!!checkedCategories[cat.id]}
                onPress={() => handleCheck(cat.id)}
              />
            ))}
        </View>
      )}
      </ScrollView>
      {isDisabled ? (
        <TouchableOpacity style={[styles.button, styles.buttonDisabled]} disabled>
          <Text style={[styles.buttonText, styles.buttonTextDisabled]}>Search</Text>
        </TouchableOpacity>
      ) : (
        <Link
          href={{
            pathname: '/news/search',
            params: {
              query: searchParams,
              selectedCategories: JSON.stringify(
                categories
                  .filter((cat) => checkedCategories[cat.id])
                  .map((cat) => ({
                    id: cat.id,
                    name: cat.name,
                    slug: cat.slug
                  }))
              ),
            },
          }}
          asChild
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </Link>
      )}
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

  button: {
    backgroundColor: Colors.tint,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: Colors.lightGrey,
  },
  buttonTextDisabled: {
    color: Colors.darkGrey,
  }
})