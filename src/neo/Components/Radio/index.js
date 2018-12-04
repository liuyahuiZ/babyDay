import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommonCheckbox from './box';
import styles from './style';

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      text: '',
      checked: false,
      options: this.props.options
    };
    this.getValue = this.getValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options
    });
  }
  getValue() {
    // return this.inputs.filter(input => input.checked).map(input =>
    //   this.props.options.filter(opt => opt.value.toString() === input.value)[0].value
    // );
    if (this.state.value && this.state.value !== '') {
      return this.state.value;
    }
    const { options } = this.props;
    let value = '';
    for (let i = 0; i < options.length; i++) {
      if (options[i].checked) {
        value = options[i].value;
      }
      break;
    }
    return value;
  }
  handleChange(item) {
    this.setState({
      value: item.iteValue,
      text: item.iteText,
      checked: item.iteValue
    });
    this.props.onChange(event, item);
  }
  render() {
    const { disabled, style } = this.props;
    const { options } = this.state;
    const containerStyle = Object.assign({}, styles.container, style);

    // const name = Base.genRandomId();
    const self = this;
    const compon = options.map((item, idex) => {
      const keys = `${idex}-radio`;
      const inputDisabled = disabled || item.disabled;
      const isChecked = self.state.checked ? self.state.checked === item.value : item.checked;
      return (<CommonCheckbox
        key={keys}
        type="radio"
        disabled={inputDisabled}
        change={self.handleChange}
        checked={isChecked}
        value={item.value}
        text={item.text}
      />);
    });

    return (
      <div
        style={containerStyle}
        ref={(commonCheckbox) => { this.commonCheckbox = commonCheckbox; }}
      >
        {compon}
      </div>
    );
  }
}

Radio.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})),
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  options: [],
  disabled: false,
  style: {},
  onChange: () => {}
};

export default Radio;
