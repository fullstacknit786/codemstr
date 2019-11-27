import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyApp from './src'
import HomeScreen from './src/components/screens/HomeScreen';
import MyFiles from './src/components/screens/MyFilesScreen';
import TabViewExample from './src';

export default function App() {
  return (
    <TabViewExample />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
