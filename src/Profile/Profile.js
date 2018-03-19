import React from 'react';
import { connect } from 'react-redux';

import { getUserByName } from './store';
import { loadUser } from '../thunks/profile';

const ProfilePure = ({ userName, user }) => user && (
  <div className="card">
    <img
      alt={userName}
      title={userName}
      src={user.avatarUrl}
      className="card-img"
    />
    <div className="card-body">
      <h5 className="card-title">{user.name}</h5>
      {user.email &&
        <h6 className="card-subtitle">
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </h6>
      }
      <h6 className="card-subtitle">{user.login}</h6>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        Repositories{' '}
        <span className="badge badge-primary float-right mt-2">{user.publicRepos}</span>
      </li>
      <li className="list-group-item">
        Followers{' '}
        <span className="badge badge-primary float-right mt-2">{user.followers}</span>
      </li>
    </ul>
    <div className="card-body">
      { user.company && <p className="card-text">{user.company}</p> }
      { user.location && <p className="card-text">{user.location}</p> }
      { user.bio && <p className="card-text">{user.bio}</p> }
    </div>
  </div>
);

const state2Props = (state, { userName }) => ({
  user: getUserByName(state, userName) || null,
});

const dispatch2Props = { loadUser };

const mergeProps = (state, actions, own) => ({
  ...own,
  ...state,
  isReady: state.user || own.userName && actions.loadUser(own.userName)
});

const Profile = connect(state2Props, dispatch2Props, mergeProps)(ProfilePure);

export default Profile;
