import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationScreenProp } from 'react-navigation';
import Constants from 'expo-constants';
import TextFieldIcon from '../components/TextFieldIcon';
import useAddProductScreen from '../hooks/useAddProductScreen';
import Button from '../components/Button';

type AddProductScreenProps = {
  route: RouteProp<{ params: { product: Product } }>;
  navigation: NavigationScreenProp<any, any>;
};

const AddProductScreen: React.FC<AddProductScreenProps> = ({
  route,
  navigation
}) => {
  const { onChangeProduct, addProduct } = useAddProductScreen();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextFieldIcon
          label="Name"
          placeholder="Name"
          iconName="inventory"
          onTextChange={(value) => onChangeProduct('name', value)}
        />
        <TextFieldIcon
          label="Sale Price"
          placeholder="Sale Price"
          iconName="receipt"
          onTextChange={(value) => onChangeProduct('salePrice', value)}
          keyboardType="numeric"
        />
        <TextFieldIcon
          label="Purchase Price"
          placeholder="Purchase Price"
          iconName="receipt"
          onTextChange={(value) => onChangeProduct('purchasePrice', value)}
          keyboardType="numeric"
        />
        <TextFieldIcon
          label="Quantity"
          placeholder="Quantity"
          iconName="receipt"
          onTextChange={(value) => onChangeProduct('quantity', value)}
          keyboardType="numeric"
        />
        <Button text="Add" onClick={addProduct} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: Constants.statusBarHeight + 10
  }
});

export default AddProductScreen;
