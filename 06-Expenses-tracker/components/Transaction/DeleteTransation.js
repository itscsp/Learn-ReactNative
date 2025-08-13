import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Card from "../UI/Card";
import { GlobalStyles } from "../../constants/styles";
import TextButton from "../UI/TextButton";
import { useNavigation } from "@react-navigation/native";
import { goBack } from "../../constants/functions";
import { TransationContext } from "../../store/transaction-context";

export default function DeleteTransaction({onCancel, id, month}) {
    
    const transactionCtx = useContext(TransationContext)
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Are You Sure?</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardMessage}>
            This action will permanently delete the transaction. Do you want to
            continue?
          </Text>
          <View style={styles.buttonGroup}>
            <TextButton
              bgColor={GlobalStyles.colors.gray500}
              onPress={onCancel}
            >
              Cancel
            </TextButton>
            <TextButton
              bgColor={GlobalStyles.colors.delete}
              onPress={() => {
                transactionCtx.deleteTransaction(month, id)
                onCancel()
              }}
            >
              Yes, Please
            </TextButton>
          </View>
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
    color: 'white',
  },
    buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
