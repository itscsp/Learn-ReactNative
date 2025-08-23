import { createContext, useState } from "react";
import { logoutUser } from "../util/auth";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  userData: {
    firstName: "",
    secondName: "",
    email: "",
    username: "",
    userId: "",
    displayName: "",
  },
  profile: null,
  setProfile: () => {},
  error: null,
  clearError: () => {},
  authenticate: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userData, setUserData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    username: "",
    userId: "",
    displayName: "",
  });
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  function clearError() {
    setError(null);
  }

  function handleError(error) {
    console.error('Auth error:', error);
    
    // Extract meaningful error message
    let errorMessage = "An unexpected error occurred";
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setError(errorMessage);
  }

  function authenticate(data) {
    console.log('authenticate', data)
    // Extract token from the response data - handle both login and registration responses
    const token = data.data?.token || data.token
    setAuthToken(token);
    
    // Set user data from the response - handle both formats
    const userData = data.data?.user || data.data || data;
    setUserData({
      firstName: userData.first_name || userData.display_name?.split(' ')[0] || userData.username || "",
      secondName: userData.last_name || userData.display_name?.split(' ')[1] || "",
      email: userData.email || "",
      username: userData.username || "",
      userId: userData.user_id?.toString() || userData.ID?.toString() || "",
      displayName: userData.display_name || userData.username || "",
    });
  }

  async function logout() {
    try {
      // Call logout API if token exists
      if (authToken) {
        await logoutUser(authToken);
        console.log('User logged out successfully from server');
      }
    } catch (error) {
      console.error('Logout API failed:', error);
      // Continue with local logout even if API fails
    } finally {
      // Clear local state regardless of API success/failure
      setAuthToken(null);
      setUserData({
        firstName: "",
        secondName: "",
        email: "",
        username: "",
        userId: "",
        displayName: "",
      });
      setProfile(null);
    }
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    userData: userData,
    profile,
    setProfile,
    error,
    clearError,
    handleError,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
