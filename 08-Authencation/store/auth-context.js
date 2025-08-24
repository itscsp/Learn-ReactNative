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

  // Debug effect to track authToken changes
  useEffect(() => {
    console.log('🔥 authToken state changed:', authToken ? `Token exists (${authToken.substring(0, 20)}...)` : 'No token');
    console.log('🔥 isAuthenticated will be:', !!authToken);
  }, [authToken]);

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
    console.log('authenticate called with data:', data);
    console.log('authenticate data structure:', JSON.stringify(data, null, 2));
    
    // Extract token from the response data - handle registration response structure
    let token;
    if (data.data?.token) {
      token = data.data.token; // Registration response: response.data.token
    } else if (data.token) {
      token = data.token; // Direct token
    } else if (data.data?.data?.token) {
      token = data.data.data.token; // Nested structure
    }
    
    console.log('extracted token:', token);
    
    if (!token) {
      console.error('No token found in authentication data');
      console.error('Available keys in data:', Object.keys(data));
      if (data.data) {
        console.error('Available keys in data.data:', Object.keys(data.data));
      }
      throw new Error('No authentication token received');
    }
    
    console.log('🔥 Setting auth token:', token.substring(0, 20) + '...');
    setAuthToken(token);
    console.log('🔥 Auth token set, authToken state should update');
    
    // Extract user data - handle registration response structure
    let userData;
    if (data.data?.user) {
      userData = data.data.user; // Registration response: response.data.user
    } else if (data.user) {
      userData = data.user; // Direct user object
    } else if (data.data) {
      userData = data.data; // Fallback to data object
    } else {
      userData = data; // Last resort
    }
    
    console.log('extracted userData:', userData);
    
    const processedUserData = {
      firstName: userData.first_name || userData.display_name?.split(' ')[0] || userData.username || "",
      secondName: userData.last_name || userData.display_name?.split(' ')[1] || "",
      email: userData.email || "",
      username: userData.username || "",
      userId: userData.user_id?.toString() || userData.ID?.toString() || "",
      displayName: userData.display_name || userData.username || "",
    };
    
    console.log('processed user data:', processedUserData);
    setUserData(processedUserData);
    
    // Calculate token expiry - handle registration response structure
    let expiresIn;
    if (data.data?.token_expires) {
      // Registration response has token_expires timestamp
      const expiresTimestamp = data.data.token_expires;
      const currentTime = Math.floor(Date.now() / 1000);
      expiresIn = expiresTimestamp - currentTime;
    } else {
      // Default to data.expires_in or 7 days
      expiresIn = data.data?.expires_in || data.expires_in || (7 * 24 * 60 * 60);
    }
    
    const expiryTime = new Date().getTime() + (expiresIn * 1000);
    console.log('token expires in:', expiresIn, 'seconds, expiry time:', new Date(expiryTime));
    
    // Store session data
    await storeAuthData(token, processedUserData, expiryTime);
    
    console.log('Session authenticated and stored successfully');
    console.log('isAuthenticated should now be:', !!token);
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
