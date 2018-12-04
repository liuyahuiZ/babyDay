import React from 'react';
import ReactDOM from 'react-dom';
import Toaster from './toaster';

const div = document.createElement('div');
document.body.appendChild(div);

function create() {
  return (msg, closePre) => {
    const type = msg.type ? msg.type : 'normal';
    const content = msg.content ? msg.content : '';
    const time = msg.time ? msg.time : 5000;
    const position = msg.position ? msg.position : 'top';
    ReactDOM.render(<Toaster />, div, function () {
      this.doToaster(type, content, time, closePre, position);
    });
  };
}

export default {
  toaster: create()
};
