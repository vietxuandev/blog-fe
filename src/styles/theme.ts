import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: blue[900],
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['Quicksand', 'Bargitta'].join(','),
  },
});
