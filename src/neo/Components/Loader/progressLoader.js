import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import styles from './style';

let timmer = {};
class ProgressLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      status: 'hide',
      percent: 0,
      classNames: ''
    };
    this.hide = this.hide.bind(this);
  }
  showProgress(status) {
    if (status && status !== '') {
      this.hide();
    } else {
      this.setState({ percent: 0, classNames: '', status: 'show' });
      timmer = setInterval(() => {
        this.changePercent();
      }, 10);
    }
  }
  hide() {
    this.setState({ percent: 100, classNames: 'transition' });
    setTimeout(() => {
      this.setState({ status: 'hide' });
    }, 600);
    clearInterval(timmer);
  }

  changePercent() {
    let per = this.state.percent;
    if (per < 30) {
      per += 0.1;
      this.setState({
        percent: per
      });
    } else if (per < 60) {
      per += 0.05;
      this.setState({
        percent: per
      });
    } else if (per < 95) {
      per += 0.01;
      this.setState({
        percent: per
      });
    } else {
      clearInterval(timmer);
    }
  }
  render() {
    const { barColor, radius, boxShad } = this.props;
    const { percent, status, classNames } = this.state;
    const borderRadius = { borderRadius: radius };
    const barWidth = { width: `${percent}%`, backgroundColor: barColor, boxShadow: boxShad, borderRadius: radius };
    const loaders = status === 'show' ? (<div style={styles.loader} className={classNames}>
      <div style={arrayUtils.merge([styles.progressContainer, borderRadius])}>
        <div style={arrayUtils.merge([styles.bar, barWidth])} />
      </div>
    </div>) : (<div />);
    return loaders;
  }
}

ProgressLoader.propTypes = {
  barColor: PropTypes.string,
  radius: PropTypes.number,
  boxShad: PropTypes.string,
};

ProgressLoader.defaultProps = {
  barColor: 'rgb(65, 150, 252)',
  boxShad: '1px 1px 2px rgba(65, 150, 252, 0.6)',
  radius: 0
};


export default ProgressLoader;
