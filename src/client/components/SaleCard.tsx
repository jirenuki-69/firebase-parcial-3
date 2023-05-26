import { Text } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import useSaleCard from '../hooks/useSaleCard';
import { IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  sale: any;
  getSales: () => void;
};

const SaleCard: React.FC<Props> = ({ sale, getSales }) => {
  const { onSaleDeleteIconPress } = useSaleCard({ getSales });

  return (
    <View style={styles.container}>
      {sale.productsServices.map((productService: any) => (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{productService.name}</Text>
          <Text>
            ${productService.price || productService.purchasePrice} x{' '}
            {productService.selectedQuantity}
          </Text>
        </View>
      ))}
      <IconButton
        icon={(props) => <MaterialIcons name="delete" size={24} color="red" />}
        onPress={() => onSaleDeleteIconPress(sale._id)}
        style={{ alignSelf: 'flex-end' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
    marginBottom: 30,
    rowGap: 10
  }
});

export default SaleCard;
