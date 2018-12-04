import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as arrayUtils from '../../utils/array';

import styles from './style';

class TitlePart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { titlepart } = this.props;
    let note = '';
    if (titlepart.note) {
      note = ` (${titlepart.note})`;
    }
    const border = titlepart.border ? styles[`border${titlepart.border}`] : styles.borderBottom;
    return (
      <div style={arrayUtils.merge([styles.title, border])}>{titlepart.title}{note}</div>
    );
  }
}

TitlePart.propTypes = {
  titlepart: PropTypes.shape()
};

TitlePart.defaultProps = {
  style: {},
  titlepart: {}
};

export default TitlePart;
