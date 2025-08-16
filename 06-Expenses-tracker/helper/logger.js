import { Platform } from "react-native";

// Simple logger that prefixes messages with timestamp and platform (ios/android/web)
const prefix = () => `[${new Date().toISOString()}] [${Platform.OS}]`;

export const log = (...args) => {
  // eslint-disable-next-line no-console
  console.log(prefix(), ...args);
};

export const warn = (...args) => {
  // eslint-disable-next-line no-console
  console.warn(prefix(), ...args);
};

export const error = (...args) => {
  // eslint-disable-next-line no-console
  console.error(prefix(), ...args);
};

export default { log, warn, error };
