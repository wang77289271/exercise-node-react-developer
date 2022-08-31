import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReposList from './components/ReposList';
import Repo from './components/Repo';
import ErrorPage from './components/ErrorPage';
import { useEffect, useState } from 'react';

export function App() {
  const [repos, setRepos] = useState([]);
  const [isError, setIsError] = useState(false);

  // Fetch repository data from 'http://localhost:4000/repos'
  // Check if the data is received successfully
  const url = 'http://localhost:4000/repos';
  const getData = async () => {
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        setRepos(data);
      } else {
        throw new Error('error');
      }
    } catch (err) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(repos);

  return (
    <div className="App">
      {!isError ? (
        <Router>
          <Routes>
            <Route path="/" element={<ReposList />} />
            <Route path="/repo" element={<Repo />} />
          </Routes>
        </Router>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}
