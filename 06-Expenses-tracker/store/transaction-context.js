import { useEffect, createContext, useState, useReducer, useCallback, useMemo, useRef } from "react";
import { log } from "../helper/logger";
import { getTransactions, createTransaction as apiCreate, updateTransaction as apiUpdate, deleteTransaction as apiDelete } from "../helper/http";

// Helpers
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const numToMonth = (numStr) => {
  const idx = parseInt(numStr, 10) - 1;
  return MONTHS[idx] || numStr;
};
const capType = (t) => {
  if (!t) return "expense";
  const m = String(t).toLowerCase();
  if (m === "income") return "income";
  if (m === "expense") return "expense";
  if (m === "loan") return "loan";
  return m; // default to lowercase variant
};
const computeSummary = (monthName, year, txns) => {
  let income = 0, expenses = 0, loan = 0;
  for (const x of txns) {
    const t = String(x.type).toLowerCase();
    if (t === "income") income += Number(x.amount) || 0;
    else if (t === "expense") expenses += Number(x.amount) || 0;
    else if (t === "loan") loan += Number(x.amount) || 0;
  }
  const net = income - expenses - loan;
  return {
    id: `s-${year}-${monthName}`,
    month: `${monthName} ${year}`,
    income,
    expenses,
    loan,
    net,
    sign: net >= 0,
  };
};
const ensureMonth = (state, monthName, year) => {
  const m = state[monthName];
  if (m && m.TRANSACTIONS) return state;
  const empty = [];
  return {
    ...state,
    [monthName]: {
      SUMMARY: computeSummary(monthName, year, empty),
      TRANSACTIONS: empty,
    },
  };
};

function monthFromDate(dateStr) {
  if (!dateStr) return null;
  const s = String(dateStr).trim();
  // Normalize separators so Android/iOS behave the same for 'YYYY/MM/DD' or 'YYYY-MM-DD'
  const norm = s.replace(/[\.\/]/g, "-");
  // Try native Date first (handles timestamps and ISO strings with timezones)
  const d = new Date(norm);
  if (!isNaN(d.getTime())) {
    const mm = d.getMonth() + 1;
    return MONTHS[mm - 1] || null;
  }
  // Regex parse YYYY-MM-DD explicitly
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(norm);
  if (m) {
    const mm = parseInt(m[2], 10);
    return MONTHS[mm - 1] || null;
  }
  return null;
}

function normalizeApiListToYearMap(list, yearStr) {
  // Support nested year->month mapping: { "2025": { "08": [ ... ] } }
  if (
    list &&
    typeof list === "object" &&
    list[yearStr] &&
    typeof list[yearStr] === "object" &&
    !Array.isArray(list[yearStr])
  ) {
    const monthMap = list[yearStr];
    const out = {};
    Object.keys(monthMap).forEach((mKey) => {
      const arr = Array.isArray(monthMap[mKey]) ? monthMap[mKey] : [];
      const mName = numToMonth(mKey);
      const txns = arr
        .map((t) => ({
          id: String(t.id),
          date: t.date,
          type: capType(t.type),
          description: t.description || "",
          category: t.category ?? "Uncategorized",
          amount: Number(t.amount) || 0,
        }))
        .sort((a, b) => (a.date < b.date ? 1 : -1));
      out[mName] = {
        SUMMARY: computeSummary(mName, yearStr, txns),
        TRANSACTIONS: txns,
      };
    });
    return out;
  }
  // Normalize input list shape -> array
  let arr = [];
  if (Array.isArray(list)) arr = list;
  else if (list && Array.isArray(list.data)) arr = list.data;
  else if (list && Array.isArray(list.transactions)) arr = list.transactions;
  else if (list && Array.isArray(list.items)) arr = list.items;
  else if (list && typeof list === "object") {
    const vals = Object.values(list);
    if (vals.every((v) => typeof v === "object")) {
      const candidates = vals.filter((v) => v && ("date" in v || "amount" in v || "type" in v));
      if (candidates.length) arr = candidates;
    }
  }

  // arr: array of txns { id, type, amount, date, description, category }
  const byMonth = {};
  (arr || []).forEach((t) => {
    const mName = monthFromDate(t.date);
    if (!mName) return;
    const txn = {
      id: String(t.id),
      date: t.date,
      type: capType(t.type),
      description: t.description || "",
      category: t.category ?? "Uncategorized",
      amount: Number(t.amount) || 0,
    };
    if (!byMonth[mName]) byMonth[mName] = [];
    byMonth[mName].push(txn);
  });
  const out = {};
  Object.keys(byMonth).forEach((m) => {
    const txns = byMonth[m].sort((a,b) => (a.date < b.date ? 1 : -1));
    out[m] = {
      SUMMARY: computeSummary(m, yearStr, txns),
      TRANSACTIONS: txns,
    };
  });
  return out;
}

export const TransationContext = createContext({
  transactions: {},
  addTransaction: (month, transactionData) => {},
  editTransaction: (month, id, transactionData) => {},
  deleteTransaction: (month, id) => {},
  getMonthlyReport: (month, year) => {},
  loadMonth: (year, monthNum) => Promise.resolve(),
});

function transactionReducer(state, action) {
  switch (action.type) {
    case "SET_MONTH": {
      const { monthName, data } = action.payload || {};
      if (!monthName || !data) return state;
      return {
        ...state,
        [monthName]: data,
      };
    }
    case "SET_ALL": {
      return action.payload || {};
    }
    case "ADD": {
      const { month, transactionData } = action.payload;
      const year = action.meta?.year || String(new Date().getFullYear());
      const id = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  const newTransaction = { ...transactionData, id: String(id), type: capType(transactionData?.type) };
      const prepared = ensureMonth(state, month, year);
      const updatedTxns = [newTransaction, ...(prepared[month]?.TRANSACTIONS || [])];
      return {
        ...prepared,
        [month]: {
          ...prepared[month],
          TRANSACTIONS: updatedTxns,
          SUMMARY: computeSummary(month, year, updatedTxns),
        },
      };
    }
    case "EDIT": {
      const { month, id, transactionData } = action.payload;
      const year = action.meta?.year || String(new Date().getFullYear());
      const base = ensureMonth(state, month, year);
      const updatedTxns = (base[month]?.TRANSACTIONS || []).map((txn) =>
  String(txn.id) === String(id) ? { ...txn, ...transactionData, type: capType(transactionData?.type) } : txn
      );
      return {
        ...base,
        [month]: {
          ...base[month],
          TRANSACTIONS: updatedTxns,
          SUMMARY: computeSummary(month, year, updatedTxns),
        },
      };
    }
    case "DELETE": {
      const { month, id } = action.payload;
      const year = action.meta?.year || String(new Date().getFullYear());
      const base = ensureMonth(state, month, year);
      const updatedTxns = (base[month]?.TRANSACTIONS || []).filter((txn) => String(txn.id) !== String(id));
      return {
        ...base,
        [month]: {
          ...base[month],
          TRANSACTIONS: updatedTxns,
          SUMMARY: computeSummary(month, year, updatedTxns),
        },
      };
    }

    case "REPORT": {
      const { month, year } = action.payload;
      const base = ensureMonth(state, month, year);
      const updated = computeSummary(month, year, base[month]?.TRANSACTIONS || []);
      return {
        ...base,
        [month]: {
          ...base[month],
          SUMMARY: updated,
        },
      };
    }
    default:
      return state;
  }
}

function TransationContextProvider({ children }) {
  const [selectedYear] = useState(new Date().getFullYear().toString());
  const [transactionsState, dispatch] = useReducer(transactionReducer, {});
  const inFlightYearRef = useRef(new Set()); // years in-flight
  const inFlightMonthRef = useRef(new Set()); // keys like "2025-8"
  const lastFetchedRef = useRef({ year: {}, month: {} }); // timestamps
  const LOADER_TTL_MS = 10_000; // 10s guard to avoid rapid refetches

  useEffect(() => {
    (async () => {
      try {
        // Skip if recently fetched or already in-flight
        const last = lastFetchedRef.current.year[selectedYear] || 0;
        const now = Date.now();
        if (now - last < LOADER_TTL_MS || inFlightYearRef.current.has(selectedYear)) {
          return;
        }
        inFlightYearRef.current.add(selectedYear);
        const apiList = await getTransactions({ year: Number(selectedYear) }).catch(() => undefined);
        const normalized = normalizeApiListToYearMap(apiList, selectedYear) || {};
        dispatch({ type: "SET_ALL", payload: normalized });
        lastFetchedRef.current.year[selectedYear] = Date.now();
        inFlightYearRef.current.delete(selectedYear);
      } catch (e) {
        log("Failed to load transactions:", e?.message || e);
        inFlightYearRef.current.delete(selectedYear);
      }
    })();
  }, [selectedYear]);

  const loadMonth = useCallback(async (year, monthNum) => {
    const key = `${year}-${monthNum}`;
    const monthName = MONTHS[Number(monthNum) - 1];
    try {
      // Skip if data already exists or fetched recently
      const existing = transactionsState?.[monthName]?.TRANSACTIONS || [];
      const last = lastFetchedRef.current.month[key] || 0;
      const now = Date.now();
      if (existing.length > 0 || now - last < LOADER_TTL_MS || inFlightMonthRef.current.has(key)) {
        return;
      }
      inFlightMonthRef.current.add(key);

      const list = await getTransactions({ year: Number(year), month: Number(monthNum) }).catch(() => undefined);
      const normalized = normalizeApiListToYearMap(list, String(year)) || {};
      const data = normalized[monthName] || {
        SUMMARY: computeSummary(monthName, String(year), []),
        TRANSACTIONS: [],
      };
      dispatch({ type: "SET_MONTH", payload: { monthName, data } });
      lastFetchedRef.current.month[key] = Date.now();
      inFlightMonthRef.current.delete(key);
    } catch (e) {
      log("Failed to load month:", year, monthNum, e?.message || e);
      inFlightMonthRef.current.delete(key);
    }
  }, [transactionsState]);

  const addTransaction = useCallback((month, transactionData) => {
    // Normalize type to lowercase before persisting/dispatching
    const normalized = { ...transactionData, type: capType(transactionData?.type) };
    apiCreate(normalized).catch(() => {});
    dispatch({ type: "ADD", payload: { month, transactionData: normalized }, meta: { year: selectedYear } });
  }, [selectedYear]);

  const editTransaction = useCallback((month, id, transactionData) => {
    const normalized = { ...transactionData, type: capType(transactionData?.type) };
    apiUpdate(id, normalized).catch(() => {});
    dispatch({ type: "EDIT", payload: { month, id, transactionData: normalized }, meta: { year: selectedYear } });
  }, [selectedYear]);

  const deleteTransaction = useCallback((month, id) => {
    apiDelete(id).catch(() => {});
    dispatch({ type: "DELETE", payload: { month, id }, meta: { year: selectedYear } });
  }, [selectedYear]);

  const getMonthlyReport = useCallback((month, year) => {
    const y = year || selectedYear;
    // Optionally update state summary
    dispatch({ type: "REPORT", payload: { month, year: y } });
    const txns = (transactionsState?.[month]?.TRANSACTIONS) || [];
    return computeSummary(month, y, txns);
  }, [selectedYear, transactionsState]);

  const contextValue = useMemo(() => ({
    transactions: transactionsState,
    addTransaction,
    editTransaction,
    deleteTransaction,
    getMonthlyReport,
    loadMonth,
  }), [transactionsState, addTransaction, editTransaction, deleteTransaction, getMonthlyReport, loadMonth]);

  return (
    <TransationContext.Provider value={contextValue}>
      {children}
    </TransationContext.Provider>
  );
}

export default TransationContextProvider;
