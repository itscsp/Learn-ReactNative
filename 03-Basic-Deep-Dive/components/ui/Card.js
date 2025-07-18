import { View, StyleSheet
 } from 'react-native'
import color from '../../constant/colors'

export default function Card({children}) {
  return (
    <View style={styles.inputContainer}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        // flex:1,
        // justifyContent: 'center',
        alignItems: "center",
        marginTop: 36,
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        backgroundColor: color.primary700,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
      },
})