import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import TextHeadline from '../components/TextHeadline';
import { CustomScreenProps } from '../interfaces/ScreenProps';
import useProductsScreen from '../hooks/useProductsScreen';
import ProductCard from '../components/ProductCard';

const ProductsScreen: React.FC<CustomScreenProps> = ({ navigation }) => {
  const { products } = useProductsScreen();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextHeadline text="Products" bold />
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
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
