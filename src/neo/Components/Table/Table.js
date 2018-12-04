import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './style';

class Table extends Component {
  render() {
    const {
      hoverable,
      center,
      style,
      children
    } = this.props;

    // @TODO: thead & tbody 分离
    const rowColumns = React.Children.map(children, (child, rowNumber) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          rowNumber,
          hoverable,
          center,
          style: Object.assign({}, styles.table, child.props.style),
        });
      }

      return null;
    });

    return (
      <table style={Object.assign({}, styles.table, style)}>
        <tbody>
          {rowColumns}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.array])),
  hoverable: PropTypes.bool,
  style: PropTypes.shape({}),
  center: PropTypes.bool,
};

Table.defaultProps = {
  children: [],
  style: {},
  hoverable: false,
  center: false
};

export default Table;
