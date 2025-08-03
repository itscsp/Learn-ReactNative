import { View, FlatList } from "react-native";
import React, { useContext } from "react";
import { TransationContext } from "../store/transaction-context";
import { months } from "../constants/functions";
import TransactionSummary from "../components/TransactionOutput/TransactionSummary";
import AccordionItem from "../components/Accordion/AccordionItem";

export default function AllTransactions() {
  const transactionCtx = useContext(TransationContext);

  console.log(transactionCtx)
  // Prepare data for FlatList: each item is a month
  const monthsData = months.map((month) => ({
    key: month,
    summary: transactionCtx.transactions[month]?.SUMMARY,
    transactions: transactionCtx.transactions[month]?.TRANSACTIONS || [],
  }));

  const renderMonthItem = ({ item }) => (
    <View style={{ marginBottom: 16 }}>
      <TransactionSummary summary={item.summary} />
      {item.transactions.map((tx) => (
        <AccordionItem key={tx.id} data={tx} month={item.key} />
      ))}
    </View>
  );

  return (
    <FlatList
      data={monthsData}
      renderItem={renderMonthItem}
      keyExtractor={(item) => item.key}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}
