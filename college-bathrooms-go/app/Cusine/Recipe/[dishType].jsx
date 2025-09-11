import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import AnimatedFavoritesButton from '../../../components/AnimatedFavoritesButton'
import { addFavorite } from '../../../services/recipeFunctions'
import React from 'react'
import '../../../global.css'

const DishDetails = () => {

  const params = useLocalSearchParams();
  const recipe = params.recipeData ? JSON.parse(params.recipeData) : null;
  async function addToFavorites(recipe) {
    await addFavorite(currentUser,recipe)
  } 

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No recipe data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: recipe.image }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.detail}>Prep Time: {recipe.prepTime}</Text>
          <Text style={styles.detail}>Cook Time: {recipe.cookTime}</Text>
          <Text style={styles.detail}>Servings: {recipe.servings}</Text>
        </View>
        <Text style={styles.heading}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItem}>• {ingredient}</Text>
        ))}
        <Text style={styles.heading}>Instructions</Text>
        {recipe.instructions.map((instruction, index) => (
          <Text key={index} style={styles.listItem}>{index + 1}. {instruction}</Text>
        ))}
      </View>
      <AnimatedFavoritesButton onPress={() => addToFavorites(dish)} />
    </ScrollView>
  );
};

export default DishDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    color: '#666',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: 'red',
  },
});