import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ToastProvider} from 'react-native-toast-notifications';
import {auth} from './API/firebase';

const {navigation} = useNavigation<StackNavigationProp<RootStackParamList>>();

export const checkLoggedIn = async () => {
  const user = await auth.currentUser;
  if (user) {
    // User is logged in, navigate to the desired screen (e.g., Home)
    navigation.navigate('Home');
  } else {
    // Check if the user's authentication state is stored in AsyncStorage
    const storedAuthState = await AsyncStorage.getItem('authState');
    if (storedAuthState) {
      // User was previously logged in, navigate to the desired screen (e.g., Home)
      navigation.navigate('Home');
    } else {
      // User is not logged in, navigate to the Login screen
      navigation.navigate('Login');
    }
  }
};
