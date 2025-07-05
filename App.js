
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const onPressLearnMore = () => {
    console.log('Button Pressed');  
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dummyText}>Welcome to React Native!</Text>

      </View>
      <Text style={styles.dummyText}>hello world</Text>
      <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dummyText: {
    margin:16,
    padding:16,
    borderWidth: 2,
    borderColor: 'blue',
  }
});
