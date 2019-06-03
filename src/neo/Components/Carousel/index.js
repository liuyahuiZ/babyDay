import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import styles from './style';
import '../Style/comstyle.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      tabContentStyle: '',
      width: 100,
      height: 30,
      dotNum: 0,
      startX: 0,
      aboveX: 0,
      aboveLimit: 100,
      lock: false,
      screenWidth: '',
      show: this.props.show||true,
    };
    this.changeActive = this.changeActive.bind(this);
  }
  componentDidMount(){
    this.init();
  }
  componentWillReceiveProps(nextProps){
    this.setState({
        show: nextProps.show,
    },()=>{
        if(nextProps.show) {
            this.init();
        }
    })
  }

  init(){
    const self = this;
    const arr = this.props.options;
    self.setState({ options: arr, screenWidth:this.$$container.clientWidth  });
    self.$$tabHeader.onclick = function (ev) {
      let itm = {};
      if (ev.target.children.length > 0) {
        itm = ev.target.firstChild.dataset;
      } else {
        itm = ev.target.dataset;
      }
      if (itm.content) {
        // console.log(itm.content);
        self.changeActive(itm.content);
      }
    };
    if (this.props.autoPlay) {
      self.move();
    }
    if (this.props.dragAble) {
      self.drag(self, arr);
    }
    
  }
  drag(self, arr) {
    let dotNum = self.state.dotNum;
    const content = self.$$tabContent;
    this.arr = arr;
    content.addEventListener('touchstart', (e) => {
      // e.preventDefault();
      const touch = e.touches[0];
      // console.log(touch.pageX, self);
      self.setState({ startX: touch.pageX });
      self.setState({ lock: true });
      //  console.log('startX:',touch.pageX)
    }, false);
    content.addEventListener('touchmove', (e) => {
      // e.preventDefault();
      const touch = e.touches[0];
      if (self.state.lock) {
        // console.log(e.pageX, self.state.startX, content.style.marginLeft);
        // const marginLeft = parseInt(content.style.marginLeft.replace('px', ''), 10);
        const marginLeft = 0 - (self.state.dotNum * self.state.screenWidth);
        let charge = touch.pageX - self.state.startX;
        // const charge = touch.pageX - self.state.startX;
        // console.log(charge, touch.pageX, self.state.startX);
        // console.log(marginLeft, marginLeft + charge);
        // console.log(marginLeft, charge, marginLeft + charge, (marginLeft + charge)/self.state.screenWidth * 90);
        self.setState({ aboveX: charge });
        self.setState({ tabContentStyle: { 
          // marginLeft: `${(marginLeft + charge)/self.state.screenWidth * self.state.width}vw` 
          transform: `translate3d(${(marginLeft + charge)/self.state.screenWidth * self.state.screenWidth}px, 0px, 0px)`
        } 
        });
      }
    }, false);
    content.addEventListener("touchend",(e) => {
      // e.preventDefault();
      const arr = self.state.options;
      // const touch = e.touches[0];
      // self.setState({ startX: touch.pageX });
      if (self.state.aboveX > self.state.aboveLimit) {
        dotNum -= 1;
      } else if (self.state.aboveX < -self.state.aboveLimit) {
        dotNum += 1;
      }
      if (dotNum <= 0 || dotNum >= arr.length) dotNum = 0;
      self.changeActive(arr[dotNum].tabName);
      self.setState({ lock: false });
    },false);
    content.addEventListener('mousedown', (e) => {
      e.preventDefault();
      self.setState({ startX: e.pageX });
      self.setState({ lock: true });
      //  console.log('startX:',touch.pageX)
    }, false);
    content.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (self.state.lock) {
        // console.log(e.pageX, self.state.startX, content.style.marginLeft);
        // const marginLeft = parseInt(content.style.marginLeft.replace('px', ''), 10);
        const marginLeft = 0 - (self.state.dotNum * self.state.width);
        const charge = e.pageX - self.state.startX;
        // console.log(charge);
        // console.log(marginLeft, charge, marginLeft + charge);
        self.setState({ aboveX: charge });
        self.setState({ tabContentStyle: { 
          transform: `translate3d(${(marginLeft + charge)}px, 0px, 0px)`
         //marginLeft: `${(marginLeft + charge)}px` 
        } });
      }
    }, false);
    content.addEventListener('mouseup', (e) => {
      e.preventDefault();
      if (self.state.aboveX > self.state.aboveLimit) {
        dotNum -= 1;
      } else if (self.state.aboveX < -self.state.aboveLimit) {
        dotNum += 1;
      }
      if (dotNum <= 0 || dotNum > arr.length) dotNum = 0;
      self.changeActive(arr[dotNum].tabName);
      self.setState({ lock: false });
    }, false);
  }
  move() {
    const arr = this.props.options;
    let dotNum = this.state.dotNum;
    setInterval(() => {
      this.changeActive(arr[dotNum].tabName);
      dotNum += 1;
      if (dotNum === arr.length) {
        dotNum = 0;
      }
    }, 4000);
  }
  changeActive(itm) {
    const arr = this.state.options;
    for (let i = 0; i < arr.length; i++) {
      if (itm === arr[i].tabName) {
        arr[i].isActive = true;
        this.setState({ dotNum: i });
        this.setState({ tabContentStyle: { 
          // marginLeft: `${0 - (this.state.width * i)}vw` 
          transform: `translate3d(${0 - (this.state.screenWidth * i)}px, 0px, 0px)`
        } });
      } else {
        arr[i].isActive = false;
      }
    }
    this.setState({ options: arr });
  }
  render() {
    const { show, showDots, showHeight, containerStyle, innerStyle,dotDefaultStyle, dotActiveStyle } = this.props;
    const { options, tabContentStyle } = this.state;
    const containerHead = styles.containerHead;
    const height = showHeight ? { height: `${this.state.height}vh` } : '';
    const width = this.state.screenWidth;
    const itmWidth = { width: `${width}px` };
    const contentWidth = { width: `${this.state.options.length * width}px` };

    const tabHeader = showDots ? this.state.options.map((itm) => {
      let span = '';
      if (this.props.showDotsText) {
        const tabStyle = itm.isActive ?  (dotActiveStyle || styles.tabActive ): dotDefaultStyle;
        span = (<div
          style={arrayUtils.merge([styles.tabItem, tabStyle])} key={itm.tabName}
          data-content={itm.tabName}
        >{itm.tabName}</div>);
      } else {
        const dotStyle = itm.isActive ? styles.dotActive : '';
        const dotClass = itm.isActive ? 'active' : 'default';
        span = (<div className={`carousel-dot ${dotClass}`}
          style={arrayUtils.merge([styles.dot, dotStyle])} key={itm.tabName}
          data-content={itm.tabName}
        />);
      }
      return span;
    }) : '';
    const tabContent = this.state.options.map((itm) => {
      const span = (<div
        style={arrayUtils.merge([styles.tabContentItem, styles.floatLeft, itmWidth, height, innerStyle])}
        key={itm.tabName}
      > {itm.content}</div>);
      return span;
    });
    return (
      <div className="carousel-container" ref={(r) => { this.$$container = r; }} style={arrayUtils.merge([styles.container, containerStyle])}>
        <div
          style={arrayUtils.merge([containerHead, itmWidth])}
          ref={(r) => { this.$$tabHeader = r; }}
        >
          {tabHeader}
        </div>
        <div className="trans" style={arrayUtils.merge([styles.tabContent, styles.floatLeft, itmWidth, height, innerStyle])}>
          <div className="trans" ref={(r) => { this.$$tabContent = r; }} style={arrayUtils.merge([styles.tabContent, tabContentStyle, styles.floatLeft, contentWidth, height, innerStyle])} >
            { tabContent}
          </div>
        </div>
        
      </div>
    )
  }
}

Carousel.propTypes = {
  options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({})), PropTypes.number]),
  showDotsText: PropTypes.bool,
  autoPlay: PropTypes.bool,
  dragAble: PropTypes.bool,
  showDots: PropTypes.bool,
  showHeight: PropTypes.bool,
  containerStyle: PropTypes.shape({}),
  innerStyle: PropTypes.shape({}),
  dotDefaultStyle: PropTypes.shape({}),
  dotActiveStyle: PropTypes.shape({}),
  show: PropTypes.bool,
};

Carousel.defaultProps = {
  options: [],
  showDotsText: false,
  autoPlay: false,
  dragAble: false,
  showDots: true,
  showHeight: true,
  containerStyle: {},
  innerStyle: {},
  dotDefaultStyle: {},
  dotActiveStyle: {},
  show: true
};


export default Carousel;
