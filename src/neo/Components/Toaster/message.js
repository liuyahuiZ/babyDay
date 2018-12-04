import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import Icon from '../Icon';
import Transition from '../Transition';
import '../Style/toaster.scss';
import theme from '../Style/theme';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hide = this.hide.bind(this);
    this.clearTime = this.clearTime.bind(this);
  }
  hide(index) {
    this.props.callbackRM(index);
  }
  timeHide(index, timeout) {
    const self = this;
    self.timmer = setTimeout(() => {
      self.hide(index);
    }, timeout);
  }
  clearTime() {
    clearTimeout(this.timmer);
  }
  render() {
    const self = this;
    const options = self.props.options;
    const leftCon = Object.assign({}, styles.leftCon);
    const rightX = Object.assign({}, styles.rightX);
    const resumap = options.map((itm) => {
      const selfStye = itm.msgtype ;
      const positionStyle = itm.position ;
      if (itm.msgtype !== 'error') {
        self.timeHide(itm.id, itm.time);
      } else {
        self.timeHide(itm.id, 5000);
      }
      return (
        <Transition
        act={'enter'}
        duration={166}
        enter={'toaster-enter'}
        leave={'toaster-leave'}
        key={itm.id}
      >
        <div className={`nemo-megStyle ${selfStye} ${positionStyle}`} key={itm.id} onClick={() => { self.hide(itm.id); }}>
          <div>{itm.text}</div>
        </div>
        </Transition>
      );
    });
    return (
      <div className="megGroup" >
          {resumap}
      </div>
    );
  }
}

Message.propTypes = {
  callbackRM: PropTypes.func
  // style: PropTypes.shape({})
};

Message.defaultProps = {
  options: [],
  callbackRM: {}
};

export default Message;
