import React from 'react';
import { ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationScreenProp } from 'react-navigation';

type ProductEditScreenProps = {
  route: RouteProp<{ params: { product: Product } }>;
  navigation: NavigationScreenProp<any, any>;
};

const ProductEdit: React.FC<ProductEditScreenProps> = ({
  route,
  navigation
}) => {
  const { product } = route.params;

  return (
    <ScrollView>
      
    </ScrollView>
  );
};

export default ProductEdit;