import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

const ProductImage = () => (
  <Avatar.Image
    size={80}
    style={styles.pic}
    source={require('../../../assets/img/product.png')}
  />
);

const styles = StyleSheet.create({
  pic: {
    position: 'absolute',
    zIndex: 1,
    top: -50,
    left: 20
  }
});

export default ProductImage;
