import React from 'react';
import { connect } from 'react-redux';

import { isTaskLoading } from '../common/loading';
import { getRepoByFullName } from '../RepoList';
import { loadForks } from '../thunks/forks';
import Loader from '../Loader';
import MessageCard from '../MessageCard';

import ForkListItem from './ForkListItem';

const ForkListPure = ({ forks }) => (
  <div className="list-group list-group-flush">
    { forks && forks.map(ForkListItem) || null }
  </div>
);

const NoForks = ({ userName, repoName }) => (
  <MessageCard title={<strong>No Forks</strong>} className="border-light md-3">
    There is no forks of repo <strong>{userName} / {repoName}</strong>
  </MessageCard>
);

const SmartForkList = props => (
  props.forksLoading ? <Loader /> :
  props.forks && props.forks.length === 0 ? <NoForks {...props} /> :
  <ForkListPure {...props} />
);

const state2Props = (state, { userName, repoName }) => ({
  repo: getRepoByFullName(state, userName, repoName),
  forksLoading: isTaskLoading(state, 'Forks'),
});

const dispatch2Props = { loadForks };

const mergeProps = (state, actions, own) => ({
  ...own,
  ...state,
  forks: state.repo && state.repo.forks,
  isReady: (
    state.repo && state.repo.forks ||
    own.userName && state.repo && actions.loadForks(own.userName, own.repoName)
  ),
});

const ForkList = connect(state2Props, dispatch2Props, mergeProps)(SmartForkList);

export default ForkList;
