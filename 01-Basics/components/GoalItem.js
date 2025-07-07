import {StyleSheet} from 'react-native';

import { View, Text } from 'react-native';

function GoalItem(props) {
  return (
  <View style={styles.goalItem}>
              <Text style={styles.goalText}>{props.goal.text}</Text>
            </View>
  );
}


const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        padding: 12,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
    },
    goalText: {
        color: 'white',
        textAlign: 'start',
    },
})

export default GoalItem