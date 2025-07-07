import { View, Button, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

function GoalInput(props) {
  const [enteredGoalTxt, setEnteredGoalTxt] = useState("");

  function goalInputHandler(input) {
    // This function expects an event object, not just the text.
    setEnteredGoalTxt(input);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalTxt);
    setEnteredGoalTxt("");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Your course goal!"
        value={enteredGoalTxt}
        onChangeText={goalInputHandler}
      />
      <Button title="Add Goal" onPress={addGoalHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
});

export default GoalInput;
