import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { errorMessage } from '../context/AppContext';

export default function RegisterScreen({ onBack }) {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState(''); const [loading,setLoading]=useState(false); const [error,setError]=useState('');
  async function register() {
    if(loading)return;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())){setError('Enter a valid email address.');return;}
    if(password.length<6){setError('Password must have at least 6 characters.');return;}
    if(password!==confirm){setError('Passwords do not match.');return;}
    setLoading(true);setError('');
    try{await createUserWithEmailAndPassword(auth,email.trim(),password);}
    catch(e){setError(errorMessage(e));}
    finally{setLoading(false);}
  }
  return <View style={styles.container}>
    <Text style={styles.title}>Create an account</Text><Text style={styles.subtitle}>Register to book clinic services</Text>
    <Text style={styles.label}>Email address</Text><TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="you@example.com" />
    <Text style={styles.label}>Password</Text><TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="At least 6 characters" />
    <Text style={styles.label}>Confirm password</Text><TextInput style={styles.input} value={confirm} onChangeText={setConfirm} secureTextEntry placeholder="Repeat password" />
    {!!error&&<Text style={styles.error}>{error}</Text>}
    <TouchableOpacity style={styles.button} onPress={register} disabled={loading}>{loading?<ActivityIndicator color="white"/>:<Text style={styles.buttonText}>Register</Text>}</TouchableOpacity>
    <TouchableOpacity onPress={onBack} disabled={loading}><Text style={styles.link}>Back to sign in</Text></TouchableOpacity>
  </View>;
}
const styles=StyleSheet.create({container:{flex:1,justifyContent:'center',padding:24,backgroundColor:'#F6F8FA'},title:{fontSize:26,fontWeight:'700',color:'#164E72'},subtitle:{color:'#52616B',marginTop:8,marginBottom:28},label:{fontWeight:'600',color:'#243746',marginBottom:7},input:{backgroundColor:'white',borderWidth:1,borderColor:'#CDD6DD',borderRadius:8,padding:13,marginBottom:17},button:{backgroundColor:'#176B91',padding:15,borderRadius:8,alignItems:'center'},buttonText:{color:'white',fontWeight:'700'},link:{color:'#176B91',textAlign:'center',marginTop:22},error:{color:'#B42318',marginBottom:12}});
