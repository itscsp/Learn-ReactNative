import axios from "axios";
import { log, error as logError } from "./logger";

// Allow explicit Android override; fallback to EXPO_PUBLIC_API_ROOT as-is
const API_ROOT = process.env.EXPO_PUBLIC_API_ROOT;
const API_USERNAME = (process.env.EXPO_PUBLIC_API_USERNAME || '').replace(/['"]/g, "");
const API_PASSWORD = (process.env.EXPO_PUBLIC_API_PASSWORD || '').replace(/['"]/g, "");

// Shared request options: include a sane timeout to avoid long hangs
const DEFAULT_TIMEOUT_MS = 10000; // 10s
function withDefaults(opts = {}) {
  const headers = { ...(opts.headers || {}) };
  return { timeout: DEFAULT_TIMEOUT_MS, ...opts, headers };
}


// Generic GET with optional filters: { year, month }
export async function getTransactions(params = {}) {
  const url = `${API_ROOT}/transactions`;
  const auth = {
    username: API_USERNAME,
    password: API_PASSWORD,
  };
  try {
  log("GET", url, params);
  const response = await axios.get(url, withDefaults({ auth, params }));
    return response.data;
  } catch (e) {
  const status = e?.response?.status;
  const data = e?.response?.data;
  logError("HTTP GET failed", url, params, status ? { status, data } : (e?.message || e));
    throw e;
  }
}

export async function createTransaction(data) {
  const url = `${API_ROOT}/transactions`;
  const auth = {
    username: API_USERNAME,
    password: API_PASSWORD,
  };
  try {
    log("POST", url, data);
    const response = await axios.post(
      url,
      data,
      withDefaults({
        auth,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    return response.data;
  } catch (e) {
  const status = e?.response?.status;
  const resData = e?.response?.data;
  logError("HTTP POST failed", url, status ? { status, data: resData } : (e?.message || e));
    throw e;
  }
}

export async function updateTransaction(id, data) {
  const url = `${API_ROOT}/transactions/${id}`;
  const auth = {
    username: API_USERNAME,
    password: API_PASSWORD,
  };
  try {
    log("PUT", url, data);
    const response = await axios.put(
      url,
      data,
      withDefaults({
        auth,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    return response.data;
  } catch (e) {
  const status = e?.response?.status;
  const resData = e?.response?.data;
  logError("HTTP PUT failed", url, status ? { status, data: resData } : (e?.message || e));
    throw e;
  }
}

export async function deleteTransaction(id) {
  const url = `${API_ROOT}/transactions/${id}`;
  const auth = {
    username: API_USERNAME,
    password: API_PASSWORD,
  };
  try {
    log("DELETE", url);
  const response = await axios.delete(url, withDefaults({ auth }));
    return response.data;
  } catch (e) {
  const status = e?.response?.status;
  const data = e?.response?.data;
  logError("HTTP DELETE failed", url, status ? { status, data } : (e?.message || e));
    throw e;
  }
}

