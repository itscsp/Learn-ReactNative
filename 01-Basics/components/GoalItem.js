import { StyleSheet, View, Text, Pressable,  } from "react-native";

function GoalItem(props) {
  return (
    <Pressable
      android_ripple={{ color: "#ddd" }}
      onPress={props.onDeleteItem.bind(this, props.goal.id)}
      style={({ pressed }) => [styles.goalItem, pressed && styles.pressedItem]}
    >
      <Text style={styles.goalText}>{props.goal.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    marginVertical: 6,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#5e0acc",
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  pressedItem: {
    opacity: 0.6,
    backgroundColor: '#7c3aed',
  },
  goalText: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
    letterSpacing: 0.2,
  },
});

export default GoalItem;
