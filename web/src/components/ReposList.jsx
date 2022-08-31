import './style.css';

const ReposList = ({ repos }) => {
  // List repositories in reverse chronological order by creation date
  const newRepos = repos.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  return (
    <div className="repos_list">
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>description</th>
            <th>language</th>
            <th>forks count</th>
          </tr>
          {newRepos.map((repo) => {
            const { id, name, description, language, forks_count } = repo;
            return (
              <tr className="repos_item" key={id}>
                <td>{name}</td>
                <td>{description}</td>
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
// The list of repositories should be displayed in reverse chronological order by creation date.
