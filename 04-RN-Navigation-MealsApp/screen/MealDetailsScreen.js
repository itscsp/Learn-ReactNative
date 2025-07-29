import { View, Text, Image, ScrollView, StyleSheet, Button } from "react-native";
import React, { /* useContext */ useLayoutEffect } from "react";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import {useDispatch, useSelector} from 'react-redux'
import {addFavorite, removeFavorite} from '../store/redux/favorite'
// import { FavoriteContext } from "../store/context/favorites-context";

export default function MealDetailsScreen({ route, navigation }) {
  // const FvtMealContext= useContext(FavoriteContext)
  const favoritesMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavt = favoritesMealIds.includes(mealId);

  function headerButtonPressHandler() { 
    if(mealIsFavt) {
      // FvtMealContext.removeFavorite(mealId);
      dispatch(removeFavorite({id: mealId}));
    } else {
      // FvtMealContext.addFavorite(mealId)
      dispatch(addFavorite({id: mealId}));

    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
              headerRight: () => {
                return <IconButton icon={mealIsFavt ? 'star' : 'star-outline'} color='white' onPress={headerButtonPressHandler} />
              }
    })
  }, [headerButtonPressHandler, navigation])

  return (
    <ScrollView style={styles.rootContinaer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyles={styles.detailsText}
      />
      <View style={styles.listouterContainer}> 

      <View style={styles.listContianer}>
        <Subtitle title={"Ingredients"} />

        <List data={selectedMeal.ingredients} />

        <Subtitle title={"Steps"} />
        <List data={selectedMeal.steps} />
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContinaer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailsText: {
    color: "white",
  },

  listouterContainer: {
    alignItems:'center'
  },

  listContianer: {
    width: '80%',
  }
});
