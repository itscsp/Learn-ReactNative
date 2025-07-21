
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface LoginResponseData {
  auth_token: string;
  user_id: string | number;
  user_login: string;
}

export default function Profile() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validating, setValidating] = useState<boolean>(false);

  const validate = async () => {
    setValidating(true);
    const formData = new FormData();
    formData.append('type', 'login');
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch('http://blogchethanspoojarycom.local/wp-json/mobile/v1/login', {
        method: 'POST',
        body: formData,
      });
      const responseJson = await response.json();

      if (responseJson.status) {
        await saveToStorage(responseJson.data);
        setValidating(false);
        console.log('Login sucessfull:', responseJson)
        router.replace('/(tabs)'); // Adjust this route to your needs
      } else {
        setValidating(false); 
        Alert.alert(
          'Login Failed',
          responseJson.msg || 'Incorrect email or password'
        );
      }
    } catch (error) {
      setValidating(false);
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error(error);
    }
  };

  const saveToStorage = async (userData: LoginResponseData) => {
    if (userData) {
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          isLoggedIn: true,
          authToken: userData.auth_token,
          id: userData.user_id,
          name: userData.user_login,
        })
      );
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WordPress Login</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={validate} disabled={validating}>
        {validating ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007aff',
    padding: 14,
    borderRadius: 4,
    minWidth: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
