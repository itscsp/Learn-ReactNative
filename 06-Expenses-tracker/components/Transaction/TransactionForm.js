import { StyleSheet, View, Text, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Input from "./Input";
import RadioInput from "./RadioInput";
import TextButton from "../UI/TextButton";
import { GlobalStyles } from "../../constants/styles";
import { TransationContext } from "../../store/transaction-context";

export default function TransactionForm({ action, onCancel, month, transactionData }) {
  const transactionCtx = useContext(TransationContext);
  let Data = action == 'ADD' ? {} : transactionData[0]
  console.log('Transaction form:',   Data)

  const [inputValue, setInputValue] = useState({
    type: action === 'ADD' ? 'Expense' : Data.type,
    amount: action === 'ADD' ? "" : Data.amount.toString(),
    date: action === 'ADD' ? "" : Data.date,
    description: action === 'ADD' ? "" : Data.description,
    category: action === 'ADD' ? "" : Data.category,
  });
  
  const [inputIsValid, setInputIsValid] = useState({
    amount: true,
    date: true,
    description: true,
    category: true
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
    const isDateValid = /^\d{4}-\d{2}-\d{2}$/.test(inputValue.date);
    const isAmountValid = !isNaN(parseFloat(inputValue.amount)) && parseFloat(inputValue.amount) > 0;
    const isDescriptionValid = inputValue.description.trim().length > 0;
    const isCategoryValid = inputValue.category.trim().length > 0;
    
    setInputIsValid({
      amount: isAmountValid,
      date: isDateValid,
      description: isDescriptionValid,
      category: isCategoryValid
    });
    
    if (!isAmountValid || !isDateValid || !isDescriptionValid || !isCategoryValid) {
      Alert.alert('Invalid input', 'Please check your input values.');
      return;
    }
    
    // Convert amount to number before saving
    const formattedInput = {
      ...inputValue,
      amount: parseFloat(inputValue.amount)
    };
    
    if (action === 'ADD') {
      transactionCtx.addTransaction(month, formattedInput);
    } else {
      transactionCtx.editTransaction(month, Data.id, formattedInput);
    }
    onCancel();
  };

  return (
    <View>
      <RadioInput setType={inputChangeHandler.bind(this, "type")} type={inputValue.type} />
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangeHandler.bind(this, "amount"),
          value: inputValue.amount,
          placeholder: "Enter amount",
        }}
      />
      {!inputIsValid.amount && (
        <Text style={styles.errorText}>Please enter a valid positive amount</Text>
      )}
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangeHandler.bind(this, "date"),
          value: inputValue.date,
        }}
      />
      {!inputIsValid.date && (
        <Text style={styles.errorText}>Please enter date in YYYY-MM-DD format</Text>
      )}
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description,
          placeholder: "Enter description",
        }}
      />
      {!inputIsValid.description && (
        <Text style={styles.errorText}>Description cannot be empty</Text>
      )}
      <Input
        label="Category"
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, "category"),
          value: inputValue.category,
          placeholder: "Enter category (e.g., Food, Transport)",
        }}
      />
      {!inputIsValid.category && (
        <Text style={styles.errorText}>Category cannot be empty</Text>
      )}
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
            addTransationHandler();
          }}
        >
          {action === 'ADD' ? 'Add' : 'Update'}
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
    marginTop: 16,
  },
  errorText: {
    color: GlobalStyles.colors.delete,
    marginBottom: 8,
    fontSize: 12,
  },
});
