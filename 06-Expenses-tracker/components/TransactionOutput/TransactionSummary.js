import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TransactionSummary({summary}) {
  return (
    <View>
      <Text>Date: {summary?.month}</Text>

      <Text>
        Net:
        <Ionicons name="add-outline"  />
        <Ionicons name="remove-outline"  />
        {summary?.net}
      </Text>
    </View>
  );
}
