import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import styles from './style';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleClick(event) {
    if (!this.props.disabled) {
      this.props.onClick(event);
    }
  }

  handleMouseEnter(event) {
    if (!this.props.disabled) {
      this.props.onMouseEnter(event);
      this.setState({ hovered: true });
    }
  }

  handleMouseLeave(event) {
    if (!this.props.disabled) {
      this.props.onMouseLeave(event);
      this.setState({ hovered: false });
    }
  }

  render() {
    const { text, style, type, disabled } = this.props;
    const { hovered } = this.state;

    let buttonStyle = Object.assign({}, styles.button);

    if (hovered) {
      buttonStyle = Object.assign(buttonStyle, styles.buttonHover);
    }

    if (type && type.length > 0) {
      for (let i = 0; i < type.length; i++) {
        buttonStyle = Object.assign(buttonStyle, styles[type[i]],
          hovered ? styles[`${type[i]}Hover`] : {});
      }
    }

    buttonStyle = Object.assign({}, buttonStyle, style, disabled && (styles[`${type[0]}Disabled`] ? styles[`${type[0]}Disabled`] : styles.disabled));

    return (
      <button
        onClick={this.handleClick}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        style={buttonStyle}
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  type: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

Button.defaultProps = {
  style: {},
  type: [],
  disabled: false,
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

export default Button;
