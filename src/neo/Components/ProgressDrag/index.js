import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import styles from './style';
import {isPC} from '../../utils/url';

class ProgressDrag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      startX: 0,
      startY: 0,
      tabContentStyle: 0,
      endPosition: 0,
      allWidth: 0,
      enableDrag: this.props.enableDrag,
      percent: this.props.percent,
      barWidthDisable: this.props.barWidthDisable,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      percent: nextProps.percent
    }, ()=>{
      this.init()
    })
  }
  
  componentDidMount() {
    const self = this;
    self.drag(self);
    this.init()
  }

  init(){
    const allWidth = this.$$barContainer.clientWidth;
    const { percent } = this.state;
    this.setState({
      tabContentStyle: percent / 100 * allWidth,
      endPosition: percent / 100 * allWidth,
    })
  }

  drag(self) {
    const content = self.$$barround;
    const allWidth = self.$$barContainer.clientWidth;
    const { enableDrag } = this.state;
    content.addEventListener('touchstart', (e) => {
      // e.preventDefault();
      if(!enableDrag) return;
      const touch = e.touches[0];
      // console.log('touchstart', touch.pageY, self.state.tabContentStyle);
      self.setState({ 
        startX: touch.pageX,
      });
      //  console.log('startY:',touch.pageY)
    }, false);
    content.addEventListener('touchmove', (e) => {
      if(!enableDrag) return;
      e.preventDefault();

      const touch = e.touches[0];
      let charge = touch.pageX - self.state.startX + self.state.endPosition;
      // console.log(charge, self.state.endPosition);
      if(charge< 0){
        charge = 0;
      } else if(charge > (allWidth )) {
        charge = allWidth
      }
      // console.log(charge, allWidth);
      self.setState({ 
        charge: charge,
        tabContentStyle: charge,
        percent:  charge/allWidth *100
      });
        
    }, false);
    content.addEventListener("touchend",(e) => {
    //   e.preventDefault();
      const { charge, percent } = this.state;
      self.setState({ 
        endPosition: charge
      });
      self.props.onChange(percent);
    },false);
    
  }

  render() {
    const { barColor, bgColor, radius, style, barRoundStyle } = this.props;
    const { percent, tabContentStyle, barWidthDisable } = this.state;
    const borderRadius = { borderRadius: radius,  backgroundColor: bgColor };
    let widthPercent = barWidthDisable ? 100 : percent;
    const barWidth = { width: `${widthPercent}%`, background: barColor, borderRadius: radius };
    return (
      <div style={arrayUtils.merge([styles.container, borderRadius, style])} ref={(r) => { this.$$barContainer = r; }}>
        <div style={arrayUtils.merge([styles.bar, barWidth])} />
        <div style={arrayUtils.merge([styles.barround, {'left': tabContentStyle }, barRoundStyle ])} ref={(r) => { this.$$barround = r; }}></div>
      </div>
    );
  }
}

ProgressDrag.propTypes = {
  percent: PropTypes.number,
  barColor: PropTypes.string,
  radius: PropTypes.number,
  barWidthDisable: PropTypes.bool,
  enableDrag: PropTypes.bool,
  onChange: PropTypes.func,
  barRoundStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
};

ProgressDrag.defaultProps = {
  percent: 0,
  barColor: 'rgb(65, 150, 252)',
  bgColor: '#f5f5f5',
  radius: 0,
  barWidthDisable: false,
  barRoundStyle: {},
  enableDrag: true,
  style: {},
  onChange: ()=>{}
};


export default ProgressDrag;
