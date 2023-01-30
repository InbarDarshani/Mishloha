import React, {useEffect, useState} from "react";
import {Box, Typography, MenuItem, Select} from "@mui/material";
import RepoCard from "./RepoCard";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../utils/axios";

const ReposList = () => {
  const [timeframe, setTimeframe] = useState(1);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = () => {
    axios
      .get(`GithubRepo?timeframe=${timeframe}&page=${page}`)
      .then((res) => {
        setIsError(false);
        setData([...data, ...res.data]);
        setPage(page + 1);
        return res.data;
      })
      .catch((err) => {
        console.log("Error fetching page", page, err);
        setIsError(true);
      });
  };

  return (
    <>
      <TimeframeFilter
        onSelect={(selectedTimeframe) => {
          setTimeframe(selectedTimeframe);
          setData([]);
          setPage(1);
          fetchPage();
        }}
      />
      <InfiniteScroll dataLength={data.length} next={fetchPage} hasMore={true} loader={isError ? <Typography>Error fetching data</Typography> : <Typography>Loading...</Typography>} endMessage={<Typography>You have seen it all</Typography>}>
        {data.map((repo, index) => (
          <Box key={index} data-repo-id={repo.id}>
            <RepoCard repo={repo} />
          </Box>
        ))}
      </InfiniteScroll>
    </>
  );
};

const TimeframeFilter = ({onSelect}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState(1);
  const handleSelect = (event) => {
    setSelectedTimeframe(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <Box sx={{display: "inline-flex"}}>
      <Typography sx={{mr: 1, alignSelf: "center"}}>Repositories Created at the past</Typography>
      <Select value={selectedTimeframe} onChange={handleSelect} variant="standard">
        <MenuItem value={1}>Day</MenuItem>
        <MenuItem value={2}>Week</MenuItem>
        <MenuItem value={3}>Month</MenuItem>
      </Select>
    </Box>
  );
};

export default ReposList;
