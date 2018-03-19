import { fetchUserRepos } from '../api';
import { update, setList, batch } from '../RepoList/store';
import { reposToState } from '../RepoList/mappers';
import { set } from '../common/errors';
import { start, end } from '../common/loading';
import { pipe } from '../utils/funcs';

const mapRepos = (userName, page) => repos => pipe(
  reposToState(repos, update),
  ([reposActions, names]) => [
    ...reposActions,
    setList({ owner: userName, page, names })
  ]
);

export const loadAndSaveRepos = (userName, page, dispatch) => fetchUserRepos(userName, page)
  .then(mapRepos(userName, page))
  .then(batch)
  .then(dispatch);

const setError = dispatch => err => dispatch(
  set({ user: err.message === 404 ? 'User not found' : err.message })
);

const startLoading = dispatch => dispatch(
  start('Repos')
);

const endLoading = dispatch => () => dispatch(
  end('Repos')
);

export const loadRepos = (userName, page) => dispatch => (
  startLoading(dispatch),
  loadAndSaveRepos(userName, page, dispatch)
    .catch(setError(dispatch))
    .then(endLoading(dispatch))
);
