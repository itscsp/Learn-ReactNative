import { log } from "./logger";

export const formatINR = (amount) => {
  const n = typeof amount === 'string' ? Number(amount) : amount;
  const safe = Number.isFinite(n) ? n : 0;
  return safe.toLocaleString("en-IN", { style: "currency", currency: "INR" });
};

export const getDay = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    return date.getDate();
  } catch (error) {
    log("Date parsing error:", error);
    return "";
  }
};

// Get current month to show appropriate data
export const getCurrentMonthName = (date) => {
  const fullDate = new Date(date);
  return fullDate.toLocaleString("default", { month: "long" });
};
