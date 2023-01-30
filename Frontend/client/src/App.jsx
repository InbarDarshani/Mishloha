import "./App.css";
import {ContextProvider} from "./components/Context";
import Layout from "./components/Layout";
import ReposList from "./components/ReposList";

function App() {  
  return (
    <ContextProvider>
      <Layout>
        <ReposList />
      </Layout>
    </ContextProvider>
  );
}

export default App;
