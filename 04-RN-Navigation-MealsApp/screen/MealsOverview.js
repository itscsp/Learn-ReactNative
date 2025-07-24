import { View, FlatList, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { CATEGORIES, MEALS } from '../data/dummy-data'
import MealItem from '../components/MealItem'

export default function MealsOverview({route, navigation}) {
  const catId = route.params.categoryId;


  const displayedMeals= MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  })

  
  useLayoutEffect(() => {
      const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;
    
      navigation.setOptions({
        title: categoryTitle
      })

  }, [catId, navigation])

  function pressHandler() {
    navigation.navigate('MealDetails')
  }

  function renderMealItem(itemData) {
    const item = itemData.item;

    const mealItemProps = {
        title: item.title,
        imageUrl: item.imageUrl,
        duration: item.duration,
        complexity: item.complexity,
        affordability: item.affordability,


    }
    return <MealItem {...mealItemProps} onPress={pressHandler} />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:16,
    }
})