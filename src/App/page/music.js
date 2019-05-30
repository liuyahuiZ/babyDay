import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';

const {
    Toaster,
    Row,
    Col,
    MenuTab
  } = Components;
const { sessions, storage } = utils;
  
class Music extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
        liveInfo: null,
      };
    }

    _viewAppear(){
    }
    render() {
  
        return(
          <section className="bg-f5f5f5">
            
          </section>
        );
    }
}
export default Music;
