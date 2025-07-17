import { View, Text, StyleSheet, Platform, Animated, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";

type Props = {
  id: number;
  name: string;
  slug: string;
  checked: boolean;
  onPress: () => void;
};

const CheckBox = ({ id, name, slug, checked, onPress }: Props) => {
  const rnAnimatedConstantStyle = useAnimatedStyle(() => {
    const style = {
      backgroundColor: withTiming(
        checked ? "rgba(239, 142, 82, 0.1)" : "transparent",
        { duration: 150 }
      ),
      borderColor: withTiming(checked ? Colors.tint : Colors.black, {
        duration: 150,
      }),
      paddingLeft: withTiming(16, { duration: 150 }),
      paddingRight: withTiming(checked ? 10 : 16, { duration: 150 }),
    };
    return style;
  });
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Animated.View style={[styles.container, rnAnimatedConstantStyle]}>
        <Text style={styles.label}>{name}</Text>
        {checked &&
        <View style={styles.iconWrapper}>
           <AntDesign name="checkcircle" size={14} color={Colors.tint} />
        </View>
        }
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.black,
    paddingVertical: Platform.OS === "ios" ? 8 : 4,
    paddingHorizontal: Platform.OS === "ios" ? 8 : 4,

    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    color: Colors.black,
  },

  iconWrapper: {
    marginLeft: 8,
    height: 14,
    width: 14,
  },
});
