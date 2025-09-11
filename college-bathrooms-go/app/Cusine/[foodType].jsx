import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Pressable, TextInput } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../global.css";
import AnimatedFavoritesButton from '../../components/AnimatedFavoritesButton';
import AnimatedDeleteButton from '../../components/AnimatedDeleteButton';
import { useAuth } from '../../services/context/authContext';
import { addFavorite, deleteFavorite } from '../../services/recipeFunctions';

export default function Cusine() {
  const { foodType } = useLocalSearchParams();
  const {currentUser, loading} = useAuth()
  const [filter,setFilter] = useState('');
  const [filteredFood,setFilteredFood] = useState(null)
  const [error, setError] = useState(null);
  const [isFavorites,setIsFavorites] = useState(false);
  const [loadingFood, setLoadingFood] = useState(true);
  const [reloadOnDelete,setReloadOnDelete] = useState(false)
  const [food, setFood] = useState(null);
  const foodQuery = foodType.replaceAll(" ", "").toLowerCase();
  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
  
  useEffect(()=>{
    setError(null)
    setLoadingFood(true)
    setIsFavorites(false)
    setReloadOnDelete(false)
    setFilteredFood(null)
    async function getRecipes(){
      try{
        console.log("sending req")
        let result
        if(foodQuery != "myfavorites"){
           result = await axios.get(`${backendUrl}/recipes/${foodQuery}`)
        } else {
          setIsFavorites(true)
          result = await axios.get(`${backendUrl}/favorites/${currentUser.uid}`)
        }
        setFood(result.data)
        setFilteredFood(result.data)
      } catch(err){
        console.error(err)
        setError(err.message);
      }  finally {
        setLoadingFood(false);
      }
      
    }
    getRecipes()
  },[foodQuery,reloadOnDelete])
useEffect(()=>{
  function filterText(){
    setFilteredFood(food.filter((x)=> x.name.includes(filter.toLowerCase())))
  } 
  filterText()
},[filter])



async function addToFavorites(recipe) {
    const result = await addFavorite(currentUser,recipe)
    setFavoriteMessage(result.message);
    setTimeout(() => {
        setFavoriteMessage(null);
    }, 3000);
  } 
async function deleteFromFavorites(recipe){
  await deleteFavorite(currentUser,recipe);
  setReloadOnDelete(true)
}


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
      
      {  loading || loadingFood ? (
          <ActivityIndicator />
        ) : error ? (
          <Text>{error}</Text>
        ) :     
      filteredFood && filteredFood.length > 0 ? (
        <ScrollView
         contentContainerStyle={styles.scrollContent}
         showsVerticalScrollIndicator={false} 
         >
          {filteredFood.map((dish, index)=>{
            return (
              <Link 
                  key={dish._id}
                 href={{
                    pathname: `/Cusine/recipe/${dish.name.replace(/\s+/g, '-').toLowerCase()}`,
                    params: {
                      recipeData: JSON.stringify(dish)
                    }
                  }}
                  asChild
              >
              <Pressable>
                <View  style={styles.card}>
                  <Image
                    style={styles.image}
                    source={{ uri: dish.image }}
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.cardTitle}>{dish.name}</Text>
                    <View className="mb-4" style={styles.detailsRow}>
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
                    { !isFavorites && (
                      <AnimatedFavoritesButton onPress={() => addToFavorites(dish)} />
                    )}
                    { isFavorites && (
                      <AnimatedDeleteButton onPress={() => deleteFromFavorites(dish)} />
                    )}
                  </View>
                </View>
              </Pressable>
              </Link>
            );
          })}
        </ScrollView>
      ) : (
          <Text style={{ marginTop: 20 }}>No recipes found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Removed justifyContent and alignItems from here
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  scrollContent: {
    width: '100%',
    paddingHorizontal: 15, 
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    width: '100%', 
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