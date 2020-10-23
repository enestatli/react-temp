import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      setError('');
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError('That email address is invalid!');
      }
      if (err.code === 'auth/wrong-password') {
        setError(
          'The password is invalid or the user does not have a password',
        );
      }
    }
  };

  const register = async (email, password) => {
    try {
      const registeredUser = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      setError('');
      try {
        //TODO move this method to another file, you need auth user to logout correctly
        //also add if-else to check wheter user is already created or not

        const id = registeredUser.user.uid;
        const data = { id, email, photoUrl: 'test.jpg' };
        const usersRef = firestore().collection('users');
        await usersRef.doc(id).set(data);
      } catch (err) {
        console.log('error while pushing auth data to collection', err);
      }
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        setError('That email address is already in use!');
      }

      if (err.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        setError('That email address is invalid!');
      }

      console.log('something else error in register', err);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      setError('');
    } catch (err) {
      console.log('error while logging out', err);
    }
  };

  const values = {
    user,
    setUser,
    error,
    setError,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};