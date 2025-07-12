

import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

function PrimaryButton({ children, onPress }) { 

  return (
      <View style={styles.buttonOuterContainer}>
     
        <Pressable onPress={onPress} android_ripple={{color: '#751f4aff'}} style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer} >
         <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
      </View>

  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius:28,
    margin:4,
    overflow:'hidden'
  },
  buttonInnerContainer: {
    backgroundColor: '#72063c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin:4,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  pressed: {
    opacity:0.75
  }
});

export default PrimaryButton;