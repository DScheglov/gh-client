import { fetchUser } from '../api';
import { update } from '../Profile/store';
import { userToState } from '../Profile/mappers';
import { set } from '../common/errors';
import { start, end } from '../common/loading';


export const loadAndSaveUser = (userName, dispatch) => fetchUser(userName)
  .then(userToState)
  .then(update)
  .then(dispatch);

const setError = dispatch => err => dispatch(
  set({ user: err.message === 404 ? 'User not found' : err.message })
);

const startLoading = dispatch => dispatch(
  start('User')
);

const endLoading = dispatch => () => dispatch(
  end('User')
);

export const loadUser = userName => dispatch => (
  startLoading(dispatch),
  loadAndSaveUser(userName, dispatch)
    .catch(setError(dispatch))
    .then(endLoading(dispatch))
);
