import React from 'react';
import { oneOfType, node, arrayOf } from 'prop-types';

const Loader = ({ children }) => (
  <div className="card text-center">
    <div className="card-body">
      <h5 className="card-title">{ children }</h5>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={{ width: '100%' }}
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  </div>
);

Loader.propTypes = {
  children: oneOfType([node, arrayOf(node)])
};

Loader.defaultProps = {
  children: 'Loading ...'
};

export default Loader;
