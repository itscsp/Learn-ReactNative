import { useState } from "react"; 
import StartGameScreen from "./screens/StartGameScreen";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from "./screens/GameScreen";
import color from "./constant/colors";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} />;
  }

  return (
    <LinearGradient
      colors={[color.accent500, color.primary500]}
      style={styles.rootScreen}
    >
      <ImageBackground source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={{ opacity: 0.15 }}
        >
          <SafeAreaView style={styles.rootScreen}>

        {screen}
          </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  }
});