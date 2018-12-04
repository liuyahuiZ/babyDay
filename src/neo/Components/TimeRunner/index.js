import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import './time.scss';

class TimeRunner extends Component {
  constructor(props) {
    super(props);
    this.state={
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        startStatus: 'stop'
    }
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    // this.start();
  }
  stop(){
    this.setState({
        startStatus: 'stop'
    })
  }
  start(){
    const self = this;
    self.setState({
        startStatus: 'start'
    },()=>{self.timer(self) })
  }

  timer(self){
    const {startStatus} = this.state;
    if(startStatus=='stop') return;
    let second = self.state.second;
    let minute = self.state.minute;
    let hour = self.state.hour;
    let millisecond = self.state.millisecond;

    millisecond=millisecond+100;
    if(millisecond>=1000){
        millisecond=0;
        second=second+1;
    }
    if(second>=60){
        second=0;
        minute=minute+1;
    }
    if(minute>=60){
        minute=0;
        hour=hour+1;
    }

    self.setState({
        millisecond: millisecond,
        second: second,
        minute: minute,
        hour: hour,
    })
    setTimeout(function() { 
        self.timer(self) 
    },100);
  }

  getData(){
    return this.state;
  }

  splitStr(second){
    let showSecond = '';
    if(second > 9) {
        let secondArr = second.toString();
        showSecond = (<Row>
        <Col span={1}></Col>
        <Col span={11} className='time-item line-height-item'>{secondArr[0]}</Col>
        <Col span={1}></Col>
        <Col span={11} className='time-item line-height-item'>{secondArr[1]}</Col>
        </Row>);
    } else{
        showSecond = (<Row>
        <Col span={1}></Col>
        <Col span={11} className='time-item line-height-item'>0</Col>
        <Col span={1}></Col>
        <Col span={11} className='time-item line-height-item'>{second}</Col>
    </Row>);
    }
    return showSecond
  }
  render() {
    const { second,  minute, hour, millisecond} = this.state;
    let showSecond = this.splitStr(second);
    let showMinute = this.splitStr(minute);
    let showHour = this.splitStr(hour);

    return (
      <Row justify="center" className="time-runner">
        <Col span={5}>{showHour}</Col>
        <Col span={1} className="line-height-item">:</Col>
        <Col span={5}>{showMinute}</Col>
        <Col span={1} className="line-height-item">:</Col>
        <Col span={5}>{showSecond}</Col>
        {/* <Col span={6}>{millisecond}</Col> */}
      </Row>
    );
  }
}

TimeRunner.propTypes = {
  type: PropTypes.string,
};

TimeRunner.defaultProps = {
  style: {},
  type: 'text',
};

export default TimeRunner;
