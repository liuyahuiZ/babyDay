import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

let cmsg = {};
const div = document.createElement('div');
document.body.appendChild(div);

function calls() {
  this.toaster(cmsg);
}

function open(msg) {
  cmsg = msg;
  cmsg.title = msg && msg.title ? msg.title : '';
  cmsg.content = msg && msg.content ? msg.content : '';
  cmsg.time = msg && msg.time ? msg.time : 5000;
  ReactDOM.render(<Modal />, div, calls);
}

function mformConfirm(msg) {
  open(msg);
}
export default {
  formConfirm: mformConfirm,
  closeAll: () => { div.innerHTML = ''; }
};
