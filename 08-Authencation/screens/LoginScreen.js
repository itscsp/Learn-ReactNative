import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AuthContent from "../components/Auth/AuthContent";
import ForgotPassword from "../components/Auth/ForgotPassword";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorDisplay from "../components/ui/ErrorDisplay";
import FlatButton from "../components/ui/FlatButton";
import { AuthContext } from "../store/auth-context";
import { Colors } from "../constants/styles";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const authCtx = useContext(AuthContext);

  // Clear errors when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      authCtx.clearError();
    }, [authCtx.clearError])
  );

  async function loginHandler({email, password}) {
    setIsAuthenticating(true);
    authCtx.clearError(); // Clear any previous errors
    console.log("Started logging..");
    
    try {
      const userData = await login(email, password);
      authCtx.authenticate(userData);
      setIsAuthenticating(false);
    } catch (error) {
      console.error("Login failed:", error);
      authCtx.handleError(error);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging user..." />;
  }

  if (showForgotPassword) {
    return (
      <View style={styles.container}>
        <View style={styles.authContent}>
          <ForgotPassword onCancel={() => setShowForgotPassword(false)} />
          <ErrorDisplay />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.authContent}>
        <AuthContent isLogin onAuthenticate={loginHandler} />
        <View style={styles.forgotPasswordContainer}>
          <FlatButton onPress={() => setShowForgotPassword(true)}>
            Forgot Password?
          </FlatButton>
        </View>
        <ErrorDisplay />
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  forgotPasswordContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
});
