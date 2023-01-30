import {useNavigate} from "react-router-dom";
import {AppBar, Box, Toolbar, IconButton, Typography, Link} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Header = () => {
  let navigate = useNavigate();

  return (
    <Box sx={{width: "100%"}}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" color="inherit" underline="none" sx={{flexGrow: 1}}>
            Mishloha Home Assignment
          </Link>
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
