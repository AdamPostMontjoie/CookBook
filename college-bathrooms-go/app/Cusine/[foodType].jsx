import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
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
      {food && food.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {food.map((dish, index)=>{
            return (
              <View key={dish.name || index} style={styles.card}>
                <Image
                  style={styles.image}
                  source={{ uri: dish.image }}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.cardTitle}>{dish.name}</Text>
                  <View style={styles.detailsRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Prep Time:</Text>
                      <Text style={styles.detailValue}>{dish.prepTime}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Cook Time:</Text>
                      <Text style={styles.detailValue}>{dish.cookTime}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Servings:</Text>
                      <Text style={styles.detailValue}>{dish.servings}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        !loading && !error && <Text style={{ marginTop: 20 }}>No recipes found.</Text>
      )}
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
    marginTop: 20,
  },
  scrollContent: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#888',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
});