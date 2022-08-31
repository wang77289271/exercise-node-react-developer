import { Link, useParams } from 'react-router-dom';
import './style.css';

const Repo = ({ repos }) => {
  const { id } = useParams();
  const repo = repos.find((r) => r.id === Number(id));

  const commitDate = (date) => {
    return new Date(date).toString().split('T')[0];
  };

  if (!repo) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="repo">
      <h1>Details: </h1>
      <div className="repo_detail">
        <p>The most recent commit data is: {commitDate(repo.created_at)}</p>
        <p>Author: {repo.owner.login} </p>
        <p>Message: </p> {/* could not find the data for message... */}
      </div>
      {/* if has readme */}
      <div className="repo_link">
        <Link to="/">Back to List</Link>
      </div>
    </div>
  );
};

export default Repo;

// If the repository has a `README.md` file, it will be located at https://raw.githubusercontent.com/${repo.full_name}/master/README.md. In this case, also render the Markdown content when clicking on the repository

// Include a way to return to the main list of repositories after you click on a repository
