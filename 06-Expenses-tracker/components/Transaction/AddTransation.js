import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { GlobalStyles } from "../../constants/styles";
import Card from "../UI/Card";
import TextButton from "../UI/TextButton";
import { useNavigation } from "@react-navigation/native";
import { goBack } from "../../constants/functions";
import { TransationContext } from "../../store/transaction-context";
import TransactionForm from "./TransactionForm";

export default function AddTransation({onCancel, month }) {

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Add</Text>
        </View>
        <View style={styles.cardBody}>
          <TransactionForm action='ADD' onCancel={onCancel} month={month} />
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

});
