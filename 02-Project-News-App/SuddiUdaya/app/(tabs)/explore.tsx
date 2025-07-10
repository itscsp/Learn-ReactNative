import React, { useState } from 'react';
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Types
 type Category = {
  id: number;
  name: string;
  count: number;
  slug: string;
};
 type Article = {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link?: string;
  _embedded?: any;
};

// Utility functions
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
  year: 'numeric', month: 'long', day: 'numeric'
});

// Fetch hooks
const useCategories = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch('https://suddiudaya.com/wp-json/wp/v2/categories?per_page=20&hide_empty=true')
      .then(res => res.json())
      .then((data: Category[]) => setCategories(data.filter(cat => cat.slug !== 'uncategorized').sort((a, b) => b.count - a.count)))
      .finally(() => setLoading(false));
  }, []);
  return { categories, loading };
};
const useNews = (categoryId: number | null) => {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const fetchNews = () => {
    setLoading(true);
    setError(null);
    const categoryParam = categoryId ? `&categories=${categoryId}` : '';
    fetch(`https://suddiudaya.com/wp-json/wp/v2/posts?per_page=12&_embed${categoryParam}`)
      .then(res => res.json())
      .then(setArticles)
      .catch(() => setError('Failed to fetch news'))
      .finally(() => setLoading(false));
  };
  React.useEffect(() => { fetchNews(); }, [categoryId]);
  return { articles, loading, error, refetch: fetchNews };
};

export default function ExploreTab() {
  const { categories, loading: loadingCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { articles, loading: loadingNews, error, refetch } = useNews(selectedCategory);

  return (
    <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={loadingNews} onRefresh={refetch} />}>
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Explore Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12 }}>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === null && styles.categoryButtonActive]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[styles.categoryButtonText, selectedCategory === null && styles.categoryButtonTextActive]}>All</Text>
          </TouchableOpacity>
          {loadingCategories ? (
            <ActivityIndicator size="small" color="#3B82F6" style={{ marginLeft: 12 }} />
          ) : (
            categories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryButton, selectedCategory === cat.id && styles.categoryButtonActive]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={[styles.categoryButtonText, selectedCategory === cat.id && styles.categoryButtonTextActive]}>{cat.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
        <Text style={styles.subtitle}>{selectedCategory ? `News in ${categories.find(c => c.id === selectedCategory)?.name}` : 'All News'}</Text>
      </View>
      {loadingNews && articles.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading news...</Text>
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}><Text style={styles.loadingText}>{error}</Text></View>
      ) : articles.length === 0 ? (
        <View style={styles.loadingContainer}><Text style={styles.loadingText}>No news found.</Text></View>
      ) : (
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {articles.map(article => {
            const featuredImage = article._embedded?.['wp:featuredmedia']?.[0];
            const mainCategory = article._embedded?.['wp:term']?.[0]?.find((term: any) => term.taxonomy === 'category');
            return (
              <View key={article.id} style={styles.newsCard}>
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
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 16, color: '#6B7280', marginBottom: 8 },
  categoryButton: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#F3F4F6', borderRadius: 20, marginRight: 8 },
  categoryButtonActive: { backgroundColor: '#3B82F6' },
  categoryButtonText: { fontSize: 14, fontWeight: '500', color: '#374151' },
  categoryButtonTextActive: { color: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 48 },
  loadingText: { marginTop: 12, fontSize: 16, color: '#6B7280' },
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
});
