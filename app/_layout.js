import { Stack, Redirect } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import {AuthProvider } from './context/authContext';

function InitialLayout() {

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
      <Stack.Screen name="index" options={{
        title: '',
      }}/>
      <Stack.Screen name="about"  />
      <Stack.Screen name="Cusine" options={{ headerShown: false }} />
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
