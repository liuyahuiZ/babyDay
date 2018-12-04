import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import styles from './style';

class Collapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabContentStyle: '',
    };
  }
  componentDidMount() {
  }
  render() {
    const { children, style } = this.props;
    return (
      <div style={arrayUtils.merge([styles.container, style])}>
        {children}
      </div>
    );
  }
}

Collapse.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
  style: PropTypes.shape()
};

Collapse.defaultProps = {
  children: [],
  style: {}
};


export default Collapse;
