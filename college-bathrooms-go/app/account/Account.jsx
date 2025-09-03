import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../services/context/authContext'
import { doSignOut } from '../../services/auth'
import { Redirect } from 'expo-router'

const Account = () => {
    const {currentUser} = useAuth();
    async function signOutUser(){
        await doSignOut()
        return <Redirect href="/account/Login" />;
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={doSignOut}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})






