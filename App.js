
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [enteredGoalTxt, setEnteredGoalTxt] = useState('');
  const [courceGoals, setCourceGoals] = useState([]);

  function goalInputHandler(input) { // This function expects an event object, not just the text.
    setEnteredGoalTxt(input)
  }
  
  function addGoalHandler() {
    setCourceGoals((prevGoals) => [...prevGoals, enteredGoalTxt])
    setEnteredGoalTxt('')
  }

  return (
    <View style={styles.appContainer}>
     <View style={styles.inputContianer}>hello
      <TextInput style={styles.textInput} placeholder="Your cource goal!" value={enteredGoalTxt} onChangeText={goalInputHandler} />
      <Button title="Add Goal" onPress={addGoalHandler} />
     </View>
     <View style={styles.goalContainer}>
      {courceGoals.map((goal) => {
        return <Text>{goal}</Text>
      })}

      {courceGoals.length < 0 &&
        <Text>List of goals...</Text>}
     </View>
    </View>
  );
}

const styles = StyleSheet.create({

  appContainer: {
    flex:1,
    paddingTop:50,
    paddingHorizontal:16,
  },

  inputContianer: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom:24,
    borderBottomWidth:1,
    borderBottomColor:'#cccccc'
  },

  textInput: {
    borderWidth:1,
    borderColor:'#cccccc',
    width:'70%',
    marginRight:8,
    padding:8,
  },

  goalContainer: {
    flex:4
  }
});
