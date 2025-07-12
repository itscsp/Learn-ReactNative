import { StyleSheet, Text, View } from "react-native";
import color from "../../constant/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: color.primary700,
        padding: 24,
        margin: 24,
    },

    number: {
        color: color.primary700,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default NumberContainer;

