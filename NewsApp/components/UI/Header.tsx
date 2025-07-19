import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={style.container}>
      <TouchableOpacity 
        style={style.userInfo} 
        onPress={() => router.push("/user/profile")}
      >
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={style.userImg}
        />
        <View>
          <Text style={style.welcomeText}>Welcome</Text>
          <Text style={style.userName}>Sri Krishna!</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/user/notification")}>
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop:10
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  welcomeText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  userName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.black,
  },
});
