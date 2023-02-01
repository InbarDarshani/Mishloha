import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Stack, Typography, TextField, InputAdornment, LinearProgress, Box} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RepoCard from "./RepoCard";
import TimeframeFilter from "./TimeframeFilter";
import axios from "../utils/axios";

const ReposList = () => {
  const [timeframe, setTimeframe] = useState(1);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false); // to indicate whether there is an error fetching data from API
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false); // to indicate whether there is a search input

  // Fetch first page
  useEffect(() => {
    fetchPage();
  }, [timeframe]);

  // Fetch page from API
  const fetchPage = () => {
    //if (isSearching) return;
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

  // Filter repositories by name or description according to the user input
  const filteredData = data.filter((repo) => repo.name.toLowerCase().includes(searchTerm.toLowerCase()) || repo.description.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsSearching(event.target.value !== "");
  };

  const handleTimeframeSelect = (selectedTimeframe) => {
    setTimeframe(selectedTimeframe);
    setData([]);
    setPage(1);
  };

  // Component to show while InfiniteScroll component is waiting for data fetch
  const Loader = () => {
    if (isError) return <Typography>Error fetching data from server</Typography>;
    if (data.length !== 0 && filteredData.length === 0) return <Typography>No results</Typography>;
    return <LinearProgress color="secondary" sx={{mt: 5, mb: 5, minWidth: "300px"}} />;
  };

  return (
    <Stack justifyContent="center" alignItems="center">
      <TimeframeFilter onSelect={handleTimeframeSelect} />
      <TextField
        fullWidth
        placeholder="Search"
        margin="normal"
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <InfiniteScroll dataLength={filteredData.length} next={fetchPage} hasMore={true} loader={<Loader />} endMessage={<Typography>You have seen it all</Typography>}>
        {filteredData.map((repo, index) => (
          <RepoCard repo={repo} key={index} />
        ))}
      </InfiniteScroll>
    </Stack>
  );
};

export default ReposList;
