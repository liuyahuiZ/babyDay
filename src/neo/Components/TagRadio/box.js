import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import styles from './style';

class CommonCheckbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      text: '',
      checked: this.props.checked
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      checked: nextProps.checked
    });
  }

  change(item) {
    if (!this.props.disabled) {
      this.props.change(item);
    }
  }

  render() {
    const { disabled, style, text, value, checkStyle, normalStyle } = this.props;

    const labelStyle = Object.assign({}, styles.label);
    let checkedStyle = this.state.checked ? arrayUtils.merge([styles.checked, checkStyle]) : normalStyle;
    const disabledStyle = disabled ? styles.disabled : '';
    return (
      <div
        style={arrayUtils.merge([labelStyle, checkedStyle, disabledStyle, style])}
        onClick={() => {
          this.change({ iteValue: value, iteText: text });
        }}
      >
        <span style={styles.text} >
          {text}
        </span>
      </div>
    );
  }
}

CommonCheckbox.propTypes = {
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  change: PropTypes.func,
  text: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checkStyle: PropTypes.shape({}),
  normalStyle: PropTypes.shape({}),
};

CommonCheckbox.defaultProps = {
  options: [],
  disabled: false,
  style: {},
  type: 'radio',
  text: '',
  value: '',
  checked: false,
  change: () => {},
  checkStyle: {},
  normalStyle: {}
};

export default CommonCheckbox;
