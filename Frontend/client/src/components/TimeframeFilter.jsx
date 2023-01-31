import {useState} from "react";
import {Box, Typography, MenuItem, Select, Divider} from "@mui/material";

const TimeframeFilter = ({onSelect}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState(1);
  const handleSelect = (event) => {
    setSelectedTimeframe(event.target.value);
    onSelect(event.target.value);
  };

  const style = {
    width: "100%",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <Box sx={style}>
        <Typography sx={{mr: 1, alignSelf: "center"}}>Repositories created at the past</Typography>
        <Select value={selectedTimeframe} onChange={handleSelect} variant="standard">
          <MenuItem value={1}>Day</MenuItem>
          <MenuItem value={2}>Week</MenuItem>
          <MenuItem value={3}>Month</MenuItem>
        </Select>
      </Box>
      <Divider flexItem sx={{m: 1}} />
    </>
  );
};

export default TimeframeFilter;
