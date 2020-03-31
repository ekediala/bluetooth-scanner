/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {Provider} from 'react-redux';
import React from 'react';
import Scanner from './src/components/home/components/Scanner';
import store from './src/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Scanner />
    </Provider>
  );
};

export default App;
