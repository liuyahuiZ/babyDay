import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './loader';
import ProgressLoader from './progressLoader';

let status = '';
const div = document.createElement('div');
document.body.appendChild(div);


function calls() {
  this.showLoading(status);
}

function callbacks() {
  this.showProgress(status);
}

function create(tstatus) {
  return () => {
    status = tstatus;
    ReactDOM.render(<Loader />, div, calls);
  };
}
function createProgress(tstatus) {
  return () => {
    status = tstatus;
    ReactDOM.render(<ProgressLoader />, div, callbacks);
  };
}
export default {
  show: create(),
  hide: create('hide'),
  showProgress: createProgress(),
  hideProgress: createProgress('hide'),
};
