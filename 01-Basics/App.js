import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courceGoals, setCourceGoals] = useState([]);

  function addGoalHandler(enteredGoalTxt) {
    setCourceGoals((prevGoals) => [
      ...prevGoals,
      { text: enteredGoalTxt, id: Math.random().toString() },
    ]);
  }

  function deleteGoalHandler(id) {
    setCourceGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.goalContainer}>
        <FlatList
          data={courceGoals}
          alwaysBounceVertical={false}
          renderItem={(itemData) => {
            return <GoalItem goal={itemData.item} onDeleteItem={deleteGoalHandler}/>;
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
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalContainer: {
    flex: 4,
  },
});
