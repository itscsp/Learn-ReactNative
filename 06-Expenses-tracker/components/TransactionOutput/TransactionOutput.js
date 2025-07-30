import { View, Text, FlatList } from "react-native";
import TransactionSummary from "./TransactionSummary";
import { TRANSACTIONS } from "../../data/dummy-data";
import TransactionList from "./TransactionList";

export default function TransactionOutput() {
  console.log(TRANSACTIONS[2025].July.SUMMARY)
  return (
    <View>
      <TransactionSummary summary={TRANSACTIONS[2025].July.SUMMARY} /> 
      <TransactionList data={TRANSACTIONS[2025].July.TRANSACTIONS} />
    </View>
  );
}
