import React, {useContext, useState} from "react";
import {Box, Card, CardContent, CardActions, Typography, Avatar, CardActionArea, ToggleButton} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Context} from "./Context";
import RepoDetailsModal from "./RepoDetailsModal";

const RepoCard = ({repo}) => {
  const {toggleFavorite, getIsFavorite} = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <RepoDetailsModal repo={repo} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Card variant="outlined" sx={{textAlign: "center", m: 1}}>
        <CardActionArea onClick={() => setIsOpen(true)}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {repo.name}
            </Typography>
            <Box sx={{display: "inline-flex"}}>
              <Avatar src={repo.avatarUrl} />
              <Typography>{repo.username}</Typography>
            </Box>
            <Typography variant="subtitle">{repo.starsCount} Stars</Typography>
            <Typography variant="body2">{repo.description ? repo.description : "No Description"}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <ToggleButton value="favorite" selected={getIsFavorite(repo.id)} onChange={() => toggleFavorite(repo)}>
            <FavoriteIcon /> {getIsFavorite(repo.id) ? "Remove from favorites" : "Add to favorites"}
          </ToggleButton>
        </CardActions>
      </Card>
    </>
  );
};

export default RepoCard;
