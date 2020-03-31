import {StyleSheet} from 'react-native';

const homeStyle = StyleSheet.create({
  headerText: {
    margin: 15,
  },
  main: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  margin10: {
    margin: 10,
  },
  rescanContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    margin: 15,
    paddingHorizontal: 30,
  },
  buttonCenter: {
    alignSelf: 'center',
  },
});

export default homeStyle;
