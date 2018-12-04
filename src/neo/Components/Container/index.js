import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { title, children, style, titleStyle, showTitle } = this.props;

    const containerStyle = Object.assign({}, styles.container, style);
    const titleStyle2 = Object.assign({}, styles.title, titleStyle);
    return (
      <div style={containerStyle}>
        {
          showTitle ?
            <div style={titleStyle2}>
              {title}
            </div>
          :
            null
        }
        {children}
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  showTitle: PropTypes.bool,
  style: PropTypes.shape({}),
  titleStyle: PropTypes.shape({}),
};

Container.defaultProps = {
  children: null,
  showTitle: true,
  style: {},
  titleStyle: {},
  title: ''
};

export default Container;
