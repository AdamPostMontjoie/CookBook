
import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import "../../global.css"

export default function AccountLayout() {

  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: "#3b82f6",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen 
        name="Account" 
        options={{ 
          title: "Your Account",
        }} 
      />
      <Stack.Screen 
        name="Register" 
        options={{ 
          title: "Create An Account",
        }} 
      />
    </Stack>
  );
}