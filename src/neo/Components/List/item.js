import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Icon from '../Icon';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import '../Style/list.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(link) {
    if(link) {
      hashHistory.push(link);
    }
    this.props.onClick();
  }


  render() {
    const { link, title, leftContent, style, showRight, rightContent  } = this.props;
    const rightIocn = showRight ? (<Icon iconName={'ios-arrow-right'} iconColor={'#ccc'} size={'120%'} />): '';
    const leftCon = leftContent !== '' ? (<div className={`leftContent ${leftContent.className}`} style={leftContent.style}>{leftContent.text}</div>) : '';
    const rightCon = rightContent !== '' ? (<div className={`rightContent ${rightContent.className}`} style={rightContent.style}>{rightContent.text}{rightIocn}</div>) : '';
    return (
      <div className="item"
        style={style}
        onClick={() => {this.handleClick(link)}}
      >
        {leftCon}{rightCon}
      </div>
    );
  }
}

Item.propTypes = {
    link: PropTypes.string,
    leftContent: PropTypes.shape({}),
    style: PropTypes.shape({}),
    showRight: PropTypes.bool,
    rightContent: PropTypes.shape({}),
    onClick: PropTypes.func
};

Item.defaultProps = {
    link: '',
    leftContent: {},
    style: {},
    showRight: false,
    rightContent: {},
    onClick: ()=>{}
};


export default Item;
