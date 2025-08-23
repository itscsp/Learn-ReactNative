import { StyleSheet, Text, View, Alert } from 'react-native';
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
    <View style={styles.rootContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>You are logged in successfully!</Text>
        <Text style={styles.userText}>Hello, {userData.displayName || userData.username || 'User'}!</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button onPress={navigateToProfile}>View Profile</Button>
        <View style={styles.buttonSpacing} />
        <Button onPress={handleLogout}>Logout</Button>
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f5f5f5',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  userText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A90E2',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 250,
    alignItems: 'center',
  },
  buttonSpacing: {
    height: 16,
  },
});
