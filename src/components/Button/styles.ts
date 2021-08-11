import {StyleSheet} from 'react-native';

export const buttonStyles = StyleSheet.create({
  common: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  primary: {
    backgroundColor: 'blue',
    borderRadius: 2,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  secondary: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
  },
});
