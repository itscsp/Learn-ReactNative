import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { chooseTitle } from "../constants/functions";
import DeleteTransation from "../components/Transation/DeleteTransation";
import EditTransation from "../components/Transation/EditTransation";
import AddTransation from "../components/Transation/AddTransation";

export default function ManageTransaction({ route, navigation }) {
  const transactionId = route.params?.expenseId;
  const action = route.params?.action;

  console.log("transactionId: ", transactionId);
  console.log("action: ", action);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chooseTitle(action),
    });
  }, [navigation, action]); // Run effect when navigation or action changes

  switch (action) {
    case "ADD":
      return <AddTransation />
    case "EDIT":
      return  <EditTransation />;;
    case "DELETE":
      return <DeleteTransation />;
    default:
      return (
        <View>
          <Text>No action.</Text>
        </View>
      );
  }
}
