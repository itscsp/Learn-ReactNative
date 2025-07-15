import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { WPPostResponse } from '@/types';
import Loading from '../UI/Loading';
import { Link } from 'expo-router';

type Props = {
  newsList?: Array<WPPostResponse>;
  isLoading: boolean;
};

const NewsLists = ({ newsList:item, isLoading }: Props) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Loading size="large" />
      </View>
    );
  }

  if (!item || item.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No news found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {item.map((item) => {
        let imageUrl = "https://via.placeholder.com/300x160?text=No+Image";
        const embedded = (item as any)._embedded;
        if (
          embedded &&
          embedded["wp:featuredmedia"] &&
          Array.isArray(embedded["wp:featuredmedia"]) &&
          embedded["wp:featuredmedia"][0]?.source_url
        ) {
          imageUrl = embedded["wp:featuredmedia"][0].source_url;
        }
        // Get category name (first category if available)
        let category = '';
        const embeddedTerms = embedded && embedded['wp:term'];
        if (Array.isArray(embeddedTerms) && embeddedTerms.length > 0 && Array.isArray(embeddedTerms[0]) && embeddedTerms[0].length > 0) {
          category = embeddedTerms[0][0]?.name || '';
        }

        // Format date
        let dateString = '';
        if (item.date) {
          const dateObj = new Date(item.date);
          dateString = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        }

        return (
          <Link key={item.id} href={`/news/${item.id}`} asChild>
      <TouchableOpacity>
          <View  style={styles.itemContainer}>
            <Image source={{ uri: imageUrl }} style={styles.itemImg} />
            <View style={{ flex: 1 }}>
              {category ? <Text style={styles.category}>{category}</Text> : null}
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{item.title.rendered}</Text>
              {dateString ? <Text style={styles.date}>{dateString}</Text> : null}
            </View>
          </View>
          </TouchableOpacity>
          </Link>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
    gap: 7.5,
  },
  itemImg:{
    width:90,
    height:80,
    borderRadius:10,
    marginRight:10,
  },
  category: {
    fontSize: 13,
    color: Colors.tint,
    fontWeight: '600',
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  date: {
    fontSize: 12,
    color: Colors.darkGrey,
    marginTop: 2,
  },
});

export default NewsLists;