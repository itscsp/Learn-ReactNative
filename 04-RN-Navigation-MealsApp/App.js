import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import CategoriesScreen from "./screen/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverview from "./screen/MealsOverview";
import MealDetailsScreen from "./screen/MealDetailsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoritesScreen from "./screen/FavoritesScreen";
import {Ionicons} from "@expo/vector-icons"

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return <Drawer.Navigator
    screenOptions={{
      headerStyle: {
              backgroundColor: "#340303ff",
            },
            headerTintColor: "white",
            sceneContainerStyles: {
              backgroundColor: "#3f2f25",
            },
            drawerContentStyle: {
              backgroundColor: "#3f2f25"
            },
            drawerInactiveTintColor: 'white',
            drawerActiveTintColor: '#351401',
            drawerActiveBackgroundColor: '#e4baa1'
    }}
  >
    <Drawer.Screen name="Categories" component={CategoriesScreen} options={{
      title: 'All Categories',
      drawerIcon: ({color, size}) => <Ionicons color={color} size={size} name="list" />
    }} />
    <Drawer.Screen name="Favorites" component={FavoritesScreen}  options={{
      title: 'Favorites',
      drawerIcon: ({color, size}) => <Ionicons color={color} size={size} name="star" />
    }}
    
     />
  </Drawer.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#340303ff",
            },
            headerTintColor: "white",
            contentStyle: {
              backgroundColor: "#3f2f25",
            },
          }}
        >
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="MealOverview"
            component={MealsOverview}
            // options={({route, navigation}) => {
            //   const catId = route.params.categoryId;
            //   return {
            //     title: catId
            //   }
            // }}
          ></Stack.Screen>
          <Stack.Screen
            name="MealDetails"
            component={MealDetailsScreen}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
