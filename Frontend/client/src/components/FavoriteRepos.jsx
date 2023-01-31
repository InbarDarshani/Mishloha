import {useContext} from "react";
import {Context} from "./Context";
import {Box, Typography} from "@mui/material";
import RepoCard from "./RepoCard";

const FavoriteRepos = () => {
  const {favoriteRepos} = useContext(Context);

  if (favoriteRepos.length === 0) return <Typography>No favorite repositories</Typography>;
  else
    return (
      <>
        {favoriteRepos.map((repo, index) => (
          <Box key={index} data-repo-id={repo.id}>
            <RepoCard repo={repo} />
          </Box>
        ))}
      </>
    );
};

export default FavoriteRepos;
