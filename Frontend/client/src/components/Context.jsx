import React, {createContext, useState, useEffect} from "react";

const Context = createContext();

const ContextProvider = ({children}) => {
  const [favoriteRepos, setFavoriteRepos] = useState(() => {
    // Initialize the favorite repositories from local storage
    const existing = JSON.parse(localStorage.getItem("favoriteRepos"));
    if (existing) return existing;
    else return [];
  });

  // Syncing the favorite repositories to local storage
  useEffect(() => {
    localStorage.setItem("favoriteRepos", JSON.stringify(favoriteRepos));
  }, [favoriteRepos]);

  // Adding\Removng a repository from favorites
  const toggleFavorite = (repo) => {
    const found = favoriteRepos.some((item) => item.id === repo.id);
    if (found) setFavoriteRepos((pre) => pre.filter((item) => item.id !== repo.id));
    else setFavoriteRepos((pre) => [...pre, repo]);
  };
  // Checking if a repository is in favorites
  const getIsFavorite = (id) => favoriteRepos.some((item) => item.id === id);

  return <Context.Provider value={{favoriteRepos, toggleFavorite, getIsFavorite}}>{children}</Context.Provider>;
};

export {ContextProvider, Context};
