import React from 'react';
import { Link } from 'react-router-dom';

const RepoListItem = ({ owner, name, description, language, license }, index) => (
  <div key={index} className="list-group-item list-group-item-action flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link to={`/${owner}/${name}`}>{ name }</Link>
      </h5>
    </div>
    { description && <p className="mb-1">{ description }</p> }
    <small className="text-muted">
      { language } { license && language && ' | '} { license }
    </small>
  </div>
);

export default RepoListItem;
