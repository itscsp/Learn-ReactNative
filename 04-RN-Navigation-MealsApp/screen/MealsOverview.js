
import React, { useLayoutEffect } from 'react'
import { CATEGORIES, MEALS } from '../data/dummy-data'
import MealList from '../components/MealsList/MealList';

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

  return <MealList items={displayedMeals} />

}

