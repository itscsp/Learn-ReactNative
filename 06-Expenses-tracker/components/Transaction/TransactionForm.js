import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Input from "./Input";
import RadioInput from "./RadioInput";
import TextButton from "../UI/TextButton";
import { GlobalStyles } from "../../constants/styles";
import { goBack } from "../../constants/functions";
import { useNavigation } from "@react-navigation/native";
import { TransationContext } from "../../store/transaction-context";

export default function TransactionForm({ action, month, transactionData }) {
  const transactionCtx = useContext(TransationContext);
  const navigation = useNavigation();
  let Data = transactionData[0]
  const [inputValue, setInputValue] = useState({
    type: action == 'ADD' ? type : Data.type,
    amount: action == 'ADD' ? "" : Data.amount,
    date: action == 'ADD' ? "" : Data.date,
    description: action == 'ADD' ? "" : Data.description,
    category: action == 'ADD' ? "Testing" : Data.category,
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValue((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  const addTransationHandler = () => {
     action == 'ADD' ? transactionCtx.addTransaction(month, inputValue) : transactionCtx.editTransaction(month, Data.id, {inputValue})
    goBack(navigation);
  };

  return (
    <View>
      <RadioInput setType={inputChangeHandler.bind(this, "amount")} type={inputValue.type} />
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangeHandler.bind(this, "amount"),
          value: inputValue.amount,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangeHandler.bind(this, "date"),
          value: inputValue.date,
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description,
        }}
      />
      <View style={styles.buttonGroup}>
        <TextButton
          bgColor={GlobalStyles.colors.gray500}
          onPress={() => goBack(navigation)}
        >
          Cancel
        </TextButton>
        <TextButton
          bgColor={GlobalStyles.colors.delete}
          onPress={() => {
            addTransationHandler();
          }}
        >
          Add
        </TextButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
