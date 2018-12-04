import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getValue() {
    return this.component.getValue();
  }
  render() {
    const { WrappedComponent, ...props } = this.props;
    return (
      <WrappedComponent
        ref={(dom) => { this.component = dom; }}
        {...props}
      />
    );
  }
}

Dynamic.propTypes = {
  WrappedComponent: PropTypes.func
};

Dynamic.defaultProps = {
  WrappedComponent: <div />
};

export default Dynamic;
