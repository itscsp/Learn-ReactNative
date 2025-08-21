import { useContext, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContent from "../components/Auth/AuthContent";
import { createUser, verifyOtp } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const response = await createUser(email, password);
      console.log("Registration response:", response);
      
      // Store email for OTP verification
      setUserEmail(email);
      
      // Show OTP form
      setShowOtpForm(true);
      setIsAuthenticating(false);
      
      Alert.alert("Success", "Registration successful! Please check your email for OTP.");
    } catch (error) {
      console.error("Signup failed:", error);
      Alert.alert("Registration failed!", "Please check your credentials and try again.");
      setIsAuthenticating(false);
    }
  }

  async function otpVerificationHandler({ email, otp }) {
    setIsAuthenticating(true);
    try {
      const response = await verifyOtp(email || userEmail, otp);
      console.log("OTP verification response:", response);
      
      setIsAuthenticating(false);
      Alert.alert("Success", "Account verified successfully! Please login.", [
        {
          text: "OK",
          onPress: () => navigation.replace("Login")
        }
      ]);
    } catch (error) {
      console.error("OTP verification failed:", error);
      Alert.alert("Verification failed!", "Invalid OTP. Please try again.");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={showOtpForm ? "Verifying OTP..." : "Creating user..."} />;
  }

  return (
    <AuthContent 
      onAuthenticate={showOtpForm ? otpVerificationHandler : signupHandler} 
      isOtp={showOtpForm}
    />
  );
}

export default SignupScreen;
