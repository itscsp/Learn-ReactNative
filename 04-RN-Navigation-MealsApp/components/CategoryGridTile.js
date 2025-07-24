import { View, Text, Pressable, StyleSheet, Platform } from "react-native";

export default function CategoryGridTile({ title, bgcolor, onPress }) {
  return (
    <View style={styles.gridItem}>
      <Pressable 
      onPress={onPress}
      android_ripple={color= '#ccc'} style={({pressed}) => [styles.button, pressed ? styles.buttonPressed : null]}>
        <View style={[styles.innerContainer, {backgroundColor: bgcolor}]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    gridItem: {
        flex:1,
        margin:16,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width:0, height:2},
        shadowRadius: 8,
        overflow: Platform.OS === 'ios' ? 'visible' : 'hidden' 
    },
    button: {
      flex:1,
    },

    buttonPressed: {
      opacity: 0.5,
    },

    innerContainer: {
      flex:1,
      padding:16,
       borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
    }
})
