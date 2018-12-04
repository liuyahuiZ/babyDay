import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import './pullRefresh.scss';
import Icon from '../Icon';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import {isPC} from '../../utils/url';

class PullRefresh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      tabContentStyle: '',
      startX: 0,
      startY: 0,
      aboveX: 0,
      lock: false,
      limitHight: 150,
      limitlow: 80,
      loadingIconStyle: 'transroute',
      refresh: false,
      scrollTop: 0,
      charge: 0
    };
  }
  componentDidMount() {
    const self = this;
    self.drag(self, []);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.refreshed){
        this.moveToStart()
    }
  }
  
  setAbove(type){
    const {aboveX, endmarginTop} = this.state;
    const content = this.$$tabContent.clientHeight;
    let a = 10;
    let timeStr = 2;
    const self = this;
    // console.log(Math.abs(aboveX) , Math.abs(endmarginTop));
    if(aboveX > 0) {
      self.setState({
        tabContentStyle: { marginTop: 0 } 
      })
      return ;
    };
    if(Math.abs(aboveX) > (content/2) ) {
      self.setState({
        tabContentStyle: { marginTop: aboveX > 0 ? content/2: -content/2 } 
      })
      return ;
    };
    if(type ==='up') {
      if(aboveX > endmarginTop ){
        self.setState({
          aboveX: aboveX - a,
          tabContentStyle: { marginTop: aboveX - a } 
        }, ()=>{
          setTimeout(()=>{
            self.setAbove(type)
          }, timeStr)
        })
      }
    } else{
      if(aboveX < endmarginTop ){
        self.setState({
          aboveX: aboveX + a,
          tabContentStyle: { marginTop: aboveX + a } 
        }, ()=>{
          setTimeout(()=>{
            self.setAbove(type)
          }, timeStr)
        })
      }
    }
  }

  drag(self, arr) {
    const content = self.$$tabContent;
    const pullBox = self.$$pullBox;
    this.arr = arr;
    content.addEventListener('touchstart', (e) => {
      // e.preventDefault();
      if(self.state.refresh) {
        e.preventDefault()
        return;
      }
      const touch = e.touches[0];
      // console.log('touchstart', touch.pageY, self.state.tabContentStyle);
      self.setState({ 
        startX: touch.pageX,
        startY: touch.pageY,
        lock: true,
        startTime:  Date.now()
      });
      //  console.log('startY:',touch.pageY)
    }, false);
    content.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if(self.state.refresh) return;
      if(pullBox.scrollTop >0) return;

      const touch = e.touches[0];
      if(Math.abs(touch.pageX-self.state.startX)>20) return;
      if (self.state.lock) {
        // console.log(content.style.marginTop);
        let charge = touch.pageY - self.state.startY + self.state.scrollTop;
        if(charge > self.state.limitHight) {
          charge = self.state.limitHight;
        }
        self.setState({ 
          aboveX: charge,
          charge: touch.pageY - self.state.startY,
          tabContentStyle: { marginTop: charge } 
        });
        if(charge > self.state.limitlow) {
            self.state.loadingIconStyle = 'transnone'
        } else{
            self.state.loadingIconStyle = 'transroute'
        }
      }
    }, false);
    content.addEventListener("touchend",(e) => {
    //   e.preventDefault();
      if(self.state.refresh) return;

      const {startTime, charge, aboveX} = self.state;
      const endTime = Date.now();
      let a = 1/2;
      let v0 = charge / (endTime- startTime);
      // console.log('touchend', aboveX, charge );
      let s = v0 * a * 700;
      console.log(self.state.aboveX + '/'+ s);

      self.setState({
        scrollTop: self.state.aboveX,
        // tabContentStyle: { marginTop: aboveX + s } ,
        endmarginTop: self.state.aboveX ,
      })
      setTimeout(()=>{
        self.setState({
          tabContentStyle: { marginTop: aboveX + s }
        })
      },10)

      let type= charge > 0? 'down' : 'up' ;
      
      if(self.state.aboveX > 0 ) {
        if (self.state.aboveX > self.state.limitlow) {
            self.startLoading();
          } else {
            self.moveToStart();
          }
      }else{
        self.setAbove(type);
      }

    },false);

    if(isPC()){
      content.addEventListener('mousedown', (e) => {
        e.preventDefault();
        self.setState({ 
          startX: e.pageX, 
          startY: e.pageY, 
          lock: true 
        });
      }, false);
      content.addEventListener('mousemove', (e) => {
        if(self.state.refresh) return;
        if(pullBox.scrollTop >0) return;
  
        if(Math.abs(e.pageX-self.state.startX)>20) return;
        if (self.state.lock) {
          let charge = e.pageY - self.state.startY + self.state.scrollTop;
          if(charge > self.state.limitHight) {
            charge = self.state.limitHight;
          }
          self.setState({ 
            aboveX: charge,
            tabContentStyle: { marginTop: charge } 
          });
          if(charge > self.state.limitlow) {
              self.state.loadingIconStyle = 'transnone'
          } else{
              self.state.loadingIconStyle = 'transroute'
          }
        }
      }, false);
      content.addEventListener('mouseup', (e) => {
        if(self.state.refresh) return;
        if(pullBox.scrollTop >0) return;
        self.setState({
          scrollTop: self.state.aboveX
        })
        if(self.state.aboveX > 0 ) {
          if (self.state.aboveX > self.state.limitlow) {
            self.startLoading();
          } else {
            debugger
            self.moveToStart();
          }
        }
      }, false);
    }
    
  }
  startLoading(){
    console.log('startLoading');
    this.setState({ 
        refresh: true,
        tabContentStyle: { marginTop: 50 }
    })
    this.props.onLoading();
  }
  moveToStart() {
    const self = this;
    this.setState({ 
        lock: false, 
        loadingIconStyle: 'transroute',
        tabContentStyle: { marginTop: 0 },
        aboveX: 0,
        startX: 0,
        startY: 0,
        scrollTop: 0,
    });
    setTimeout(() => {
        self.setState({
            refresh: false
        })
    }, 300);
  }
  doMove(end, s){
    const self = this;
    let start = end;
    let time = setInterval(()=>{
      if(s>0){
        start = start + 2
      }else{
        start = start - 2
      }
      
      self.setState({
        tabContentStyle: start
      })
    }, 10);
    
    if(start>=Math.abs(end+s)){
      clearInterval(time)
    }

  }


  render() {
    const { loadingIconStyle, refresh } = this.state;
    const { className } = this.props;
    const tabContentStyle = this.state.tabContentStyle;
    const lodingIcon = refresh ? <div className="loading"><Icon iconName={'load-a'} size={'130%'} iconColor={''} iconPadding={'0'} /></div>
    : <Icon iconName={'jet'} size={'130%'} iconColor={''} iconPadding={'0'} />;
    const ClassName = `pull-box ${className}`;
    return (
      <div className={ClassName} ref={(r) => { this.$$pullBox = r; }}>
        <div className={`container ${refresh?'trans':''}`} ref={(r) => { this.$$tabContent = r; }} style={arrayUtils.merge([tabContentStyle])} >
            <Row className="loading-icon">
                <Col className={loadingIconStyle}>
                    {lodingIcon}
                </Col>
            </Row>
            <div className="content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

PullRefresh.propTypes = {
  percent: PropTypes.number,
  onLoading: PropTypes.func,
  refreshed: PropTypes.bool,
  className: PropTypes.string
};

PullRefresh.defaultProps = {
  percent: 0,
  onLoading: ()=>{},
  refreshed: false,
  className: ''
};


export default PullRefresh;
