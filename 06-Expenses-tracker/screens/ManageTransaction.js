import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useLayoutEffect, useRef } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { chooseTitle, goBack } from "../constants/functions";
import DeleteTransation from "../components/Transaction/DeleteTransation";
import EditTransation from "../components/Transaction/EditTransation";
import AddTransation from "../components/Transaction/AddTransation";
import { getCurrentMonthName } from "../helper/helperFunctions";
import { ScrollView } from "react-native";

export default function ManageTransaction({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef(null);
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

  function handleFocusLast() {
    // Scroll a bit further to ensure visibility
    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    });
  }

  function pageHandler(action) {
    switch (action) {
      case "ADD":
  return <AddTransation onCancel={cancelHandler} month={month} onFocusLast={handleFocusLast} />
      case "EDIT":
  return  <EditTransation onCancel={cancelHandler} id={transactionId} month={month} onFocusLast={handleFocusLast} />;
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
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 88, android: 88 })}
   >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.wrapper}
          contentContainerStyle={[styles.content, { paddingBottom: (insets?.bottom || 0) + 120 }]}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          contentInsetAdjustmentBehavior="automatic"
          automaticallyAdjustKeyboardInsets
        >
          {pageHandler(action)}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  wrapper: {
        flex: 1,
        
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    flexGrow: 1,
  }
});