import {
  View,
  Text,
  LayoutAnimation,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
} from "react-native";
import React, { useCallback, useState } from "react";
import { formatINR, getDay } from "../../helper/helperFunctions";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../UI/IconButton";
import TextButton from "../UI/TextButton";
import { useNavigation } from "@react-navigation/native";

export default function AccordionItem({ data, month }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const amountColor =
    data?.type === "Income"
      ? GlobalStyles.colors.income500
      : GlobalStyles.colors.expense500;

  const toggleOpen = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <View style={styles.accordionSection}>
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={styles.accordionHeader}>
          <View style={styles.innerSection}>
            <Text style={styles.date}>{getDay(data.date)}</Text>
            <Text style={[styles.amount, { color: amountColor }]}>
              {data?.type === "Income" ? "+" : "-"} {formatINR(data?.amount)}
            </Text>
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
          <Text style={styles.text}>{data.date}</Text>

          <Text style={styles.text}>Description: {data.description}</Text>
          <Text style={styles.text}>Category: {data.category}</Text>
          <View style={styles.buttonGroup}>
            <TextButton
              bgColor={GlobalStyles.colors.edit}
              onPress={() => {
                navigation.navigate("ManageTransaction", {
                  expenseId:data.id,
                  month: month,
                  action: 'EDIT'
                });
              }}
            >
              Edit
            </TextButton>
            <TextButton
              bgColor={GlobalStyles.colors.delete}
              onPress={() => {
                {
                  navigation.navigate("ManageTransaction", {
                    expenseId: data.id,
                    month: month,
                    action: 'DELETE'
                  });
                }
              }}
            >
              Delete
            </TextButton>
          </View>
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
    marginHorizontal: 16,
    overflow: "hidden",
  },

  accordionHeader: {
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },

  innerSection: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },

  amount: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },

  date: {
    fontSize: 22,
    color: GlobalStyles.colors.accent500,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 45,
    height: 45,
  },

  text: {
    color: "white",
  },

  content: {
    flexDirection: "col",
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary500,
  },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
