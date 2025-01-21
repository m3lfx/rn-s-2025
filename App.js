import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductContainer from './Screens/Product/ProductContainer';
import Header from './Screens/Shared/Header';
import { NavigationContainer } from '@react-navigation/native'
import Main from './Navigators/Main';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Toast from 'react-native-toast-message';
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        {/* <ProductContainer /> */}
        <Main />
      </NavigationContainer >
      <Toast />
    </Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
