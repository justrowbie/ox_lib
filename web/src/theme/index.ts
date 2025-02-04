import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Roboto',
  // colors: {
    // green:[
    //   '#EBFBEE',
    //   '#D3F9D8',
    //   '#B2F2BB',
    //   '#8CE99A',
    //   '#69DB7C',
    //   '#51CF66',
    //   '#7fd858',
    //   '#37B24D',
    //   '#2F9E44',
    //   '#4da527',
    // ]
  // },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  },
  radius: {
    xs: 2,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 15,
  },
  shadows: { sm: '1px 1px 3px rgba(0, 0, 0, 0.5)' },
  components: {
    Button: {
      styles: {
        root: {
          border: 'none',
        },
      },
    },
  },
};
