import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import { formatINR } from "../../helper/helperFunctions";
import { useNavigation } from "@react-navigation/native";
import { TransationContext } from "../../store/transaction-context";

export default function TransactionSummary({ summary }) {
  const [isOpen, setIsOpen] = useState(false);
  const transactionCtx = useContext(TransationContext);

  const toggleOpen = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
    if(!isOpen){
      transactionCtx.getMonthlyReport()
    }
  }, [isOpen]);

  return (
    <View style={styles.accordionSection}>
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={styles.accordionHeader}>
          <View style={styles.innerSection}>
            <Text style={styles.text}>{summary?.month}</Text>
          </View>
          {isOpen ? (
            <Ionicons name="chevron-up-outline" size={24} color={"white"} />
          ) : (
            <Ionicons name="chevron-down-outline" color={"white"} size={24} />
          )}
        </View>
      </TouchableWithoutFeedback>
      {isOpen && (
        <View style={styles.content}>
          <Text style={styles.text}>Budget report will appear</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  accordionSection: {
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 8,
    marginVertical: 4,
    marginTop: 10,
    marginHorizontal: 16,
    overflow: "hidden",
  },

  accordionHeader: {
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 4,
    marginVertical: 8,
  },

  innerSection: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },

  content: {
    flexDirection: "col",
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary500,
  },

  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
