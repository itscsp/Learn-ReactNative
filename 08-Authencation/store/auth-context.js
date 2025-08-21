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

  function authenticate(data) {
    console.log('authenticate', data)
    // Extract token from the response data
    const token = data.data?.token || data.token
    setAuthToken(token);
    
    // Set user data from the response
    setUserData({
      firstName: data.data?.display_name?.split(' ')[0] || data.data?.username || "",
      secondName: data.data?.display_name?.split(' ')[1] || "",
      email: data.data?.email || "",
      username: data.data?.username || "",
      userId: data.data?.user_id?.toString() || "",
      displayName: data.data?.display_name || "",
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
    }
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    userData: userData,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
