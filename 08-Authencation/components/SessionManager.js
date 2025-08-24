import React, { useEffect, useContext } from 'react';
import { AppState } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { handleTokenExpiry } from '../util/tokenManager';

function SessionManager({ children }) {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    // Check token expiry when app comes to foreground
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'active') {
        await handleTokenExpiry(authCtx);
      }
    };

    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Check token expiry every 5 minutes when app is active
    const tokenCheckInterval = setInterval(async () => {
      if (AppState.currentState === 'active') {
        await handleTokenExpiry(authCtx);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      subscription?.remove();
      clearInterval(tokenCheckInterval);
    };
  }, [authCtx]);

  return children;
}

export default SessionManager;
