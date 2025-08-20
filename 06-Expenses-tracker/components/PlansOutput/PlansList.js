import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { formatINR, getCurrentMonthName } from "../../helper/helperFunctions";
import PlanAccordionItem from "../Accordion/PlanAccordionItem";

export default function PlansList({
  plans,
  onDelete = () => {},
  onAddPlan = () => {},
  onReport = () => {},
  onPlan = () => {},
}) {
  const headerMonth = `${getCurrentMonthName(
    new Date()
  )} ${new Date().getFullYear()}`;

  const renderPlanItem = ({ item }) => (
    <PlanAccordionItem />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headerMonth}</Text>
      <FlatList
        data={plans}
        renderItem={renderPlanItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },


  subtitle: {
    color: "black",
    fontSize: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    borderWidth: 2,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amount: {
    color: "white",
    fontSize: 18,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  paid: {
    color: "green",
  },
  pending: {
    color: "red",
  },
});
