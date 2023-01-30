import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Grid} from "@mui/material";
//TODO: // import Header from "../header/Header";

const appTheme = createTheme();

const Layout = ({children}) => {
  return (
    <ThemeProvider theme={appTheme}>
      <Grid container direction="column" justifyContent="center" alignItems="center" height="100%" sx={{}}>
        <Grid item component="header" sx={{paddingLeft: "2%", paddingRight: "2%"}}>
          {/* <Header /> */}
        </Grid>
        <Grid item component="main" sx={{margin: "2%"}}>
          {children}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Layout;
