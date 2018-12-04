import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';


class Select extends Component {
  constructor(props) {
    super(props);
    const { value, options } = this.props;
    this.state = {
      value: value || (options && options[0] && options[0].value)
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getValue() {
    return this.state.value;
  }

  handleChange(event) {
    if (!this.props.disabled) {
      this.props.onChange(event, this);
      this.setState({
        value: event.target.value
      });
    }
  }

  render() {
    const { style, options, disabled, value } = this.props;
    const containerStyle = Object.assign({}, styles.container, style);
    const selectStyle = Object.assign({}, styles.select, disabled && styles.disabled);
    const svgStyle = Object.assign({}, styles.svg);
    const optionNode = [];
    for (let i = 0, length = options.length; i < length; i++) {
      optionNode.push(<option
        value={options[i].value}
        key={i}
      >{options[i].text}</option>);
    }
    return (
      <div
        style={containerStyle}
      >
        <select
          style={selectStyle}
          disabled={disabled}
          defaultValue={value}
          onChange={this.handleChange}
        >
          { optionNode }
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={svgStyle}
        >
          <polyline
            points="0,0  8,0  4,5.7"
            style={{
              fill: '#aaa'
            }}
          />
        </svg>
      </div>
    );
  }
}

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  style: PropTypes.shape({}),
  onChange: PropTypes.func
};

Select.defaultProps = {
  value: '',
  disabled: false,
  options: [],
  style: {},
  onChange: () => {}
};

export default Select;
