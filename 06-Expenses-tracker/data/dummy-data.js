import { Transaction } from './models/transactions';
import { Summary } from './models/summary';

export const TRANSACTIONS = {
  '2025': {
    'January': {
      SUMMARY: new Summary('s1', 'January 2025', 40000, 25000, 10000, 15000),
      TRANSACTIONS: [
        new Transaction('t1', '2025-01-05', 'Income', 'Salary for January', 'Company', 40000),
        new Transaction('t2', '2025-01-10', 'Expense', 'Groceries', 'Market', 5000),
        new Transaction('t3', '2025-01-18', 'Expense', 'Electricity Bill', 'BESCOM', 2500),
        new Transaction('t4', '2025-01-25', 'Expense', 'Mobile Recharge', 'Airtel', 500),
      ]
    },
    'February': {
      SUMMARY: new Summary('s2', 'February 2025', 42000, 28000, 8000, 14000),
      TRANSACTIONS: [
        new Transaction('t5', '2025-02-01', 'Income', 'Freelance Project', 'Upwork', 12000),
        new Transaction('t6', '2025-02-05', 'Income', 'Salary for February', 'Company', 30000),
        new Transaction('t7', '2025-02-12', 'Expense', 'Valentine Gift', 'Amazon', 4000),
        new Transaction('t8', '2025-02-20', 'Expense', 'Dining Out', 'Zomato', 2500),
      ]
    },
    'March': {
      SUMMARY: new Summary('s3', 'March 2025', 41000, 27000, 7000, 14000),
      TRANSACTIONS: [
        new Transaction('t9', '2025-03-03', 'Income', 'Salary for March', 'Company', 41000),
        new Transaction('t10', '2025-03-10', 'Expense', 'Petrol', 'HPCL', 2000),
        new Transaction('t11', '2025-03-18', 'Expense', 'Clothing', 'Lifestyle', 5000),
      ]
    },
    'April': {
      SUMMARY: new Summary('s4', 'April 2025', 39000, 26000, 9000, 13000),
      TRANSACTIONS: [
        new Transaction('t12', '2025-04-01', 'Income', 'Salary for April', 'Company', 39000),
        new Transaction('t13', '2025-04-07', 'Expense', 'House Rent', 'Landlord', 15000),
        new Transaction('t14', '2025-04-20', 'Expense', 'Online Courses', 'Udemy', 3000),
      ]
    },
    'May': {
      SUMMARY: new Summary('s5', 'May 2025', 45000, 32000, 6000, 13000),
      TRANSACTIONS: [
        new Transaction('t15', '2025-05-01', 'Income', 'Salary for May', 'Company', 45000),
        new Transaction('t16', '2025-05-12', 'Expense', 'Travel', 'IRCTC', 7000),
        new Transaction('t17', '2025-05-28', 'Expense', 'Medical', 'Pharmacy', 3000),
      ]
    },
    'June': {
      SUMMARY: new Summary('s6', 'June 2025', 47000, 33000, 7000, 14000),
      TRANSACTIONS: [
        new Transaction('t18', '2025-06-01', 'Income', 'Salary for June', 'Company', 47000),
        new Transaction('t19', '2025-06-10', 'Expense', 'Vacation Booking', 'MakeMyTrip', 15000),
        new Transaction('t20', '2025-06-18', 'Expense', 'Home Cleaning', 'Urban Company', 1800),
      ]
    },
    'July': {
      SUMMARY: new Summary('s7', 'July 2025', 71542, 73773, 0, 2231, true),
      TRANSACTIONS: [
        new Transaction('t21', '2025-07-01', 'Income', 'Salary for July', 'Company', 55000),
        new Transaction('t22', '2025-07-15', 'Expense', 'Investment in ITC', 'Groww', 5000),
        new Transaction('t23', '2025-07-28', 'Expense', 'Groceries', 'Local Market', 1200),
      ]
    },
    'August': {
      SUMMARY: new Summary('s8', 'August 2025', 48000, 31000, 10000, 17000),
      TRANSACTIONS: [
        new Transaction('t24', '2025-08-01', 'Income', 'Salary for August', 'Company', 48000),
        new Transaction('t25', '2025-08-10', 'Expense', 'Raksha Bandhan Gifts', 'Amazon', 3000),
        new Transaction('t26', '2025-08-20', 'Expense', 'Snacks & Eating Out', 'Swiggy', 1000),
      ]
    },
    'September': {
      SUMMARY: new Summary('s9', 'September 2025', 49000, 35000, 8000, 14000),
      TRANSACTIONS: [
        new Transaction('t27', '2025-09-01', 'Income', 'Salary for September', 'Company', 49000),
        new Transaction('t28', '2025-09-14', 'Expense', 'Laptop EMI', 'Amazon Pay', 6000),
        new Transaction('t29', '2025-09-24', 'Expense', 'Weekend Trip', 'Redbus', 4500),
      ]
    },
    'October': {
      SUMMARY: new Summary('s10', 'October 2025', 46000, 29000, 10000, 17000),
      TRANSACTIONS: [
        new Transaction('t30', '2025-10-01', 'Income', 'Salary for October', 'Company', 46000),
        new Transaction('t31', '2025-10-10', 'Expense', 'Festival Shopping', 'Flipkart', 8000),
        new Transaction('t32', '2025-10-20', 'Expense', 'Diwali Lights', 'Local Shop', 1000),
      ]
    },
    'November': {
      SUMMARY: new Summary('s11', 'November 2025', 47000, 31000, 9000, 16000),
      TRANSACTIONS: [
        new Transaction('t33', '2025-11-01', 'Income', 'Salary for November', 'Company', 47000),
        new Transaction('t34', '2025-11-14', 'Expense', 'Gifts for Friends', 'Amazon', 4000),
        new Transaction('t35', '2025-11-25', 'Expense', 'Haircut & Grooming', 'Salon', 1200),
      ]
    },
    'December': {
      SUMMARY: new Summary('s12', 'December 2025', 50000, 38000, 10000, 12000),
      TRANSACTIONS: [
        new Transaction('t36', '2025-12-01', 'Income', 'Salary for December', 'Company', 50000),
        new Transaction('t37', '2025-12-15', 'Expense', 'Christmas Shopping', 'Myntra', 7000),
        new Transaction('t38', '2025-12-29', 'Expense', 'New Year Party', 'Barbeque Nation', 5000),
      ]
    }
  }
};
