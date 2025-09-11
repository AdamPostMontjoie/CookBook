// app/Cusine/_layout.js
import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import "../../global.css"

export default function CuisineLayout() {
  const { foodType } = useLocalSearchParams();
  const foodQuery = foodType.replaceAll(" ", "").toLowerCase();
  const map = new Map();
    map.set("japanesefood", "#BC002D");
    map.set("americanfood", "#002868");
    map.set("indianfood", "#FF9933");
    map.set("chinesefood", "#EE1C24");
    map.set("italianfood", "#008C45");
    map.set("frenchfood", "#002654");
    map.set("vietnamesefood", "#FFCC00");
    map.set("turkishfood", "#E30A17");
    const headerColor = map.get(foodQuery) || '#3b82f6';

  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: headerColor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen 
        name="[foodType]" 
        options={{ 
          title: foodType,
        }} 
      />
      <Stack.Screen name="recipe" options={{ headerShown: false }} />
    </Stack>
  );
}