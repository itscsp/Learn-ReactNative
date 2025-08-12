import { View, StyleSheet
 } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

export default function Card({children}) {
  return (
    <View style={styles.inputContainer}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 8,
        padding: 16,
        backgroundColor: GlobalStyles.colors.primary800,
      },
})