import { useEffect, useState } from 'react';
import './style.css';

const defaultLanguage = 'Select Language';

const ReposList = ({ repos }) => {
  const [reposData, setReposData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  // List repositories in reverse chronological order by creation date
  const newRepos = repos.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // Get languages type from repositories, and remove dulicated languages
  const languageList = [];
  for (let i = 0; i < repos.length - 1; i++) {
    if (languageList.indexOf(repos[i].language) === -1) {
      languageList.push(repos[i].language);
    }
  }

  useEffect(() => {
    // Filter list by language type
    const getList = () => {
      if (selectedLanguage !== defaultLanguage) {
        const newList = newRepos.filter(
          (e) => e.language === `${selectedLanguage}`
        );
        setReposData(newList);
      } else {
        setReposData(newRepos);
      }
    };
    getList();
  }, [newRepos, selectedLanguage]);

  return (
    <div className="repos_list">
      <div className="repos_select">
        <span>Select Language Type: </span>
        <select onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value={defaultLanguage}>{defaultLanguage}</option>
          {languageList.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>description</th>
            <th>language</th>
            <th>forks count</th>
          </tr>
          {reposData.map((repo) => {
            const { id, name, description, language, forks_count } = repo;
            return (
              <tr className="repos_item" key={id}>
                <td>{name}</td>
                <td>
                  {description === null ? (
                    <span>No description</span>
                  ) : (
                    description
                  )}
                </td>
                <td>{language}</td>
                <td>{forks_count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReposList;
// Add buttons for each language type. Make clicking on a language button filter the list by language type
