/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Home from './src/components/home/Home';
import {Provider} from 'react-redux';
import React from 'react';
import store from './src/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
