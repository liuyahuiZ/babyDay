import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import styles from './style';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }
  componentDidMount() {
  }

  render() {
    const { percent, barColor, bgColor, radius, style } = this.props;
    const borderRadius = { borderRadius: radius,  backgroundColor: bgColor };
    const barWidth = { width: `${percent}%`, background: barColor, borderRadius: radius };
    return (
      <div style={arrayUtils.merge([styles.container, borderRadius, style])}>
        <div style={arrayUtils.merge([styles.bar, barWidth])} />
      </div>
    );
  }
}

Progress.propTypes = {
  percent: PropTypes.number,
  barColor: PropTypes.string,
  radius: PropTypes.number
};

Progress.defaultProps = {
  percent: 0,
  barColor: 'rgb(65, 150, 252)',
  bgColor: '#f5f5f5',
  radius: 0
};


export default Progress;
