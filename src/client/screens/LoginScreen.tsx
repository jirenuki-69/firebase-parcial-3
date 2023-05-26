import React, { useState } from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import loginImage from '../../../assets/img/login.png';
import TextHeadline from '../components/TextHeadline';
import TextFieldIconButton from '../components/TextFieldIconButton';
import TextFieldIcon from '../components/TextFieldIcon';
import Button from '../components/Button';
import useLoginScreen from '../hooks/useLoginScreen';
import { CustomScreenProps } from '../interfaces/ScreenProps';

const LoginScreen: React.FC<CustomScreenProps> = ({ navigation }) => {
  const { setEmail, setPassword, onSubmit, toSignUp } = useLoginScreen();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={loginImage}
        placeholder="Login Image"
        contentFit="contain"
      />
      <TextHeadline text="Login" bold />
      <TextFieldIcon
        label="Email"
        placeholder="Email"
        iconName="mail"
        validateCode="email-address"
        onTextChange={setEmail}
      />
      <TextFieldIconButton
        label="Password"
        placeholder="Password"
        leadingIconName="mail"
        trailingIconName={isPasswordVisible ? 'visibility' : 'visibility-off'}
        onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
        secureTextEntry={!isPasswordVisible}
        onTextChange={setPassword}
      />
      <Button text="Login" onClick={() => onSubmit(navigation)} />
      <Button text="Sign up" onClick={() => toSignUp(navigation)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    paddingTop: Constants.statusBarHeight + 10
  },
  image: {
    width: '100%',
    height: 200
  }
});

export default LoginScreen;
