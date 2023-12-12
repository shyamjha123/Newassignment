import {Text, View} from 'react-native';
import React from 'react';

import Navigated from './src/navigation/Navigated';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Navigated />
    </View>
  );
};
export default App;
