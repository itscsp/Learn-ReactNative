import {
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MealDetails from "../MealDetails";

export default function MealItem({
  id,
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
}) {
  const navigation = useNavigation();

  function pressHandler() {
      navigation.navigate('MealDetails', {
        mealId: id
      })
  }

  return (
    <View style={styles.mealItem}>
      <Pressable 
      onPress={pressHandler}
      android_ripple={{ color: "#ccc" }} 
      style={({pressed}) => [ pressed ? styles.buttonPressed : null]}>
        <View style={styles.innerContainer}>
          <View>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text style={styles.title}>{title}</Text>
          </View>
         <MealDetails duration={duration} complexity={complexity} affordability={affordability} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "ios" ? "visible" : "hidden",
    backgroundColor: "white",
    marginBottom: 20,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },

      buttonPressed: {
      opacity: 0.5,
    },

  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#ccc",
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    margin: 8,
  },
});
