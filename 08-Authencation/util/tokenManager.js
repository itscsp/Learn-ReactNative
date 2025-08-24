import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';
const TOKEN_EXPIRY_KEY = 'token_expiry';

// Token validation utility
export const isTokenExpired = async () => {
  try {
    const expiry = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiry) return true;
    
    const now = new Date().getTime();
    const expiryTime = parseInt(expiry);
    
    return now > expiryTime;
  } catch (error) {
    console.error('Error checking token expiry:', error);
    return true;
  }
};

// Auto-logout on token expiry
export const handleTokenExpiry = async (authContext) => {
  try {
    const expired = await isTokenExpired();
    if (expired && authContext.isAuthenticated) {
      console.log('Token expired, logging out user');
      await authContext.logout();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error handling token expiry:', error);
    return false;
  }
};

// Enhanced axios interceptor for automatic token validation
export const setupAxiosInterceptors = (axiosInstance, authContext) => {
  // Request interceptor to check token before making requests
  axiosInstance.interceptors.request.use(
    async (config) => {
      const expired = await isTokenExpired();
      if (expired && authContext.isAuthenticated) {
        await authContext.logout();
        throw new Error('Session expired. Please login again.');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle 401 unauthorized responses
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && authContext.isAuthenticated) {
        console.log('Received 401, token may be invalid');
        await authContext.logout();
      }
      return Promise.reject(error);
    }
  );
};

export { TOKEN_KEY, USER_DATA_KEY, TOKEN_EXPIRY_KEY };
