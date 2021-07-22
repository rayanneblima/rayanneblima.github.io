import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primaryBackground: string;
      secondaryBackground: string;
      tertiaryBackground?: string;

      primaryText: string;
      secondaryText: string;

      primary: string;
      secondary: string;
      primaryOpacity: string;
      secondaryOpacity: string;
    },
  }
}
