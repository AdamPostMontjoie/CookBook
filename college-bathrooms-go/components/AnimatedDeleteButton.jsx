import React from 'react';
import { Pressable } from 'react-native';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const AnimatedDeleteButton = ({ onPress }) => {
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
        <Text className="text-white text-base font-semibold ml-2">Remove from favorites</Text>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedDeleteButton;