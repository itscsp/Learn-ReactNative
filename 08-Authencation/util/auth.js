import axios from "axios";
import Constants from 'expo-constants';

// Get the API root from environment variables
const API_ROOT = Constants.expoConfig?.extra?.EXPO_API_ROOT || 'http://localhost.local/wp-json';

export async function getProfile(token) {
  const url = `${API_ROOT}/wp-auth/v1/profile`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('profile response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('profile error:', error.response?.data || error.message);
    throw error;
  }
}

// 3-Step Registration Process

export async function startRegistration(email, firstName, lastName = '') {
  const url = `${API_ROOT}/wp-auth/v1/register/start`;
  try {
    const response = await axios.post(url, {
      email,
      first_name: firstName,
      last_name: lastName,
    });
    console.log('start registration response: ', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function verifyRegistrationOtp(sessionToken, otp) {
  const url = `${API_ROOT}/wp-auth/v1/register/verify-otp`;
  try {
    const response = await axios.post(url, {
      session_token: sessionToken,
      otp: otp,
    });
    console.log('verify registration OTP response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('verify registration OTP error:', error.response?.data || error.message);
    throw error;
  }
}

export async function completeRegistration(sessionToken, username, password) {
  const url = `${API_ROOT}/wp-auth/v1/register/complete`;
  try {
    const response = await axios.post(url, {
      session_token: sessionToken,
      username,
      password,
    });
    console.log('complete registration response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('complete registration error:', error.response?.data || error.message);
    throw error;
  }
}

export async function getRegistrationStatus(sessionToken) {
  const url = `${API_ROOT}/wp-auth/v1/register/status?session_token=${sessionToken}`;
  try {
    const response = await axios.get(url);
    console.log('registration status response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('registration status error:', error.response?.data || error.message);
    throw error;
  }
}

export async function resendOtp(email) {
  const url = `${API_ROOT}/wp-auth/v1/resend-otp`;
  try {
    const response = await axios.post(url, {
      email,
    });
    console.log('resend OTP response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('resend OTP error:', error.response?.data || error.message);
    throw error;
  }
}

async function authenticate(mode, email, password) {
  const url = `${API_ROOT}/wp-auth/v1/${mode}`;

  try {
    const response = await axios.post(url, {
      username: email,
      email: email,
      password: password,
    });

    console.log(`${mode} response: `, response.data);
    return response.data;
  } catch (error) {
    console.error(`${mode} error:`, error.response?.data || error.message);
    throw error;
  }
}

export  function createUser(email, password) {
  return authenticate("register", email, password);

}

export function login(email, password) {
  return authenticate("login", email, password);
}

export async function verifyOtp(email, otp) {
  const url = `${API_ROOT}/wp-auth/v1/verify-otp`;

  try {
    const response = await axios.post(url, {
      email: email,
      otp: otp,
    });

    console.log('verify-otp response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('verify-otp error:', error.response?.data || error.message);
    throw error;
  }
}

export async function logoutUser(token) {
  const url = `${API_ROOT}/wp-auth/v1/logout`;

  try {
    const response = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('logout response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('logout error:', error.response?.data || error.message);
    throw error;
  }
}

// Password Reset Functions

export async function requestPasswordReset(email) {
  const url = `${API_ROOT}/wp-auth/v1/password-reset-request`;
  try {
    const response = await axios.post(url, {
      email,
    });
    console.log('password reset request response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('password reset request error:', error.response?.data || error.message);
    throw error;
  }
}

export async function resetPassword(email, otp, newPassword) {
  const url = `${API_ROOT}/wp-auth/v1/password-reset`;
  try {
    const response = await axios.post(url, {
      email,
      otp,
      new_password: newPassword,
    });
    console.log('password reset response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('password reset error:', error.response?.data || error.message);
    throw error;
  }
}

// Change Password Function
export async function changePassword(token, otp, currentPassword, newPassword) {
  const url = `${API_ROOT}/wp-auth/v1/change-password`;
  try {
    const response = await axios.post(url, {
      otp,
      current_password: currentPassword,
      new_password: newPassword,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('change password response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('change password error:', error.response?.data || error.message);
    throw error;
  }
}

// Request OTP for Change Password
export async function requestChangePasswordOtp(token) {
  const url = `${API_ROOT}/wp-auth/v1/change-password-request`;
  try {
    const response = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('request change password OTP response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('request change password OTP error:', error.response?.data || error.message);
    throw error;
  }
}

// Update Profile Function
export async function updateProfile(token, profileData) {
  const url = `${API_ROOT}/wp-auth/v1/profile`;
  try {
    const response = await axios.put(url, profileData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('update profile response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('update profile error:', error.response?.data || error.message);
    throw error;
  }
}

// Additional API Functions

// Validate Token
export async function validateToken(token) {
  const url = `${API_ROOT}/wp-auth/v1/validate-token`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('validate token response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('validate token error:', error.response?.data || error.message);
    throw error;
  }
}

// Check Username Availability
export async function checkUsernameAvailability(username) {
  const response = await axios.post(API_URL + 'check-username', {
    username
  });
  return response.data;
}

// Check Email Availability
export async function checkEmailAvailability(email) {
  const url = `${API_ROOT}/wp-auth/v1/check-email?email=${encodeURIComponent(email)}`;
  try {
    const response = await axios.get(url);
    console.log('check email response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('check email error:', error.response?.data || error.message);
    throw error;
  }
}

// Get OTP Status
export async function getOtpStatus(email) {
  const url = `${API_ROOT}/wp-auth/v1/otp-status?email=${encodeURIComponent(email)}`;
  try {
    const response = await axios.get(url);
    console.log('OTP status response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('OTP status error:', error.response?.data || error.message);
    throw error;
  }
}

// Get User Roles
export async function getUserRoles(token) {
  const url = `${API_ROOT}/wp-auth/v1/user/roles`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('user roles response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('user roles error:', error.response?.data || error.message);
    throw error;
  }
}

// Refresh Token
export async function refreshToken(token) {
  const url = `${API_ROOT}/wp-auth/v1/refresh-token`;
  try {
    const response = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('refresh token response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('refresh token error:', error.response?.data || error.message);
    throw error;
  }
}

// Get Security Stats (Admin only)
export async function getSecurityStats(token) {
  const url = `${API_ROOT}/wp-auth/v1/security/stats`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('security stats response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('security stats error:', error.response?.data || error.message);
    throw error;
  }
}
