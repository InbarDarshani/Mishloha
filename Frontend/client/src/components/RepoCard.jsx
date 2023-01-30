import React, {useCallback, useContext, useEffect, useState} from "react";
import {Box, Card, CardContent, CardActions, CardMedia, Typography, Avatar, Button, CardActionArea, Modal, ToggleButton, Link} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Context} from "./Context";

const RepoCard = ({repo}) => {
  const {toggleFavorite, getIsFavorite} = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <RepoDetailsModal repo={repo} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Card variant="outlined" sx={{width: "auto", textAlign: "center"}}>
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
            <FavoriteIcon /> Add to favorites repositories
          </ToggleButton>
        </CardActions>
      </Card>
    </>
  );
};

const RepoDetailsModal = ({repo, isOpen, onClose}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={isOpen} onClose={onClose} sx={{}}>
      <Box sx={style}>
        <Typography>Language: {repo.language ? repo.language : "Unspecified"}</Typography>
        <Typography>Forks: {repo.forksCount}</Typography>
        <Typography>Creation Date: {new Date(repo.creationDate).toLocaleDateString()}</Typography>
        <Button>
          <Link href={repo.url}>Link to the repository</Link>
        </Button>
      </Box>
    </Modal>
  );
};

export default RepoCard;
