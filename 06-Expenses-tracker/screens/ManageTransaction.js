import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { chooseTitle } from "../constants/functions";
import DeleteTransation from "../components/Transation/DeleteTransation";
import EditTransation from "../components/Transation/EditTransation";
import AddTransation from "../components/Transation/AddTransation";

export default function ManageTransaction({ route, navigation }) {

  const transactionId = route.params?.expenseId;
  const action = route.params?.action;
  const month = route.params?.month ? route.params?.month  : 'April';
  const transactionData = {"amount": 40003, "category": "Company updated", "date": "2025-01-05", "description": "Salary for January updated", "type": "Income"}

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chooseTitle(action),
    });
  }, [navigation, action]); // Run effect when navigation or action changes

  switch (action) {
    case "ADD":
      return <AddTransation month={month} transactionData={transactionData} />
    case "EDIT":
      return  <EditTransation id={transactionId} month={month} transactionData={transactionData} />;
    case "DELETE":
      return <DeleteTransation id={transactionId} month={month} />;
    default:
      return (
        <View>
          <Text>No action.</Text>
        </View>
      );
  }
}
