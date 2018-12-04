import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import Cell from './cell';
import CityCell from './cityCell';
import Transition from '../Transition';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {},
      id: 0,
      display: 'hide'
    };
    this.rmMsg = this.rmMsg.bind(this);
  }

  rmMsg(key) {
    const newOptions = this.state.options;
    const newarr = this.remove(newOptions, key);
    this.setState({ options: newarr });
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
    ><div style={styles.boxbg} ref={(r) => {
      self.$$boxbg = r;
    }} onClick={()=>{
      self.rmMsg();
    }} /></Transition>) : '';
    console.log(options);
    const cellDom = options.type == 'address' ? <CityCell options={options} callbackRM={self.rmMsg} /> : <Cell options={options} callbackRM={self.rmMsg} />
    const resumap = this.state.display==='show' ? cellDom : '';
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
  options: {},
  callbackRM: () => {}
};

export default Modal;
