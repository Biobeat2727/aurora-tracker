// ForecastScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function ForecastScreen() {
  const [kpIndex, setKpIndex] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json')
      .then(res => res.json())
      .then(data => {
        const latest = data[data.length - 1];
        setKpIndex(latest.kp_index);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching K-index:', error);
        setLoading(false);
      });

    fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json')
      .then(res => res.json())
      .then(data => {
        setForecastData(data);
      })
      .catch(error => {
        console.error('Error fetching forecast:', error);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>
        {loading ? 'Loading K-index...' : `Current K-Index: ${kpIndex}`}
      </Text>

      <Text style={styles.forecast}>🌌 Tonight's Forecast</Text>
      <Text style={styles.forecast}>Map from NOAA updated every 15 minutes</Text>

      <Image
        source={{
          uri: 'https://services.swpc.noaa.gov/experimental/images/aurora_dashboard/tonights_static_viewline_forecast.png',
        }}
        style={styles.auroraImage}
        resizeMode="contain"
      />

      {forecastData.length > 1 &&
        forecastData.slice(1, 6).map((entry, index) => (
          <Text key={index} style={styles.forecast}>
            {entry[0]} — Kp: {entry[1]}
          </Text>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000814',
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: '#00ffcc',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forecast: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 10,
  },
  auroraImage: {
    width: 300,
    height: 300,
    marginVertical: 20,
    borderColor: '#00ffcc',
    borderWidth: 1,
    borderRadius: 10,
  },
});