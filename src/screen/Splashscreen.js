import {Text, View, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const  Splashscreen = () => {
  const navigation = useNavigation();

  const imageUrl =
    'https://st.depositphotos.com/1005920/2423/i/450/depositphotos_24232973-stock-photo-weather-forecast-red-circle-web.jpg';

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Homescreen');
    }, 1000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        gap: 90,
        backgroundColor:'yellow'
      }}>
      <View style={{gap: 10, justifyContent:'center', alignItems:'center'}}>
        <Text style={{color: 'blue', fontSize: 25, fontWeight: '700'}}>
          Welcome to my Weather app
        </Text>
        <Text style={{color: 'green', fontSize: 25, fontWeight: '700'}}>
          Created by : Shyam Jha
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:40
        }}>
        <Image
          source={{uri: imageUrl}}
          style={{width: 300, height: 300, borderRadius: 300}}
        />
      </View>
    </View>
  );
};
export default Splashscreen;
