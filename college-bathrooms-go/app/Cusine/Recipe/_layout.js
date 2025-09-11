import {Stack, useLocalSearchParams } from 'expo-router';
import "../../../global.css"

export default function RecipeLayout() {
  const { dishType, foodType } = useLocalSearchParams();

  const foodQuery = foodType ? foodType.replaceAll(" ", "").toLowerCase() : '';
  const map = new Map();

  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen 
        name="[dishType]"
        options={{
          title: '',
        }}
      />
      
    </Stack>
  );
}