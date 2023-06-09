import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationScreenProp } from 'react-navigation';
import Constants from 'expo-constants';
import TextFieldIcon from '../components/TextFieldIcon';
import useProductEditScreen from '../hooks/useProductEditScreen';
import Button from '../components/Button';

type ProductEditScreenProps = {
  route: RouteProp<{ params: { product: Product } }>;
  navigation: NavigationScreenProp<any, any>;
};

const ProductEdit: React.FC<ProductEditScreenProps> = ({
  route,
  navigation
}) => {
  const { product } = route.params;
  const { onChangeProduct, updateProduct, deleteProduct } =
    useProductEditScreen({ product });

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextFieldIcon
          label="Name"
          placeholder="Name"
          iconName="inventory"
          onTextChange={(value) => onChangeProduct('name', value)}
          initialValue={product.name}
        />
        <TextFieldIcon
          label="Sale Price"
          placeholder="Sale Price"
          iconName="receipt"
          onTextChange={(value) => onChangeProduct('salePrice', value)}
          initialValue={product.salePrice.toString()}
          keyboardType="numeric"
        />
        <TextFieldIcon
          label="Purchase Price"
          placeholder="Purchase Price"
          iconName="receipt"
          onTextChange={(value) => onChangeProduct('purchasePrice', value)}
          initialValue={product.purchasePrice.toString()}
          keyboardType="numeric"
        />
        <TextFieldIcon
          label="Quantity"
          placeholder="Quantity"
          iconName="receipt"
          onTextChange={(value) => onChangeProduct('quantity', value)}
          initialValue={product.quantity.toString()}
          keyboardType="numeric"
        />
        <Button text="Save" onClick={updateProduct} />
        <Button
          text="Delete"
          onClick={() => deleteProduct(navigation)}
          style={{ backgroundColor: 'red' }}
        />
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

export default ProductEdit;
