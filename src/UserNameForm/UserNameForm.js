import React from 'react';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import * as Router from 'react-router-redux';
import { getRouterParam } from '../common/routing';
import { reset } from '../common/errors';
import { isLoading } from '../common/loading';
import { compose } from '../utils/funcs';
import withDidMount from '../utils/withDidMount';

import * as Store from './store';

const propTypes = {
  userName: string,
  urlUserName: string,
  update: func,
  push: func,
};

const UserNameFormPure = ({ userName, loading, gotoUserPage, updateUserName }) => (
  <form onSubmit={gotoUserPage}>
    <div className="row form-group">
      <label align="right" className="col-sm-2 col-form-label">User name:</label>
      <div className="col-sm-8">
        <input
          value={userName}
          onChange={updateUserName}
          type="text"
          className="form-control"
        />
      </div>
      <div className="col-sm-2">
        <button
          sm="2"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Find
        </button>
      </div>
    </div>
  </form>
);

UserNameFormPure.propTypes = propTypes;

export const state2Props = state => ({
  userName: Store.getUserName(state),
  urlUserName: getRouterParam(state, '/:userName', 'userName'),
  loading: isLoading(state),
});

export const dispatch2Props = ({
  update: Store.update,
  push: Router.push,
  resetError: reset,
});

const prevent = event => event.preventDefault();

export const mergeProps = (state, { update, push, resetError }) => ({
  ...state,
  update,
  updateUserName: event => update(event.target.value),
  gotoUserPage: state.loading ? prevent : event => {
    resetError();
    push(`/${state.userName}`);
    event.preventDefault();
  }
});

export const initUserName = ({ urlUserName, update }) => update(urlUserName);

const enhance = compose(
  connect(state2Props, dispatch2Props, mergeProps),
  withDidMount(initUserName)
);
const UserNameForm = enhance(UserNameFormPure);
export default UserNameForm;
