import { StyleSheet, Text, View, Alert } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../store/auth-context';
import Button from '../components/ui/Button';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const { userData } = authCtx;
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  if (isLoggingOut) {
    return <LoadingOverlay message="Logging out..." />;
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>You authenticated successfully!</Text>
      </View>
      
      <View style={styles.userInfoContainer}>
        <Text style={styles.sectionTitle}>Your Profile</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Display Name:</Text>
          <Text style={styles.value}>{userData.displayName || 'Not provided'}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email || 'Not provided'}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{userData.username || 'Not provided'}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{userData.userId || 'Not provided'}</Text>
        </View>
        
        {userData.firstName && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>First Name:</Text>
            <Text style={styles.value}>{userData.firstName}</Text>
          </View>
        )}
        
        {userData.secondName && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Last Name:</Text>
            <Text style={styles.value}>{userData.secondName}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
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
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  userInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 200,
  },
});
