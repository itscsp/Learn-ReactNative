import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import GoalItem from './components/GoalItem';

export default function App() {
  const [enteredGoalTxt, setEnteredGoalTxt] = useState('');
  const [courceGoals, setCourceGoals] = useState([]);

  function goalInputHandler(input) { // This function expects an event object, not just the text.
    setEnteredGoalTxt(input)
  }
  
  function addGoalHandler() {
    setCourceGoals((prevGoals) => [...prevGoals, {text:enteredGoalTxt, id:Math.random().toString()}])
    // setEnteredGoalTxt('')
  }

  return (
    <View style={styles.appContainer}>
     <View style={styles.inputContianer}>
      <TextInput style={styles.textInput} placeholder="Your cource goal!" value={enteredGoalTxt} onChangeText={goalInputHandler} />
      <Button title="Add Goal" onPress={addGoalHandler} />
     </View>
     <View style={styles.goalContainer}>
      <FlatList 
      data = {courceGoals}
      alwaysBounceVertical={false} 
      renderItem={(itemData) => {
        return (
         <GoalItem goal={itemData.item} />
        )
      }}
      keyExtractor={(item, index) => {
        return item.id;
      }}
      />
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
    flex:4,
  },
});
