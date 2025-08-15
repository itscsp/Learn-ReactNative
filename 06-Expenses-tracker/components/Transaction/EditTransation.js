import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useMemo } from "react";
import { GlobalStyles } from "../../constants/styles";
import Card from "../UI/Card";
import { TransationContext } from "../../store/transaction-context";
import TransactionForm from "./TransactionForm";

export default function EditTransation({onCancel, id, month}) {
  const transactionCtx = useContext(TransationContext);
  const txns = transactionCtx?.transactions?.[month]?.TRANSACTIONS || [];
  const data = useMemo(() => txns.find((item) => String(item.id) === String(id)), [txns, id]);


  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Edit</Text>
        </View>
        <View style={styles.cardBody}>
          <TransactionForm action='EDIT' onCancel={onCancel} month={month} transactionData={data} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    marginBottom: 8,
  },
  cardTitle: {
    color: GlobalStyles.colors.delete,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardBody: {
    marginTop: 12,
  },
  cardMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
