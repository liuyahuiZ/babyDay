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

function mformConfirm(msg, callback, canselCallback) {
  const buttons = [];
  buttons[0] = {
    title: msg.btnSure && msg.btnSure.text ? msg.btnSure.text : '确定',
    type: msg.btnSure && msg.btnSure.type ? msg.btnSure.type : 'primary',
    model: 'sure'
  };
  buttons[1] = {
    title: msg.btnCancle && msg.btnCancle.text ? msg.btnCancle.text : '取消',
    type: msg.btnCancle && msg.btnCancle.type ? msg.btnCancle.type : 'normal',
    model: 'cancle'
  };
  if (typeof callback === 'function') {
    buttons[0].callbk = function (id, callbk, val) { callback(val); callbk(id); return true; };
    buttons[1].callbk = function (id, callbk, val) { canselCallback(val); callbk(id); return true; };
  } else {
    buttons[0].callbk = function () { return true; };
    buttons[1].callbk = function () { return true; };
  }
  msg.buttons = buttons;
  open(msg, callback);
}
export default {
  formConfirm: mformConfirm,
  closeAll: () => { div.innerHTML = ''; }
};
