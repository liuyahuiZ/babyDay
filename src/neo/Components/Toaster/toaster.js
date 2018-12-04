import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import Message from './message';


class Toaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      id: 0,
    };
    this.doToaster = this.doToaster.bind(this);
    this.rmMsg = this.rmMsg.bind(this);
  }
  doToaster(type, ctext, ctime, closePre, position) {
    const arr = { text: ctext, msgtype: type, time: ctime, position: position };
    this.toaster(arr, closePre);
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
  toaster(obj, closePre) {
    const Newid = this.state.id + 1;
    obj.id = Newid;
    let newOptions = this.state.options;
    if (closePre) {
      newOptions = [obj];
    } else {
      newOptions.push(obj);
    }

    this.setState({ id: Newid });
    this.setState({ options: newOptions });
  }
  rmMsg(key) {
    const newOptions = this.state.options;
    const newarr = this.remove(newOptions, key);
    this.setState({ options: newarr });
  }
  render() {
    return (
    <Message options={this.state.options} callbackRM={this.rmMsg} />
    );
  }
}

Toaster.propTypes = {
  style: PropTypes.shape({})
};

Toaster.defaultProps = {
  style: {}
};

export default Toaster;
