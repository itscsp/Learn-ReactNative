import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";


export default function TextButton({ bgColor, onPress, children }) {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: bgColor}]} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.error500,
    flex:1,
    paddingVertical:8,
    paddingHorizontal:16,
    borderRadius: 4,
    marginVertical: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
