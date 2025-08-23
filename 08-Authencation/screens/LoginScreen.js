import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorDisplay from "../components/ui/ErrorDisplay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

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

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
