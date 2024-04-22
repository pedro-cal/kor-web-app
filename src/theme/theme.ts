import { createTheme } from "@mui/material";

export const theme = createTheme({
   palette: {
     mode: 'light',
     background: {
       default: '#f5f5f5'  // Light gray background
     },
     primary: {
        main: '#2D2D2D',
      },
      secondary: {
        //  main: '#03a9f4',  // Light blue color
        main: '#009688',  // Teal color
     },
   },
 });