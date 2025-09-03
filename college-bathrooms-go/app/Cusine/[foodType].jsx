import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../global.css";
import { useAuth } from '../../services/context/authContext';

export default function Cusine() {
  const { foodType } = useLocalSearchParams();
  const {userLoggedIn} = useAuth()
  const [filter,setFilter] = useState('');
  const [food, setFood] = useState(null);
  const foodQuery = foodType.replaceAll(" ", "").toLowerCase();
  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
  useEffect(()=>{
    async function getRecipes(){
      try{
        const result = await axios.get(`${backendUrl}/recipes/${foodQuery}`)
        setFood(result.data)
        console.log(result.data)
      } catch(err){
        console.error(err)
      }
      
    }
  },[foodQuery])


  return (
    <View style={styles.container}>
      <View className="flex-row items-center border border-gray-400 rounded-lg w-4/5 mt-20">
        
        {/* The search icon is now a permanent, separate component */}
        <Text className="text-xl text-gray-500 pl-3 pr-2">&#128269;</Text>
        
        {/* The TextInput with a simple placeholder prop */}
        <TextInput
          className="flex-1 p-3 text-black"
          placeholder="Search for a recipe..."
          onChangeText={setFilter}
          value={filter}
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