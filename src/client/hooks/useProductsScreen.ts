import { useState, useEffect } from 'react';
import { api } from '../service/api';

type ProductsScreenResult = {
  products: Product[];
  getProducts: () => void;
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
    products,
    getProducts
  };
};

export default useProductsScreen;
