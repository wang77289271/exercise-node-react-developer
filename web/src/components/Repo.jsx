import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import ReactMarkDown from 'markdown-to-jsx';

const Repo = ({ repos }) => {
  const [readme, setReadme] = useState('');
  const [hasReadMe, setHasReadMe] = useState(false);
  const [displayReadme, setDisplayReadme] = useState('none');
  const { id } = useParams();
  const repo = repos.find((r) => r.id === Number(id));

  const commitDate = (date) => {
    return date.toString().split('T')[0];
  };

  useEffect(() => {
    const getData = async () => {
      if (repo) {
        try {
          const res = await fetch(
            `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`
          );
          if (res.status === 200) {
            const mdData = await res.text();
            setReadme(mdData);
            setHasReadMe(true);
          }
        } catch (err) {
          throw new Error('error');
        }
      }
    };
    getData();
  }, [repo]);

  const toggleDisplayReadme = () => {
    if (displayReadme === 'none') {
      setDisplayReadme('block');
    }
    if (displayReadme === 'block') {
      setDisplayReadme('none');
    }
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
      {hasReadMe ? (
        <div className="markdown">
          <button onClick={toggleDisplayReadme}>README.md</button>
          <div className="markdown_content" style={{ display: displayReadme }}>
            <ReactMarkDown children={readme} />
          </div>
        </div>
      ) : (
        <p>* No readme file found</p>
      )}

      <div className="repo_link">
        <Link to="/">Back to List</Link>
      </div>
    </div>
  );
};

export default Repo;

// If the repository has a `README.md` file, it will be located at https://raw.githubusercontent.com/${repo.full_name}/master/README.md. In this case, also render the Markdown content when clicking on the repository

// Include a way to return to the main list of repositories after you click on a repository
