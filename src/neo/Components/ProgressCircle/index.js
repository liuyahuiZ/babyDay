import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import './progressCircle.scss'

class ProgressCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: 0,
      percent: this.props.score || 80,
      offsetStyle: 0,
      screenWidth: 245,
      show: this.props.show,
      innerText: this.props.innerText,
      site: {}
    };
  }
  componentDidMount(){
    if(this.props.show) {
      this.init();
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
        show: nextProps.show,
        percent: nextProps.score,
        innerText: nextProps.innerText
    },()=>{
        if(nextProps.show) {
            this.init();
        }
    })
  }

  init(){
    this.setState({
        screenWidth: this.$$progressContainer.clientWidth||245,
        radius: this.$$progressContainer.clientWidth/2
    },()=>{
        this.createCSS();
    });
    
  }

  calcDashOffset() {
    const {radius, percent} = this.state;
    // console.log(radius)
    let circumference = (Math.PI * (2 * radius));
    return Math.floor(circumference - ((percent / 100) * circumference));
  }

  createCSS() {
    const {radius, percent, screenWidth} = this.state;
    let circumference = (Math.PI * (2 * radius));
    let strokeDashoffset = this.calcDashOffset();
    // console.log(percent, screenWidth/2);
    let site = this.calculateCoordinate(percent, screenWidth/2);
    this.setState({
        offsetStyle: strokeDashoffset,
        strokeDasharray: circumference,
        site: site
    })
  }

  // 根据分数计算坐标
  calculateCoordinate(score, rs){
    let degree = (360 *  Number(score)/100);
    let r=rs;
    let x = 0, y =0;
    let Xsite = 0, Ysite =0;


    if(degree <= 90) {
      y = Math.sin(Math.PI * ( degree) / 180) * r;
      x = Math.cos(Math.PI * ( degree) / 180) * r;
      Xsite = r + x;
      Ysite = r + y;

    } else if(degree > 90 && degree <= 180){
      y = Math.sin(Math.PI * ( 180 - degree ) / 180) * r;
      x = Math.cos(Math.PI * ( 180 - degree) / 180) * r;
      Xsite = r - x;
      Ysite = r + y;
   
    } else if(degree > 180 && degree <= 270){
      x = Math.sin(Math.PI * ( 270 - degree ) / 180) * r;
      y = Math.cos(Math.PI * ( 270 - degree ) / 180) * r;
      Xsite = r - x;
      Ysite = r - y;
   
    } else if(degree > 270 && degree <= 360){
      y = Math.sin(Math.PI * ( 360- degree) / 180) * r;
      x = Math.cos(Math.PI * ( 360 -degree) / 180) * r;
      Xsite = r + x;
      Ysite = r - y;
    }
    return {x: Xsite, y: Ysite}
  }

  render(){
      const { offsetStyle, screenWidth, strokeDasharray, show, percent, innerText, site } = this.state;
      let r = screenWidth/2;
      let cr = r * 0.75;

      return show ? (<div className="donut" ref={(s) => { this.$$progressContainer = s; }}>
          <svg width={screenWidth} height={screenWidth} xmlns="http://www.w3.org/2000/svg" className="donut__svg">
            <circle id="donut-graph-x" className="donut__svg__scrim" r={r} cy={r} cx={r} strokeWidth="3" stroke="#333" fill="none" />
            <circle id="donut-graph" className="donut__svg__circle--one" r={r} cy={r} cx={r} strokeWidth="4" stroke="url(#purple)" 
            strokeLinejoin="round" strokeLinecap="round" fill="none" style={{ 'strokeDashoffset': offsetStyle, 'strokeDasharray': strokeDasharray}} />
            <circle r={5} cx={site.x} cy={site.y} fill="#9CD36D"></circle>
            <defs>
            <linearGradient id="purple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9CD36D" />
                <stop offset="100%" stopColor="#9CD36D" />
            </linearGradient>
            </defs>
        </svg>
        <div className={'donut__spic text-align-center absolute top-0 textclolor-white'} 
        style={{'width':screenWidth, 'height':screenWidth, 'lineHeight': `${screenWidth}px` }}>
            <span>{innerText ? innerText :percent}</span>
        </div>
      </div>) : ''
  }
}

ProgressCircle.propTypes = {
    style:  PropTypes.shape({}),
    fontSize: PropTypes.string,
    allCode: PropTypes.number,
    normalColor: PropTypes.string,
    activeColor: PropTypes.string,
  };
  
ProgressCircle.defaultProps = {
    style: {},
    allCode: 100,
    fontSize: '100%',
    normalColor: '#EBEBEB',
    activeColor: '#EFCB47'
};
  
  
  export default ProgressCircle;