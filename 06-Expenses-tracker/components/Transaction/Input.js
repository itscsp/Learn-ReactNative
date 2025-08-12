import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, textInputConfig }) {
    let inputStyle = [styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyle.push(styles.inputMultiline)
    }
  return (
    <View style={styles.formCard}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={inputStyle} 
        placeholderTextColor="white" 
        {...textInputConfig} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    width: "280",
    marginBottom: 10,
  },

  label: {
    color: "white",
    fontSize: 12,
    marginBottom: 5,
  },

  input: {
    borderWidth: 0.7,
    borderColor: "white",
    backgroundColor: GlobalStyles.colors.primary400,
    color: "white",
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    
  },

  inputMultiline: {
    minHeight:100,
    textAlignVertical:'top',
  }
});
