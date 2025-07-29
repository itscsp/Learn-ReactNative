import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import React, { useEffect } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function GoogleLoginScreen() {
  const isExpoGo = Constants.appOwnership === 'expo';

  // Expo Go client IDs from Expo documentation
  const EXPO_GO_IOS_CLIENT_ID = '407408718192.apps.googleusercontent.com';
  const EXPO_GO_ANDROID_CLIENT_ID = '407408718192.apps.googleusercontent.com';
  const EXPO_GO_WEB_CLIENT_ID = '407408718192.apps.googleusercontent.com';

  const extra = Constants.expoConfig?.extra || {};
  const iosClientId = isExpoGo ? EXPO_GO_IOS_CLIENT_ID : extra.GOOGLE_IOS_CLIENT_ID;
  const androidClientId = isExpoGo ? EXPO_GO_ANDROID_CLIENT_ID : extra.GOOGLE_ANDROID_CLIENT_ID;
  const webClientId = isExpoGo ? EXPO_GO_WEB_CLIENT_ID : extra.GOOGLE_WEB_CLIENT_ID;

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId,
    androidClientId,
    webClientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // You can now use authentication.accessToken
      // TODO: Send token to your backend API
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/react-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sign in with Google</Text>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => promptAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});
