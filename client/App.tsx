import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { colors } from './src/costants/color';
import AppContainer from './src/Navigation';
import { Provider } from 'react-redux';
import store from './src/services/store';

enableScreens();

const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default App;