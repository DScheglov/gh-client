import React from 'react';

const IssueListItem = ({ title, body, user }, index) => (
  <div key={index} className="list-group-item list-group-item-action flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1"><b>{ user }</b>: { title }</h5>
    </div>
    { body && <p className="mb-1">{ body }</p> }
  </div>
);

export default IssueListItem;
