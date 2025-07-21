import {  ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";
const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('@/assets/images/getting-started.jpg')}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
      <View style={styles.wrapper}>
        <Animated.Text style={styles.title} entering={FadeInDown.delay(300)} >Stay Updated!</Animated.Text>
        <Animated.Text style={styles.description} entering={FadeInDown.delay(800)}>Get breaking news and personalized updates direcly to your feed.</Animated.Text>
        <Animated.View entering={FadeInDown.delay(1300).duration(500)} style={{ width: "100%" }}>
        <TouchableOpacity style={styles.btn} onPress={() => router.replace("/user/profile")}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
        </Animated.View>

      </View>

      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    justifyContent:"flex-end",
    paddingBottom: 50,
    paddingHorizontal: 30,
    gap: 10,
    backgroundColor: "rgba(0,0,0,0.5",
  },

  title: {
    color: Colors.white,
    fontSize:24,
    fontWeight: 600,
    textAlign: "center",
    letterSpacing: 1.5,
    lineHeight: 36,
  },

  description: {
    color: Colors.white,
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 1.2,
    lineHeight: 22,
    
  },

  btn:{
    backgroundColor: Colors.tint,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  }
  
});

            