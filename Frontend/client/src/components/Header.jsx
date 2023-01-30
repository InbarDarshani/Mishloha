import {useNavigate} from "react-router-dom";
import {AppBar, Box, Toolbar, IconButton, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Header = () => {
  let navigate = useNavigate();

  return (
    <Box sx={{width: "100%"}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{flexGrow: 1}}>
            Mishloha Home Assignment
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/favorites")}>
            <FavoriteIcon />
            <Typography>Favorites</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
