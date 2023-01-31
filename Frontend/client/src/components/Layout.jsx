import {Outlet} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Box, Stack} from "@mui/material";
import Header from "./Header";

const appTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: ['"Segoe UI"', "-apple-system", "BlinkMacSystemFont", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
  },
  palette: {
    primary: {
      main: "#fac50c",
    },
    secondary: {
      main: "#52493e",
    },
  },
});

const Layout = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <Stack direction="column" justifyContent="center" alignItems="stretch">
        <Box component="header">
          <Header />
        </Box>
        <Box component="main" sx={{m: 2}}>
          <Outlet />
        </Box>
      </Stack>
    </ThemeProvider>
  );
};

export default Layout;
