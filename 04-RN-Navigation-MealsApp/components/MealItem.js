import {
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

export default function MealItem({
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
  onPress
}) {
  return (
    <View style={styles.mealItem}>
      <Pressable 
      onPress={onPress}
      android_ripple={{ color: "#ccc" }} 
      style={({pressed}) => [ pressed ? styles.buttonPressed : null]}>
        <View style={styles.innerContainer}>
          <View>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsItem}>{duration}m</Text>
            <Text style={styles.detailsItem}>{complexity}</Text>
            <Text style={styles.detailsItem}>{affordability}</Text>
          </View>
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
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailsItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
