import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Title from "../components/ui/Title";
import color from "../constant/colors";
import PrimaryButtons from "../components/ui/PrimaryButtons";

export default function GameOverScreen({roundNumber, userNumber, onStartNewGame}) {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.img}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <PrimaryButtons onPress={onStartNewGame}>Start New Game</PrimaryButtons>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: color.primary700,
    overflow: "hidden",
    margin: 36,
  },

  img: {
    width: "100%",
    height: "100%",
  },

  summaryText: {
    fontSize:18,
    color:color.white,
    textAlign:'center',
    fontFamily:'open-sans',
    marginBottom:10,
  },

  highlight: {
    fontFamily: 'open-sans-bold',
    color:color.accent500,
  }
});
