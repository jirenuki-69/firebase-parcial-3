import React, { useState } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/api';
import { showToast } from '../../helpers/constants';

type LoginScreenResult = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (navigation: NavigationScreenProp<any, any>) => void;
  toSignUp: (navigation: NavigationScreenProp<any, any>) => void;
};

const useLoginScreen = (): LoginScreenResult => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (navigation: NavigationScreenProp<any, any>) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log(response.data);

      if (response.data.message) {
        showToast(response.data.message, 'error');
      } else {
        AsyncStorage.setItem('@token', response.data.token);
        navigation.navigate('home');
      }
    } catch (error) {
      showToast('Server Error', 'error');
    }
  };

  const toSignUp = (navigation: NavigationScreenProp<any, any>) => {
    navigation.navigate('signup');
  };

  return {
    setEmail,
    setPassword,
    onSubmit,
    toSignUp
  };
};

export default useLoginScreen;
