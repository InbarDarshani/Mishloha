import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Stack, Typography} from "@mui/material";
import RepoCard from "./RepoCard";
import TimeframeFilter from "./TimeframeFilter";
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
      <Stack justifyContent="center" alignItems="center">
        <TimeframeFilter
          onSelect={(selectedTimeframe) => {
            setTimeframe(selectedTimeframe);
            setData([]);
            setPage(1);
            fetchPage();
          }}
        />
        <InfiniteScroll
          dataLength={data.length}
          next={fetchPage}
          hasMore={true}
          loader={<Typography>{isError ? "Error fetching data" : "Loading..."}</Typography>}
          endMessage={<Typography>You have seen it all</Typography>}
        >
          {data.map((repo, index) => (
            <RepoCard repo={repo} key={index} />
          ))}
        </InfiniteScroll>
      </Stack>
    </>
  );
};

export default ReposList;
