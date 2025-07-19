import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Page = (props: Props) => {
  return (
    <>
      <Stack.Screen options={{
        headerShown:true
      }}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.itemBtn} onPress={() => router.push('/user/profile')}>
          <Text style={styles.itemBtnText}>Profile</Text>
          <MaterialIcons  name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}  onPress={() => router.push('/user/notification')}>
          <Text style={styles.itemBtnText}>Notification</Text>
          <Ionicons  name="notifications" size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn} onPress={() => router.push('/pages/about')}>
          <Text style={styles.itemBtnText}>About</Text>
          <MaterialIcons  name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Send Feedback</Text>
          <MaterialIcons  name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Privacy Policay</Text>
          <MaterialIcons  name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Terms of Use</Text>
          <MaterialIcons  name="arrow-forward-ios" size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Logout</Text>
          <MaterialIcons  name="logout" size={16} color='red' />
        </TouchableOpacity>
      </View>
    </>

  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical:20
  },

  itemBtnText: {
    fontSize: 14,
  }
})