import {isEmailValid, isPasswordValid} from '../Components/Validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import {signInWithEmailAndPassword} from 'firebase/auth';
import React, {Fragment, useState} from 'react';
import {auth} from '../Components/API/firebase';
import Loader from '../Components/Loader';
import {
  Text,
  View,
  Animated,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface User {
  email: string;
  password: string;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({navigation}: any) => {
  const [user, setUser] = useState<User>({email: '', password: ''});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonScale] = useState(new Animated.Value(1));
  const toast = useToast();

  const handleLogin = async () => {
    if (user.email === '' || user.password === '') {
      toast.show('All fields are mandatory!', {
        type: 'success ',
        style: {backgroundColor: 'red', marginBottom: 20},
        placement: 'bottom',
        duration: 2500,
        animationType: 'slide-in',
      });
      toast.hideAll();
      return;
    }
    if (!isEmailValid.test(user.email)) {
      toast.show('Please enter a valid email...', {
        type: 'danger',
        style: {backgroundColor: 'red', marginBottom: 20},
        placement: 'bottom',
        duration: 2500,
        animationType: 'slide-in',
      });
      toast.hideAll();
      return;
    }
    if (!isPasswordValid.test(user.password)) {
      toast.show('Please enter a valid password...', {
        type: 'danger ',
        style: {backgroundColor: 'red', marginBottom: 20},
        placement: 'bottom',
        duration: 2500,
        animationType: 'slide-in',
      });
      toast.hideAll();
      return;
    }
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, user.email, user.password);
      await AsyncStorage.setItem('userCredentials', JSON.stringify(auth));
      navigation.navigate('Main');
      setIsLoading(false);
      toast.show('successfully logged in.', {
        type: 'success ',
        style: {
          backgroundColor: 'green',
          marginBottom: 20,
        },
        placement: 'bottom',
        duration: 2500,
        animationType: 'slide-in',
      });
      toast.hideAll();
      return;
    } catch (error: any) {
      setIsLoading(false);
      if (error.code === 'auth/invalid-email') {
        toast.show('Please enter a valid email...', {
          type: 'warning ',
          style: {backgroundColor: 'red', marginBottom: 20},
          placement: 'bottom',
          duration: 2500,
          animationType: 'slide-in',
        });
        toast.hideAll();
        return;
      }
      if (error.code === 'auth/user-not-found') {
        toast.show('User not found, have you registered?', {
          type: 'warning ',
          style: {backgroundColor: 'red', marginBottom: 20},
          placement: 'bottom',
          duration: 2500,
          animationType: 'slide-in',
        });
        toast.hideAll();
        return;
      }
      if (error.code === 'auth/wrong-password') {
        toast.show('Incorrect password...', {
          type: 'warning',
          style: {backgroundColor: 'red', marginBottom: 20},
          placement: 'bottom',
          duration: 2500,
          animationType: 'slide-in',
        });
        toast.hideAll();
        return;
      }
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Fragment>
      <View style={styles.loginContainer}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.welcomeSub}>Up for a memory challenge?{'\n'}</Text>
        <Text style={styles.loginMainText}>Login</Text>
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Email"
            value={user.email}
            onChangeText={email => setUser({...user, email})}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textArea}
            placeholder="Password"
            value={user.password}
            onChangeText={password => setUser({...user, password})}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={handleLogin}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}>
            <Animated.View
              style={[styles.button, {transform: [{scale: buttonScale}]}]}>
              <Text style={styles.buttonText}>Login</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '45%'}}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.smallText}>Not registered?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loginMainText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
  },
  welcomeSub: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
  },
  textArea: {
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
  },
  smallText: {
    fontSize: 15,
    color: 'white',
    margin: 10,
  },
  innerContainer: {
    width: '80%',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '50%',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'silver',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
