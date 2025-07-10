import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../types';

interface CategoryMenuProps {
  selectedCategory: number | null;
  onCategorySelect: (id: number | null) => void;
  categories: Category[];
  loading: boolean;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ selectedCategory, onCategorySelect, categories, loading }) => {
  if (loading) {
    return (
      <View style={styles.categoryMenu}>
        <ActivityIndicator size="small" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.categoryMenu}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === null && styles.categoryButtonActive]}
          onPress={() => onCategorySelect(null)}
        >
          <Text style={[styles.categoryButtonText, selectedCategory === null && styles.categoryButtonTextActive]}>
            📊 All News
          </Text>
        </TouchableOpacity>
        {categories.slice(0, 8).map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryButton, selectedCategory === category.id && styles.categoryButtonActive]}
            onPress={() => onCategorySelect(category.id)}
          >
            <Text style={[styles.categoryButtonText, selectedCategory === category.id && styles.categoryButtonTextActive]}>
              {category.name} ({category.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryMenu: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
});

export default CategoryMenu;
