import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import SessionManager from "./components/SessionManager";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: "Change Password" }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  // Add debugging for authentication state
  console.log('Navigation render - isAuthenticated:', authCtx.isAuthenticated);
  console.log('Navigation render - isLoading:', authCtx.isLoading);
  console.log('Navigation render - token:', authCtx.token ? 'Token exists' : 'No token');

  // Show loading screen while checking stored authentication
  if (authCtx.isLoading) {
    console.log('Showing loading screen');
    return <LoadingOverlay message="Loading..." />;
  }

  console.log('Rendering navigation stack:', authCtx.isAuthenticated ? 'AuthenticatedStack' : 'AuthStack');

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <SessionManager>
          <Navigation />
        </SessionManager>
      </AuthContextProvider>
    </>
  );
}
