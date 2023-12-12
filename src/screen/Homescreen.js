import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
  Linking,
} from 'react-native';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import CommonLoader from '../common/CommonLoader';

const Homescreen = () => {
  const navigation = useNavigation();

  const [error, setError] = useState('');
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [cityname, setCityname] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const Current_Api = location
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=8bea15d8b27ecb2e469280ef97540419`
    : '';

  const History_Api = location
    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=8bea15d8b27ecb2e469280ef97540419`
    : '';

  useEffect(() => {
    // Request location permission on component mount
    requestLocationPermission();

    // Clean up on component unmount
    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      setIsloading(true);

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Get current location once permission is granted
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
        alert('Location permission was not granted.');
      }
    } catch (err) {
      console.warn(err);
      setIsloading(false);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => {
        console.error(error.code, error.message);
        alert(`ERROR ${error.code} ${error.message}`);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const fetchData = async () => {
    try {
      setIsloading(true);
      // Fetch Current API
      const currentResponse = await fetch(Current_Api);
      const currentData = await currentResponse.json();

      setCity(currentData.main.temp);
      setCityname(currentData.name);
      setError('');
      setIsloading(false);

      // Fetch History API
      const historyResponse = await fetch(History_Api);
      const historyData = await historyResponse.json();
      setWeatherData(historyData);
      setIsloading(false);
    } catch (fetchingerror) {
      setError('City not Found');
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchData();
    }
  }, [location]);

  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return <View></View>;
  }

  const truncatedData = weatherData.list.slice(0, 4);

  const data = truncatedData.map(item => ({
    x: moment(item.dt_txt).format('MMM D, HH:mm'),
    y: item.main.temp,
  }));


 
  const handlePress = () =>{
    setButtonPressed(true)
    navigation.navigate('TemperatureChart')
  }
  // Location enabled
  const cityData = cityname ? cityname : error;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          {isloading && <CommonLoader />}

          <View style={styles.boxcontainer}>
            <Image
              source={require('./assets/sunny.png')}
              style={styles.sunimage}
            />

            <Text style={styles.text}>{city}°C</Text>

            <Text style={styles.textcity}>{cityData}</Text>
          </View>

          <View
            style={{
              marginTop: 10,
              gap: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LineChart
              data={{
                labels: data.map(point => point.x),
                datasets: [{data: data.map(point => point.y)}],
              }}
              width={400}
              height={300}
              yAxisLabel="°C"
              yAxisSuffix="C"
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              style={{marginVertical: 8, borderRadius: 16}}
            />

            <TouchableOpacity
              onPress={handlePress }
              style={{
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                width: '90%',
                height: 60,
                backgroundColor: buttonPressed ? 'red' : 'black',
                
              }}>
              <Text style={{color: 'white', fontSize: 15}}>
                Tap here to search manually city Temp
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxcontainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20,
  },
  inputContainer: {
    width: '95%',
    borderRadius: 40,
    height: 74,
    borderWidth: 1.5,
    flexDirection: 'row',
    marginTop: 14,
    marginLeft: 10,
  },
  textinput: {
    width: '85%',
    height: 70,
    paddingLeft: 30,
    fontSize: 20,
    color: 'black',
    borderRadius: 10,
  },
  image: {
    marginTop: 15,
    width: '10%',
    height: 40,
  },
  text: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 80,
  },
  textcity: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 50,
  },
});

export default Homescreen;
