import React from 'react';
import { connect } from 'react-redux';

import { getUserByName, update } from '../Profile';
import { loadRepos } from '../thunks/repos';
import Paginator from '../Paginator';

import { getUserRepos } from './store';
import RepoListItem from './RepoListItem';

const RepoListPure = ({ page, pages, repos, switchPage }) => (
  <React.Fragment>
    <div className="list-group list-group-flush">
      { repos && repos.map(RepoListItem) || null }
    </div>
    <br />
    <Paginator currentPage={page} pages={pages} onPageSelected={switchPage} />
  </React.Fragment>
);

const state2Props = (state, { userName }) => ({
  ...getUserByName(state, userName),
  repos: getUserRepos(state, userName) || null,
});

const dispatch2Props = {
  update,
  loadRepos,
};

const mergeProps = (state, actions, own) => ({
  ...own,
  ...state,
  isReady: (
    state.repos ||
    own.userName && state.login && actions.loadRepos(own.userName, state.page)
  ),
  switchPage: page => actions.update({ login: own.userName, page }),
});

const RepoList = connect(state2Props, dispatch2Props, mergeProps)(RepoListPure);

export default RepoList;
