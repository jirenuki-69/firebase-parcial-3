import React, { useState } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/api';
import { showToast } from '../../helpers/constants';

type SignUpScreenResult = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (navigation: NavigationScreenProp<any, any>) => void;
  toLogin: (navigation: NavigationScreenProp<any, any>) => void;
};

const useSignUpScreen = (): SignUpScreenResult => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (navigation: NavigationScreenProp<any, any>) => {
    try {
      const response = await api.post('/auth/register', { email, password });

      if (response.data.message) {
        showToast(response.data.message);
      } else {
        AsyncStorage.setItem('@token', response.data.token);
        navigation.navigate('home');
      }
    } catch (error) {
      showToast('Server Error');
    }
  };

  const toLogin = (navigation: NavigationScreenProp<any, any>) => {
    navigation.navigate('login');
  };

  return {
    setEmail,
    setPassword,
    onSubmit,
    toLogin
  };
};

export default useSignUpScreen;
