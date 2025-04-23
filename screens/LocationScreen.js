import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { Graph, Line, Points } from 'react-native-graph';


const screenWidth = Dimensions.get('window').width;
const exampleHours = [
    '6PM', '7PM', '8PM', '9PM',
    '10PM', '11PM', '12AM', '1AM',
    '2AM', '3AM', '4AM', '5AM'
  ];
  
  const exampleChances = [0, 5, 10, 25, 40, 60, 70, 50, 35, 20, 10, 5];
  

const getAuroraChance = (lat, kp) => {
    const thresholds = {
        3: 65,
        4: 60,
        5: 55,
        6: 50,
        7: 45,
        8: 40,
        9: 35,
    };

    const visibleLat = thresholds[kp] || 80;
    const diff = visibleLat - lat;

    if (diff >= 10) return 0;
    if (diff <= 0) return 100;

    return Math.round((1 - diff / 10) * 100);
};

export default function LocationScreen() {
    
  const [zipCode, setZipCode] = useState('');
  const [location, setLocation] = useState(null);
  const [auroraChance, setauroraChance] = useState(null);
  const [kpIndex, setKpIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0); // updates only on release

  useEffect(() => {
    fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json')
      .then(res => res.json())
      .then(data => {
        const latest = data[data.length - 1];
        setKpIndex(latest.kp_index);
      })
      .catch(error => {
        console.error('Error fetching K-index:', error);
      });
  }, []);
  

  const fetchLocationFromZip = () => {
    if (!zipCode || zipCode.length !== 5) {
      alert('Please enter a valid 5-digit ZIP code.');
      return;
    }

    fetch(`https://api.zippopotam.us/us/${zipCode}`)
      .then(res => res.json())
      .then(data => {
        const place = data.places[0];
        const lat = parseFloat(place.latitude);
        const lon = parseFloat(place.longitude);
        setLocation({ lat, lon });
      
        if (kpIndex !== null) {
          const chance = getAuroraChance(lat, kpIndex);
          setauroraChance(chance);
        }
      })
      
      .catch(() => alert('Could not retrieve location from ZIP code.'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.graphTitle}>Aurora Viewing Chance</Text>
  
      <Graph style={styles.graph} points={exampleChances.map((y, i) => ({ x: i, y }))}>
  <Line color="#00ffcc" />
  <Points color="#00ffcc" />
</Graph>



  
<Text style={styles.sliderValue}>
  {exampleHours[selectedIndex]} — {exampleChances[selectedIndex]}%
</Text>

<Slider
  style={{ width: screenWidth - 80, marginTop: 10 }}
  minimumValue={0}
  maximumValue={exampleChances.length - 1}
  step={1}
  minimumTrackTintColor="#00ffcc"
  maximumTrackTintColor="#ffffff"
  thumbTintColor="#00ffcc"
  value={selectedIndex}
  onValueChange={setSelectedIndex}
/>





    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000814',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#00ffcc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#ffffff',
    marginVertical: 20,
    width: 200,
  },
  location: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 20,
  },
  auroraChanceBox: {
    fontSize: 20,
    color: '#00ffcc',
    fontWeight: 'bold',
    marginTop: 10,
  },
  graphTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ffcc',
    marginTop: 40,
  },
  sliderValue: {
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  graph: {
    width: screenWidth - 40,
    height: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00ffcc',
    backgroundColor: '#000814',
    marginBottom: 20,
  },
  
});
