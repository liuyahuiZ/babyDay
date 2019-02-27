import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import { UrlSearch, datedifference, GetLunarDay } from '../utils';
import computed from '../utils/computed';
import { show_lunar_calendar } from '../utils/clender';
import BaseView from '../core/app';
import formate from '../utils/formate'
import { goLink } from '../utils/common';
import moment from 'moment';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    Switch,
    Loade,
    RandomNumber,
    TransAnimal,
    Progress,
  } = Components;
const { sessions, storage } = utils;

class Clender extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            cardInfo: {},
            loadText: '加载中',
            wxConfig: sessions.getStorage('WXCONFIG') || {},
            hasCard: "LOADING", // LOADING ,  HASCARD, NULLCARD
        };
    }
    _viewAppear(){
    }

    componentDidMount(){
        
    }
    
    render(){
        const { cardInfo, hasCard } = this.state;
        console.log(moment().dayOfYear())
        console.log(datedifference(`${moment().year()}-12-31`, `${moment().year()}-01-01`))
        let nowDay = datedifference(moment().format('YYYY-MM-DD'), `${moment().year()}-01-01`) + 1;
        let allDay = datedifference(`${moment().year()}-01-01`, `${moment().year()}-12-31`)
        moment.locale('en', {
            weekdays : [
                "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"
              ]
        });
        const self = this;
        return (<section className="bg-f5f5f5 padding-all minheight-100">
            <Row>
                <Col className="line-height-3r font-size-12">日历</Col>
            </Row>
            <Row justify={"center"} className="padding-all-1r  bg-show border-radius-5f box-shadow">
                <Col span={12}>
                    {moment().format('YYYY-MM-DD')}
                </Col>
                <Col span={12} className="text-align-right">
                    {moment().format('dddd')}
                </Col>
                <Col className="margin-top-1r font-size-40 text-align-center">
                    {moment().format('DD')}
                </Col>
                <Col className="text-align-center">
                    {show_lunar_calendar()}
                </Col>
                <Col className="margin-top-2r text-align-center">第 { nowDay } 天, 今年已消耗 {computed.accMul((nowDay / allDay), 100).toFixed(2)}%， 剩余 { datedifference(moment().format('YYYY-MM-DD'), `${moment().year()}-12-31`)} 天</Col>
                <Col className="margin-top-1r">
                    <Progress percent={ computed.accMul((nowDay / allDay), 100) } barColor={'#FF6157'} radius={2} />
                </Col>
            </Row>
        </section>)
    }
}

export default Clender;