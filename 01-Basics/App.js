import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Button
} from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courceGoals, setCourceGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function addGoalHandler(enteredGoalTxt) {
    setCourceGoals((prevGoals) => [
      ...prevGoals,
      { text: enteredGoalTxt, id: Math.random().toString() },
    ]);
    setModalIsVisible(false)
  }

  function deleteGoalHandler(id) {
    setCourceGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
    <StatusBar style="light" />
    <View style={styles.appContainer}>
      <Button title="Add New Goal" onPress={() => {setModalIsVisible(true)}} color="#5e0acc" />
      <GoalInput onAddGoal={addGoalHandler} onCloseModal={() => {setModalIsVisible(false)}} visible={modalIsVisible} />
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
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 2,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },

  goalContainer: {
    flex: 4,
  },
});
