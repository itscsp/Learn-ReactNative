import { TouchableOpacity, Text, StyleSheet } from "react-native";
import color from "../../constant/colors";

export default function PrimaryButtons({ onPress, children }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: color.primary500, 
    padding: 12,
    borderRadius: 8,
    margin: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
