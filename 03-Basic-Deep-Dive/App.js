import { useState } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import { StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient
      colors={['#ddb52f', '#4e0329']}
      style={styles.rootScreen}
    >
      <ImageBackground source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={{ opacity: 0.15 }}
        >
        <StartGameScreen />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  }
});