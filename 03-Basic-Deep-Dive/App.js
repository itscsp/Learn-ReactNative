import { useState } from "react"; 
import StartGameScreen from "./screens/StartGameScreen";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import color from "./constant/colors";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRound] = useState(0)
  
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!fontsLoaded) { 
    return <AppLoading />
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  
  function gameOverHandler(numberOfRound) {
    setGameIsOver(true);
    setGuessRound(numberOfRound)
  }

  function startNewGameHandler() {
    setUserNumber(null)
    setGuessRound(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if(gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundNumber={guessRounds} onStartNewGame={startNewGameHandler} />
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