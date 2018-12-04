import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

let cmsg = {};
let dom = {};
const div = document.createElement('div');
document.body.appendChild(div);

function calls() {
  this.toaster(cmsg);
}

function open(msg) {
  cmsg = msg;
  cmsg.title = msg && msg.title ? msg.title : '';
  cmsg.content = msg && msg.content ? msg.content : '';
  ReactDOM.render(<Modal ref={(r) => { dom.$$ModalContainer = r; }} />, div, calls);
}

function mformConfirm(msg, callback, canselCallback) {
  open(msg, callback);
}
export default {
  confirm: mformConfirm,
  closeAll: () => { dom.$$ModalContainer.rmMsg(); }
};
