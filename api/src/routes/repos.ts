import { Router, Request, Response } from 'express';
import repos_json_data from '../../data/repos.json';
import axios from 'axios';

export const repos = Router();

const url = 'https://api.github.com/users/silverorange/reposasdf';

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  // Fetch github url and concatenate it with the repositoris in JSON file
  const axiosGetData = async () => {
    const resp = await axios.get(url);
    const result = resp.data
      // Concatenate two repositoris and return them where `repository.fork` is `false`
      .concat(repos_json_data)
      .filter((repo: any) => repo.fork === false);

    return result;
  };

  axiosGetData()
    .then((data) => {
      res.status(200).json({ message: 'Request received', data });
    })
    .catch((err) => console.log(err));
});
