import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    aspects: {
      basic: '#bfbfbf',
      aggression: '#ac0202',
      justice: '#e1ba00',
      protection: '#069a04',
      leadership: '#1841ca',
      pool: '#b609ca',
    },
    background: {
      primary: '#ffffff',
      secondary: '#000000',
      tertiary: '#931425',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
      tertiary: '#ffffff',
      quaternary: '#6b0d1a',
    },
    border: {
      primary: '#000000',
      secondary: '#ffffff',
      tertiary: '#27070c',
    },
  },
  shadows: {
    primary: '2px 2px 0 #ffffff',
    secondary: '2px 2px 0 #000000',
    tertiary: '2px 2px 0 #204c1f',
  },
  progress: {
    low: '#2d6b2a',
    medium: '#b87400',
    high: '#b8301f',
  },
  spacing: {
    s: '0.5rem',
    m: '1rem',
    l: '2rem',
    xl: '4rem',
  },
  borderRadius: {
    s: '4px',
    m: '8px',
    l: '12px',
  },
  typography: {
    sizes: {
      S: '12px',
      M: '1rem',
      L: '24px',
      XL: '32px',
      XXL: '64px',
      XXXL: '128px',
    },
  },
};
