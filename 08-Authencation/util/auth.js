export async function getProfile(token) {
  const url = `http://blogchethanspoojarycom.local/wp-json/wp-auth/v1/profile`;
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
  const url = `http://blogchethanspoojarycom.local/wp-json/wp-auth/v1/register/start`;
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
  const url = `http://blogchethanspoojarycom.local/wp-json/wp-auth/v1/register/verify-otp`;
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
  const url = `http://blogchethanspoojarycom.local/wp-json/wp-auth/v1/register/complete`;
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
  const url = `http://blogchethanspoojarycom.local/wp-json/wp-auth/v1/register/status?session_token=${sessionToken}`;
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
  const url = `http://blogchethanspoojarycom.local/wp-json/wp-auth/v1/resend-otp`;
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
import axios from "axios";

async function authenticate(mode, email, password) {
  const url = `http://blogchethanspoojarycom.local/wp-json/wp-auth/v1/${mode}`;

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
  const url = `http://blogchethanspoojarycom.local/wp-json/wp-auth/v1/verify-otp`;

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
  const url = `http://blogchethanspoojarycom.local/wp-json/wp-auth/v1/logout`;

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
