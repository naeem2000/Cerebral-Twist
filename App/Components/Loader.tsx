import {StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';
import React, {Fragment} from 'react';

const Loader = () => {
  return (
    <Fragment>
      <View style={styles.preloader}>
        <Lottie
          source={require('../Assets/98304-bouncing-ball-loader.json')}
          autoPlay
          loop
          style={styles.loader}
        />
      </View>
    </Fragment>
  );
};

export default Loader;

const styles = StyleSheet.create({
  preloader: {
    backgroundColor: 'black',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    width: '70%',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
  },
});
