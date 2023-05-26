import { useState } from 'react';
import { api } from '../service/api';
import { showToast } from '../../helpers/constants';
import { NavigationScreenProp } from 'react-navigation';

type ProductEditScreenResult = {
  onChangeProduct: (field: string, value: string) => void;
  updateProduct: () => void;
  deleteProduct: (navigation: NavigationScreenProp<any, any>) => void;
};

const useProductEditScreen = ({
  product
}: {
  product: Product;
}): ProductEditScreenResult => {
  const [editableProduct, setEditableProduct] = useState(product);

  const onChangeProduct = (field: string, value: string) => {
    setEditableProduct((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateProduct = async () => {
    try {
      const response = await api.put(
        `/products/${editableProduct._id}`,
        editableProduct
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

  const deleteProduct = async (navigation: NavigationScreenProp<any, any>) => {
    try {
      const response = await api.delete(`/products/${editableProduct._id}`);
      console.log(response.data);

      showToast(response.data.message);
      navigation.goBack();
    } catch {
      showToast('Server Error');
    }
  };

  return {
    onChangeProduct,
    updateProduct,
    deleteProduct
  };
};

export default useProductEditScreen;
