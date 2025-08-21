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
