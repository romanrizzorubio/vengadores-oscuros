import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      aspects: {
        basic: string;
        aggression: string;
        justice: string;
        protection: string;
        leadership: string;
        pool: string;
      };
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
      };
      border: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
    };
    shadows: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    progress: {
      low: string;
      medium: string;
      high: string;
    };
    spacing: {
      s: string;
      m: string;
      l: string;
      xl: string;
    };
    borderRadius: {
      s: string;
      m: string;
      l: string;
    };
    typography: {
      sizes: {
        S: string;
        M: string;
        L: string;
        XL: string;
        XXL: string;
        XXXL: string;
      };
    };
  }
}
