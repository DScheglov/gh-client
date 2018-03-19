import React from 'react';
import { connect } from 'react-redux';

import { isTaskLoading } from '../common/loading';
import { getRepoByFullName } from '../RepoList';
import { loadIssues } from '../thunks/issues';
import Loader from '../Loader';
import MessageCard from '../MessageCard';

import IssueListItem from './IssueListItem';

const IssueListPure = ({ issues }) => (
  <div className="list-group list-group-flush">
    { issues && issues.map(IssueListItem) || null }
  </div>
);

const NoIssues = ({ userName, repoName }) => (
  <MessageCard title={<strong>No Issues</strong>} className="border-light md-3">
    There is no Issues in repo <strong>{userName} / {repoName}</strong>
  </MessageCard>
);

const SmartIssueList = props => (
  props.issuesLoading ? <Loader /> :
  props.issues && props.issues.length === 0 ? <NoIssues {...props} /> :
  <IssueListPure {...props} />
);

const state2Props = (state, { userName, repoName }) => ({
  repo: getRepoByFullName(state, userName, repoName),
  issuesLoading: isTaskLoading(state, 'Issues'),
});

const dispatch2Props = { loadIssues };

const mergeProps = (state, actions, own) => ({
  ...own,
  ...state,
  issues: state.repo && state.repo.issues,
  isReady: (
    state.repo && state.repo.issues ||
    own.userName && state.repo && actions.loadIssues(own.userName, own.repoName)
  ),
});

const IssueList = connect(state2Props, dispatch2Props, mergeProps)(SmartIssueList);

export default IssueList;
