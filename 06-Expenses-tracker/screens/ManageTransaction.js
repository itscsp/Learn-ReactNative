import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { chooseTitle, goBack } from "../constants/functions";
import DeleteTransation from "../components/Transaction/DeleteTransation";
import EditTransation from "../components/Transaction/EditTransation";
import AddTransation from "../components/Transaction/AddTransation";
import { useNavigation } from "@react-navigation/native";
import { getCurrentMonthName } from "../helper/helperFunctions";

export default function ManageTransaction({ route, navigation }) {
  const transactionId = route.params?.expenseId;
  const action = route.params?.action;
  const month = route.params?.month ? route.params?.month : getCurrentMonthName(new Date()); 

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chooseTitle(action),
    });
  }, [navigation, action]); // Run effect when navigation or action changes

  function cancelHandler(){
    goBack(navigation)
  }

  function pageHandler(action) {
    switch (action) {
      case "ADD":
        return <AddTransation onCancel={cancelHandler} month={month}/>
      case "EDIT":
        return  <EditTransation onCancel={cancelHandler} id={transactionId} month={month}/>;
      case "DELETE":
        return <DeleteTransation onCancel={cancelHandler} id={transactionId} month={month} />;
      default:
        return (
          <View>
            <Text>No action.</Text>
          </View>
        );
    }
  }

  return (
    <View style={styles.wrapper}>
      {pageHandler(action)}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
        marginHorizontal: 16,
  },
});