import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReposList from './components/ReposList';
import Repo from './components/Repo';
import ErrorPage from './components/ErrorPage';
import { useEffect, useState } from 'react';

export function App() {
  const [repos, setRepos] = useState([]);

  // fetch repository data from 'http://localhost:4000/repos'
  const url = 'http://localhost:4000/repos';
  const getData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setRepos(data);
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(repos);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ReposList />} />
          <Route path="/repo" element={<Repo />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}
