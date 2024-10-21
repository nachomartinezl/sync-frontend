import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { theme } from '../theme'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const screens = [
  { name: 'index', title: 'Home' },
  { name: 'login', title: 'Login' },
  { name: 'register', title: 'Register' },
  { name: 'personalData', title: 'Personal Data' },
  { name: 'aboutYou', title: 'About You' },
  { name: 'yourProfile', title: 'Your Profile' },
  { name: 'dashboard', title: 'Dashboard' },
  { name: 'personalityTest', title: 'Personality Test' },
  { name: 'astrologicalProfile', title: 'Astrological Profile' },
  { name: 'interests', title: 'Interests' },
  { name: 'profile', title: 'Profile' },
  { name: 'matchDetails', title: 'Match' },
  { name: 'availabilitySelection', title: 'Availability Selection' },
  { name: 'dateDetails', title: 'Date Details' },
];

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider theme={theme}>
        <Stack>
          {screens.map((screen) => (
            <Stack.Screen 
              key={screen.name} 
              name={screen.name} 
              options={{ title: screen.title, headerShown: false }} 
            />
          ))}
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
