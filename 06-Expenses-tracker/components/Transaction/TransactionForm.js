import { StyleSheet, View, Text, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Input from "./Input";
import RadioInput from "./RadioInput";
import TextButton from "../UI/TextButton";
import { GlobalStyles } from "../../constants/styles";
import { TransationContext } from "../../store/transaction-context";

export default function TransactionForm({ action, onCancel, month, transactionData }) {
  const transactionCtx = useContext(TransationContext);
  const Data = action === 'ADD' ? null : (transactionData || null);

  const [inputValue, setInputValue] = useState({
    type: action === 'ADD' ? 'expense' : (Data?.type || 'expense'),
    amount: action === 'ADD' ? "" : (Data?.amount != null ? String(Data.amount) : ""),
    date: action === 'ADD' ? "" : (Data?.date || ""),
    description: action === 'ADD' ? "" : (Data?.description || ""),
    category: action === 'ADD' ? "" : (Data?.category || ""),
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

  // Pick month from date string (YYYY-MM-DD)
  function getMonthNameFromDate(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return null;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;
    const mm = parseInt(parts[1], 10);
    if (Number.isNaN(mm) || mm < 1 || mm > 12) return null;
    const MONTHS = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];
    return MONTHS[mm - 1];
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

    // Determine target month from the entered date
    const targetMonth = getMonthNameFromDate(formattedInput.date);
    if (!targetMonth) {
      Alert.alert('Invalid date', 'Could not determine month from date.');
      return;
    }

    if (action === 'ADD') {
      // Use month derived from date
  // Context will call API create and update local state
      transactionCtx.addTransaction(targetMonth, formattedInput);
    } else {
      // If month changed, move transaction to new month (delete + add)
      const currentMonth = month;
      const idStr = String(Data?.id);
      if (targetMonth !== currentMonth) {
        transactionCtx.deleteTransaction(currentMonth, idStr);
        transactionCtx.addTransaction(targetMonth, formattedInput);
      } else {
        transactionCtx.editTransaction(currentMonth, idStr, formattedInput);
      }
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
