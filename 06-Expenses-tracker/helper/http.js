import axios from "axios";

const API_ROOT = (process.env.EXPO_PUBLIC_API_ROOT || '').replace(/['"]/g, "").replace(/\/$/, "");
const API_USERNAME = (process.env.EXPO_PUBLIC_API_USERNAME || '').replace(/['"]/g, "");
const API_PASSWORD = (process.env.EXPO_PUBLIC_API_PASSWORD || '').replace(/['"]/g, "");


// Fetch transactions from WP API with Basic Auth
export async function fetchWPTransactions() {
  const url = `${API_ROOT}/transactions`;
  const auth = { username: API_USERNAME, password: API_PASSWORD };
  const response = await axios.get(url, { auth });
  return response.data;
}

// Generic GET with optional filters: { year, month }
export async function getTransactions(params = {}) {
  const url = `${API_ROOT}/transactions`;
  const auth = {
    username: API_USERNAME,
    password: API_PASSWORD,
  };
  const response = await axios.get(url, { auth, params });
  return response.data;
}

export async function createTransaction(data) {
  const url = `${API_ROOT}/transactions`;
  const auth = {
    username: API_USERNAME,
    password: API_PASSWORD,
  };
  const response = await axios.post(url, data, {
    auth,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

export async function updateTransaction(id, data) {
  const url = `${API_ROOT}/transactions/${id}`;
  const auth = {
    username: API_USERNAME,
    password: API_PASSWORD,
  };
  const response = await axios.put(url, data, {
    auth,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

export async function deleteTransaction(id) {
  const url = `${API_ROOT}/transactions/${id}`;
  const auth = {
    username: API_USERNAME,
    password: API_PASSWORD,
  };
  const response = await axios.delete(url, { auth });
  return response.data;
}

