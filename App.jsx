import React from 'react'
import { StyleSheet, View } from 'react-native'
import HomeScreen from './src/screens/HomeScreen'

const App = () => {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f0', // matches HomeScreen's scroll background
  },
})
