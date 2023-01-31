import {useContext, useState} from "react";
import {Context} from "./Context";
import RepoDetailsModal from "./RepoDetailsModal";
import {Stack, Card, CardContent, CardActions, Typography, Avatar, CardActionArea, IconButton, Tooltip, Chip} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const RepoCard = ({repo}) => {
  const {toggleFavorite, getIsFavorite} = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <RepoDetailsModal repo={repo} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Card variant="outlined" sx={{textAlign: "center", m: 1, maxWidth: 1000}}>
        <Tooltip title="Click to open repository details">
          <CardActionArea onClick={() => setIsOpen(true)}>
            <CardContent>
              <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                <Typography variant="h5">{repo.name}</Typography>
                <Chip avatar={<Avatar src={repo.avatarUrl} />} label={repo.username} />
                <Typography variant="body2">{repo.description ? repo.description : "No Description"}</Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Tooltip>
        <CardActions sx={{justifyContent: "space-between", p: 0, pl: 2, pr: 2, backgroundColor: "primary.light"}}>
          <IconButton onClick={() => toggleFavorite(repo)} sx={{border: 0, color: "red"}}>
            {getIsFavorite(repo.id) ? (
              <Tooltip title="Remove from favorites">
                <FavoriteIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Add to favorites">
                <FavoriteBorderIcon />
              </Tooltip>
            )}
          </IconButton>
          <Stack direction="row" alignItems="center">
            <StarOutlineIcon />
            <Typography>{repo.starsCount} Stars</Typography>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};

export default RepoCard;
