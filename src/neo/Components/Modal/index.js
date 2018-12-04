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

function mAlert(msg, callback) {
  const buttons = [];
  buttons[0] = {
    title: msg.btn.text ? msg.btn.text : '确定',
    type: msg.btn.type ? msg.btn.type : 'link',
    model: 'sure',
    style: msg.btn.style ? msg.btn.style : { }
  };
  if (typeof callback === 'function') {
    buttons[0].callbk = function (id, callbk) { callback(id, callbk); callbk(id); return true; };
  } else {
    buttons[0].callbk = function () { return true; };
  }
  msg.buttons = buttons;
  open(msg, callback);
}

function mConfim(msg, callback, canselCallback) {
  const buttons = [];
  buttons[0] = {
    title: '确定',
    type: 'primary',
    model: 'sure',
    style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
  };
  buttons[1] = {
    title: '取消',
    type: 'normal',
    plain: true,
    model: 'cancle',
    style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
  };
  if (typeof callback === 'function') {
    buttons[0].callbk = function (id, callbk) { callback(id, callbk); callbk(id); return true; };
    buttons[1].callbk = function (id, callbk) {
      canselCallback(id, callbk);
      callbk(id); return true;
    };
  } else {
    buttons[0].callbk = function () { return true; };
    buttons[1].callbk = function () { return true; };
  }
  msg.buttons = buttons;
  open(msg, callback);
}

function mformConfirm(msg, callback, canselCallback) {
  const buttons = [];
  buttons[0] = {
    title: msg.btnSure && msg.btnSure.text ? msg.btnSure.text : '确定',
    type: msg.btnSure && msg.btnSure.type ? msg.btnSure.type : 'primary',
    model: 'sure',
    style: msg.btnSure.style ? msg.btnSure.style : {}
  };
  buttons[1] = {
    title: msg.btnCancle && msg.btnCancle.text ? msg.btnCancle.text : '取消',
    type: msg.btnCancle && msg.btnCancle.type ? msg.btnCancle.type : 'normal',
    model: 'cancle',
    style: msg.btnCancle.style ? msg.btnCancle.style : {}
  };
  if (typeof callback === 'function') {
    buttons[0].callbk = function (id, callbk) { callback(id, callbk); return true; };
    buttons[1].callbk = function (id, callbk) { canselCallback(id, callbk); return true; };
  } else {
    buttons[0].callbk = function () { return true; };
    buttons[1].callbk = function () { return true; };
  }
  msg.buttons = buttons;
  open(msg, callback);
}
export default {
  confirm: mConfim,
  formConfirm: mformConfirm,
  alert: mAlert,
  closeAll: () => { div.innerHTML = ''; }
};
