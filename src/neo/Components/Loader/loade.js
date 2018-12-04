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

function create(tstatus) {
  return () => {
    status = tstatus;
    ReactDOM.render(<Loader />, div, calls);
  };
}

export default {
  show: create(),
  hide: create('hide'),
};
