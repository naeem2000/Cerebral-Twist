import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {Fragment} from 'react';

const Loader = () => {
  return (
    <Fragment>
      <View style={styles.preloader}>
        <ActivityIndicator size="large" animating={true} color="white" />
      </View>
    </Fragment>
  );
};

export default Loader;

const styles = StyleSheet.create({
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
