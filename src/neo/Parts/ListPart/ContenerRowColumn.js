import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../../utils/base';
import styles from './style';

class ContenerRowColumn extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.columnNumber);
    }
  }

  render() {
    const { children, style, head, title } = this.props;
    const handlers = {
      onClick: this.onClick,
    };

    if (head) {
      return (
        <div
          {...handlers}
          style={Object.assign({}, styles.tableRowColumn, styles.TableHeaderRowColumn, style)}
          title={title}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        {...handlers}
        style={Object.assign({}, styles.tableRowColumn, style)}
        title={title}
      >
        {children}
      </div>
    );
  }
}

ContenerRowColumn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  columnNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.shape({}),
  head: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number,
    PropTypes.bool, PropTypes.shape({})]),
};

ContenerRowColumn.defaultProps = {
  onClick: noop,
  children: null,
  columnNumber: 0,
  style: {},
  title: '',
  head: false
};

export default ContenerRowColumn;
