import React, { Component } from 'react';
import $ from 'webpack-zepto';
import './dashBord.scss'

export default class ScoreBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgWidth: 529,
            randomValue: 0,
            value: this.props.score||0,
            strokeWidth: this.props.strokeWidth||10,
            needleWidth: this.props.needleWidth||10,
            showInnerScore: this.props.showInnerScore|| false,
            showOutterScore: this.props.showOutterScore|| false
        }
        this.timer = {};
    }

    componentWillReceiveProps(nextProps){
      const {value} = this.state
      if(value!==nextProps.score){
        this.setState({
          value: nextProps.score||0,
          strokeWidth: nextProps.strokeWidth||10,
          needleWidth: nextProps.needleWidth||10,
        })
        this.runderStart();
      }
    }
    componentDidMount() {
        let imgWidth = $('.clock')[0].clientWidth||529;
        const self = this;
        this.setState({
          imgWidth: imgWidth
        })
        this.runderStart();
    }
    componentWillUnmount(){
      this.setState({
        randomValue: 0
      });
      clearInterval(this.timer);
    }
    // 根据分数计算坐标
  calculateCoordinate(score, rs){
    let degree = (270 *  Number(score))/100;
    let rx = rs, ry=rs, r=rs;
    let x = 0, y =0;
    let Xsite = 0, Ysite =0;
    let axisRotation = 0, largeArcFlag=0;
    // console.log(degree);

    let startX = r - Math.cos(Math.PI * 45 / 180) * r;
    let startY = r + Math.sin(Math.PI * 45 / 180) * r;

    if(degree <= 45) {
      y = Math.sin(Math.PI * ( 45 - degree) / 180) * r;
      x = Math.cos(Math.PI * ( 45 - degree) / 180) * r;
      Xsite = r - x;
      Ysite = r + y;
      axisRotation = 0;
      largeArcFlag = 0;
    } else if(degree > 45 && degree <= 90) {
      y = Math.sin(Math.PI * ( degree - 45) / 180) * r;
      x = Math.cos(Math.PI * ( degree - 45) / 180) * r;
      Xsite = r - x;
      Ysite = r - y;
      axisRotation = 0
      largeArcFlag = 0
    } else if(degree > 90 && degree <= 135){
      x = Math.sin(Math.PI * ( 135 - degree ) / 180) * r;
      y = Math.cos(Math.PI * ( 135 - degree) / 180) * r;
      Xsite = r - x;
      Ysite = r - y;
      axisRotation = 0
      largeArcFlag = 0
    } else if(degree > 135 && degree <= 180){
      x = Math.sin(Math.PI * ( degree - 135 ) / 180) * r;
      y = Math.cos(Math.PI * ( degree - 135) / 180) * r;
      Xsite = r + x;
      Ysite = r - y;
      axisRotation = 1
      largeArcFlag = 0
    } else if(degree > 180 && degree <= 225){
      y = Math.sin(Math.PI * ( 225 - degree ) / 180) * r;
      x = Math.cos(Math.PI * ( 225 - degree ) / 180) * r;
      Xsite = r + x;
      Ysite = r - y;
      axisRotation = 0
      largeArcFlag = 1
    } else if(degree > 225 && degree <= 270){
      y = Math.sin(Math.PI * ( degree - 225 ) / 180) * r;
      x = Math.cos(Math.PI * ( degree - 225) / 180) * r;
      Xsite = r + x;
      Ysite = r + y;
      axisRotation = 1
      largeArcFlag = 1
    }
    return {x: Xsite, y: Ysite, ax: axisRotation, la: largeArcFlag, rx:rx, ry: ry, startX: startX, startY: startY}
  }

  //设置进度条颜色
  setColor(score){
    let startColor = '', stopColor='';
    if(score==0){
      startColor= '#F44336';
      stopColor= '#E1E1E1';
    }else if(score<60){
      startColor= '#F44336';
      stopColor= '#F44336';
    }else if(score>=60&&score<80){
      startColor= '#BBE634';
      stopColor= '#5CC062';
    }else if(score>=80&&score<90){
      startColor= '#5CC060';
      stopColor= '#54AEFF';
    }else if(score>=90&&score<=100){
      startColor= '#54AEFF';
      stopColor= '#54AEFF';
    }
    return {
      startColor: startColor,
      stopColor: stopColor
    }
  }

  runderStart(latestNo) {
    this.timer = setInterval(() => {
      this.addNumber();
    }, 20);
  }

  addNumber() {
    let latestNumber = this.state.value;
    let per = this.state.randomValue;
    if (per < latestNumber) {
      per += 2;
      this.setState({
        randomValue: per
      });
    } else if (per > latestNumber) {
      if((per-latestNumber)>2){
        per = per - 2;
        this.setState({
          randomValue: per
        });
      } else{
        this.setState({
          randomValue: latestNumber
        });
        clearInterval(this.timer);
      }
    } else {
      clearInterval(this.timer);
    }
  }

    render () {
        const { imgWidth, randomValue, value, strokeWidth, needleWidth, showInnerScore, showOutterScore } = this.state;
        const r = imgWidth/2*0.76;
        const marginT = imgWidth/2*0.15;
        const site = this.calculateCoordinate(randomValue,r); //线条坐标
        const bgSite = this.calculateCoordinate(100,r); //背景线条坐标
        const stroke = this.setColor(randomValue); //线条颜色
        // console.log(site, stroke);
        const routation = (270 *  Number(randomValue))/100 + 45;
        return (<div >
          <div style={{textAlign: 'center', position: 'relative'}}>
              <div className={"clock"} />
              <svg width={2*r} height={2*r} className={'donut-svg'} style={{marginTop: marginT}}>
                <path d={`M ${bgSite.startX} ${bgSite.startY} A ${bgSite.rx} ${bgSite.ry} ${bgSite.ax} ${bgSite.la} 1 ${bgSite.x} ${bgSite.y}`} fill="none" strokeLinecap="round" stroke="#e1e1e1" style={{strokeWidth:strokeWidth}}/>
                {/* <path d="M 60 340 A 200 200 1 1 1 400 200" fill="none" stroke="#54AEFF" style={{strokeWidth:10, opacity: 0.6}}/>
                <path d="M 60 340 A 200 200 0 0 1 200 0" fill="none" stroke="#52EEFF" style={{strokeWidth:10, opacity: 0.6}}/> */}
                <path d={`M ${site.startX} ${site.startY} A ${site.rx} ${site.ry} ${site.ax} ${site.la} 1 ${site.x} ${site.y}`} fill="none" strokeLinecap="round"  stroke={'url(#gradient)'} style={{strokeWidth:strokeWidth}} />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop stopColor={stroke.startColor}></stop>
                    <stop offset="100%" stopColor={stroke.stopColor}></stop>
                  </linearGradient>
                </defs>
                <svg className={'donut-svg'}>
                  <path d={`M ${r-needleWidth} ${r} A ${needleWidth} ${needleWidth} 0 0 1 ${r+needleWidth} ${r}`} fill={stroke.stopColor} transform={`rotate(${routation}, ${r} ${r})`} />
                  <polygon points={`${r-needleWidth} ${r}, ${r} ${2*r-40} ,${r+needleWidth} ${r}`} fill={stroke.stopColor} transform={`rotate(${routation}, ${r} ${r})`} ></polygon>
                  <circle r={needleWidth/2} cx={r} cy={r} fill="#fff"></circle>
                </svg>
                {showInnerScore ? <text x={parseInt(value) < 10 ? r-(r/10) : r-(r/4)} y={2*r-(r/4)} fill={stroke.startColor}>{value}</text>: ''}
                {showInnerScore ? <text x={r+(r/10)} y={2*r-(r/4)} >分</text>: ''}
              </svg>
          </div>
          <div>
            { showOutterScore ? <div className={'score-info'}><span className={'score'} style={{color: `${this.setColor(randomValue).startColor}`}}>{ randomValue.toFixed(2)||0}</span> 分</div>: ''}
          </div>
        </div>);
    }
}
