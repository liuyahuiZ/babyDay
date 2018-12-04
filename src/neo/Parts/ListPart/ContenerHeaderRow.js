import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './style';

class ContenerHeaderRow extends Component {
  render() {
    const { style, children } = this.props;

    const rowColumns = React.Children.map(children, (child, columnNumber) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          columnNumber,
          key: `thead-${columnNumber}`,
          style: Object.assign({}, child.props.style),
          head: true
        });
      }
      return null;
    });

    return (
      <div
        style={Object.assign({}, styles.tableRow, styles.TableHeader, style)}
      >
        {rowColumns}
      </div>
    );
  }
}

ContenerHeaderRow.propTypes = {
  style: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

ContenerHeaderRow.defaultProps = {
  style: null,
};

export default ContenerHeaderRow;
