import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getRepoByFullName, update } from '../RepoList';
import { getUserByName } from '../Profile';
import { loadRepo } from '../thunks/repo';
import { getError } from '../common/errors';
import { isTaskLoading } from '../common/loading';

import Loader from '../Loader';
import MessageCard from '../MessageCard';
import Forks from '../Forks';
import Pulls from '../Pulls';
import Issues from '../Issues';

const Tab = ({ tab, activeTab, switchTab, children }) => (
  <li className="nav-item">
    <a
      className={`nav-link ${tab === activeTab ? 'active' : ''}`}
      href="/"
      onClick={switchTab(tab)}
    >
      { children }
    </a>
  </li>
);

const TabPane = ({ tab, activeTab, children }) => activeTab === tab && (
  <div
    className={`tab-pane ${tab === activeTab ? 'active' : ''}`}
    role="tabpanel"
    aria-labelledby="home-tab"
  >
    {children}
  </div>
) || null;

const RepoDetails = ({ userName, repoName, repo, switchTab }) => (
  <div className="col-sm-9">
    <ol className="breadcrumb">
      <li className="breadcrumb-item" aria-current="page">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link to={`/${userName}`}>Repositories</Link>
      </li>
      <li className="breadcrumb-item active" aria-current="page">{repoName}</li>
    </ol>
    {repo &&
      <div className="card border-light mb-3">
        <small className="text-muted">
          Language: { repo.language }
          {' | '}
          Is Fork: {repo.fork ? 'yes' : 'no'}
          {' | '}
          Stars: {repo.stargazersCount}
          {' | '}
          Forks: {repo.forksCount}
        </small>
        <h5 className="card-title">{repo.name}</h5>
        <p className="card-text">{repo.description}</p>
        <ul className="nav nav-tabs">
          <Tab activeTab={repo.activeTab} switchTab={switchTab} tab="forks">
            Forks
          </Tab>
          <Tab activeTab={repo.activeTab} switchTab={switchTab} tab="pulls">
            Pull Requests
          </Tab>
          <Tab activeTab={repo.activeTab} switchTab={switchTab} tab="issues">
            Issues
          </Tab>
        </ul>
        <div className="tab-content">
          <TabPane activeTab={repo.activeTab} tab="forks">
            <Forks userName={userName} repoName={repoName} />
          </TabPane>
          <TabPane activeTab={repo.activeTab} tab="pulls">
            <Pulls userName={userName} repoName={repoName} />
          </TabPane>
          <TabPane activeTab={repo.activeTab} tab="issues">
            <Issues userName={userName} repoName={repoName} />
          </TabPane>
        </div>
      </div>
    }
  </div>
);

const NoRepo = ({ userName, repoName }) => (
  <div className="col-sm-9">
    <MessageCard title={<strong>Repository Not Found</strong>}>
      Repository <strong>{userName}/{repoName}</strong>
      {' is private or doesn\'t exist'}
    </MessageCard>
  </div>
);

const SmartRepoDetails = props => (
  props.error ? <NoRepo {...props} /> :
  props.repoLoading ? <Loader /> :
  <RepoDetails {...props} />
);

const state2Props = (state, { match }) => ({
  ...match.params,
  repo: getRepoByFullName(state, match.params.userName, match.params.repoName),
  repoLoading: isTaskLoading(state, 'repo'),
  error: getError(state).repo,
  user: getUserByName(state, match.params.userName),
});

const dispatchToProps = ({ update, loadRepo });
const mergeProps = (state, actions, own) => ({
  ...own,
  ...state,
  isRepoReady: (
    state.repo ||
    state.userName &&
    state.repoName &&
    !state.error &&
    state.user &&
    actions.loadRepo(state.userName, state.repoName)
  ),
  switchTab: tab => event => {
    if (state.repo) {
      actions.update({ fullName: state.repo.fullName, activeTab: tab });
    }
    event.preventDefault();
  },
});

export default connect(state2Props, dispatchToProps, mergeProps)(SmartRepoDetails);
