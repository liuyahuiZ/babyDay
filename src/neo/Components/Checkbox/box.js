import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import styles from './style';
import Icon from '../Icon';

class CommonCheckbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      text: '',
      checkStatus: this.props.checkStatus
    };
  }

  change() {
    if (!this.props.disabled) {
      this.props.change(this.props);
    }
  }

  render() {
    const { disabled, style, text, checkStatus } = this.props;

    const labelStyle = Object.assign({}, styles.label);
    const checkedStyle = checkStatus === 'checked' ? styles.checked : '';
    const disabledStyle = disabled ? styles.disabled : '';
    return (
      <div
        style={arrayUtils.merge([labelStyle, disabledStyle, style])}
        onClick={() => {
          this.change();
        }}
      >
        <span style={arrayUtils.merge([styles.radioInner, checkedStyle])} >
          <Icon iconName={'checkmark'} size={'90%'} iconColor={''} iconPadding={'0'} />
        </span>
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
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({})]),
  checkStatus: PropTypes.string,
};

CommonCheckbox.defaultProps = {
  options: [],
  disabled: false,
  style: {},
  type: 'radio',
  text: '',
  checkStatus: 'unchecked',
  change: () => {}
};

export default CommonCheckbox;
