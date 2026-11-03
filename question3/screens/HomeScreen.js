import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useApp, errorMessage } from '../context/AppContext';
export default function HomeScreen({ onBookings, onNewBooking }) {
  const {user,bookingCount,logout}=useApp(); const [loggingOut,setLoggingOut]=useState(false);
  async function handleLogout(){setLoggingOut(true);try{await logout();}catch(e){Alert.alert('Sign out failed',errorMessage(e));setLoggingOut(false);}}
  return <View style={styles.container}>
    <Text style={styles.title}>Clinic services</Text><Text style={styles.greeting}>Signed in as {user?.email}</Text>
    <View style={styles.card}><Text style={styles.cardTitle}>Your bookings</Text><Text style={styles.count}>{bookingCount}</Text><Text style={styles.muted}>Appointments on your account</Text></View>
    <TouchableOpacity style={styles.button} onPress={onNewBooking}><Text style={styles.buttonText}>Book an appointment</Text></TouchableOpacity>
    <TouchableOpacity style={styles.outline} onPress={onBookings}><Text style={styles.outlineText}>View my bookings</Text></TouchableOpacity>
    <TouchableOpacity onPress={handleLogout} disabled={loggingOut} style={styles.logout}>{loggingOut?<ActivityIndicator/>:<Text style={styles.logoutText}>Sign out</Text>}</TouchableOpacity>
  </View>;
}
const styles=StyleSheet.create({container:{flex:1,backgroundColor:'#F6F8FA',padding:24},title:{fontSize:26,fontWeight:'700',color:'#164E72',marginTop:18},greeting:{color:'#52616B',marginTop:8,marginBottom:24},card:{backgroundColor:'white',padding:22,borderRadius:10,borderWidth:1,borderColor:'#E0E6EA',marginBottom:24},cardTitle:{fontSize:16,fontWeight:'600',color:'#243746'},count:{fontSize:38,fontWeight:'700',color:'#176B91',marginTop:10},muted:{color:'#52616B'},button:{backgroundColor:'#176B91',padding:16,borderRadius:8,alignItems:'center',marginBottom:12},buttonText:{color:'white',fontWeight:'700'},outline:{padding:15,borderWidth:1,borderColor:'#176B91',borderRadius:8,alignItems:'center'},outlineText:{color:'#176B91',fontWeight:'700'},logout:{marginTop:35,alignItems:'center'},logoutText:{color:'#A33A32'}});
