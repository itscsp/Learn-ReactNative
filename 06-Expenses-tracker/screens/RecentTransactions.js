import { FlatList, View, Text, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { TransationContext } from "../store/transaction-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import TransactionSummary from "../components/TransactionOutput/TransactionSummary";
import TransactionList from "../components/TransactionOutput/TransactionList";
import TextButton from "../components/UI/TextButton";
import { GlobalStyles } from "../constants/styles";
import { getCurrentMonthName } from "../helper/helperFunctions";

export default function RecentTransactions() {
    const navigation = useNavigation();
  
  const transactionCtx = useContext(TransationContext);
  const [currentData, setCurrentData] = useState([]);



  useFocusEffect(
    React.useCallback(() => {
      const currentMonth = getCurrentMonthName(new Date());
      if (
        transactionCtx?.transactions &&
        transactionCtx.transactions[currentMonth]
      ) {
        setCurrentData([
          {
            key: currentMonth,
            summary: transactionCtx.transactions[currentMonth].SUMMARY,
            transactions:
              transactionCtx.transactions[currentMonth].TRANSACTIONS,
          },
        ]);
      }
    }, [transactionCtx])
  );

  const renderMonthItem = ({ item }) => (
    <View style={{ marginBottom: 16 }}>
      <TransactionSummary summary={item.summary} />
      <TransactionList data={item.transactions} />
    </View>
  );

  return (
    <>
      {currentData.length ? (
        <FlatList
          data={currentData}
          renderItem={renderMonthItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      ) : (
        <View style={styles.fallbackContainer}>
          <Text style={styles.NotFound}>No transaction found</Text>
          <View style={styles.buttonGroup}>
            <TextButton
              bgColor={GlobalStyles.colors.bgColor}
              onPress={() => {
                navigation.navigate("ManageTransaction", {
                  action: "ADD",
                });
              }}
            >
              Add
            </TextButton>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  NotFound: {
    marginTop: 30,
    textAlign: "center",
  },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: 150,
    marginTop: 10,
  },
});
