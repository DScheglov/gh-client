import { combineReducers } from 'redux';
import { actionCreator } from '../utils/actions';
import {
  createReducer, mergePayload, lookupReducer,
  batchCreate, batchingReducer
} from '../utils/reducers';
import { createSelector, domainSelector, cacheSelectors } from '../utils/selectors';
import { REDUX_PREFIX } from '../config';
import { getUserByName } from '../Profile';

export const update = actionCreator(`${REDUX_PREFIX}::REPO::UPDATE`);
export const batch = batchCreate(`${REDUX_PREFIX}::REPO::BATCH`);
export const setList = actionCreator(`${REDUX_PREFIX}::REPO-LIST::ADD`);

const initialState = {
  name: '',
  owner: '',
  fullName: '',
  isPrivate: false,
  description: '',
  fork: false,
  stargazersCount: 0,
  language: '',
  license: '',
  forksCount: 0,
  openIssues: 0,
  forks: null,
  pulls: null,
  issues: null,
  activeTab: 'forks',
};

const repo = createReducer(initialState, {
  [update.type]: mergePayload,
});

const nameAsId = ({ payload }) => payload.fullName;

const repos = createReducer({}, {
  [update.type]: lookupReducer(repo, nameAsId)
});

const repoList = createReducer([], {
  [setList.type]: (state, { payload }) => payload.names,
});

const ownerAndPageAsId = ({ payload }) => `${payload.owner}:${payload.page || 1}`;

const userRepos = createReducer({}, {
  [setList.type]: lookupReducer(repoList, ownerAndPageAsId),
});

const mainReducer = combineReducers({ repos, userRepos });

export default {
  repos: batchingReducer(batch.type, mainReducer)
};

export const domain = domainSelector(_ => _.repos);

const reposLookup = createSelector(domain, _ => _.repos);
const usersLookup = createSelector(domain, _ => _.userRepos);

const listId = (user, userName) => `${userName}:${user && user.page || 1}`;

const getUserRepoList = createSelector(
  usersLookup, getUserByName, (_, userName) => userName,
  (lists, user, userName) => lists[listId(user, userName)]
);

const dedicatedSelector = cacheSelectors(x => x);

export const getUserRepos = dedicatedSelector(
  reposLookup, getUserRepoList,
  (lookup, list) => list && list.map(name => lookup[name])
);

export const getRepoByFullName = createSelector(
  reposLookup, (_, userName, repoName) => `${userName}/${repoName}`,
  (lookup, fullName) => lookup[fullName]
);
