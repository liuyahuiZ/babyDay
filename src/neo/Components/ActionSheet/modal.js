import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import Cell from './cell';
import Transition from '../Transition';
import * as arrayUtils from '../../utils/array';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {},
      display: 'hide'
    };
    this.rmMsg = this.rmMsg.bind(this);
  }
  toaster(arr) {
    if(this.state.display==='hide'){
        this.setState({ options: arr, display: 'show' });
    } else {
      this.setState({ options: arr, display: 'hide' });
    }
  }
  rmMsg(key) {
    this.setState({ display: 'hide' });
  }
  render() {
    const self = this;
    const { options } = this.state;
    const contbg = this.state.display==='show' ? (<Transition
      act={'enter'}
      duration={166}
      enter={'modalbg-enter'}
      leave={'modalbg-leave'}
    ><div style={arrayUtils.merge([styles.boxbg, options.bgStyle])} onClick={()=>{
      self.rmMsg();
      options.cancleCallback();
    }}/></Transition>): '';
    const resumap = this.state.display==='show'?(<Cell options={options} callbackRM={self.rmMsg} />) : ''
    return (
      <div style={styles.container} className="transi">
        {resumap}
        {contbg}
      </div>
    );
  }
}

Modal.propTypes = {
  callbackRM: PropTypes.func
  // style: PropTypes.shape({})
};

Modal.defaultProps = {
  options: [],
  callbackRM: () => {}
};

export default Modal;
