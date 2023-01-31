
# Mishloha Home Assignment

## Overview
This project is a full-stack web application, consisting of a backend API built with .NET Core 6 and a frontend built with React 18 styled with Material UI (MUI) components.

This application displays the most trending repositories on GitHub that were created in the last day, last week or last month according to the user selection, it also allows the user to manage a list of favorite repositories saved locally in the browser.

## Backend
The backend API is built with .NET Core 6 with the following architecture:

**GithubRepoController**
Exposes endpoints for communication with the frontend: 

    GET ​/api​/GithubRepo?timeframe={timeframe}&page={page}

**Service Layer - GithubRepoService**
Interacts with Github API and replies with relevant data.

    SearchByTimeframe(Enums.Timeframe timeframe, int page)

**Application Data Model - GithubRepo**
Holds the necessary properties for representing a Github repository.

## Frontend
The frontend is built with React and makes use of Material UI (MUI) for UI components and Axios for communication with the backend API.

**Main components**
-   ReposList
-   RepoCard
-   RepoDetailsModal
-   FavoriteRepos
    
**Main libraries in use**
-   Material UI (MUI) v5 - Common used library for a simple react components design
-   Axios - Promise based HTTP client, used for communication
-   React-infinite-scroll-component - Used for implementing the repositories list infinite scroll and pagination

## Next steps and improvements
-   Implement search for the repositories list
-   Consider total amount of repositories replied by Github API in the pagination logic
-   Adding error logger to the backend
-   Better object modelling for the Github API response
-   Detailed HTTP response to the client for better error handling

## Running the Application

### Backend
To run the backend API, follow these steps:
1.  Navigate to the backend directory
2.  Restore necessary packages using dotnet restore
3.  Build the solution using dotnet build
4.  Run the API using dotnet run
   
### Frontend
To run the frontend, follow these steps:
1.  Navigate to the frontend directory
2.  Install necessary packages using npm install
3. Start the application using npm start
