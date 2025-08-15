import { createContext, useReducer, useState } from "react";

// 2) Existing external data provided (year -> month-number -> array of txns)
// Note: Keeping as-is and normalizing below to month-name keys + SUMMARY.
const EXISTING_DATA = {
  "2025": {
    "08": [
      { "id": 211, "type": "expense", "amount": 12.34, "date": "2025-08-15", "description": "Coffee", "category": null },
      { "id": 206, "type": "expense", "amount": 100, "date": "2025-08-11", "description": "testin", "category": null },
      { "id": 203, "type": "expense", "amount": 100, "date": "2025-08-01", "description": "testing", "category": "Essentials" }
    ],
    "07": [
      { "id": 204, "type": "expense", "amount": 1000, "date": "2025-07-23", "description": "testing", "category": "Essentials" }
    ],
    "06": [
      { "id": 202, "type": "income", "amount": 1250, "date": "2025-06-29", "description": "Tulunadvarthe server testing work", "category": "Essentials" },
      { "id": 201, "type": "expense", "amount": 1584, "date": "2025-06-28", "description": "term insurance", "category": "Stability" },
      { "id": 200, "type": "expense", "amount": 69, "date": "2025-06-28", "description": "Additional recharge", "category": "Essentials" },
      { "id": 199, "type": "expense", "amount": 110, "date": "2025-06-26", "description": "Petrol", "category": "Essentials" },
      { "id": 198, "type": "expense", "amount": 140, "date": "2025-06-26", "description": "Thindi", "category": "Essentials" },
      { "id": 197, "type": "expense", "amount": 500, "date": "2025-06-26", "description": "Petrol", "category": "Essentials" },
      { "id": 196, "type": "expense", "amount": 200, "date": "2025-06-24", "description": "Given to chaithanya", "category": "Essentials" },
      { "id": 195, "type": "expense", "amount": 550, "date": "2025-06-24", "description": "Bike service", "category": "Essentials" },
      { "id": 194, "type": "expense", "amount": 50, "date": "2025-06-24", "description": "Given to chaitu", "category": "Essentials" },
      { "id": 193, "type": "expense", "amount": 70, "date": "2025-06-24", "description": "Hair cut", "category": "Essentials" },
      { "id": 192, "type": "expense", "amount": 2000, "date": "2025-06-22", "description": "Police bazar mutual found", "category": "Grow" },
      { "id": 191, "type": "expense", "amount": 200, "date": "2025-06-22", "description": "Fish", "category": "Essentials" },
      { "id": 190, "type": "expense", "amount": 425, "date": "2025-06-21", "description": "Pallavu", "category": "Essentials" },
      { "id": 189, "type": "expense", "amount": 60, "date": "2025-06-18", "description": "Pant foting", "category": "Essentials" },
      { "id": 188, "type": "expense", "amount": 30, "date": "2025-06-17", "description": "Biscut", "category": "Essentials" },
      { "id": 186, "type": "income", "amount": 1500, "date": "2025-06-15", "description": "Freelancing income from Sunil", "category": "Essentials" },
      { "id": 187, "type": "expense", "amount": 22, "date": "2025-06-14", "description": "payment to Dinesh Mamu", "category": "Essentials" },
      { "id": 185, "type": "expense", "amount": 200, "date": "2025-06-14", "description": "given to Chaithanya", "category": "Essentials" },
      { "id": 184, "type": "expense", "amount": 100, "date": "2025-06-14", "description": "Fish", "category": "Essentials" },
      { "id": 183, "type": "expense", "amount": 55, "date": "2025-06-13", "description": "Thidi", "category": "Essentials" },
      { "id": 182, "type": "expense", "amount": 20, "date": "2025-06-12", "description": "Thindi", "category": "Essentials" },
      { "id": 181, "type": "expense", "amount": 120, "date": "2025-06-12", "description": "Given to chaithanya", "category": "Essentials" },
      { "id": 180, "type": "expense", "amount": 3030, "date": "2025-06-11", "description": "Added to Grow", "category": "Rewards" },
      { "id": 179, "type": "expense", "amount": 363, "date": "2025-06-11", "description": "Additional data recharge to amma's mobile", "category": "Essentials" },
      { "id": 178, "type": "expense", "amount": 200, "date": "2025-06-10", "description": "Given to chaithanya", "category": "Essentials" },
      { "id": 177, "type": "expense", "amount": 2, "date": "2025-06-10", "description": "Adding funds to Kite", "category": "Essentials" },
      { "id": 176, "type": "expense", "amount": 4219, "date": "2025-06-08", "description": "Fridge loan", "category": "Essentials" },
      { "id": 175, "type": "expense", "amount": 65, "date": "2025-06-08", "description": "Grocesary", "category": "Essentials" },
      { "id": 174, "type": "expense", "amount": 130, "date": "2025-06-08", "description": "Grocesary", "category": "Essentials" },
      { "id": 173, "type": "expense", "amount": 38, "date": "2025-06-08", "description": "Grocesary", "category": "Essentials" },
      { "id": 172, "type": "expense", "amount": 80, "date": "2025-06-08", "description": "Grocesary", "category": "Essentials" },
      { "id": 171, "type": "expense", "amount": 1000, "date": "2025-06-08", "description": "Shabhari male trip expenses given to Harish Kallaje", "category": "Rewards" },
      { "id": 170, "type": "expense", "amount": 10, "date": "2025-06-07", "description": "Donation", "category": "Essentials" },
      { "id": 169, "type": "expense", "amount": 170, "date": "2025-06-07", "description": "Food", "category": "Essentials" },
      { "id": 168, "type": "expense", "amount": 3695, "date": "2025-06-07", "description": "Cloths", "category": "Rewards" },
      { "id": 167, "type": "expense", "amount": 69, "date": "2025-06-06", "description": "Additional data pack", "category": "Essentials" },
      { "id": 166, "type": "expense", "amount": 72, "date": "2025-06-06", "description": "Milk and groceries", "category": "Essentials" },
      { "id": 165, "type": "expense", "amount": 800, "date": "2025-06-05", "description": "hedge clippers", "category": "Essentials" },
      { "id": 164, "type": "expense", "amount": 40, "date": "2025-06-04", "description": "Thindi from Mamu", "category": "Essentials" },
      { "id": 163, "type": "expense", "amount": 340, "date": "2025-06-03", "description": "Fish", "category": "Essentials" },
      { "id": 162, "type": "expense", "amount": 27, "date": "2025-06-02", "description": "Batthi and podi", "category": "Essentials" },
      { "id": 161, "type": "expense", "amount": 2000, "date": "2025-06-02", "description": "Office fund", "category": "Essentials" },
      { "id": 160, "type": "expense", "amount": 365, "date": "2025-06-02", "description": "Zeroda platform feez", "category": "Essentials" },
      { "id": 159, "type": "expense", "amount": 2500, "date": "2025-06-02", "description": "Grow India defence index", "category": "Grow" },
      { "id": 158, "type": "expense", "amount": 2500, "date": "2025-06-02", "description": "Grow flexicap SIP", "category": "Grow" },
      { "id": 157, "type": "expense", "amount": 3000, "date": "2025-06-02", "description": "SBI Hybrid mutual fund", "category": "Grow" },
      { "id": 131, "type": "expense", "amount": 5000, "date": "2025-06-02", "description": "SBI Index found SIP", "category": "Grow" },
      { "id": 152, "type": "expense", "amount": 300, "date": "2025-06-01", "description": "Macadamia tree samples", "category": "Rewards" },
      { "id": 140, "type": "expense", "amount": 5644, "date": "2025-06-01", "description": "6th loan installment paid to prithesh on 30 may", "category": "Essentials" },
      { "id": 139, "type": "income", "amount": 53490, "date": "2025-06-01", "description": "Salary credited on 30 may", "category": "Essentials" },
      { "id": 138, "type": "expense", "amount": 10000, "date": "2025-06-01", "description": "Paid on May 30 to Lokesh", "category": "Essentials" }
    ],
    "05": [
      { "id": 156, "type": "expense", "amount": 72, "date": "2025-05-31", "description": "Bus ticket", "category": "Essentials" },
      { "id": 155, "type": "expense", "amount": 250, "date": "2025-05-31", "description": "Thindi", "category": "Essentials" },
      { "id": 141, "type": "expense", "amount": 250, "date": "2025-05-30", "description": "Thindi", "category": "Essentials" },
      { "id": 137, "type": "expense", "amount": 50, "date": "2025-05-30", "description": "Bus expenses", "category": "Essentials" },
      { "id": 136, "type": "expense", "amount": 500, "date": "2025-05-30", "description": "Bithday gift", "category": "Rewards" },
      { "id": 134, "type": "expense", "amount": 69, "date": "2025-05-27", "description": "Extra internet", "category": "Essentials" },
      { "id": 135, "type": "expense", "amount": 200, "date": "2025-05-26", "description": "Fuel to bike", "category": "Essentials" },
      { "id": 133, "type": "expense", "amount": 145, "date": "2025-05-26", "description": "Bus ticket", "category": "Essentials" },
      { "id": 132, "type": "expense", "amount": 550, "date": "2025-05-25", "description": "Fruit sample", "category": "Essentials" },
      { "id": 130, "type": "expense", "amount": 5000, "date": "2025-05-24", "description": "SBI Index found initial investment", "category": "Grow" },
      { "id": 128, "type": "expense", "amount": 70, "date": "2025-05-24", "description": "Grocesary", "category": "Essentials" },
      { "id": 127, "type": "expense", "amount": 114, "date": "2025-05-23", "description": "Groceries", "category": null },
      { "id": 126, "type": "expense", "amount": 195, "date": "2025-05-23", "description": "Airtel r charge", "category": null },
      { "id": 125, "type": "expense", "amount": 45, "date": "2025-05-21", "description": "Plastic cover for window", "category": null },
      { "id": 124, "type": "expense", "amount": 90, "date": "2025-05-21", "description": "Thindi", "category": null },
      { "id": 122, "type": "expense", "amount": 4463.7, "date": "2025-05-20", "description": "Fridge installation", "category": null },
      { "id": 121, "type": "expense", "amount": 2018, "date": "2025-05-20", "description": "Child Suraksha Yojana", "category": null },
      { "id": 120, "type": "expense", "amount": 19, "date": "2025-05-20", "description": "Data addon", "category": null },
      { "id": 119, "type": "expense", "amount": 785, "date": "2025-05-19", "description": "Kolluru trip", "category": null },
      { "id": 118, "type": "expense", "amount": 1320, "date": "2025-05-19", "description": "Mutty vaccination", "category": null },
      { "id": 117, "type": "expense", "amount": 250, "date": "2025-05-18", "description": "Yuva banvaru", "category": null },
      { "id": 116, "type": "expense", "amount": 50, "date": "2025-05-17", "description": "Hoondi", "category": null },
      { "id": 115, "type": "expense", "amount": 100, "date": "2025-05-17", "description": "Flower at marana katte", "category": null },
      { "id": 114, "type": "expense", "amount": 50, "date": "2025-05-17", "description": "Laddu Prasada at marana katte", "category": null },
      { "id": 113, "type": "expense", "amount": 500, "date": "2025-05-17", "description": "Fuel", "category": null },
      { "id": 112, "type": "expense", "amount": 100, "date": "2025-05-17", "description": "Prashada at kolluru", "category": null },
      { "id": 111, "type": "expense", "amount": 130, "date": "2025-05-17", "description": "Mongo + Bida", "category": null },
      { "id": 110, "type": "expense", "amount": 60, "date": "2025-05-16", "description": "Chaa", "category": null },
      { "id": 109, "type": "expense", "amount": 145, "date": "2025-05-16", "description": "Bus ticket", "category": null },
      { "id": 108, "type": "expense", "amount": 60, "date": "2025-05-16", "description": "Chaa at jothi", "category": null },
      { "id": 107, "type": "expense", "amount": 143, "date": "2025-05-16", "description": "Bus ticket", "category": null },
      { "id": 106, "type": "expense", "amount": 400, "date": "2025-05-13", "description": "Land document bribe to Shashi", "category": null },
      { "id": 105, "type": "expense", "amount": 110, "date": "2025-05-13", "description": "Bannana and chakkuli", "category": null },
      { "id": 104, "type": "expense", "amount": 124, "date": "2025-05-13", "description": "Bus ticket", "category": null },
      { "id": 103, "type": "expense", "amount": 500, "date": "2025-05-12", "description": "Land dispute document from the Taluku office by Shashidar LLB", "category": null },
      { "id": 102, "type": "expense", "amount": 150, "date": "2025-05-12", "description": "Fruit", "category": null },
      { "id": 101, "type": "expense", "amount": 100, "date": "2025-05-12", "description": "Snacks", "category": null },
      { "id": 99, "type": "expense", "amount": 110, "date": "2025-05-11", "description": "Groceries", "category": null },
      { "id": 98, "type": "expense", "amount": 69, "date": "2025-05-11", "description": "Additional dada pack", "category": null },
      { "id": 97, "type": "expense", "amount": 49, "date": "2025-05-10", "description": "egg and podi", "category": null },
      { "id": 96, "type": "expense", "amount": 110, "date": "2025-05-09", "description": "Thindi to dudda", "category": null },
      { "id": 95, "type": "expense", "amount": 112, "date": "2025-05-09", "description": "Bus ticket", "category": null },
      { "id": 94, "type": "expense", "amount": 50, "date": "2025-05-08", "description": "Thindi", "category": null },
      { "id": 93, "type": "expense", "amount": 100, "date": "2025-05-07", "description": "Hotel cost with Harshith", "category": null },
      { "id": 92, "type": "expense", "amount": 142, "date": "2025-05-07", "description": "Bus ticket", "category": null },
      { "id": 91, "type": "expense", "amount": 25, "date": "2025-05-06", "description": "Vada pav", "category": null },
      { "id": 90, "type": "expense", "amount": 152, "date": "2025-05-06", "description": "Bus ticket", "category": null },
      { "id": 89, "type": "expense", "amount": 110, "date": "2025-05-06", "description": "Thindi", "category": null },
      { "id": 88, "type": "income", "amount": 150, "date": "2025-05-06", "description": "Main switch return shop", "category": null },
      { "id": 86, "type": "expense", "amount": 804.1, "date": "2025-05-04", "description": "Credit card bill", "category": null },
      { "id": 85, "type": "expense", "amount": 860, "date": "2025-05-04", "description": "Mobile Recharge", "category": null },
      { "id": 84, "type": "expense", "amount": 120, "date": "2025-05-03", "description": "Adithi cafe", "category": null },
      { "id": 83, "type": "expense", "amount": 2000, "date": "2025-05-03", "description": "Isarva office fund", "category": null },
      { "id": 82, "type": "expense", "amount": 100, "date": "2025-05-03", "description": "Fish", "category": null },
      { "id": 81, "type": "expense", "amount": 19, "date": "2025-05-02", "description": "Data add on", "category": null },
      { "id": 80, "type": "loan", "amount": 500, "date": "2025-05-02", "description": "Credit card for petrol", "category": null },
      { "id": 78, "type": "expense", "amount": 20000, "date": "2025-05-02", "description": "Emergency fund to post office", "category": null },
      { "id": 76, "type": "expense", "amount": 3000, "date": "2025-05-02", "description": "Mutual fund payment", "category": null },
      { "id": 75, "type": "expense", "amount": 110, "date": "2025-05-01", "description": "Tindi from shirlal", "category": null },
      { "id": 72, "type": "expense", "amount": 725, "date": "2025-05-01", "description": "Shop: 160 Mango and Banana: 200 Ointments: 60 Tripper: 150 Nandhini thuppa:155", "category": null },
      { "id": 71, "type": "expense", "amount": 2000, "date": "2025-05-01", "description": "Laptop laptop", "category": null },
      { "id": 70, "type": "income", "amount": 53492, "date": "2025-05-01", "description": "Salary", "category": null },
      { "id": 64, "type": "expense", "amount": 3644, "date": "2025-05-01", "description": "Laptop loan installment", "category": null }
    ],
    "04": [
      { "id": 74, "type": "expense", "amount": 134, "date": "2025-04-30", "description": "Bus ticket price: 62+10+62", "category": null },
      { "id": 67, "type": "expense", "amount": 52, "date": "2025-04-27", "description": "Sprite and podi", "category": null },
      { "id": 66, "type": "expense", "amount": 100, "date": "2025-04-27", "description": "Fish", "category": null },
      { "id": 65, "type": "expense", "amount": 1195, "date": "2025-04-27", "description": "Puma shoe purchase", "category": null },
      { "id": 63, "type": "expense", "amount": 199, "date": "2025-04-26", "description": "Netflix connection", "category": null },
      { "id": 46, "type": "income", "amount": 120, "date": "2025-04-25", "description": "Fish money from sukesh", "category": null },
      { "id": 47, "type": "expense", "amount": 60, "date": "2025-04-24", "description": "Banana", "category": null },
      { "id": 45, "type": "expense", "amount": 144, "date": "2025-04-24", "description": "62+10+72", "category": null },
      { "id": 44, "type": "expense", "amount": 134, "date": "2025-04-23", "description": "bus ticket 62+62+10", "category": null },
      { "id": 42, "type": "expense", "amount": 200, "date": "2025-04-21", "description": "Fuel", "category": null },
      { "id": 39, "type": "expense", "amount": 5000, "date": "2025-04-21", "description": "Paying to SKDRD loan payment", "category": null },
      { "id": 38, "type": "expense", "amount": 72, "date": "2025-04-21", "description": "Bus ticket", "category": null },
      { "id": 37, "type": "expense", "amount": 105, "date": "2025-04-21", "description": "Thindi", "category": null },
      { "id": 36, "type": "expense", "amount": 90, "date": "2025-04-21", "description": "Hair Cut", "category": null },
      { "id": 29, "type": "expense", "amount": 60, "date": "2025-04-21", "description": "Coconut water", "category": null },
      { "id": 28, "type": "expense", "amount": 62, "date": "2025-04-21", "description": "Bus ticket", "category": null },
      { "id": 27, "type": "expense", "amount": 200, "date": "2025-04-20", "description": "Yuva Bandaver Karmbaru", "category": null },
      { "id": 23, "type": "expense", "amount": 653, "date": "2025-04-20", "description": "Credit card bill paid", "category": null },
      { "id": 21, "type": "expense", "amount": 2018, "date": "2025-04-20", "description": "Child Capital Goal Suraksha", "category": null },
      { "id": 25, "type": "loan", "amount": 10000, "date": "2025-04-19", "description": "Loan form Loki for SDRDP loan repayment", "category": null },
      { "id": 20, "type": "expense", "amount": 100, "date": "2025-04-19", "description": "Breakfast at BC road", "category": null },
      { "id": 19, "type": "expense", "amount": 110, "date": "2025-04-19", "description": "Groceries from Mamu", "category": null },
      { "id": 17, "type": "expense", "amount": 10, "date": "2025-04-19", "description": "Ice to fish", "category": null },
      { "id": 16, "type": "income", "amount": 300, "date": "2025-04-19", "description": "Lavanaya Akka fish amount paid", "category": null },
      { "id": 15, "type": "expense", "amount": 820, "date": "2025-04-19", "description": "Fish from Dakke", "category": null },
      { "id": 14, "type": "expense", "amount": 60, "date": "2025-04-18", "description": "Thindi at balanja while traveling nalkuru", "category": null },
      { "id": 13, "type": "loan", "amount": 29, "date": "2025-04-18", "description": "Data top-up from pratham", "category": null },
      { "id": 12, "type": "loan", "amount": 300, "date": "2025-04-18", "description": "ICICI credit card for fuel", "category": null },
      { "id": 9, "type": "loan", "amount": 653, "date": "2025-04-18", "description": "HDFC credit card", "category": null },
      { "id": 8, "type": "income", "amount": 290, "date": "2025-04-18", "description": "Balance in wallet", "category": null },
      { "id": 7, "type": "income", "amount": 10715, "date": "2025-04-18", "description": "ICICI Bank balance", "category": null },
      { "id": 5, "type": "income", "amount": 2361, "date": "2025-04-18", "description": "HDFC Bank balance", "category": null },
      { "id": 4, "type": "income", "amount": 7488, "date": "2025-04-18", "description": "Canara Bank balance", "category": null }
    ]
  }
};

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
  if (!t) return "Expense";
  const m = String(t).toLowerCase();
  if (m === "income") return "Income";
  if (m === "expense") return "Expense";
  if (m === "loan") return "Loan";
  return t;
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
const normalizeExistingDataForYear = (year) => {
  const byNum = EXISTING_DATA?.[year] || {};
  const result = {};
  Object.keys(byNum).forEach((num) => {
    const monthName = numToMonth(num);
    const txns = (byNum[num] || []).map((t) => ({
      id: String(t.id),
      date: t.date,
      type: capType(t.type),
      description: t.description,
      category: t.category ?? "Uncategorized",
      amount: t.amount,
    }));
    result[monthName] = {
      SUMMARY: computeSummary(monthName, year, txns),
      TRANSACTIONS: txns,
    };
  });
  return result;
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

export const TransationContext = createContext({
  transactions: {},
  addTransaction: (month, transactionData) => {},
  editTransaction: (month, id, transactionData) => {},
  deleteTransaction: (month, id) => {},
  getMonthlyReport: (month, year) => {},
});

function transactionReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { month, transactionData } = action.payload;
      const year = action.meta?.year || String(new Date().getFullYear());
      const id = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      const newTransaction = { ...transactionData, id: String(id) };
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
        String(txn.id) === String(id) ? { ...txn, ...transactionData } : txn
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
  // Build initial state from existing external data (normalized).
  const normalizedExisting = normalizeExistingDataForYear(selectedYear);
  const initialTransactions = { ...normalizedExisting };
  const [transactionsState, dispatch] = useReducer(transactionReducer, initialTransactions);

  function addTransaction(month, transactionData) {
    dispatch({ type: "ADD", payload: { month, transactionData }, meta: { year: selectedYear } });
  }

  function editTransaction(month, id, transactionData) {
    dispatch({ type: "EDIT", payload: { month, id, transactionData }, meta: { year: selectedYear } });
  }

  function deleteTransaction(month, id) {
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
      }}
    >
      {children}
    </TransationContext.Provider>
  );
}

export default TransationContextProvider;
