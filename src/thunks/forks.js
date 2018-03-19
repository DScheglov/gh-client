import { fetchForks } from '../api';
import { update } from '../RepoList/store';
import { repoToState } from '../RepoList/mappers';
import { set } from '../common/errors';
import { start, end } from '../common/loading';


export const loadAndSaveForks = (userName, repoName, dispatch) => fetchForks(userName, repoName)
  .then(forks => forks.map(repoToState))
  .then(forks => ({ fullName: `${userName}/${repoName}`, forks }))
  .then(update)
  .then(dispatch);

const setError = dispatch => err => dispatch(
  set({ repo: err.message === 404 ? 'Repo not found' : err.message })
);

const startLoading = dispatch => dispatch(
  start('Forks')
);

const endLoading = dispatch => () => dispatch(
  end('Forks')
);

export const loadForks = (userName, repoName) => dispatch => (
  startLoading(dispatch),
  loadAndSaveForks(userName, repoName, dispatch)
    .catch(setError(dispatch))
    .then(endLoading(dispatch))
);
