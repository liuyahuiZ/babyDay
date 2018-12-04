import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import styles from './style';
import * as arrayUtils from '../../utils/array';

class Text extends Component {
  constructor(props) {
    super(props);
    let propValue = this.props.value;

    if (propValue === null || propValue === undefined) {
      propValue = '';
    }
    this.state = {
      count: propValue.length,
      value: propValue,
      focus: false
    };
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    });
  }
  getValue() {
    if (this.props.type === 'number'
      && this.state.value !== ''
      && this.state.value !== undefined) {
      return +this.state.value;
    }
    return this.state.value;
  }

  setValue(_value) {
    this.setState({ value: _value });
  }

  render() {
    const { value } = this.state;
    return (
      <span style={arrayUtils.merge([styles.containerStyle])}>
        {value}
      </span>
    );
  }
}

Text.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
};

Text.defaultProps = {
  value: '',
  style: {},
  type: 'text',
};

export default Text;
