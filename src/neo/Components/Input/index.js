import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import isValid from '../../utils/validFuncs';
import styles from './style';
import theme from '../Style/theme';
import Icon from '../Icon';
import * as arrayUtils from '../../utils/array';

class Input extends Component {
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
    this.handleChange = this.handleChange.bind(this);
    this.getValue = this.getValue.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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

  handleFocus() {
    this.setState({ focus: true });
    if (!this.props.disabled) {
      this.props.onFocus(event);
    }
  }

  handleBlur() {
    this.setState({ focus: false });
    if (!this.props.disabled) {
      this.props.onBlur(event);
    }
  }

  computeStyle() {
    const { maxLength } = this.props;
    return maxLength;
  }


  handleChange(event) {
    const { disabled, type, max, maxLength, min, valid, onChange } = this.props;
    const value = event.target.value;
    if (!disabled) {
      if (value !== '') {
        if (valid && !isValid(value, valid)) {
          return;
        }
        if (type === 'number' && (max < value || min > value)) {
          return;
        }
      }
      const length = value.toString().length;
      if (length <= maxLength) {
        this.setState({
          count: length,
          value
        });

        onChange(event, this, value);
      }
    }
  }


  render() {
    const { placeholder, maxLength, maxLengthShow,
      disabled, style, typeStyle, onKeyUp, icon, type, innerStyle } = this.props;
    const { count, value, focus } = this.state;
    let padWidth = 0;
    if (maxLengthShow) {
      padWidth = (maxLength.toFixed(0).length * 20) + 10;
    }
    const containerStyle = Object.assign({}, styles.containerStyle, styles[typeStyle], style);
    let inputStyle = Object.assign({}, styles.inputStyle, disabled && styles.disabled);
    const padStyle = Object.assign({}, styles.padStyle, {
      width: padWidth
    });
    inputStyle = focus ? arrayUtils.merge([inputStyle,
      { outline: 0, boxShadow: 0, border: 0 }]) : inputStyle;
    const maxLengthSpan = this.props.maxLengthShow ? (<span style={padStyle}>
      {count}/{maxLength}
    </span>) : '';
    const preIcon = icon ? (<Icon iconName={icon.iconName} size={icon.size} color={icon.color} style={arrayUtils.merge([styles.iconStyle, icon.style ])} />) : '';
    const hasIcon = icon ? styles.hasIcon : '';
    return (
      <div style={containerStyle}>
        {preIcon}
        <input
          placeholder={placeholder}
          onChange={this.handleChange}
          style={arrayUtils.merge([inputStyle, hasIcon, innerStyle])}
          value={value}
          disabled={disabled}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyUp={onKeyUp}
          type={type}
        />
        {maxLengthSpan}
      </div>
    );
  }
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number,
    PropTypes.bool, PropTypes.shape({})]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.shape({}),
  maxLength: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  disabled: PropTypes.bool,
  valid: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({}), PropTypes.func]),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  maxLengthShow: PropTypes.bool,
  typeStyle: PropTypes.string,
  icon: PropTypes.shape({}),
  innerStyle: PropTypes.shape({}),
};

Input.defaultProps = {
  value: '',
  style: {},
  innerStyle: {},
  type: 'text',
  max: Infinity,
  min: -Infinity,
  placeholder: '',
  maxLength: 50,
  maxLengthShow: false,
  valid: '',
  disabled: false,
  typeStyle: '',
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  onKeyUp: () => {},
  icon: null
};

export default Input;
