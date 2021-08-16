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

const avant = {
  neutral: '#505051',
  primary: '#022B54',
  primary05: '#022B5450',
  accent: '#53C3D0',
};

const colors = {
  ...whites,
  ...grays,
  ...avant,
  ...blacks,
  androidRippleColor: 'rgba(0, 0, 0, .32)',
};

export type ColorType = typeof colors;
export type Color = keyof ColorType;

export default colors;
