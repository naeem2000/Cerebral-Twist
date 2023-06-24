import {isPasswordValid, isEmailValid} from '../Components/Validation';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useToast} from 'react-native-toast-notifications';
import {auth} from '../Components/API/firebase';
import React, {Fragment, useState} from 'react';
import Loader from '../Components/Loader';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

interface User {
  email: string;
  password: string;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegisterScreen = ({navigation}: any) => {
  const [user, setUser] = useState<User>({email: '', password: ''});
  const [buttonScale] = useState(new Animated.Value(1));
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleRegister() {
    if (user.email === '' || user.password === '') {
      toast.show('All fields are mandatory!', {
        type: 'danger ',
        style: {
          backgroundColor: 'red',
          marginBottom: 20,
        },
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
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      setIsLoading(false);
      toast.show('User created successfully', {
        type: 'success',
        style: {
          backgroundColor: 'green',
          marginBottom: 20,
        },
        placement: 'bottom',
        duration: 2500,
        animationType: 'slide-in',
      });
      navigation.navigate('Login');
    } catch (error: any) {
      toast.show(error.message, {
        type: 'danger ',
        style: {backgroundColor: 'red', marginBottom: 20},
        placement: 'bottom',
        duration: 2500,
        animationType: 'slide-in',
      });
      toast.hideAll();
      setIsLoading(false);
    }
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.closeButton}>
        <Text style={styles.closeText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.register}>Register</Text>
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Email"
            value={user.email}
            onChangeText={email => setUser({...user, email})}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textArea}
            placeholder="Password"
            value={user.password}
            onChangeText={password => setUser({...user, password})}
            maxLength={15}
            secureTextEntry={false}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={handleRegister}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}>
            <Animated.View
              style={[styles.button, {transform: [{scale: buttonScale}]}]}>
              <Text style={styles.buttonText}>Register</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  loginContainer: {
    position: 'relative',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  register: {
    textAlign: 'center',
    fontSize: 30,
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
  closeButton: {
    position: 'absolute',
    top: 80,
    left: 40,
    zIndex: 999,
  },
  closeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
