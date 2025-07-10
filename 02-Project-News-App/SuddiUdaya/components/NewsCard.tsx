import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Article } from '../types';

interface NewsCardProps {
  article: Article;
  onPress: () => void;
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
  year: 'numeric', month: 'long', day: 'numeric'
});

const NewsCard: React.FC<NewsCardProps> = ({ article, onPress }) => {
  const getFeaturedImage = () => article._embedded?.['wp:featuredmedia']?.[0];
  const getMainCategory = () => article._embedded?.['wp:term']?.[0]?.find((term: any) => term.taxonomy === 'category');
  const featuredImage = getFeaturedImage();
  const mainCategory = getMainCategory();

  return (
    <TouchableOpacity style={styles.newsCard} onPress={onPress}>
      <View style={styles.imageContainer}>
        {featuredImage ? (
          <Image source={{ uri: featuredImage.source_url }} style={styles.cardImage} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderImage}><Text style={styles.placeholderText}>📷</Text></View>
        )}
        {mainCategory && (
          <View style={styles.categoryBadge}><Text style={styles.categoryBadgeText}>🏷️ {mainCategory.name}</Text></View>
        )}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardDate}>📅 {formatDate(article.date)}</Text>
        <Text style={styles.cardTitle} numberOfLines={2}>{stripHtml(article.title.rendered)}</Text>
        <Text style={styles.cardExcerpt} numberOfLines={3}>{stripHtml(article.excerpt.rendered)}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.readTime}>⏱️ 2 min read</Text>
          <View style={styles.readMoreButton}><Text style={styles.readMoreText}>Read More</Text></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newsCard: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  imageContainer: { position: 'relative' },
  cardImage: { width: '100%', height: 200, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  placeholderImage: { width: '100%', height: 200, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  placeholderText: { fontSize: 48, color: '#9CA3AF' },
  categoryBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: '#3B82F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  categoryBadgeText: { fontSize: 12, fontWeight: '500', color: '#fff' },
  cardContent: { padding: 16 },
  cardDate: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 8, lineHeight: 24 },
  cardExcerpt: { fontSize: 14, color: '#6B7280', lineHeight: 20, marginBottom: 16 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  readTime: { fontSize: 14, color: '#6B7280' },
  readMoreButton: { backgroundColor: '#3B82F6', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  readMoreText: { fontSize: 14, fontWeight: '500', color: '#fff' },
});

export default NewsCard;
