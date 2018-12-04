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
    const { disabled, style, text, value } = this.props;

    const labelStyle = Object.assign({}, styles.label);
    const checkedStyle = this.state.checked ? styles.checked : '';
    const disabledStyle = disabled ? styles.disabled : '';
    return (
      <div
        style={arrayUtils.merge([labelStyle, disabledStyle, style])}
        onClick={() => {
          this.change({ iteValue: value, iteText: text });
        }}
      >
        <span style={arrayUtils.merge([styles.radioInner, checkedStyle])} className={'radios'} />
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
};

CommonCheckbox.defaultProps = {
  options: [],
  disabled: false,
  style: {},
  type: 'radio',
  text: '',
  value: '',
  checked: false,
  change: () => {}
};

export default CommonCheckbox;
