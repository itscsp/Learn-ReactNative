import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React, { useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';

export type Category = {
  id: number;
  name: string;
  slug: string;
};

type Props = {
  selectedCategories: Category[];
  onCategoryChange: (categoryId: number | null) => void;
};

const SearchCategories = ({ selectedCategories, onCategoryChange }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<(View | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectedCategory = (index: number, categoryId: number | null) => {
    setActiveIndex(index);
    onCategoryChange(categoryId);
  };

  if (!selectedCategories || selectedCategories.length === 0) {
    return null;
  }

  return (
    <View>
      <Text style={styles.title}>Filter by Category</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemsWrapper}
      >
        <TouchableOpacity
          ref={el => { itemRef.current[0] = el; }}
          key="all"
          style={[styles.categoryPill, activeIndex === 0 && styles.activePill]}
          onPress={() => handleSelectedCategory(0, null)}
        >
          <Text style={[styles.categoryText, activeIndex === 0 && styles.activeText]}>All</Text>
        </TouchableOpacity>
        {selectedCategories.map((cat, index) => (
          <TouchableOpacity
            ref={el => { itemRef.current[index + 1] = el; }}
            key={cat.id}
            style={[styles.categoryPill, activeIndex === index + 1 && styles.activePill]}
            onPress={() => handleSelectedCategory(index + 1, cat.id)}
          >
            <Text style={[styles.categoryText, activeIndex === index + 1 && styles.activeText]}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
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
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 8,
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
  },
});

export default SearchCategories; 