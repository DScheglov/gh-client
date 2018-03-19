import React from 'react';
import { connect } from 'react-redux';

import { isTaskLoading } from '../common/loading';
import { getRepoByFullName } from '../RepoList';
import { loadPulls } from '../thunks/pulls';
import Loader from '../Loader';
import MessageCard from '../MessageCard';

import PullListItem from './PullListItem';

const PullListPure = ({ pulls }) => (
  <div className="list-group list-group-flush">
    { pulls && pulls.map(PullListItem) || null }
  </div>
);

const NoPulls = ({ userName, repoName }) => (
  <MessageCard title={<strong>No Pulls</strong>} className="border-light md-3">
    There is no Pull Requests to repo <strong>{userName} / {repoName}</strong>
  </MessageCard>
);

const SmartPullList = props => (
  props.pullsLoading ? <Loader /> :
  props.pulls && props.pulls.length === 0 ? <NoPulls {...props} /> :
  <PullListPure {...props} />
);

const state2Props = (state, { userName, repoName }) => ({
  repo: getRepoByFullName(state, userName, repoName),
  pullsLoading: isTaskLoading(state, 'Pulls'),
});

const dispatch2Props = { loadPulls };

const mergeProps = (state, actions, own) => ({
  ...own,
  ...state,
  pulls: state.repo && state.repo.pulls,
  isReady: (
    state.repo && state.repo.pulls ||
    own.userName && state.repo && actions.loadPulls(own.userName, own.repoName)
  ),
});

const PullList = connect(state2Props, dispatch2Props, mergeProps)(SmartPullList);

export default PullList;
