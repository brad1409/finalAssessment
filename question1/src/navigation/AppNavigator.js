import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RouteDetailsScreen from '../screens/RouteDetailsScreen';
import ReportIssueScreen from '../screens/ReportIssueScreen';
import { colors } from '../theme/colors';
const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return <NavigationContainer><Stack.Navigator screenOptions={{ headerTintColor: colors.navy, headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false, headerTitleStyle: { fontWeight: '700' } }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RouteDetails" component={RouteDetailsScreen} options={{ title: 'Trip details' }} />
    <Stack.Screen name="ReportIssue" component={ReportIssueScreen} options={{ title: 'Report an issue' }} />
  </Stack.Navigator></NavigationContainer>;
}
