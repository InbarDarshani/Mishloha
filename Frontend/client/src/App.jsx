import "./App.css";
import {ContextProvider} from "./components/Context";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {Container, Typography} from "@mui/material";
import Layout from "./components/Layout";
import Home from "./components/Home";
import FavoriteRepos from "./components/FavoriteRepos";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<FavoriteRepos />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

const NoMatch = () => {
  return (
    <Container>
      <Typography variant="h5">Nothing to see here!</Typography>
      <Typography variant="p">
        <Link to="/">Go to the home page</Link>
      </Typography>
    </Container>
  );
};

export default App;
