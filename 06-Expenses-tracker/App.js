import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {NavigationContainer} from  '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ManageTransaction from "./screens/ManageTransaction";
import RecentTransactions from "./screens/RecentTransactions";
import AllTranscations from "./screens/AllTranscations";
import Plans from "./screens/Plans";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TransactionOverview() {
  return <BottomTabs.Navigator>
    <BottomTabs.Screen name="RecentTransactions" component={RecentTransactions} />
    <BottomTabs.Screen name="AllTranscations" component={AllTranscations} />
    <BottomTabs.Screen name="Plans" component={Plans} />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TransactionOverview" component={TransactionOverview} />
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
