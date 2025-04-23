import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import { Video } from 'expo-av';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Video
        source={require('../assets/aurora.mp4')}
        rate={1.0}
        volume={0.5}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>🌌 Aurora Tracker</Text>
        <Text style={styles.subtitle}>Let the sky speak.</Text>

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonRow}>
            <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('Forecast')}
            >
                <ImageBackground
                source={require('../assets/forecast.png')}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
                >
                    <Text style={styles.cardText}>Forecast</Text>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.cardButton}
            onPress={() => navigation.navigate('Location Tools')}
            >
            <ImageBackground 
                 source={require('../assets/location.png')}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
                >
                    <Text style={styles.cardText}>Location</Text>
            </ImageBackground>
        </TouchableOpacity>
    </View>
    </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    overlay: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      backgroundColor: 'rgba(0, 0, 20, 0.3)',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#00ffcc',
      textShadowColor: '#0ff',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: '#ffffff',
      marginBottom: 40,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30,
      marginTop: 40,
    },
    cardButton: {
      width: 140,
      height: 140,
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: '#00ffcc',
    },
    cardImage: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    cardImageStyle: {
      borderRadius: 16,
    },
    cardText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      textAlign: 'center',
      paddingVertical: 6,
    },
    buttonWrapper: {
        marginTop: 90,
        alignItems:'center',
    },
  });
  