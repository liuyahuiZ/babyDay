import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import Demo from './demo';
import My from './my';
import BaseView from '../core/app';

const {
    Toaster,
    Row,
    Col,
    MenuTab
  } = Components;
const { sessions, storage } = utils;
  
class BabyDay extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
        liveInfo: null,
        resourceKey: sessions.getStorage('resourceKey') || '1'
      };
    }

    _viewAppear(){
    }

    
    tabChange(v){
        const self = this;
        self.setState({
          'resourceKey': v
        });
        sessions.setStorage('resourceKey', v)
    }

    render() {
        const tabOptions = [{ tabName: 'home', iconName: 'ios-home-outline ', keyword: '1', content:(<Demo />)},
        { tabName: 'my', iconName: 'outlet ', keyword: '2', content:(<My />)}];
        const typeOption = {
          showIcon: true,
          activeColor: '',
          defaultColor: ''
        };
        return(
          <section className="bg-f5f5f5">
            <MenuTab options={tabOptions} typeOption={typeOption} active={this.state.resourceKey} onChange={(v)=>{
                  this.tabChange(v);
                }} />
          </section>
        );
    }
}
export default BabyDay;
