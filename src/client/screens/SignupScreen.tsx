import React, { useState } from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { CustomScreenProps } from '../interfaces/ScreenProps';
import TextHeadline from '../components/TextHeadline';
import signupImage from '../../../assets/img/signup.png';
import useSignUpScreen from '../hooks/useSignUpScreen';
import TextFieldIcon from '../components/TextFieldIcon';
import TextFieldIconButton from '../components/TextFieldIconButton';
import Button from '../components/Button';

const SignupScreen: React.FC<CustomScreenProps> = ({ navigation }) => {
  const { setEmail, setPassword, onSubmit, toLogin } = useSignUpScreen();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={signupImage}
        placeholder="Sign up Image"
        contentFit="contain"
      />
      <TextHeadline text="Sign up" bold />
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
        leadingIconName="lock"
        trailingIconName={isPasswordVisible ? 'visibility' : 'visibility-off'}
        onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
        secureTextEntry={!isPasswordVisible}
        onTextChange={setPassword}
      />
      <Button text="Register" onClick={() => onSubmit(navigation)} />
      <Button text="Login" onClick={() => toLogin(navigation)} />
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

export default SignupScreen;
