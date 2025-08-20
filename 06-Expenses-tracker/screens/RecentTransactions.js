import { FlatList, View, Text, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { TransationContext } from "../store/transaction-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import TransactionSummary from "../components/TransactionOutput/TransactionSummary";
import TransactionList from "../components/TransactionOutput/TransactionList";
import TextButton from "../components/UI/TextButton";
import { GlobalStyles } from "../constants/styles";
import { months } from "../constants/functions";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
// Data comes from context, loaded via API in the provider

export default function RecentTransactions() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);

  
    const navigation = useNavigation();
  
  const transactionCtx = useContext(TransationContext);
  // Derive current month/year
  const now = new Date();
  const year = now.getFullYear();
  const monthNum = now.getMonth() + 1; // 1-12
  const monthName = months[now.getMonth()]; // ensure consistent key with context

  useFocusEffect(
    React.useCallback(() => {
      let active = true;
      (async () => {
        setIsFetching(true);
        try {
          setError(false);
          await transactionCtx?.loadMonth?.(year, monthNum);
        } catch (e) {
          if (active) setError(true);
        }finally {
          if (active) setIsFetching(false);
        }
      })();
      return () => {
        active = false;
      };
    }, [transactionCtx?.loadMonth, year, monthNum])
  );

  // no direct fetch here; provider populates context

  const currentMonthData = transactionCtx?.transactions?.[monthName];
  const listData = currentMonthData
    ? [
        {
          key: monthName,
          summary: currentMonthData.SUMMARY,
          transactions: currentMonthData.TRANSACTIONS,
        },
      ]
    : [];

  const renderMonthItem = ({ item }) => (
    <View style={{ marginBottom: 16 }}>
      <TransactionSummary summary={item.summary} />
      <TransactionList data={item.transactions} />
    </View>
  );


  if (error) {
    return (
      <View style={styles.wrapper}>
        <ErrorOverlay />
      </View>
    );
  }

  if (isFetching) {
    return (
      <View style={styles.wrapper}>
        <LoadingOverlay />
      </View>
    );
  }



  return (
    <View style={styles.wrapper}>
      {!error && listData.length ? (
        <FlatList
          data={listData}
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
  flex: 1,
  marginHorizontal: 16,
  },

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
