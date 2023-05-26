import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NavigationScreenProp } from 'react-navigation';
import Constants from 'expo-constants';
import useServiceAddScreen from '../hooks/useAddServiceScreen';
import TextFieldIcon from '../components/TextFieldIcon';
import Button from '../components/Button';

type AddServiceScreenProps = {
  route: RouteProp<{ params: { service: Service } }>;
  navigation: NavigationScreenProp<any, any>;
};

const AddServiceScreen: React.FC<AddServiceScreenProps> = ({
  route,
  navigation
}) => {
  const { onChangeService, addService } = useServiceAddScreen();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextFieldIcon
          label="Name"
          placeholder="Name"
          iconName="inventory"
          onTextChange={(value) => onChangeService('name', value)}
        />
        <TextFieldIcon
          label="Sale Price"
          placeholder="Sale Price"
          iconName="receipt"
          onTextChange={(value) => onChangeService('salePrice', value)}
          keyboardType="numeric"
        />
        <TextFieldIcon
          label="Price"
          placeholder="Price"
          iconName="receipt"
          onTextChange={(value) => onChangeService('price', value)}
          keyboardType="numeric"
        />
        <Button text="Add" onClick={addService} />
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

export default AddServiceScreen;
