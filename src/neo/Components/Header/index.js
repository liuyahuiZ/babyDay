import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Icon from '../Icon';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftContent: this.props.leftContent,
      rightContent: this.props.rightContent,
      centerContent: this.props.centerContent,
      link: this.props.link,
      showRight: this.props.showRight,
      style: this.props.style,
      isInApp: this.props.isInApp
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      leftContent: nextProps.leftContent,
      rightContent: nextProps.rightContent,
      centerContent: nextProps.centerContent,
      link: nextProps.link,
      showRight: nextProps.showRight,
      style: nextProps.style,
      isInApp: this.props.isInApp
    });
  }
  handleClick(link) {
    this.props.onClick();
  }
  leftClick() {
    if(this.props.leftContent.onClick) {
      this.props.leftContent.onClick();
    }
  }
  centerClick() {
    if(this.props.centerContent.onClick) {
      this.props.centerContent.onClick();
    }
  }
  rightClick() {
    if(this.props.rightContent.onClick) {
      this.props.rightContent.onClick();
    }
  }
  render() {
    const self = this;
    let paddingsTop = '0px' ;
    // alert( navigator.userAgent.indexOf('iPhone10,3') >= 0);
    paddingsTop = navigator.userAgent.indexOf('iPhone X') >= 0 ? '1rem' : paddingsTop;
    const { link, leftContent, style, showRight, rightContent, centerContent, isInApp  } = this.state;
    paddingsTop = isInApp ? paddingsTop : '0';
    const leftCon = leftContent !== '' ? (<div className="left" style={leftContent.style} onClick={() => {self.leftClick()}}>{leftContent.text}</div>) : '';
    const centerCon = centerContent !== '' ? (<div className="title" style={centerContent.style} onClick={() => {self.centerClick()}}>{centerContent.text}</div>) : '';
    const rightCon = rightContent !== '' ? (<div className={'right'} style={rightContent.style} onClick={() => {self.rightClick()}}>{rightContent.text}</div>) : '';

    return (
      <div className="Header" style={arrayUtils.merge([style, {'paddingTop': paddingsTop}])}>
        <div className="Header" style={style}
          onClick={() => {this.handleClick(link)}}
        >
          {leftCon}{centerCon}{rightCon}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
    link: PropTypes.string,
    leftContent: PropTypes.shape({}),
    style: PropTypes.shape({}),
    showRight: PropTypes.bool,
    centerContent: PropTypes.shape({
      onClick: PropTypes.func
    }),
    rightContent: PropTypes.shape({}),
    onClick: PropTypes.func
};

Header.defaultProps = {
    link: '',
    leftContent: {
      text: '',
      onClick: ()=>{}
    },
    style: {},
    showRight: false,
    rightContent: {
      text: '',
      onClick: ()=>{}
    },
    centerContent: {
      text: '',
      onClick: ()=>{}
    },
    onClick: ()=>{}
};


export default Header;
