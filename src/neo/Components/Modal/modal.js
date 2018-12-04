import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import Cell from './cell';
import Transition from '../Transition';
import '../Style/Animate.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      id: 0,
    };
    this.rmMsg = this.rmMsg.bind(this);
  }
  remove(arr, id) {
    this.arr = arr;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }
  toaster(arr) {
    const Newid = this.state.id + 1;
    arr.id = Newid;
    const newOptions = this.state.options;
    newOptions.push(arr);
    this.setState({ id: Newid });
    this.setState({ options: newOptions });
  }
  rmMsg(key) {
    const newOptions = this.state.options;
    const newarr = this.remove(newOptions, key);
    this.setState({ options: newarr });
  }
  render() {
    let contbg = '';
    const self = this;
    if (this.state.options.length > 0) {
      contbg = (<Transition
        act={'enter'}
        duration={166}
        enter={'modalbg-enter'}
        leave={'modalbg-leave'}
      ><div style={styles.boxbg} /></Transition>);
    }
    const resumap = this.state.options.map((itm) => {
      const cell = (
        <Cell options={itm} key={itm.id} callbackRM={self.rmMsg} />
      );
      return cell;
    });
    return (
      <div style={styles.container} className="transition">
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
