import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageTransaction from "./screens/ManageTransaction";
import RecentTransactions from "./screens/RecentTransactions";
import Plans from "./screens/Plans";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import HeaderText from "./components/UI/HeaderText";
import TransationContextProvider from "./store/transaction-context";
import AllTransactions from "./screens/AllTransactions";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TransactionOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: GlobalStyles.colors.bgColor,
        },
        headerStyle: { backgroundColor: GlobalStyles.colors.bgColor },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.bgColor },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: "white",
      }}
    >
      <BottomTabs.Screen
        name="RecentTransactions"
        component={RecentTransactions}
        options={({ navigation }) => ({
          title: "",
          headerTitle: "",
          tabBarLabel: "Recent",
          headerLeft: () => <HeaderText text="Transactions" />,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageTransaction", {
                  action: "ADD",
                });
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass-outline" size={size} color={color} />
          ),
        })}
      />
      <BottomTabs.Screen
        name="AllTransactions"
        component={AllTransactions}
        options={({ navigation }) => ({
          title: "",
          headerTitle: "",
          tabBarLabel: "All",
          headerLeft: () => <HeaderText text="Archive" />,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageTransaction", {
                  action: "ADD",
                });
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        })}
      />
      <BottomTabs.Screen
        name="Plans"
        component={Plans}
        options={{
          title: "",
          headerTitle: "",
          tabBarLabel: "Plans",
          headerLeft: () => <HeaderText text="Plans" />,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {}}
            />
          ),

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <TransationContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.bgColor },
              headerTintColor: "white",
              tabBarStyle: { backgroundColor: GlobalStyles.colors.bgColor },
              tabBarActiveTintColor: GlobalStyles.colors.accent500,
              tabBarInactiveTintColor: "white",
            }}
          >
            <Stack.Screen
              name="TransactionOverview"
              component={TransactionOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageTransaction"
              component={ManageTransaction}
              options={{
                title: "Add Expenses",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TransationContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
