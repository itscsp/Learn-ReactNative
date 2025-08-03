import { act, createContext, useReducer, useState } from "react";
import { TRANSACTIONS } from "../data/dummy-data";

export const TransationContext = createContext({
    transactions: {},
    addTransaction: (month, transactionData) => {},
    editTransaction: (month, id, transactionData) => {},
    deleteTransaction: (month, id) => {}
});

function transactionReducer(state, action) {
    switch (action.type) {
        case 'ADD': {
            const { month, transactionData } = action.payload;
            const id = new Date().toString() + Math.random().toString();
            const newTransaction = { ...transactionData, id };
            return {
                ...state,
                [month]: {
                    ...state[month],
                    TRANSACTIONS: [newTransaction, ...state[month].TRANSACTIONS]
                }
            };
        }
        case 'EDIT': {
            const { month, id, transactionData } = action.payload;
            return {
                ...state,
                [month]: {
                    ...state[month],
                    TRANSACTIONS: state[month].TRANSACTIONS.map(txn =>
                        txn.id === id ? { ...txn, ...transactionData } : txn
                    )
                }
            };
        }
        case 'DELETE': {
            const { month, id } = action.payload;
            return {
                ...state,
                [month]: {
                    ...state[month],
                    TRANSACTIONS: state[month].TRANSACTIONS.filter(txn => txn.id !== id)
                }
            };
        }
        default:
            return state;
    }
}

function TransationContextProvider({children}) {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [transactionsState, dispatch] = useReducer(transactionReducer, TRANSACTIONS[selectedYear]);

    function addTransaction(month, transactionData) {
        dispatch({ type: 'ADD', payload: { month, transactionData } });
    }

    function editTransaction(month, id, transactionData) {
        dispatch({ type: 'EDIT', payload: { month, id, transactionData } });
    }

    function deleteTransaction(month, id) {
        dispatch({ type: 'DELETE', payload: { month, id } });
    }

    return (
        <TransationContext.Provider value={{
            transactions: transactionsState,
            addTransaction,
            editTransaction,
            deleteTransaction
        }}>
            {children}
        </TransationContext.Provider>
    );
}

export default TransationContextProvider;