import { act, createContext, useReducer, useState } from "react";

 const TRANSACTIONS = {
  '2025': {
    'January': {
      SUMMARY: { id: 's1', month: 'January 2025', income: 40000, expenses: 25000, loan: 10000, net: 15000, sign: true },
      TRANSACTIONS: [
        { id: 't1', date: '2025-01-05', type: 'Income', description: 'Salary for January', category: 'Company', amount: 40000 },
        { id: 't2', date: '2025-01-10', type: 'Expense', description: 'Groceries', category: 'Market', amount: 5000 },
        { id: 't3', date: '2025-01-18', type: 'Expense', description: 'Electricity Bill', category: 'BESCOM', amount: 2500 },
        { id: 't4', date: '2025-01-25', type: 'Expense', description: 'Mobile Recharge', category: 'Airtel', amount: 500 },
      ]
    },
    'February': {
      SUMMARY: { id: 's2', month: 'February 2025', income: 42000, expenses: 28000, loan: 8000, net: 14000, sign: true },
      TRANSACTIONS: [
        { id: 't5', date: '2025-02-01', type: 'Income', description: 'Freelance Project', category: 'Upwork', amount: 12000 },
        { id: 't6', date: '2025-02-05', type: 'Income', description: 'Salary for February', category: 'Company', amount: 30000 },
        { id: 't7', date: '2025-02-12', type: 'Expense', description: 'Valentine Gift', category: 'Amazon', amount: 4000 },
        { id: 't8', date: '2025-02-20', type: 'Expense', description: 'Dining Out', category: 'Zomato', amount: 2500 },
      ]
    },
    'March': {
      SUMMARY: { id: 's3', month: 'March 2025', income: 41000, expenses: 27000, loan: 7000, net: 14000, sign: true },
      TRANSACTIONS: [
        { id: 't9', date: '2025-03-03', type: 'Income', description: 'Salary for March', category: 'Company', amount: 41000 },
        { id: 't10', date: '2025-03-10', type: 'Expense', description: 'Petrol', category: 'HPCL', amount: 2000 },
        { id: 't11', date: '2025-03-18', type: 'Expense', description: 'Clothing', category: 'Lifestyle', amount: 5000 },
      ]
    },
    'April': {
      SUMMARY: { id: 's4', month: 'April 2025', income: 39000, expenses: 26000, loan: 9000, net: 13000, sign: true },
      TRANSACTIONS: [
        { id: 't12', date: '2025-04-01', type: 'Income', description: 'Salary for April', category: 'Company', amount: 39000 },
        { id: 't13', date: '2025-04-07', type: 'Expense', description: 'House Rent', category: 'Landlord', amount: 15000 },
        { id: 't14', date: '2025-04-20', type: 'Expense', description: 'Online Courses', category: 'Udemy', amount: 3000 },
      ]
    },
    'May': {
      SUMMARY: { id: 's5', month: 'May 2025', income: 45000, expenses: 32000, loan: 6000, net: 13000, sign: true },
      TRANSACTIONS: [
        { id: 't15', date: '2025-05-01', type: 'Income', description: 'Salary for May', category: 'Company', amount: 45000 },
        { id: 't16', date: '2025-05-12', type: 'Expense', description: 'Travel', category: 'IRCTC', amount: 7000 },
        { id: 't17', date: '2025-05-28', type: 'Expense', description: 'Medical', category: 'Pharmacy', amount: 3000 },
      ]
    },
    'June': {
      SUMMARY: { id: 's6', month: 'June 2025', income: 47000, expenses: 33000, loan: 7000, net: 14000, sign: true },
      TRANSACTIONS: [
        { id: 't18', date: '2025-06-01', type: 'Income', description: 'Salary for June', category: 'Company', amount: 47000 },
        { id: 't19', date: '2025-06-10', type: 'Expense', description: 'Vacation Booking', category: 'MakeMyTrip', amount: 15000 },
        { id: 't20', date: '2025-06-18', type: 'Expense', description: 'Home Cleaning', category: 'Urban Company', amount: 1800 },
      ]
    },
    'July': {
      SUMMARY: { id: 's7', month: 'July 2025', income: 71542, expenses: 73773, loan: 0, net: 2231, sign: true },
      TRANSACTIONS: [
        { id: 't21', date: '2025-07-01', type: 'Income', description: 'Salary for July', category: 'Company', amount: 55000 },
        { id: 't22', date: '2025-07-15', type: 'Expense', description: 'Investment in ITC', category: 'Groww', amount: 5000 },
        { id: 't23', date: '2025-07-28', type: 'Expense', description: 'Groceries', category: 'Local Market', amount: 1200 },
      ]
    },
    'August': {
      SUMMARY: { id: 's8', month: 'August 2025', income: 48000, expenses: 31000, loan: 10000, net: 17000, sign: true },
      TRANSACTIONS: [
        { id: 't24', date: '2025-08-01', type: 'Income', description: 'Salary for August', category: 'Company', amount: 48000 },
        { id: 't25', date: '2025-08-10', type: 'Expense', description: 'Raksha Bandhan Gifts', category: 'Amazon', amount: 3000 },
        { id: 't26', date: '2025-08-20', type: 'Expense', description: 'Snacks & Eating Out', category: 'Swiggy', amount: 1000 },
      ]
    },
    'September': {
      SUMMARY: { id: 's9', month: 'September 2025', income: 49000, expenses: 35000, loan: 8000, net: 14000, sign: true },
      TRANSACTIONS: [
        { id: 't27', date: '2025-09-01', type: 'Income', description: 'Salary for September', category: 'Company', amount: 49000 },
        { id: 't28', date: '2025-09-14', type: 'Expense', description: 'Laptop EMI', category: 'Amazon Pay', amount: 6000 },
        { id: 't29', date: '2025-09-24', type: 'Expense', description: 'Weekend Trip', category: 'Redbus', amount: 4500 },
      ]
    },
    'October': {
      SUMMARY: { id: 's10', month: 'October 2025', income: 46000, expenses: 29000, loan: 10000, net: 17000, sign: true },
      TRANSACTIONS: [
        { id: 't30', date: '2025-10-01', type: 'Income', description: 'Salary for October', category: 'Company', amount: 46000 },
        { id: 't31', date: '2025-10-10', type: 'Expense', description: 'Festival Shopping', category: 'Flipkart', amount: 8000 },
        { id: 't32', date: '2025-10-20', type: 'Expense', description: 'Diwali Lights', category: 'Local Shop', amount: 1000 },
      ]
    },
    'November': {
      SUMMARY: { id: 's11', month: 'November 2025', income: 47000, expenses: 31000, loan: 9000, net: 16000, sign: true },
      TRANSACTIONS: [
        { id: 't33', date: '2025-11-01', type: 'Income', description: 'Salary for November', category: 'Company', amount: 47000 },
        { id: 't34', date: '2025-11-14', type: 'Expense', description: 'Gifts for Friends', category: 'Amazon', amount: 4000 },
        { id: 't35', date: '2025-11-25', type: 'Expense', description: 'Haircut & Grooming', category: 'Salon', amount: 1200 },
      ]
    },
    'December': {
      SUMMARY: { id: 's12', month: 'December 2025', income: 50000, expenses: 38000, loan: 10000, net: 12000, sign: true },
      TRANSACTIONS: [
        { id: 't36', date: '2025-12-01', type: 'Income', description: 'Salary for December', category: 'Company', amount: 50000 },
        { id: 't37', date: '2025-12-15', type: 'Expense', description: 'Christmas Shopping', category: 'Myntra', amount: 7000 },
        { id: 't38', date: '2025-12-29', type: 'Expense', description: 'New Year Party', category: 'Barbeque Nation', amount: 5000 },
      ]
    }
  }
};
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

  
            const id = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
            const newTransaction = { ...transactionData, id:id };
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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const initialTransactions = TRANSACTIONS[selectedYear] || {};
  const [transactionsState, dispatch] = useReducer(transactionReducer, initialTransactions);

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