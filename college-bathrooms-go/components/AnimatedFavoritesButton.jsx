import React from 'react';
import { Pressable } from 'react-native';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons'; // Or any icon set you prefer

const AnimatedFavoritesButton = ({ onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        className="flex-row items-center justify-center p-3 rounded-lg bg-red-500 shadow-md"
        style={animatedStyle}
      >
        <AntDesign name="heart" size={24} color="white" />
        <Text className="text-white text-base font-semibold ml-2">Add to Favorites</Text>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedFavoritesButton;