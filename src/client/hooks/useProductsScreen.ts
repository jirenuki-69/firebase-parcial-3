import { useState, useEffect } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../service/api';
import { showToast } from '../../helpers/constants';

type ProductsScreenResult = {
  products: Product[];
};

const useProductsScreen = (): ProductsScreenResult => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, [])

  return {
    products
  };
};

export default useProductsScreen;
