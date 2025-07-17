import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { WPPostResponse } from '@/types';
import { Link } from 'expo-router';

interface NewsListItemProps {
  post: WPPostResponse;
  loading:boolean
}

const NewsListItem: React.FC<NewsListItemProps> = ({ post, loading }) => {
  let imageUrl = "https://via.placeholder.com/300x160?text=No+Image";
  const embedded = (post as any)._embedded;
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
  if (post.date) {
    const dateObj = new Date(post.date);
    dateString = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  return (
    <Link href={`/news/${post.id}`} asChild>
      <TouchableOpacity>
        <View style={[styles.itemContainer, { opacity: loading ? 0.2 : 1 }]}>
          <Image source={{ uri: imageUrl }} style={styles.itemImg} />
          <View style={{ flex: 1 }}>
            {category ? <Text style={styles.category}>{category}</Text> : null}
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{post.title.rendered}</Text>
            {dateString ? <Text style={styles.date}>{dateString}</Text> : null}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
    gap: 7.5,
    marginHorizontal: 20,
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

export default NewsListItem; 