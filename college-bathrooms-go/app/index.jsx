import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { Link,router } from 'expo-router'
import React from 'react'
import "../global.css"
import Entypo from '@expo/vector-icons/Entypo';
import { useAuth } from '../services/context/authContext'

const Home = () => {
  const {userLoggedIn, loading} = useAuth();
  useEffect(()=>{
    if (!userLoggedIn && !loading) {
      router.replace('/account/Login')
    }
  },[userLoggedIn,loading])
   
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="bg-white">
      <View className="w-full px-4"> 
        <Text className="text-xl font-bold text-blue-500 mb-4 text-center">
          International CookBook
        </Text>
        <View>
          <Link href="/Cusine/My Favorites" asChild>
            <Pressable 
              className="bg-teal-500 py-4 rounded-lg w-full items-center mb-3"
            >
              <View className="flex-row items-center">
                <Text className="text-white text-lg font-semibold mr-2">
                  My Favorites
                </Text>
              </View>
            </Pressable>
          </Link>
         <Link href="/Cusine/Japanese Food" asChild>
          <Pressable 
            className="bg-japan-red py-4 rounded-lg w-full items-center mb-3"
          >
            <Text className="text-white text-lg font-semibold">
             Japanese Food
            </Text>
          </Pressable>
         </Link>
        <Link href="/Cusine/American Food" asChild>
          <Pressable 
            className="bg-america-blue py-4 rounded-lg w-full items-center mb-3"
          >
            <Text className="text-white text-lg font-semibold">
              American Food
            </Text>
          </Pressable>
        </Link>
        <Link href="/Cusine/Indian Food" asChild>
          <Pressable 
            className="bg-india-saffron py-4 rounded-lg w-full items-center mb-3"
          >
            <Text className="text-white text-lg font-semibold">
              Indian Food
            </Text>
          </Pressable>
        </Link>
        <Link href="/Cusine/Chinese Food" asChild>
          <Pressable 
            className="bg-china-red py-4 rounded-lg w-full items-center mb-3"
          >
            <Text className="text-white text-lg font-semibold">
              Chinese Food
            </Text>
          </Pressable>
        </Link>
        <Link href="/Cusine/Italian Food" asChild>
          <Pressable 
            className="bg-italy-green py-4 rounded-lg w-full items-center mb-3"
          >
            <Text className="text-white text-lg font-semibold">
              Italian Food
            </Text>
          </Pressable>
        </Link>
        <Link href="/Cusine/French Food" asChild>
          <Pressable 
            className="bg-purple-500 py-4 rounded-lg w-full items-center mb-3"
          >
            <Text className="text-white text-lg font-semibold">
              French Food
            </Text>
          </Pressable>
        </Link>
         <Link href="/Cusine/Vietnamese Food" asChild>
          <Pressable 
            className="bg-vietnam-gold py-4 rounded-lg w-full items-center mb-3"
          >
            <Text className="text-white text-lg font-semibold">
              Vietnamese Food
            </Text>
          </Pressable>
        </Link>
        <Link href="/Cusine/Turkish Food" asChild>
          <Pressable 
            className="bg-turkey-red py-4 rounded-lg w-full items-center mb-3"
          >
            <Text className="text-white text-lg font-semibold">
              Turkish Food
            </Text>
          </Pressable>
        </Link>
        <Link href="/about" className="text-blue-500 text-lg text-center mt-4">
          <Text>About page</Text>
        </Link>
        </View>
      </View>
    </ScrollView>
    
  )
}

export default Home