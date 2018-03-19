import React from 'react';

const withDidMount = onDidMount => Component => {
  return class WithDidMount extends React.PureComponent {
    componentDidMount() {
      onDidMount(this.props);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};

export default withDidMount;
