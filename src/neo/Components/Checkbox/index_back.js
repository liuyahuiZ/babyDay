import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommonCheckbox from '../CommonCheckbox';
import styles from './style';

class Checkbox extends Component {
  getValue() {
    return this.commonCheckbox.getValue();
  }

  render() {
    const { style, ...rest } = this.props;
    const containerStyle = Object.assign({}, styles.container, style);

    return (
      <div style={containerStyle}>
        <CommonCheckbox
          ref={(commonCheckbox) => { this.commonCheckbox = commonCheckbox; }}
          type="checkbox"
          {...rest}
        />
      </div>
    );
  }
}

Checkbox.propTypes = {
  style: PropTypes.shape({})
};

Checkbox.defaultProps = {
  style: {}
};

export default Checkbox;
