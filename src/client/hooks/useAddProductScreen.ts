import { useState } from 'react';
import { api } from '../service/api';
import { showToast } from '../../helpers/constants';

type ProductAddScreenResult = {
  onChangeProduct: (field: string, value: string) => void;
  addProduct: () => void;
};

const useProductEditScreen = (): ProductAddScreenResult => {
  const [product, setProduct] = useState<Product>({} as Product);

  const onChangeProduct = (field: string, value: string) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const addProduct = async () => {
    try {
      const response = await api.post(
        `/products`,
        product
      );
      console.log(response.data);

      if (response.data.message) {
        showToast(response.data.message);
      } else {
        showToast('Product Saved');
      }
    } catch {
      showToast('Server Error');
    }
  };

  return {
    onChangeProduct,
    addProduct
  };
};

export default useProductEditScreen;
