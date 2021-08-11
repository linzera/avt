const blacks = {
  black12: 'rgba(0, 0, 0, 0.12)',
  black38: 'rgba(0, 0, 0, 0.38)',
  black60: 'rgba(0, 0, 0, 0.60)',
  black80: 'rgba(0, 0, 0, 0.80)',
  black100: 'rgb(0, 0, 0)',
};

const whites = {
  white12: 'rgba(255, 255, 255, 0.12)',
  white30: 'rgba(255, 255, 255, 0.30)',
  white70: 'rgba(255, 255, 255, 0.70)',
  white100: '#ffffff',
};

const grays = {
  gray50: '#fafafa',
  gray100: '#f5f5f5',
  gray200: '#eeeeee',
  gray300: '#e0e0e0',
  gray400: '#bdbdbd',
  gray500: '#9e9e9e',
  gray600: '#757575',
  gray800: '#424242',
};

const blueGrays = {
  blueGray50: '#eceff1',
  blueGray100: '#cfd8dc',
  blueGray500: '#607d8b',
  blueGray600: '#546e7a',
  blueGray800: '#37474f',
};

const reds = {
  red50: '#feede7',
  red100: '#fdc9b9',
  red500: '#f83c00',
  red600: '#e23700',
  red800: '#b52c00',
};

const greens = {
  green50: '#f3f8ed',
  green100: '#dbeacb',
  green500: '#7cb342',
  green600: '#669337',
  green800: '#4f722a',
};

const yellows = {
  yellow50: '#fefae8',
  yellow100: '#fdf0bb',
  yellow500: '#f9ca06',
  yellow600: '#e3b806',
  yellow800: '#cca605',
};

const blues = {
  blue50: '#e7f5fd',
  blue100: '#b9e1f9',
  blue500: '#0091ea',
  blue600: '#0077c0',
  blue800: '#005d95',
};

const oranges = {
  orange50: '#fef4e7',
  orange100: '#fddfb9',
  orange500: '#fb8c00',
  orange600: '#e58000',
  orange800: '#ce7300',
};

const colors = {
  ...blacks,
  ...whites,
  ...grays,
  ...blueGrays,
  ...reds,
  ...greens,
  ...yellows,
  ...blues,
  ...oranges,
  androidRippleColor: 'rgba(0, 0, 0, .32)',
};

export type ColorType = typeof colors;
export type Color = keyof ColorType;

export default colors;
