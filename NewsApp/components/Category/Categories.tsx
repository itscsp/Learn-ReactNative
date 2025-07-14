
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'


type Category = {
  id: number;
  name: string;
  slug: string;
};

type Props = {
    onCategoryChange: (slug: string) => void;
}

const Categories = ({onCategoryChange}:Props) => {
  const [categories, setCategories] = useState<Category[]>([]); 
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<(View | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://mangalorean.com/wp-json/wp/v2/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSelectedCategory = (index: number, slug: string) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({
        x: x-20,
        y: 0,
        animated: true,
      });
    });
    const slugString = index === 0 ? 'all' : slug;
    onCategoryChange(slugString);
  }


  return (
    <View>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemsWrapper}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          [
            <TouchableOpacity
              ref={el => { itemRef.current[0] = el; }}
              key="all"
              style={[styles.categoryPill, activeIndex === 0 && styles.activePill]}
              onPress={() => handleSelectedCategory(0)}
            >
              <Text style={[styles.categoryText, activeIndex === 0 && styles.activeText]}>All</Text>
            </TouchableOpacity>,
            ...categories.map((cat, index) => (
              <TouchableOpacity
                ref={el => { itemRef.current[index + 1] = el; }}
                key={cat.id}
                style={[styles.categoryPill, activeIndex === index + 1 && styles.activePill]}
                onPress={() => handleSelectedCategory(index + 1, cat.slug)}
              >
                <Text style={[styles.categoryText, activeIndex === index + 1 && styles.activeText]}>{cat.name}</Text>
              </TouchableOpacity>
            ))
          ]
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  itemsWrapper: {
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryPill: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    paddingVertical:10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  activePill: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,

  },
  categoryText: {
    fontSize: 14,
    color: Colors.darkGrey,
    letterSpacing: 0.5,
  },

  activeText: {
    color: Colors.white,
  }

  
});

export default Categories