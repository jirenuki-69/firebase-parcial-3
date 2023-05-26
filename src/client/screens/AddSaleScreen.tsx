import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import TextHeadline from '../components/TextHeadline';
import { CustomScreenProps } from '../interfaces/ScreenProps';
import CustomDropdown from '../components/Dropdown';
import useAddSaleScreen from '../hooks/useAddSaleScreen';
import Button from '../components/Button';
import { IconButton, Text } from '@react-native-material/core';
import { MaterialIcons } from '@expo/vector-icons';
import { createArray, quantity } from '../../helpers/constants';

const AddSaleScreen: React.FC<CustomScreenProps> = ({ navigation }) => {
  const {
    products,
    services,
    selectedProducts,
    numberOfDropdowns,
    total,
    onProductAdd,
    onProductQuantityChange,
    onAddIconPress,
    onSaleAdd
  } = useAddSaleScreen();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextHeadline text="Add Sale" bold />
        <View style={styles.dropdownContainer}>
          {createArray(numberOfDropdowns).map((_, index) => (
            <View style={{ width: '100%' }} key={index}>
              <CustomDropdown
                data={[...products, ...services]}
                labelField="name"
                valueField="_id"
                onChange={(item) => onProductAdd(item, index)}
              />
              <CustomDropdown
                data={quantity}
                labelField="label"
                valueField="value"
                onChange={(item) => onProductQuantityChange(item, index)}
                disable={!selectedProducts[index]}
              />
            </View>
          ))}
        </View>
        <IconButton
          icon={(props) => (
            <MaterialIcons name="add-circle-outline" size={24} color="black" />
          )}
          onPress={onAddIconPress}
          style={{ alignSelf: 'flex-start' }}
        />
        <Text variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: 15 }}>
          Total: ${total}
        </Text>
        <Button text="Add" onClick={() => onSaleAdd(navigation)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    paddingTop: Constants.statusBarHeight + 10
  },
  dropdownContainer: {
    width: '100%'
  }
});

export default AddSaleScreen;
