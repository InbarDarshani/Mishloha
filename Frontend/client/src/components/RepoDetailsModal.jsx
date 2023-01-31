import {Typography, Modal, IconButton, Tooltip, Stack} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const RepoDetailsModal = ({repo, isOpen, onClose}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 10,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Stack sx={style} spacing={1}>
        <Typography>
          <b> Creation Date:</b> {new Date(repo.creationDate).toLocaleDateString()}
        </Typography>
        <Typography>
          <b> Language:</b> {repo.language ? repo.language : "Unspecified"}
        </Typography>
        <Typography>
          <b> Forks:</b> {repo.forksCount}
        </Typography>
        <IconButton href={repo.url} target="_blank">
          <Tooltip title="View Repository">
            <GitHubIcon />
          </Tooltip>
        </IconButton>
      </Stack>
    </Modal>
  );
};

export default RepoDetailsModal;
