import React from 'react';

const ForkListItem = ({ owner, name, description, language, license }, index) => (
  <div key={index} className="list-group-item list-group-item-action flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{ owner }{' / '}{ name }</h5>
    </div>
    { description && <p className="mb-1">{ description }</p> }
    <small className="text-muted">
      { language } { license && language && ' | '} { license }
    </small>
  </div>
);

export default ForkListItem;
