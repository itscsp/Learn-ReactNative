import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';
import Button from '../components/ui/Button';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const { userData } = authCtx;
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigation = useNavigation();

  async function handleLogout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              await authCtx.logout();
              // No need to navigate - the app will automatically switch to AuthStack
            } catch (error) {
              console.error('Logout failed:', error);
              Alert.alert("Error", "Logout failed. Please try again.");
            } finally {
              setIsLoggingOut(false);
            }
          }
        }
      ]
    );
  }

  function navigateToProfile() {
    navigation.navigate('Profile');
  }

  if (isLoggingOut) {
    return <LoadingOverlay message="Logging out..." />;
  }

  return (
    <ScrollView style={styles.rootContainer} contentContainerStyle={styles.contentContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>You are logged in successfully!</Text>
        <Text style={styles.userText}>Hello, {userData.displayName || userData.username || 'User'}!</Text>
      </View>

      {/* App Introduction Section */}
      <View style={styles.introSection}>
        <Text style={styles.sectionTitle}>📱 React Native Authentication App</Text>
        <Text style={styles.introText}>
          This is a complete authentication system built with React Native and Expo, 
          demonstrating secure user registration, login, and profile management.
        </Text>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>✨ Key Features</Text>
        
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>🔐 Secure Authentication</Text>
          <Text style={styles.featureDescription}>
            JWT-based authentication with token refresh capabilities and secure storage.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>📧 3-Step Registration</Text>
          <Text style={styles.featureDescription}>
            Multi-step registration with email verification, OTP validation, and username creation.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>⏱️ Real-time Validation</Text>
          <Text style={styles.featureDescription}>
            Live email and username availability checking with debounced API calls.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>🔄 OTP Management</Text>
          <Text style={styles.featureDescription}>
            Smart OTP system with 5-minute timers, resend functionality, and attempt tracking.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>👤 Profile Management</Text>
          <Text style={styles.featureDescription}>
            Complete profile editing, secure password changes, and account management.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>💾 Session Persistence</Text>
          <Text style={styles.featureDescription}>
            Automatic session restoration and secure token storage with expiry handling.
          </Text>
        </View>
      </View>

      {/* Technology Stack Section */}
      <View style={styles.techSection}>
        <Text style={styles.sectionTitle}>🛠️ Technology Stack</Text>
        <View style={styles.techGrid}>
          <Text style={styles.techItem}>• React Native</Text>
          <Text style={styles.techItem}>• Expo SDK</Text>
          <Text style={styles.techItem}>• React Navigation</Text>
          <Text style={styles.techItem}>• AsyncStorage</Text>
          <Text style={styles.techItem}>• WordPress REST API</Text>
          <Text style={styles.techItem}>• JWT Authentication</Text>
        </View>
      </View>

      {/* API Integration Section */}
      <View style={styles.apiSection}>
        <Text style={styles.sectionTitle}>🌐 API Integration</Text>
        <Text style={styles.apiText}>
          Fully integrated with WordPress REST API backend featuring:
        </Text>
        <Text style={styles.apiItem}>• User registration and authentication</Text>
        <Text style={styles.apiItem}>• Email and username validation</Text>
        <Text style={styles.apiItem}>• OTP generation and verification</Text>
        <Text style={styles.apiItem}>• Profile management</Text>
        <Text style={styles.apiItem}>• Password change with OTP</Text>
        <Text style={styles.apiItem}>• Session management</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button onPress={navigateToProfile}>View Profile</Button>
        <View style={styles.buttonSpacing} />
        <Button onPress={handleLogout}>Logout</Button>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Built with ❤️ using React Native & Expo
        </Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 12,
  },
  userText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3498db',
    textAlign: 'center',
  },
  introSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  introText: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
  },
  featuresSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  techSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  techItem: {
    fontSize: 14,
    color: '#34495e',
    width: '48%',
    marginBottom: 8,
    fontWeight: '500',
  },
  apiSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  apiText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 12,
    lineHeight: 20,
  },
  apiItem: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
    paddingLeft: 8,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonSpacing: {
    height: 16,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  footerText: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    color: '#bdc3c7',
  },
});
