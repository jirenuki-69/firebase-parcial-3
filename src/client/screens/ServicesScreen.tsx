import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import TextHeadline from '../components/TextHeadline';
import { CustomScreenProps } from '../interfaces/ScreenProps';
import useServicesScreen from '../hooks/useServicesScreen';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/Button';

const ServicesScreen: React.FC<CustomScreenProps> = ({ navigation }) => {
  const { services, getServices } = useServicesScreen();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextHeadline text="Services" bold />
        <Button text='Add Service' onClick={() => navigation.navigate('add-service')} />
        <Button text='Refresh Services' onClick={getServices} />
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} navigation={navigation} />
        ))}
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
  }
});

export default ServicesScreen;
