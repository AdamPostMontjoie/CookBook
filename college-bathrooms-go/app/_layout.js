import { Stack, Redirect,Link } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import {AuthProvider } from '../services/context/authContext';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../services/context/authContext';

function InitialLayout() {
  const {userLoggedIn} = useAuth()
  return (
    <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#3b82f6', // A shade of blue
        },
        headerTitle: () => null,
        headerTintColor: '#fff', // White text/icons
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        {userLoggedIn ? <Stack.Screen 
        name="index" 
        options={{
          headerTitle: '',
          headerLeft: () => (
            <Link href="/account">
              <Ionicons 
                name="person-circle-outline" 
                size={30} 
                color="white" 
                style={{ marginRight: 15 }} 
              />
            </Link>
          ),
      }}/> : 
      <Stack.Screen 
        name="index" 
        options={{
          headerTitle: ''
      }}/>
      }
      
      <Stack.Screen name="about"  />
      <Stack.Screen name="Cusine" options={{ headerShown: false }} />
      <Stack.Screen name="account" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
