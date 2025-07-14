import { View, ActivityIndicator, StyleSheet, ActivityIndicatorProps } from 'react-native'
import React from 'react'

type Props = {}

const Loading = (props: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<ActivityIndicator> & Readonly<ActivityIndicatorProps>) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading