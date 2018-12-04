import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as arrayUtils from '../../utils/array';
import '../../Style/Header.scss'
import {
    Button,
    Buttons,
    Icon,
    Label,
    PageTransition
  } from '../../Components';

class HeaderPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  onback() {
    this.props.onback();
  }
  render() {
    const { titlepart, action } = this.props;

    let actionArr = [{action: 'leave', enter: 'title-enter', leave:'title-leave' },
    {action: 'enter', enter: 'title-enter', leave:'title-leave-end' }];
    if(action === 'enter') {
        actionArr = [{action: 'leave', enter: 'title-enter', leave:'title-leave-end' },
        {action: 'enter', enter: 'title-enter', leave:'title-leave' }];
    }
    let ZIndex = 5;
    const components = titlepart.map((item, idx) => {
      const title = item.split('/');
      if(titlepart.length > 1){
          return (<PageTransition
              key={`tran-${idx}`}
              act={actionArr[idx].action}
              enter={actionArr[idx].enter}
              leave={actionArr[idx].leave}
              ><div className="titleContent transf pages" style={{zIndex: ZIndex - idx}}>{title[title.length - 1]}</div>
              </PageTransition>);
      }
      return (<div className="titleContent transf" key={`${idx}-comp`}>{title[title.length - 1]}</div>);
  });
    return (
      <div className="Header">
        <span className="left" onTouchStart={() => { this.onback(); }} onClick={() => { this.onback(); }}>
          <Icon iconName={'ios-arrow-back'} size={'120%'} iconColor={'#000'} />
        </span>
        {components}
        <span className="right"><Icon iconName={'menu'} size={'120%'} iconColor={'#000'} /></span>
      </div>
    );
  }
}

HeaderPart.propTypes = {
  titlepart: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({}))]),
  action: PropTypes.string
};

HeaderPart.defaultProps = {
  style: {},
  titlepart: [],
  action: 'enter'
};

export default HeaderPart;
