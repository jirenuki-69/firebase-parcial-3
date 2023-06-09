import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import TextHeadline from '../components/TextHeadline';
import { CustomScreenProps } from '../interfaces/ScreenProps';
import useProductsScreen from '../hooks/useProductsScreen';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

const ProductsScreen: React.FC<CustomScreenProps> = ({ navigation }) => {
  const { products, getProducts } = useProductsScreen();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextHeadline text="Products" bold />
        <Button text='Add Product' onClick={() => navigation.navigate('add-product')} />
        <Button text='Refresh Products' onClick={getProducts} />
        {products.map((product) => (
          <ProductCard key={product._id} product={product} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
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

export default ProductsScreen;
