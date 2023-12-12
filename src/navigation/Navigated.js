import {} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from '../screen/Homescreen';
import TemperatureChart from '../screen/TemperatureChart';
import Splashscreen from '../screen/Splashscreen';


const Navigated = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Splashscreen"
          component={Splashscreen}
        />
        <Stack.Screen
          options={{headerShown: true}}
          name="Homescreen"
          component={Homescreen}
        />
        <Stack.Screen
          options={{headerShown: true}}
          name="TemperatureChart"
          component={TemperatureChart}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigated;
