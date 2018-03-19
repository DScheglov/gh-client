import React from 'react';
import { oneOfType, node, arrayOf, string } from 'prop-types';

const MessageCard = ({ title, children, level, className }) => (
  <div className={`card ${className} text-center`}>
    <div className="card-body">
      { title && <h5 className={`card-title text-${level}`}>{ title }</h5> }
      <div className="card-text">
        { children }
      </div>
    </div>
  </div>
);

MessageCard.propTypes = {
  title: oneOfType([node, arrayOf(node)]),
  level: string,
  children: oneOfType([node, arrayOf(node)]),
};

MessageCard.defaultProps = {
  title: 'Welome',
  level: 'default',
  children: 'Input Github user name and press "Find" button',
};

export default MessageCard;
