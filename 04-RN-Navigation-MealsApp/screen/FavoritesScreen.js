import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { FavoriteContext } from "../store/context/favorites-context";
import MealList from "../components/MealsList/MealList";
import { MEALS } from "../data/dummy-data";

export default function FavoritesScreen() {
  const FvtMealsCtx = useContext(FavoriteContext);

  const FvtMeals = MEALS.filter((meal) => FvtMealsCtx.ids.includes(meal.id));

  if (FvtMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorites meals yet.</Text>
      </View>
    );
  }

  return <MealList items={FvtMeals} />;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize:18, fontWeight: 'bold',
    textAlign: 'center'
  }
})