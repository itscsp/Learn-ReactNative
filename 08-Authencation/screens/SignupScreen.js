import React, { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { startRegistration, verifyRegistrationOtp, completeRegistration, resendOtp, login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import RegistrationStep1 from "../components/Auth/RegistrationStep1";
import RegistrationStep2 from "../components/Auth/RegistrationStep2";
import RegistrationStep3 from "../components/Auth/RegistrationStep3";
import FlatButton from "../components/ui/FlatButton";
import { Colors } from "../constants/styles";
import ErrorDisplay from "../components/ui/ErrorDisplay";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionToken, setSessionToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    firstName: false,
    lastName: false,
    otp: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  // Clear any existing errors when component mounts or step changes
  React.useEffect(() => {
    authCtx.clearError();
  }, [currentStep]);

  // Step 1: Start Registration
  async function handleStep1({ email, firstName, lastName }) {
    setIsAuthenticating(true);
    authCtx.clearError(); // Clear any previous errors
    setCredentialsInvalid({
      email: false,
      firstName: false,
      lastName: false,
      otp: false,
      username: false,
      password: false,
      confirmPassword: false,
    });

    // Validate inputs
    const emailIsValid = email.trim().includes('@');
    const firstNameIsValid = firstName.trim().length > 0;

    if (!emailIsValid || !firstNameIsValid) {
      authCtx.handleError({ message: "Please check your entered information." });
      setCredentialsInvalid({
        email: !emailIsValid,
        firstName: !firstNameIsValid,
        lastName: false,
        otp: false,
        username: false,
        password: false,
        confirmPassword: false,
      });
      setIsAuthenticating(false);
      return;
    }

    try {
      const response = await startRegistration(email.trim(), firstName.trim(), lastName.trim());
      console.log("Step 1 response:", response);
      
      setSessionToken(response.data.session_token);
      setUserEmail(email.trim());
      setCurrentStep(2);
      setIsAuthenticating(false);
      
      Alert.alert("Success", "Registration started! Please check your email for the verification code.");
    } catch (error) {
      console.error("Step 1 failed:", error);
      authCtx.handleError(error);
      setIsAuthenticating(false);
    }
  }

  // Step 2: Verify OTP
  async function handleStep2({ otp }) {
    setIsAuthenticating(true);
    authCtx.clearError(); // Clear any previous errors
    setCredentialsInvalid({
      email: false,
      firstName: false,
      lastName: false,
      otp: false,
      username: false,
      password: false,
      confirmPassword: false,
    });

    const otpIsValid = otp.trim().length >= 4;

    if (!otpIsValid) {
      authCtx.handleError({ message: "Please enter a valid verification code." });
      setCredentialsInvalid({
        email: false,
        firstName: false,
        lastName: false,
        otp: !otpIsValid,
        username: false,
        password: false,
        confirmPassword: false,
      });
      setIsAuthenticating(false);
      return;
    }

    try {
      const response = await verifyRegistrationOtp(sessionToken, otp.trim());
      console.log("Step 2 response:", response);
      
      setCurrentStep(3);
      setIsAuthenticating(false);
      
      Alert.alert("Success", "Email verified! Please complete your registration.");
    } catch (error) {
      console.error("Step 2 failed:", error);
      authCtx.handleError(error);
      setCredentialsInvalid({
        email: false,
        firstName: false,
        lastName: false,
        otp: true,
        username: false,
        password: false,
        confirmPassword: false,
      });
      setIsAuthenticating(false);
    }
  }

  // Step 3: Complete Registration
  async function handleStep3({ username, password, confirmPassword }) {
    setIsAuthenticating(true);
    authCtx.clearError(); // Clear any previous errors
    setCredentialsInvalid({
      email: false,
      firstName: false,
      lastName: false,
      otp: false,
      username: false,
      password: false,
      confirmPassword: false,
    });

    const usernameIsValid = username.trim().length >= 3;
    const passwordIsValid = password.length >= 6;
    const passwordsMatch = password === confirmPassword;

    if (!usernameIsValid || !passwordIsValid || !passwordsMatch) {
      authCtx.handleError({ message: "Please check your username and password." });
      setCredentialsInvalid({
        email: false,
        firstName: false,
        lastName: false,
        otp: false,
        username: !usernameIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsMatch,
      });
      setIsAuthenticating(false);
      return;
    }

    try {
      const response = await completeRegistration(sessionToken, username.trim(), password);
      console.log("Step 3 response:", response);
      console.log("Step 3 response structure:", JSON.stringify(response, null, 2));
      
      // Check if response contains authentication data
      if (response.success && (response.data?.token || response.token)) {
        console.log("✅ Response has token, attempting to authenticate with response:", response);
        console.log("🔍 Token found at:", response.data?.token ? 'response.data.token' : 'response.token');
        console.log("🔍 User data found at:", response.data?.user ? 'response.data.user' : 'response.user or response.data');
        
        try {
          // Auto-login with the received tokens
          await authCtx.authenticate(response);
          console.log("✅ Authentication completed successfully");
          console.log("🔍 Current auth state - isAuthenticated:", authCtx.isAuthenticated);
          console.log("🔍 Current auth state - token exists:", !!authCtx.token);
          setIsAuthenticating(false);
          
          // Add a small delay to ensure state has updated before showing alert
          setTimeout(() => {
            console.log("🔍 Delayed check - isAuthenticated:", authCtx.isAuthenticated);
            console.log("🔍 Delayed check - token exists:", !!authCtx.token);
            console.log("🎉 Showing success alert");
            Alert.alert("Success", "Registration completed successfully! You are now logged in.");
          }, 100);
        } catch (authError) {
          console.error("❌ Authentication failed:", authError);
          console.error("❌ Authentication error details:", authError.message);
          setIsAuthenticating(false);
          Alert.alert("Error", "Registration completed but login failed. Please try logging in manually.");
        }
      } else {
        console.log("No authentication data in response, attempting login with credentials");
        // Fallback: attempt to login with the newly created credentials
        try {
          const loginResponse = await login(userEmail, password);
          console.log("Auto-login response:", loginResponse);
          await authCtx.authenticate(loginResponse);
          setIsAuthenticating(false);
          Alert.alert("Success", "Registration completed and logged in successfully!");
        } catch (loginError) {
          console.log("Auto-login failed, redirecting to login screen");
          setIsAuthenticating(false);
          Alert.alert(
            "Registration Complete", 
            "Registration completed successfully! Please log in with your credentials.",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.replace("Login");
                }
              }
            ]
          );
        }
      }
    } catch (error) {
      console.error("Step 3 failed:", error);
      authCtx.handleError(error);
      setCredentialsInvalid({
        email: false,
        firstName: false,
        lastName: false,
        otp: false,
        username: true,
        password: false,
        confirmPassword: false,
      });
      setIsAuthenticating(false);
    }
  }

  // Resend OTP
  async function handleResendOtp() {
    if (resendCount >= 3) {
      Alert.alert("Error", "Maximum resend attempts reached. Please try again later.");
      return;
    }

    // Don't set isAuthenticating to avoid showing loading overlay that might interfere
    try {
      await resendOtp(userEmail);
      setResendCount(prev => prev + 1);
      Alert.alert("Success", "Verification code resent to your email.");
    } catch (error) {
      console.error("Resend OTP failed:", error);
      if (error.response?.status === 429) {
        Alert.alert("Error", "Please wait before requesting another OTP.");
      } else {
        Alert.alert("Error", error.response?.data?.message || "Failed to resend OTP. Please try again.");
      }
    }
  }

  // Switch to Login
  function switchToLogin() {
    navigation.replace("Login");
  }

  if (isAuthenticating) {
    const messages = {
      1: "Starting registration...",
      2: "Verifying code...",
      3: "Completing registration...",
    };
    return <LoadingOverlay message={messages[currentStep]} />;
  }

  function renderCurrentStep() {
    switch (currentStep) {
      case 1:
        return (
          <RegistrationStep1
            onSubmit={handleStep1}
            credentialsInvalid={credentialsInvalid}
          />
        );
      case 2:
        return (
          <RegistrationStep2
            onSubmit={handleStep2}
            onResendOtp={handleResendOtp}
            credentialsInvalid={credentialsInvalid}
            email={userEmail}
            resendCount={resendCount}
            maxResends={3}
          />
        );
      case 3:
        return (
          <RegistrationStep3
            onSubmit={handleStep3}
            credentialsInvalid={credentialsInvalid}
            email={userEmail}
          />
        );
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.authContent}>
        {renderCurrentStep()}
        <ErrorDisplay />
        <View style={styles.buttons}>
          <FlatButton onPress={switchToLogin}>
            Already have an account? Log in instead
          </FlatButton>
        </View>
      </View>
    </View>
  );
}

export default SignupScreen;

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
    // Remove flex: 1 to let content determine the height
  },
  buttons: {
    marginTop: 16,
  },
});
