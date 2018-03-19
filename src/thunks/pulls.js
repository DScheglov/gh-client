import { fetchPulls } from '../api';
import { update } from '../RepoList/store';
import { pullToState } from '../Pulls/mappers';
import { set } from '../common/errors';
import { start, end } from '../common/loading';


export const loadAndSavePulls = (userName, repoName, dispatch) => fetchPulls(userName, repoName)
  .then(pulls => pulls.map(pullToState))
  .then(pulls => ({ fullName: `${userName}/${repoName}`, pulls }))
  .then(update)
  .then(dispatch);

const setError = dispatch => err => dispatch(
  set({ repo: err.message === 404 ? 'Repo not found' : err.message })
);

const startLoading = dispatch => dispatch(
  start('Pulls')
);

const endLoading = dispatch => () => dispatch(
  end('Pulls')
);

export const loadPulls = (userName, repoName) => dispatch => (
  startLoading(dispatch),
  loadAndSavePulls(userName, repoName, dispatch)
    .catch(setError(dispatch))
    .then(endLoading(dispatch))
);
