import { useState, useEffect } from 'react';
import { api } from '../service/api';
import { showToast } from '../../helpers/constants';
import { NavigationScreenProp } from 'react-navigation';

type AddSaleScreenResult = {
  products: Product[];
  services: Service[];
  selectedProducts: any[];
  numberOfDropdowns: number;
  total: number;
  onProductAdd: (item: any, index: number) => void;
  onProductQuantityChange: (item: any, index: number) => void;
  onAddIconPress: () => void;
  onSaleAdd: (navigation: NavigationScreenProp<any, any>) => void;
};

const useAddSaleScreen = (): AddSaleScreenResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState<number[]>([]);
  const [numberOfDropdowns, setNumberOfDropdowns] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const getProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data);
  };

  const getServices = async () => {
    const response = await api.get('/services');
    setServices(response.data);
  };

  const onProductAdd = (item: any, index: number) => {
    const newProducts = [...selectedProducts];
    newProducts[index] = item;
    setSelectedProducts(newProducts);
  };

  const onProductQuantityChange = (item: any, index: number) => {
    const newQuantity = [...selectedQuantity];
    newQuantity[index] = item.value;
    setSelectedQuantity(newQuantity);
  };

  const onAddIconPress = () => {
    const newNumber = selectedProducts.length + 1;
    setNumberOfDropdowns(newNumber);
    selectedProducts[selectedProducts.length] = null;
    selectedQuantity[selectedProducts.length - 1] = 0;
  };

  const calculateTotal = () => {
    let totalTmp = 0;

    selectedProducts.forEach((product, index) => {
      if (product) {
        totalTmp +=
          (product.purchasePrice || product.price) * selectedQuantity[index];
      }
    });

    setTotal(totalTmp);
  };

  const onSaleAdd = async (navigation: NavigationScreenProp<any, any>) => {
    if (selectedProducts.length > 0) {
      for (let i = 0; i < selectedProducts.length; i++) {
        const product = selectedProducts[i];
        const quantity = selectedQuantity[i];

        if (!product) {
          showToast('Fill all fields');
          return;
        }

        if (quantity === 0) {
          showToast('Fill all fields');
          return;
        }

        if (product.quantity < quantity) {
          showToast(
            `El producto ${product.name} tiene menos cantidad que la solicitada: ${product.quantity}`
          );
          return;
        }
      }

      if (selectedQuantity.length < selectedProducts.length) {
        showToast('Fill all fields');
        return;
      }

      const newProductsServices = selectedProducts.map((product, index) => ({
        ...product,
        selectedQuantity: selectedQuantity[index]
      }));

      const response = await api.post('/sales', {
        productsServices: newProductsServices,
        total: Number(total)
      });
      console.log(response.data);

      for (let i = 0; i < selectedProducts.length; i++) {
        const product = selectedProducts[i];

        if (product.purchasePrice) {
          // modify product

          product.quantity -= Number(selectedQuantity[i]);
          const productResponse = await api.put(`/products/${product._id}`, product);
          console.log(productResponse.data);
        } else {
          //modify service
          const productResponse = await api.put(`/services/${product._id}`, product);
          console.log(productResponse.data);
        }
      }

      showToast('Sale saved');
      navigation.goBack();
    } else {
      showToast('You need products to create a sale');
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedQuantity]);

  useEffect(() => {
    getProducts();
    getServices();
  }, []);

  return {
    products,
    services,
    selectedProducts,
    numberOfDropdowns,
    total,
    onProductAdd,
    onProductQuantityChange,
    onAddIconPress,
    onSaleAdd
  };
};

export default useAddSaleScreen;
