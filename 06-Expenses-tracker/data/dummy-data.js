import { Transaction } from './models/transactions';
import { Summary } from './models/summary';

export const TRANSACTIONS = {
  '2025': {
    'January': {
      SUMMARY: new Summary('s1', 'January 2025', 40000, 25000, 10000, 15000),
      TRANSACTIONS: [
        new Transaction('t1', 'January 05, 2025', 'Income', 'Salary for January', 'Company', 40000),
        new Transaction('t2', 'January 10, 2025', 'Expense', 'Groceries', 'Market', 5000),
        new Transaction('t3', 'January 18, 2025', 'Expense', 'Electricity Bill', 'BESCOM', 2500),
        new Transaction('t4', 'January 25, 2025', 'Expense', 'Mobile Recharge', 'Airtel', 500),
      ]
    },
    'February': {
      SUMMARY: new Summary('s2', 'February 2025', 42000, 28000, 8000, 14000),
      TRANSACTIONS: [
        new Transaction('t5', 'February 01, 2025', 'Income', 'Freelance Project', 'Upwork', 12000),
        new Transaction('t6', 'February 05, 2025', 'Income', 'Salary for February', 'Company', 30000),
        new Transaction('t7', 'February 12, 2025', 'Expense', 'Valentine Gift', 'Amazon', 4000),
        new Transaction('t8', 'February 20, 2025', 'Expense', 'Dining Out', 'Zomato', 2500),
      ]
    },
    'March': {
      SUMMARY: new Summary('s3', 'March 2025', 41000, 27000, 7000, 14000),
      TRANSACTIONS: [
        new Transaction('t9', 'March 03, 2025', 'Income', 'Salary for March', 'Company', 41000),
        new Transaction('t10', 'March 10, 2025', 'Expense', 'Petrol', 'HPCL', 2000),
        new Transaction('t11', 'March 18, 2025', 'Expense', 'Clothing', 'Lifestyle', 5000),
      ]
    },
    'April': {
      SUMMARY: new Summary('s4', 'April 2025', 39000, 26000, 9000, 13000),
      TRANSACTIONS: [
        new Transaction('t12', 'April 01, 2025', 'Income', 'Salary for April', 'Company', 39000),
        new Transaction('t13', 'April 07, 2025', 'Expense', 'House Rent', 'Landlord', 15000),
        new Transaction('t14', 'April 20, 2025', 'Expense', 'Online Courses', 'Udemy', 3000),
      ]
    },
    'May': {
      SUMMARY: new Summary('s5', 'May 2025', 45000, 32000, 6000, 13000),
      TRANSACTIONS: [
        new Transaction('t15', 'May 01, 2025', 'Income', 'Salary for May', 'Company', 45000),
        new Transaction('t16', 'May 12, 2025', 'Expense', 'Travel', 'IRCTC', 7000),
        new Transaction('t17', 'May 28, 2025', 'Expense', 'Medical', 'Pharmacy', 3000),
      ]
    },
    'June': {
      SUMMARY: new Summary('s6', 'June 2025', 47000, 33000, 7000, 14000),
      TRANSACTIONS: [
        new Transaction('t18', 'June 01, 2025', 'Income', 'Salary for June', 'Company', 47000),
        new Transaction('t19', 'June 10, 2025', 'Expense', 'Vacation Booking', 'MakeMyTrip', 15000),
        new Transaction('t20', 'June 18, 2025', 'Expense', 'Home Cleaning', 'Urban Company', 1800),
      ]
    },
    'July': {
      SUMMARY: new Summary('s7', 'July 2025', 71542, 73773, 0, 2231),
      TRANSACTIONS: [
        new Transaction('t21', 'July 01, 2025', 'Income', 'Salary for July', 'Company', 55000),
        new Transaction('t22', 'July 15, 2025', 'Expense', 'Investment in ITC', 'Groww', 5000),
        new Transaction('t23', 'July 28, 2025', 'Expense', 'Groceries', 'Local Market', 1200),
          new Transaction('t241', 'July 01, 2025', 'Income', 'Salary for July', 'Company', 55000),
        new Transaction('t251', 'July 15, 2025', 'Expense', 'Investment in ITC', 'Groww', 5000),
        new Transaction('t261', 'July 28, 2025', 'Expense', 'Groceries', 'Local Market', 1200),  
        new Transaction('t271', 'July 01, 2025', 'Income', 'Salary for July', 'Company', 55000),
        new Transaction('t281', 'July 15, 2025', 'Expense', 'Investment in ITC', 'Groww', 5000),
        new Transaction('t291', 'July 28, 2025', 'Expense', 'Groceries', 'Local Market', 1200),
      ]
    },
    'August': {
      SUMMARY: new Summary('s8', 'August 2025', 48000, 31000, 10000, 17000),
      TRANSACTIONS: [
        new Transaction('t24', 'August 01, 2025', 'Income', 'Salary for August', 'Company', 48000),
        new Transaction('t25', 'August 10, 2025', 'Expense', 'Raksha Bandhan Gifts', 'Amazon', 3000),
        new Transaction('t26', 'August 20, 2025', 'Expense', 'Snacks & Eating Out', 'Swiggy', 1000),
      ]
    },
    'September': {
      SUMMARY: new Summary('s9', 'September 2025', 49000, 35000, 8000, 14000),
      TRANSACTIONS: [
        new Transaction('t27', 'September 01, 2025', 'Income', 'Salary for September', 'Company', 49000),
        new Transaction('t28', 'September 14, 2025', 'Expense', 'Laptop EMI', 'Amazon Pay', 6000),
        new Transaction('t29', 'September 24, 2025', 'Expense', 'Weekend Trip', 'Redbus', 4500),
      ]
    },
    'October': {
      SUMMARY: new Summary('s10', 'October 2025', 46000, 29000, 10000, 17000),
      TRANSACTIONS: [
        new Transaction('t30', 'October 01, 2025', 'Income', 'Salary for October', 'Company', 46000),
        new Transaction('t31', 'October 10, 2025', 'Expense', 'Festival Shopping', 'Flipkart', 8000),
        new Transaction('t32', 'October 20, 2025', 'Expense', 'Diwali Lights', 'Local Shop', 1000),
      ]
    },
    'November': {
      SUMMARY: new Summary('s11', 'November 2025', 47000, 31000, 9000, 16000),
      TRANSACTIONS: [
        new Transaction('t33', 'November 01, 2025', 'Income', 'Salary for November', 'Company', 47000),
        new Transaction('t34', 'November 14, 2025', 'Expense', 'Gifts for Friends', 'Amazon', 4000),
        new Transaction('t35', 'November 25, 2025', 'Expense', 'Haircut & Grooming', 'Salon', 1200),
      ]
    },
    'December': {
      SUMMARY: new Summary('s12', 'December 2025', 50000, 38000, 10000, 12000),
      TRANSACTIONS: [
        new Transaction('t36', 'December 01, 2025', 'Income', 'Salary for December', 'Company', 50000),
        new Transaction('t37', 'December 15, 2025', 'Expense', 'Christmas Shopping', 'Myntra', 7000),
        new Transaction('t38', 'December 29, 2025', 'Expense', 'New Year Party', 'Barbeque Nation', 5000),
      ]
    }
  }
};
