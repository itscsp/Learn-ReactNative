import { createContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from "../util/auth";

// Storage keys
const TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';
const TOKEN_EXPIRY_KEY = 'token_expiry';

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  isLoading: true, // Add loading state for initial auth check
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
  checkStoredToken: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

  // Storage helper functions
  const storeAuthData = useCallback(async (token, userData, expiryTime = null) => {
    try {
      await AsyncStorage.multiSet([
        [TOKEN_KEY, token],
        [USER_DATA_KEY, JSON.stringify(userData)],
        [TOKEN_EXPIRY_KEY, expiryTime ? expiryTime.toString() : '']
      ]);
    } catch (error) {
      console.error('Error storing auth data:', error);
    }
  }, []);

  const clearStoredAuthData = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_DATA_KEY, TOKEN_EXPIRY_KEY]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }, []);

  const checkStoredToken = useCallback(async () => {
    try {
      setIsLoading(true);
      const [[, token], [, storedUserData], [, expiry]] = await AsyncStorage.multiGet([
        TOKEN_KEY, 
        USER_DATA_KEY, 
        TOKEN_EXPIRY_KEY
      ]);

      if (token && storedUserData) {
        // Check if token is expired
        const now = new Date().getTime();
        const expiryTime = expiry ? parseInt(expiry) : null;
        
        if (expiryTime && now > expiryTime) {
          console.log('Token expired, clearing stored data');
          await clearStoredAuthData();
          setIsLoading(false);
          return;
        }

        // Token is valid, restore session
        const parsedUserData = JSON.parse(storedUserData);
        setAuthToken(token);
        setUserData(parsedUserData);
        console.log('Session restored from storage');
      }
    } catch (error) {
      console.error('Error checking stored token:', error);
      await clearStoredAuthData();
    } finally {
      setIsLoading(false);
    }
  }, [clearStoredAuthData]);

  // Check for stored token on app startup
  useEffect(() => {
    checkStoredToken();
  }, [checkStoredToken]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error) => {    
    // Extract meaningful error message
    let errorMessage = "An unexpected error occurred";
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setError(errorMessage);
  }, []);

  const authenticate = useCallback(async (data) => {
    console.log('authenticate', data)
    // Extract token from the response data - handle both login and registration responses
    const token = data.data?.token || data.token
    setAuthToken(token);
    
    // Set user data from the response - handle both formats
    const userData = data.data?.user || data.data || data;
    const processedUserData = {
      firstName: userData.first_name || userData.display_name?.split(' ')[0] || userData.username || "",
      secondName: userData.last_name || userData.display_name?.split(' ')[1] || "",
      email: userData.email || "",
      username: userData.username || "",
      userId: userData.user_id?.toString() || userData.ID?.toString() || "",
      displayName: userData.display_name || userData.username || "",
    };
    
    setUserData(processedUserData);
    
    // Calculate token expiry (default to 7 days if not provided)
    const expiresIn = data.data?.expires_in || data.expires_in || (7 * 24 * 60 * 60); // 7 days in seconds
    const expiryTime = new Date().getTime() + (expiresIn * 1000);
    
    // Store session data
    await storeAuthData(token, processedUserData, expiryTime);
    
    console.log('Session authenticated and stored');
  }, [storeAuthData]);

  const logout = useCallback(async () => {
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
      
      // Clear stored session data
      await clearStoredAuthData();
      console.log('Session cleared');
    }
  }, [authToken, clearStoredAuthData]);

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    isLoading,
    userData: userData,
    profile,
    setProfile,
    error,
    clearError,
    handleError,
    authenticate: authenticate,
    logout: logout,
    checkStoredToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
