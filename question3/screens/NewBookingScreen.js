import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useApp, errorMessage } from '../context/AppContext';
const SERVICES=['General consultation','Chronic medicine collection','Immunisation enquiry'];
export default function NewBookingScreen({ onBack, onSaved }) {
  const {user}=useApp(); const [serviceType,setServiceType]=useState(SERVICES[0]);
  const [preferredDate,setPreferredDate]=useState('');const [notes,setNotes]=useState('');
  const [saving,setSaving]=useState(false);const [error,setError]=useState('');
  async function save(){
    if(saving)return;
    const date=preferredDate.trim();
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)){setError('Enter a date in YYYY-MM-DD format.');return;}
    const [y,m,d]=date.split('-').map(Number);
    const selected=new Date(y,m-1,d);
    const today=new Date();today.setHours(0,0,0,0);
    if(selected.getFullYear()!==y||selected.getMonth()!==m-1||selected.getDate()!==d||selected<today){setError('Choose a valid date that is not in the past.');return;}
    setSaving(true);setError('');
    try{
      await addDoc(collection(db,'users',user.uid,'bookings'),{serviceType,preferredDate:date,notes:notes.trim(),status:'Pending',createdAt:serverTimestamp()});
      Alert.alert('Booking requested','Your booking has been saved.');onSaved();
    }catch(e){setError(errorMessage(e));}finally{setSaving(false);}
  }
  return <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:35}} keyboardShouldPersistTaps="handled">
    <TouchableOpacity onPress={onBack}><Text style={styles.back}>‹ Back</Text></TouchableOpacity>
    <Text style={styles.title}>New booking</Text><Text style={styles.subtitle}>Select a service and preferred date. This is a request, not a confirmed appointment.</Text>
    <Text style={styles.label}>Service</Text>{SERVICES.map(s=><TouchableOpacity key={s} onPress={()=>setServiceType(s)} style={[styles.choice,serviceType===s&&styles.selected]}><Text style={styles.choiceText}>{serviceType===s?'●':'○'}  {s}</Text></TouchableOpacity>)}
    <Text style={styles.label}>Preferred date (YYYY-MM-DD)</Text><TextInput style={styles.input} placeholder="2026-11-20" value={preferredDate} onChangeText={setPreferredDate} keyboardType="numbers-and-punctuation" maxLength={10}/>
    <Text style={styles.label}>Notes (optional)</Text><TextInput style={[styles.input,{height:100,textAlignVertical:'top'}]} placeholder="Any additional information (avoid sensitive medical details)" multiline maxLength={300} value={notes} onChangeText={setNotes}/>
    {!!error&&<Text style={styles.error}>{error}</Text>}
    <TouchableOpacity style={styles.button} disabled={saving} onPress={save}>{saving?<ActivityIndicator color="white"/>:<Text style={styles.buttonText}>Submit booking</Text>}</TouchableOpacity>
  </ScrollView>;
}
const styles=StyleSheet.create({container:{flex:1,backgroundColor:'#F6F8FA',paddingHorizontal:22},back:{color:'#176B91',fontSize:16,marginTop:25,marginBottom:20},title:{fontSize:26,fontWeight:'700',color:'#164E72'},subtitle:{color:'#52616B',marginTop:8,marginBottom:24,lineHeight:21},label:{fontWeight:'600',color:'#243746',marginBottom:9,marginTop:10},choice:{padding:14,borderRadius:8,borderWidth:1,borderColor:'#CDD6DD',backgroundColor:'white',marginBottom:9},selected:{borderColor:'#176B91',backgroundColor:'#EAF4F9'},choiceText:{color:'#243746'},input:{backgroundColor:'white',borderWidth:1,borderColor:'#CDD6DD',borderRadius:8,padding:13,marginBottom:16},error:{color:'#B42318',marginBottom:12},button:{backgroundColor:'#176B91',padding:16,borderRadius:8,alignItems:'center'},buttonText:{color:'white',fontWeight:'700'}});
