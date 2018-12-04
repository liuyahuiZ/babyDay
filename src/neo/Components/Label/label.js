import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Icon from '../Icon';
import styles from './style';

class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick(event);
  }

  render() {
    const { size, text, iconName, type, colors } = this.props;
    const typeStyle = type ? styles[`bg${type}`] : '';
    const fontSizeSpan = size ? { fontSize: size } : '';
    const iconColor = { color: colors };

    return (
      <div
        style={arrayUtils.merge([styles.span, fontSizeSpan, typeStyle, iconColor])}
        onClick={this.handleClick}
      >
        <Icon iconName={iconName} size={'100%'} iconColor={colors} />{text}
      </div>
    );
  }
}

Label.propTypes = {
  iconName: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  colors: PropTypes.string,
  onClick: PropTypes.func,
};

Label.defaultProps = {
  iconName: '',
  size: '',
  text: '',
  type: 'primary',
  colors: '',
  onClick: () => {}
};


export default Label;
