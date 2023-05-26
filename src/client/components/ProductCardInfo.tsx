import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  title: string;
  content: string;
}

const ProductCardInfo = ({ title, content }: Props) => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <Text variant='titleSmall' style={{ fontWeight: '500' }}>{title}</Text>
      <Text variant='bodyMedium'>{content}</Text>
    </View>
  );
};

export default ProductCardInfo;
