import { WPPostResponse } from "@/types";
import React from "react";
import { Text, Image, StyleSheet, Dimensions, View } from "react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

type Props = {
  item: WPPostResponse;
  index: number;
  scrollX: SharedValue<number>;
};

const screenWidth = Dimensions.get("screen").width;
const ITEM_WIDTH = screenWidth - 40;

const SliderItem = ({ item, index, scrollX }: Props) => {
  // Prefer _embedded.wp:featuredmedia[0].source_url if available
  let imageUrl = "https://via.placeholder.com/300x160?text=No+Image";
  if (
    (item as any)._embedded &&
    (item as any)._embedded["wp:featuredmedia"] &&
    Array.isArray((item as any)._embedded["wp:featuredmedia"]) &&
    (item as any)._embedded["wp:featuredmedia"][0]?.source_url
  ) {
    imageUrl = (item as any)._embedded["wp:featuredmedia"][0].source_url;
  }
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [
              (index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth
            ],
            [
              -screenWidth * 0.1, 0, screenWidth * 0.1
            ],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [
              (index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth
            ],
            [
              0.8, 1, 0.8
            ],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemWrapper, rnStyle]} key={item.id}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
          style={styles.background}
        >
          <View style={styles.sourceInfo}>
            <Text style={styles.sourceName}>
              {item.date ? new Date(item.date).toLocaleDateString() : ""}
              {(item as any)._embedded?.author?.[0]?.name
                ? ` • ${(item as any)._embedded.author[0].name}`
                : ""}
            </Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>{item.title.rendered}</Text>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    // Remove position: relative, not needed
  },
  imageWrapper: {
    width: ITEM_WIDTH,
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 160,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'flex-end',
  },
  sourceInfo: {
    marginBottom: 8,
  },
  sourceName: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.white,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.white,
  },
});

export default SliderItem;
