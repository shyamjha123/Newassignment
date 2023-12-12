

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const CommonLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={90} color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default CommonLoader;
