import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import styles from './buttonStyle';
import theme from '../Style/theme';
import * as arrayUtils from '../../utils/array';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  setStyle() {
    const { style, type, disabled, size, plain } = this.props;
    const { hovered } = this.state;

    let typeStyle = '';
    if (plain) {
      if (hovered) {
        typeStyle = { borderColor: theme[type], color: theme[type] };
      } else {
        typeStyle = { borderColor: theme.normal, color: theme.black };
      }
      if (disabled) {
        typeStyle = arrayUtils.merge([{ borderColor: theme.disable, color: theme.normal },
          styles.alldisabled]);
      }
    } else if (!plain) {
      if (type === 'link') {
        typeStyle = arrayUtils.merge([styles.link, { color: theme.primary }]);
        if (hovered) {
          typeStyle = arrayUtils.merge([typeStyle, styles.linkHover]);
        }
        if (disabled) {
          typeStyle = arrayUtils.merge([styles.link, { color: theme.disable }, styles.alldisabled]);
        }
      } else {
        typeStyle = { border: '0', backgroundColor: theme[type], color: theme.white };
        if (hovered) {
          typeStyle = arrayUtils.merge([typeStyle, styles.buttonHover]);
        }
        if (disabled) {
          typeStyle = arrayUtils.merge([{ border: '0', backgroundColor: theme.disable, color: theme.normal }, styles.alldisabled]);
        }
      }
    }
    const buttonStyle = arrayUtils.merge([styles.button, typeStyle, styles[size], style]);
    return buttonStyle;
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
    const { text } = this.props;

    const buttonStyle = this.setStyle();
    return (
      <button
        onClick={this.handleClick}
        onTouchStart={this.handleMouseEnter}
        onTouchEnd={this.handleMouseLeave}
        style={buttonStyle}
      >
        {text}
      </button>
    );
  }
}

Buttons.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({})]),
  style: PropTypes.shape({}),
  type: PropTypes.string,
  size: PropTypes.string,
  plain: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

Buttons.defaultProps = {
  style: {},
  type: '',
  size: '',
  text: '按钮',
  plain: false,
  disabled: false,
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

export default Buttons;
