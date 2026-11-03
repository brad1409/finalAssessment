import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { AppProvider, useApp } from './context/AppContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import BookingsScreen from './screens/BookingsScreen';
import NewBookingScreen from './screens/NewBookingScreen';
function AppFlow(){
  const {user,checkingAuth}=useApp();
  const [authScreen,setAuthScreen]=useState('login');
  const [screen,setScreen]=useState('home');
  useEffect(()=>{setScreen('home');setAuthScreen('login');},[user?.uid]);
  if(checkingAuth)return <View style={styles.loading}><ActivityIndicator size="large" color="#176B91"/></View>;
  if(!user)return authScreen==='register'?<RegisterScreen onBack={()=>setAuthScreen('login')}/>:<LoginScreen onRegister={()=>setAuthScreen('register')}/>;
  if(screen==='bookings')return <BookingsScreen onBack={()=>setScreen('home')} onNewBooking={()=>setScreen('new')}/>;
  if(screen==='new')return <NewBookingScreen onBack={()=>setScreen('home')} onSaved={()=>setScreen('bookings')}/>;
  return <HomeScreen onBookings={()=>setScreen('bookings')} onNewBooking={()=>setScreen('new')}/>;
}
export default function App(){return <AppProvider><SafeAreaView style={styles.root}><StatusBar barStyle="dark-content"/><AppFlow/></SafeAreaView></AppProvider>;}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#F6F8FA'},loading:{flex:1,justifyContent:'center',alignItems:'center'}});
