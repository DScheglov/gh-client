import React from 'react';
import { connect } from 'react-redux';

import { getUserByName } from '../Profile';
import MessageCard from '../MessageCard';

import RepoList from '../RepoList';

const Repos = ({ userName }) => (
  <div>
    <ol className="breadcrumb">
      <li className="breadcrumb-item active" aria-current="page">Repositories</li>
    </ol>
    <RepoList userName={userName} />
  </div>
);

const NoRepos = ({ userName }) => (
  <MessageCard title={<strong>No Repositories</strong>}>
    User <strong>{userName}</strong> has no public repository
  </MessageCard>
);

const state2Props = (state, { userName }) => ({
  user: getUserByName(state, userName)
});

const SmartRepos = props => (
  props.user && props.user.publicRepos < 1
    ? <NoRepos {...props} />
    : <Repos {...props} />
);

export default connect(state2Props)(SmartRepos);
