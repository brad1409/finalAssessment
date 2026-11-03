import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { errorMessage } from '../context/AppContext';

export default function LoginScreen({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function login() {
    if (loading) return;
    if (!email.trim() || !password) { setError('Enter your email and password.'); return; }
    setLoading(true); setError('');
    try { await signInWithEmailAndPassword(auth, email.trim(), password); }
    catch (e) { setError(errorMessage(e)); }
    finally { setLoading(false); }
  }
  return <View style={styles.container}>
    <Text style={styles.title}>Gauteng Community Clinic</Text>
    <Text style={styles.subtitle}>Sign in to manage your appointments</Text>
    <Text style={styles.label}>Email address</Text>
    <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" placeholder="you@example.com" />
    <Text style={styles.label}>Password</Text>
    <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Password" />
    {!!error && <Text style={styles.error}>{error}</Text>}
    <TouchableOpacity style={styles.button} disabled={loading} onPress={login}>{loading ? <ActivityIndicator color="white"/> : <Text style={styles.buttonText}>Sign in</Text>}</TouchableOpacity>
    <TouchableOpacity disabled={loading} onPress={onRegister}><Text style={styles.link}>Don't have an account? Register</Text></TouchableOpacity>
  </View>;
}
const styles = StyleSheet.create({ container: { flex:1, justifyContent:'center', padding:24, backgroundColor:'#F6F8FA' }, title:{fontSize:26,fontWeight:'700',color:'#164E72',marginBottom:8},subtitle:{fontSize:15,color:'#52616B',marginBottom:32},label:{fontWeight:'600',marginBottom:7,color:'#243746'},input:{backgroundColor:'white',borderWidth:1,borderColor:'#CDD6DD',borderRadius:8,padding:13,marginBottom:18},button:{backgroundColor:'#176B91',padding:15,borderRadius:8,alignItems:'center',marginTop:6},buttonText:{color:'white',fontWeight:'700'},link:{color:'#176B91',textAlign:'center',marginTop:22},error:{color:'#B42318',marginBottom:12} });
