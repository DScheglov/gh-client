import { fetchIssues } from '../api';
import { update } from '../RepoList/store';
import { pullToState } from '../Pulls/mappers';
import { set } from '../common/errors';
import { start, end } from '../common/loading';


export const loadAndSaveIssues = (userName, repoName, dispatch) => fetchIssues(userName, repoName)
  .then(issues => issues.map(pullToState))
  .then(issues => ({ fullName: `${userName}/${repoName}`, issues }))
  .then(update)
  .then(dispatch);

const setError = dispatch => err => dispatch(
  set({ repo: err.message === 404 ? 'Repo not found' : err.message })
);

const startLoading = dispatch => dispatch(
  start('Issues')
);

const endLoading = dispatch => () => dispatch(
  end('Issues')
);

export const loadIssues = (userName, repoName) => dispatch => (
  startLoading(dispatch),
  loadAndSaveIssues(userName, repoName, dispatch)
    .catch(setError(dispatch))
    .then(endLoading(dispatch))
);
