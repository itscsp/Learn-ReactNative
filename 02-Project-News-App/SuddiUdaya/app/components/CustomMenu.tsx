import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { Category } from '../navigation/types';

interface CustomMenuProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelect: (id: number | null) => void;
  loading: boolean;
}

export default function CustomMenu({ categories, selectedCategory, onSelect, loading }: CustomMenuProps) {
  return (
    <View style={styles.menuContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.menuItem, selectedCategory === null && styles.menuItemActive]}
          onPress={() => onSelect(null)}
        >
          <Text style={[styles.menuText, selectedCategory === null && styles.menuTextActive]}>All</Text>
        </TouchableOpacity>
        {loading ? (
          <Text style={styles.menuText}>Loading...</Text>
        ) : (
          categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.menuItem, selectedCategory === cat.id && styles.menuItemActive]}
              onPress={() => onSelect(cat.id)}
            >
              <Text style={[styles.menuText, selectedCategory === cat.id && styles.menuTextActive]}>{cat.name}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 8,
  },
  menuItemActive: {
    backgroundColor: '#3B82F6',
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  menuTextActive: {
    color: '#fff',
  },
});
