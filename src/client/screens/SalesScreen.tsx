import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import TextHeadline from '../components/TextHeadline';
import { CustomScreenProps } from '../interfaces/ScreenProps';
import Button from '../components/Button';
import useSalesScreen from '../hooks/useSalesScreen';
import SaleCard from '../components/SaleCard';

const SalesScreen: React.FC<CustomScreenProps> = ({ navigation }) => {
  const { sales, getSales } = useSalesScreen();

  return (
    <View style={styles.container}>
      <TextHeadline text="Sales" bold />
      <Button text="Add" onClick={() => navigation.navigate('add-sale')} />
      <Button text="Refresh" onClick={getSales} />
      {sales.map((sale) => (
        <SaleCard key={sale._id} sale={sale} getSales={getSales} />
      ))}
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
  }
});

export default SalesScreen;
