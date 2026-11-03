import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const AppContext = createContext(null);
export const errorMessage = (error) => {
  const messages = {
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/weak-password': 'Choose a password of at least 6 characters.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'permission-denied': 'You do not have permission to access these bookings.',
    'unavailable': 'Connection unavailable. Please try again.',
  };
  return messages[error?.code] || 'Something went wrong. Please try again.';
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setBookings([]);
    setBookingsError('');
    if (!user) {
      setBookingsLoading(false);
      return;
    }
    setBookingsLoading(true);
    const bookingsRef = collection(db, 'users', user.uid, 'bookings');
    const q = query(bookingsRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setBookingsLoading(false);
      setBookingsError('');
    }, (error) => {
      setBookingsError(errorMessage(error));
      setBookingsLoading(false);
    });
    return unsubscribe;
  }, [user?.uid]);

  const value = useMemo(() => ({
    user, checkingAuth, bookings, bookingCount: bookings.length,
    bookingsLoading, bookingsError, logout: () => signOut(auth),
  }), [user, checkingAuth, bookings, bookingsLoading, bookingsError]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}
