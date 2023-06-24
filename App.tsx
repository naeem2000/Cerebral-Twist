import AsyncStorage from '@react-native-async-storage/async-storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ToastProvider} from 'react-native-toast-notifications';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Fragment, useEffect, useState} from 'react';
import OfflineNotice from './App/Components/OfflineNotice';
import {SafeAreaView, StatusBar} from 'react-native';
import Register from './App/Screens/Register';
import Loader from './App/Components/Loader';
import Login from './App/Screens/Login';
import Main from './App/Screens/Main';

const Stack = createStackNavigator();

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function checkLoginStatus() {
      setLoading(true);
      const storedUserCredentials = await AsyncStorage.getItem(
        'userCredentials',
      );
      if (storedUserCredentials) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    }
    checkLoginStatus();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'black'}}>
      <ToastProvider>
        <Fragment>
          <OfflineNotice />
          <StatusBar
            animated={true}
            backgroundColor="black"
            barStyle={'light-content'}
          />
          <NavigationContainer>
            <Stack.Navigator>
              {isLoggedIn ? (
                <Stack.Group screenOptions={{headerShown: false}}>
                  <Stack.Screen name="Main" component={Main} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                </Stack.Group>
              ) : (
                <Stack.Group screenOptions={{headerShown: false}}>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="Main" component={Main} />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </Fragment>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}

export default App;
