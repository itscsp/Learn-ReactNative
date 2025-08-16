import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function RadioInput({ setType, type }) {
  return (
    <View>
      <Text style={styles.label}>Select transaction type</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioOption,
            type === "expense" && styles.selectedOption,
          ]}
          onPress={() => setType("expense")}
        >
          <View
            style={[
              styles.radioButton,
              type === "expense" && styles.radioButtonSelected,
            ]}
          >
            {type === "expense" && <View style={styles.radioButtonInner} />}
          </View>
          <Text style={styles.radioText}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioOption,
            type === "income" && styles.selectedOption,
          ]}
          onPress={() => setType("income")}
        >
          <View
            style={[
              styles.radioButton,
              type === "income" && styles.radioButtonSelected,
            ]}
          >
            {type === "income" && <View style={styles.radioButtonInner} />}
          </View>
          <Text style={styles.radioText}>Income</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    color: "white",
    marginBottom: 10,
    fontSize: 12,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  radioOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioButtonSelected: {
    borderColor: "#3498db",
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#3498db",
  },
  radioText: {
    color: "white",
    fontSize: 16,
  },
});
