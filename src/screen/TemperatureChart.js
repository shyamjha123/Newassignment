import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';
import CommonLoader from '../common/CommonLoader';

const TemperatureChart = () => {
  const [search, setSearch] = useState('dhanbad');
  const [error, setError] = useState('');
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const Current_Api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8bea15d8b27ecb2e469280ef97540419`;
  const History_Api = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=8bea15d8b27ecb2e469280ef97540419
  `;

  const fetchData = async () => {
    try {
      setIsloading(true);
      // Fetch Current API
      const currentResponse = await fetch(Current_Api);
      const currentData = await currentResponse.json();
      setCity(currentData.main.temp);
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
    fetchData();
  }, [search]);

  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return(
      <View>
      <Text>..loading</Text>
      </View>
    )
  }

  const truncatedData = weatherData.list.slice(0, 4);

  const data = truncatedData.map(item => ({
    x: moment(item.dt_txt).format('MMM D, HH:mm'),
    y: item.main.temp,
  }));
console.log('====================================');
console.log(error, "dataerror");
console.log('====================================');


const cityData = search ? search : error ;

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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textinput}
              placeholder="Search your city weather"
              value={search}
              onChangeText={e => setSearch(e)}
            />
            <Image
              source={require('./assets/search.png')}
              style={styles.image}
            />
          </View>
          <View
            style={{
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

export default TemperatureChart;
