import {useNavigate} from "react-router-dom";
import {AppBar, Toolbar, IconButton, Typography, Link} from "@mui/material";
import {styled} from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Header = () => {
  let navigate = useNavigate();
  const Offset = styled("div")(({theme}) => theme.mixins.toolbar);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Link href="/" color="inherit" underline="none" sx={{flexGrow: 1}}>
            <Typography variant="h5" sx={{textShadow: "gray 1px 1px"}}>
              Github Repositories
            </Typography>
          </Link>
          <IconButton color="inherit" onClick={() => navigate("/favorites")}>
            <FavoriteIcon />
            <Typography variant="subtitle1">Favorites</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default Header;
