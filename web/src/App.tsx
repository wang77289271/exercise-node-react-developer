import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReposList from './components/ReposList';
import Repo from './components/Repo';
import ErrorPage from './components/ErrorPage';

export function App() {
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
