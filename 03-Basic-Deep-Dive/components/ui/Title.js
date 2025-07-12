import { Text, View, StyleSheet } from "react-native";
import color from "../../constant/colors";

function Title({ children }) {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.primary700,
        textAlign: 'center',
    },
});

export default Title;