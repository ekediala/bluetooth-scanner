import * as React from 'react';

import {Text} from 'react-native-elements';
import {useSelector} from 'react-redux';

const Home: React.FC = () => {
  const state = useSelector((state: {main: any}) => {
    return state.main;
  });
  return <Text>{state.peripheralID}</Text>;
};

export default Home;
