import { View, Button, TextInput, StyleSheet, Modal,Image } from "react-native";
import { useState } from "react";

function GoalInput(props) {
  const [enteredGoalTxt, setEnteredGoalTxt] = useState("");

  function goalInputHandler(input) {
    setEnteredGoalTxt(input);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalTxt);
    setEnteredGoalTxt("");
  }

  function closeModalHandler() {
    props.onCloseModal();
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image style={styles.image} source={require('../assets/images/goal.png')} />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          value={enteredGoalTxt}
          onChangeText={goalInputHandler}
        />
        <View style={styles.buttonRow}>
          <View style={styles.button}><Button title="Add Goal" onPress={addGoalHandler} color={"#b180f0"} /></View>
          <View style={styles.button}><Button title="Cancel" onPress={closeModalHandler} color="#f31282" /></View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: '#311b6b',
  },

  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonRow: {
    flexDirection: 'row',
    
  },
  button: {
    width:'40%',
    marginHorizontal: 6,
  },
});

export default GoalInput;
