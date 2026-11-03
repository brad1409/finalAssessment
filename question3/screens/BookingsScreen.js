import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useApp, errorMessage } from '../context/AppContext';
export default function BookingsScreen({ onBack, onNewBooking }) {
  const {user,bookings,bookingsLoading,bookingsError}=useApp();
  const [deletingId,setDeletingId]=useState(null);
  async function remove(id){setDeletingId(id);try{await deleteDoc(doc(db,'users',user.uid,'bookings',id));}catch(e){Alert.alert('Could not cancel booking',errorMessage(e));}finally{setDeletingId(null);}}
  function confirmCancel(id){Alert.alert('Cancel booking','Are you sure you want to cancel this booking?',[{text:'Keep booking',style:'cancel'},{text:'Cancel booking',style:'destructive',onPress:()=>remove(id)}]);}
  return <View style={styles.container}>
    <TouchableOpacity onPress={onBack}><Text style={styles.back}>‹ Back</Text></TouchableOpacity><Text style={styles.title}>My bookings</Text>
    {bookingsLoading?<ActivityIndicator style={{marginTop:30}} size="large" color="#176B91"/>:bookingsError?<Text style={styles.error}>{bookingsError}</Text>:<FlatList data={bookings} keyExtractor={(item)=>item.id} contentContainerStyle={{paddingBottom:24}} ListEmptyComponent={<Text style={styles.empty}>No bookings yet. Book your first appointment.</Text>} renderItem={({item})=><View style={styles.card}>
      <Text style={styles.service}>{item.serviceType}</Text><Text style={styles.detail}>Date: {item.preferredDate}</Text><Text style={styles.detail}>Status: {item.status}</Text><Text style={styles.detail}>Notes: {item.notes||'None'}</Text>
      <TouchableOpacity disabled={deletingId!==null} onPress={()=>confirmCancel(item.id)}>{deletingId===item.id?<ActivityIndicator/>:<Text style={styles.cancel}>Cancel booking</Text>}</TouchableOpacity>
    </View>}/>}
    <TouchableOpacity style={styles.button} onPress={onNewBooking}><Text style={styles.buttonText}>New booking</Text></TouchableOpacity>
  </View>;
}
const styles=StyleSheet.create({container:{flex:1,backgroundColor:'#F6F8FA',padding:22},back:{color:'#176B91',fontSize:16,marginTop:12,marginBottom:16},title:{fontSize:26,fontWeight:'700',color:'#164E72',marginBottom:20},card:{backgroundColor:'white',padding:18,borderWidth:1,borderColor:'#E0E6EA',borderRadius:9,marginBottom:12},service:{fontSize:17,fontWeight:'700',color:'#243746',marginBottom:8},detail:{color:'#52616B',marginBottom:5},cancel:{color:'#A33A32',fontWeight:'600',marginTop:12},empty:{color:'#52616B',textAlign:'center',marginTop:50},error:{color:'#B42318',marginTop:20},button:{backgroundColor:'#176B91',padding:15,borderRadius:8,alignItems:'center'},buttonText:{color:'white',fontWeight:'700'}});
