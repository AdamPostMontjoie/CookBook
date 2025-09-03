import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { Link,router } from 'expo-router';
import { doSignInWithEmailAndPassword } from '../../services/auth';

const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loginError,setLoginError] = useState("")

  async function attemptAccountLogin(){
    try{
      await doSignInWithEmailAndPassword(email,password)
      router.replace('/') 
    }
    catch(err){
      if (err.message === "Firebase: Error (auth/invalid-credential).") {
        setLoginError("Incorrect email or password");
      } else {
        setLoginError(err.message || "An unknown error occurred.");
      }
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.avoidingContainer} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
        
        <TouchableOpacity onPress={attemptAccountLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Link href="/account/Register" asChild>
          <TouchableOpacity>
            <Text style={styles.signUp}>
              Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  avoidingContainer: {
    flex: 1,
  },
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