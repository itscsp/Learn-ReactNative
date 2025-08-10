import { View, FlatList } from "react-native";
import React, { useContext } from "react";
import { TransationContext } from "../store/transaction-context";
import { months } from "../constants/functions";
import TransactionSummary from "../components/TransactionOutput/TransactionSummary";
import AccordionItem from "../components/Accordion/AccordionItem";
import TransactionList from "../components/TransactionOutput/TransactionList";

export default function AllTransactions() {
  const transactionCtx = useContext(TransationContext);
  // Prepare data for FlatList: each item is a month
  const monthsData = months.map((month) => ({
    key: month,
    summary: transactionCtx.transactions[month]?.SUMMARY,
    transactions: transactionCtx.transactions[month]?.TRANSACTIONS || [],
  }));

  const renderMonthItem = ({ item }) => (
    <View style={{ marginBottom: 16 }}>
      <TransactionSummary summary={item.summary} />
      <TransactionList data={item.transactions} />
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
