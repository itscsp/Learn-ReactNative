import { View, FlatList, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { TransationContext } from "../store/transaction-context";
import { months } from "../constants/functions";
import TransactionSummary from "../components/TransactionOutput/TransactionSummary";
import AccordionItem from "../components/Accordion/AccordionItem";
import TransactionList from "../components/TransactionOutput/TransactionList";

export default function AllTransactions() {
  const transactionCtx = useContext(TransationContext);
  // Build from only months present in store (and with transactions), ordered by calendar
  const availableMonths = Object.keys(transactionCtx?.transactions || {});
  const monthsData = availableMonths
    .filter((m) => (transactionCtx.transactions[m]?.TRANSACTIONS?.length || 0) > 0)
    .sort((a, b) => months.indexOf(a) - months.indexOf(b))
    .map((month) => ({
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
    <View style={styles.wrapper}>

      <FlatList
        data={monthsData}
        renderItem={renderMonthItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
        marginHorizontal: 16,
  },
});