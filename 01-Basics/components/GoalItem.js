import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {

  
  return (
    <Pressable onPress={props.onDeleteItem.bind(this, props.goal.id)}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{props.goal.text}</Text>
      </View>
    </Pressable>

  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
    textAlign: "start",
  },
});

export default GoalItem;
