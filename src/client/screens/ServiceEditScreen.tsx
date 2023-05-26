import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationScreenProp } from 'react-navigation';
import Constants from 'expo-constants';
import useServiceEditScreen from '../hooks/useServiceEditScreen';
import TextFieldIcon from '../components/TextFieldIcon';
import Button from '../components/Button';

type ServiceEditScreenProps = {
  route: RouteProp<{ params: { service: Service } }>;
  navigation: NavigationScreenProp<any, any>;
};

const ServiceEditScreen: React.FC<ServiceEditScreenProps> = ({
  route,
  navigation
}) => {
  const { service } = route.params;
  const { onChangeService, updateService, deleteService } =
    useServiceEditScreen({ service });

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextFieldIcon
          label="Name"
          placeholder="Name"
          iconName="inventory"
          onTextChange={(value) => onChangeService('name', value)}
          initialValue={service.name}
        />
        <TextFieldIcon
          label="Sale Price"
          placeholder="Sale Price"
          iconName="receipt"
          onTextChange={(value) => onChangeService('salePrice', value)}
          initialValue={service.salePrice.toString()}
          keyboardType="numeric"
        />
        <TextFieldIcon
          label="Purchase Price"
          placeholder="Purchase Price"
          iconName="receipt"
          onTextChange={(value) => onChangeService('price', value)}
          initialValue={service.price.toString()}
          keyboardType="numeric"
        />
        <Button text="Save" onClick={updateService} />
        <Button
          text="Delete"
          onClick={() => deleteService(navigation)}
          style={{ backgroundColor: 'red' }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: Constants.statusBarHeight + 10
  }
});

export default ServiceEditScreen;
