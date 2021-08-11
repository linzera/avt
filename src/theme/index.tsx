import {Appearance} from 'react-native';

const spacer = 4;

const lightClors = {
  backgroundColor: '#fff',
};

const darkColors = {
  backgroundColor: 'yellow',
};

const colorScheme = Appearance.getColorScheme();

export default {
  spacer,
  colors: colorScheme == 'light' ? lightClors : darkColors,
};
