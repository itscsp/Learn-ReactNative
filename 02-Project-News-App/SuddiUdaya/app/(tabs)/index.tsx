import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CategoryMenu from '../../components/CategoryMenu';
import Header from '../../components/Header';
import NewsCard from '../../components/NewsCard';
import { Article, Category } from '../../types';

// Custom hook for fetching news
const useNews = (categoryId: number | null) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const categoryParam = categoryId ? `&categories=${categoryId}` : '';
      const response = await fetch(`https://suddiudaya.com/wp-json/wp/v2/posts?per_page=12&_embed${categoryParam}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.status}`);
      }
      
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return { articles, loading, error, refetch: fetchNews };
};

// Custom hook for fetching categories
const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://suddiudaya.com/wp-json/wp/v2/categories?per_page=20&hide_empty=true');
        const data = await response.json();
        const filteredCategories = (data as Category[])
          .filter(cat => cat.slug !== 'uncategorized')
          .sort((a, b) => b.count - a.count);
        setCategories(filteredCategories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { articles, loading, error, refetch } = useNews(selectedCategory);
  const { categories, loading: loadingCategories } = useCategories();
  const router = useRouter();

  const handleArticlePress = (article: Article) => {
    // Navigate to the article detail screen using Expo Router
    router.push({ pathname: '/(tabs)/[id]', params: { id: article.id.toString() } });
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    Alert.alert('Error', error, [{ text: 'Retry', onPress: handleRefresh }]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <CategoryMenu
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        categories={categories}
        loading={loadingCategories}
      />
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>
            {selectedCategory ? 'Category News' : 'Latest News'}
          </Text>
          <Text style={styles.contentSubtitle}>
            {selectedCategory
              ? 'Browse articles from your selected category'
              : 'Stay updated with the latest stories and insights'}
          </Text>
        </View>

        {loading && articles.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Loading news...</Text>
          </View>
        ) : articles.length > 0 ? (
          <View style={styles.articlesGrid}>
            {articles.map((article: Article) => (
              <NewsCard
                key={article.id}
                article={article}
                onPress={() => handleArticlePress(article)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {selectedCategory
                ? 'No articles found in this category.'
                : 'No news articles found.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    padding: 16,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  contentSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  articlesGrid: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
