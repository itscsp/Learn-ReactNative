import { useEffect, createContext, useState, useReducer } from "react";
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
  const s = String(dateStr);
  // Try ISO/Date parsing first to support timestamps and ISO strings
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    const mm = d.getMonth() + 1;
    return MONTHS[mm - 1] || null;
  }
  // Fallback: expect YYYY-MM-DD
  const parts = s.split("-");
  if (parts.length !== 3) return null;
  const mm = parseInt(parts[1], 10);
  return MONTHS[mm - 1] || null;
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

  useEffect(() => {
    (async () => {
      try {
        // Optionally pass filters if your API supports them
  const apiList = await getTransactions({ year: Number(selectedYear) }).catch(() => undefined);
  const normalized = normalizeApiListToYearMap(apiList, selectedYear) || {};
        dispatch({ type: "SET_ALL", payload: normalized });
      } catch (e) {
        console.log("Failed to load transactions:", e?.message || e);
      }
    })();
  }, [selectedYear]);

  async function loadMonth(year, monthNum) {
    try {
  const list = await getTransactions({ year: Number(year), month: Number(monthNum) }).catch(() => undefined);
  const normalized = normalizeApiListToYearMap(list, String(year)) || {};
      const monthName = MONTHS[Number(monthNum) - 1];
      const data = normalized[monthName] || {
        SUMMARY: computeSummary(monthName, String(year), []),
        TRANSACTIONS: [],
      };
      dispatch({ type: "SET_MONTH", payload: { monthName, data } });
    } catch (e) {
      console.log("Failed to load month:", year, monthNum, e?.message || e);
    }
  }

  function addTransaction(month, transactionData) {
    // Normalize type to lowercase before persisting/dispatching
    const normalized = { ...transactionData, type: capType(transactionData?.type) };
    apiCreate(normalized).catch(() => {});
    dispatch({ type: "ADD", payload: { month, transactionData: normalized }, meta: { year: selectedYear } });
  }

  function editTransaction(month, id, transactionData) {
    const normalized = { ...transactionData, type: capType(transactionData?.type) };
    apiUpdate(id, normalized).catch(() => {});
    dispatch({ type: "EDIT", payload: { month, id, transactionData: normalized }, meta: { year: selectedYear } });
  }

  function deleteTransaction(month, id) {
  apiDelete(id).catch(() => {});
  dispatch({ type: "DELETE", payload: { month, id }, meta: { year: selectedYear } });
  }

  function getMonthlyReport(month, year) {
    const y = year || selectedYear;
    // Optionally update state summary
    dispatch({ type: "REPORT", payload: { month, year: y } });
    const txns = (transactionsState?.[month]?.TRANSACTIONS) || [];
    return computeSummary(month, y, txns);
  }

  return (
    <TransationContext.Provider
      value={{
        transactions: transactionsState,
        addTransaction,
        editTransaction,
        deleteTransaction,
        getMonthlyReport,
  loadMonth,
      }}
    >
      {children}
    </TransationContext.Provider>
  );
}

export default TransationContextProvider;
