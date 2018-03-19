import { fetchRepo } from '../api';
import { update } from '../RepoList/store';
import { repoToState } from '../RepoList/mappers';
import { set } from '../common/errors';
import { start, end } from '../common/loading';


export const loadAndSaveRepo = (userName, repoName, dispatch) => fetchRepo(userName, repoName)
  .then(repoToState)
  .then(update)
  .then(dispatch);

const setError = dispatch => err => dispatch(
  set({ repo: err.message === 404 ? 'Repo not found' : err.message })
);

const startLoading = dispatch => dispatch(
  start('Repo')
);

const endLoading = dispatch => () => dispatch(
  end('Repo')
);

export const loadRepo = (userName, repoName) => dispatch => (
  startLoading(dispatch),
  loadAndSaveRepo(userName, repoName, dispatch)
    .catch(setError(dispatch))
    .then(endLoading(dispatch))
);
