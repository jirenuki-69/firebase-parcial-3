import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Stack } from './navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductEdit from './screens/ProductEdit';
import AddProductScreen from './screens/AddProductScreen';
import ServicesScreen from './screens/ServicesScreen';
import AddServiceScreen from './screens/AddServiceScreen';
import ServiceEditScreen from './screens/ServiceEditScreen';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  }
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="products" component={ProductsScreen} />
        <Stack.Screen name="add-product" component={AddProductScreen} />
        <Stack.Screen name="product-edit" component={ProductEdit} />
        <Stack.Screen name="services" component={ServicesScreen} />
        <Stack.Screen name="add-service" component={AddServiceScreen} />
        <Stack.Screen name="service-edit" component={ServiceEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
