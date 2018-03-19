import { actionCreator } from '../utils/actions';
import { createReducer, mergePayload, lookupReducer } from '../utils/reducers';
import { createSelector, domainSelector } from '../utils/selectors';
import { REDUX_PREFIX } from '../config';

export const update = actionCreator(`${REDUX_PREFIX}::PROFILE::UPDATE`);

const initialState = {
  name: '',
  login: '',
  avatarUrl: '',
  company: '',
  location: '',
  email: null,
  publicRepos: 0,
  followers: 0,
  page: 1,
  pages: 0,
};

const userProfile = createReducer(initialState, {
  [update.type]: mergePayload,
});

const loginAsId = ({ payload }) => payload.login;

const userProfiles = createReducer({}, {
  [update.type]: lookupReducer(userProfile, loginAsId)
});

export default { userProfiles };

export const domain = domainSelector(_ => _.userProfiles);

export const getUserByName = createSelector(
  domain, (_, login) => login,
  (users, login) => users[login]
);
