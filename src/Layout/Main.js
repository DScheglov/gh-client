import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { getError } from '../common/errors';
import { isTaskLoading } from '../common/loading';
import Profile from '../Profile';
import Loader from '../Loader';
import MessageCard from '../MessageCard';
import Repos from '../Repos';
import RepoDetails from '../RepoDetails';

const ReposList = ({ userName, repoLoading }) => (
  <div className="col-sm-9">
    {repoLoading ? <Loader /> : <Repos userName={userName} />}
  </div>
);

const Main = ({ userName, repoLoading }) => (
  <div className="row">
    <div className="col-sm-3">
      <Profile userName={userName} />
    </div>
    <Route
      exact
      path={`/${userName}`}
      component={() => <ReposList userName={userName} repoLoading={repoLoading} />}
    />
    <Route path="/:userName/:repoName" component={RepoDetails} />
  </div>
);

const UserNotFound = ({ userName }) => (
  <MessageCard title={<strong>User Not Found</strong>}>
    {`Couldn't find user with name "${userName}"`}
  </MessageCard>
);

const SmartMain = props => (
  props.error != null ? <UserNotFound {...props} /> :
  props.userLoading ? <Loader /> :
  <Main {...props} />
);

const state2Props = (state, { match }) => ({
  userName: match.params.userName,
  error: getError(state).user,
  userLoading: isTaskLoading(state, 'User'),
  repoLoading: isTaskLoading(state, 'Repos'),
});

export default connect(state2Props)(SmartMain);
