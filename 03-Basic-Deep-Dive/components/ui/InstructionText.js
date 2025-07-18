import {StyleSheet, Text} from 'react-native'
import React from 'react'
import color from '../../constant/colors'

export default function InstructionText({children}) {
  return (
    <Text style={styles.instructionText}>
        {children}
    </Text>
  )
}

const styles = StyleSheet.create({
    instructionText: {
        color: color.white,
        fontSize: 16,
        textAlign:'center',
        fontFamily: 'open-sans',
      },
})