import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {NavigationContainer} from  '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ManageTransaction from "./screens/ManageTransaction";
import RecentTransactions from "./screens/RecentTransactions";
import AllTranscations from "./screens/AllTranscations";
import Plans from "./screens/Plans";
import { GlobalStyles } from "./constants/styles";
import {Ionicons} from '@expo/vector-icons'

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TransactionOverview() {
  return <BottomTabs.Navigator screenOptions={{
    headerStyle: { backgroundColor: GlobalStyles.colors.primary800},
    headerTintColor: 'white',
    tabBarStyle: {backgroundColor: GlobalStyles.colors.primary800},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    tabBarInactiveTintColor: 'white',
  }}>
    <BottomTabs.Screen name="RecentTransactions" component={RecentTransactions} 
    options={
      {
        title: 'Recent Transaction',
        tabBarLabel:'Recent',
        tabBarIcon: ({color, size}) => (
          <Ionicons name="hourglass-outline" size={size} color={color} />
        )

      }
    }
    />
    <BottomTabs.Screen name="AllTranscations" component={AllTranscations} options={
      {
        title: 'All Transaction',
        tabBarLabel:'All',
        tabBarIcon: ({color, size}) => (
          <Ionicons name="calendar-outline" size={size} color={color} />
        )

      }
    }/>
    <BottomTabs.Screen name="Plans" component={Plans} options={
      {
        title: 'Plans',
        tabBarLabel:'Plans',
        tabBarIcon: ({color, size}) => (
          <Ionicons name="book-outline" size={size} color={color} />
        )

      }
    }/>
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TransactionOverview" component={TransactionOverview} options={{headerShown: false}} />
          <Stack.Screen name="ManageTransaction" component={ManageTransaction} />
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
