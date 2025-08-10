import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import { formatINR } from "../../helper/helperFunctions";

export default function TransactionSummary({summary}) {

  const summaryText = summary?.sign ? GlobalStyles.colors.income500 : GlobalStyles.colors.expense500;
  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <Text style={styles.month}>{summary?.month}</Text>
      </View>

      <View style={styles.amountContainer}>
        
        <Text style={[styles.amount, {"color": summaryText}]}>{summary?.sign ? '+' : '-'} {formatINR(summary?.net)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  monthContainer: {
    padding: 8,
  },
  month: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})