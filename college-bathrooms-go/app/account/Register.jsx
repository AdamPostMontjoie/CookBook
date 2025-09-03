import { StyleSheet, Text, View, TextInput, TouchableOpacity,KeyboardAvoidingView ,TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Link, Redirect,router } from 'expo-router';
import { doCreateUserWithEmailAndPassword } from '../../services/auth'
import React, {useState} from 'react'

const Register = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [checkPassword,setCheckPassword] = useState("");
  const [emailError,setEmailError] = useState("");
  const [passwordError,setPasswordError] = useState("");
  const [passwordEqualsError,setPasswordEqualsError] = useState("");
  const [signInError,setSignInError] = useState("")
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  
  async function attempAccountCreation(){
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);
    const doPasswordsMatch = checkPassword === password;
    
    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
    
    if (!doPasswordsMatch) {
      setPasswordEqualsError("Passwords do not match.");
    } else {
      setPasswordEqualsError("");
    }

    if (!isPasswordValid) {
      setPasswordError("Password must be 8 characters, contain an uppercase letter, and a number.");
    } else {
      setPasswordError("");
    }
    
    if(isEmailValid && isPasswordValid && doPasswordsMatch){
      try{
        const userCred = await doCreateUserWithEmailAndPassword(email,password)
        console.log("user created: " + userCred.user.uid)
         router.replace('/') 
      }
      catch(err){
        console.error("err" + err)
        if(err.message == "Firebase: Error (auth/email-already-in-use)."){
          setSignInError("Email already in use")
        }
      }
    }
  }

  return (
    <KeyboardAvoidingView 
      style={{flex: 1}} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Create a new account</Text>
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false} 
            autoCapitalize="none"
            autoComplete="off"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      {signInError ? <Text style={styles.errorText}>{signInError}</Text> : null}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCorrect={false} 
            autoCapitalize="none"
            autoComplete="off"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Re-enter password"
            secureTextEntry
            autoCorrect={false} 
            autoCapitalize="none"
            autoComplete="off"
            value={checkPassword}
            onChangeText={setCheckPassword}
          />
        </View>
        {passwordEqualsError ? <Text style={styles.errorText}>{passwordEqualsError}</Text> : null}
        <TouchableOpacity onPress={attempAccountCreation} style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };
  
  export default Register;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 10,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
    },
    errorText: {
        color: 'red',
        alignSelf: 'flex-start',
        width: '100%',
        marginBottom: 5,
        paddingLeft: 20,
    },
    button: {
      width: '100%',
      backgroundColor: '#3b82f6',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    forgotPassword: {
      color: '#3b82f6',
      marginTop: 10,
    },
    signUp: {
      marginTop: 20,
      color: '#666',
    },
    signUpLink: {
      color: '#3b82f6',
      fontWeight: 'bold',
    },
  });