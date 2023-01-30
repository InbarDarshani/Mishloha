import {Outlet} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Grid} from "@mui/material";
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
});

const Layout = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <Grid container direction="column" justifyContent="center" alignItems="center" height="100%" sx={{}}>
        <Grid item component="header" sx={{paddingLeft: "2%", paddingRight: "2%"}}>
          <Header />
        </Grid>
        <Grid item component="main" sx={{margin: "2%"}}>
          <Outlet />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Layout;
