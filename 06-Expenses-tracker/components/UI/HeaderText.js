import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constants/styles';

export default function HeaderText({ text, style }) {
  return (
    <Text style={[styles.headerText, style]}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    paddingHorizontal: 15,
    fontSize: 20,
    fontWeight: '500'
  }
});
