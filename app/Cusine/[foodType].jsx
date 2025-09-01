import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import "../../global.css";

export default function Cusine() {
  const { foodType } = useLocalSearchParams();
  
  const [text, onChangeText] = useState('');
  const [food, setFood] = useState(null);
  const foodQuery = foodType.replaceAll(" ", "").toLowerCase();
  
  useEffect(() => {
    const getFoodData = async () => {
      try {
        const arrForNow = ["Udon","Miso Soup"];
        const response = arrForNow;
        setFood(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    getFoodData();
  }, []);

  return (
    <View style={styles.container}>
      <Link href="../" asChild>
        <Pressable className="absolute top-10 left-5 p-2 rounded-full bg-gray-200">
          <Text className="text-xl font-bold">&larr;</Text>
        </Pressable>
      </Link>
      <View className="flex-row items-center border border-gray-400 rounded-lg w-4/5 mt-20">
        
        {/* The search icon is now a permanent, separate component */}
        <Text className="text-xl text-gray-500 pl-3 pr-2">&#128269;</Text>
        
        {/* The TextInput with a simple placeholder prop */}
        <TextInput
          className="flex-1 p-3 text-black"
          placeholder="Search for a recipe..."
          onChangeText={onChangeText}
          value={text}
        />
      </View>

      <Text style={styles.title}>You selected {foodType}!</Text>
      <Text style={styles.title}>You selected {foodQuery}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});