import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { NavigationScreenProp } from 'react-navigation';
import ProductCardInfo from './ProductCardInfo';
import ProductImage from './ProductImage';

type Props = {
  service: Service;
  navigation: NavigationScreenProp<any, any>;
};

const ServiceCard: React.FC<Props> = ({ service, navigation }) => (
  <Pressable onPress={() => navigation.navigate('service-edit', { service })}>
    <View style={styles.container}>
      <View style={styles.logoContainer}></View>
      <View style={styles.userInfoContainer}>
        <ProductImage />
        <View style={styles.nameContainer}>
          <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
            {service.name}
          </Text>
        </View>
        <View style={styles.row}>
          <ProductCardInfo
            title="Sale Price"
            content={service.salePrice.toString()}
          />
          <ProductCardInfo title="Price" content={service.price.toString()} />
        </View>
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
    marginBottom: 30
  },
  logoContainer: {
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#E5F6E9',
    borderRadius: 20
  },
  logo: {
    width: 60,
    height: 60
  },
  userInfoContainer: {
    flex: 2,
    flexDirection: 'column',
    padding: 20
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 15
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 20,
    rowGap: 10,
    flexBasis: '33%'
  }
});

export default ServiceCard;
