import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginScreen() {
  const isDevelopmentBuild = Constants.appOwnership === 'standalone' || __DEV__;
  
  const extra = Constants.expoConfig?.extra || {};
  
  // Use your own client IDs for development builds and standalone apps
  const iosClientId = extra.GOOGLE_IOS_CLIENT_ID;
  const androidClientId = extra.GOOGLE_ANDROID_CLIENT_ID;
  const webClientId = extra.GOOGLE_WEB_CLIENT_ID;

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId,
    androidClientId,
    webClientId,
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google login successful:', authentication);
      // TODO: Send token to your backend API
      // Use authentication.accessToken for API calls
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
