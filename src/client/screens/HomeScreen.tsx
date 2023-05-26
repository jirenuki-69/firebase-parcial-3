import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import TextHeadline from '../components/TextHeadline';
import { CustomScreenProps } from '../interfaces/ScreenProps';
import Button from '../components/Button';

const HomeScreen: React.FC<CustomScreenProps> = ({ navigation }) => (
  <View style={styles.container}>
    <TextHeadline text="Home" bold />
    <Button text="Products" onClick={() => navigation.navigate('products')} />
    <Button text="Services" onClick={() => navigation.navigate('services')} />
    <Button text="Sales" onClick={() => navigation.navigate('sales')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    paddingTop: Constants.statusBarHeight + 10
  }
});

export default HomeScreen;
