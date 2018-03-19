import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';

import App from './Layout';
import * as UserName from './UserNameForm';
import * as Profile from './Profile';
import * as RepoList from './RepoList';
import Loading from './common/loading';
import Errors from './common/errors';
import { history } from './history';

export const reducers = {
  ...UserName.reducers,
  ...Profile.reducers,
  ...RepoList.reducers,
  ...Loading,
  ...Errors,
  routing: routerReducer,
};

export const middlewares = [
  thunk, routerMiddleware(history), logger
];
export default App;

