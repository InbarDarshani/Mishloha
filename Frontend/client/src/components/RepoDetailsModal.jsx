import {Box, Typography, Button, Modal, Link} from "@mui/material";

const RepoDetailsModal = ({repo, isOpen, onClose}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography>Creation Date: {new Date(repo.creationDate).toLocaleDateString()}</Typography>
        <Typography>Language: {repo.language ? repo.language : "Unspecified"}</Typography>
        <Typography>Forks: {repo.forksCount}</Typography>
        <Button>
          <Link href={repo.url}>Link to the repository</Link>
        </Button>
      </Box>
    </Modal>
  );
};

export default RepoDetailsModal;
