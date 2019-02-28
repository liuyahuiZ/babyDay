import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import formate from '../utils/formate'
import { goLink } from '../utils/common';


const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Input,
    Modal
  } = Components;
const { sessions, storage } = utils;

class Secret extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            number1: '',
            number2: '',
            number3: '',
            count: 0,
            secret: '478'
        };
    }
    _viewAppear(){
    }

    setValue(key,val){
        this.setState({[key]: val});
    }
    submitCode(){
        const { number1, number2, number3, secret, count } = this.state;
        if(number1==''||number2==''||number3==''){
            Toaster.toaster({ type: 'normal', position: 'top', content: '请输入密码', time: 3000 }, true);
            return;
        }
        if(secret===`${number1}${number2}${number3}`|| count > 3){
            goLink('/Success');
        } else {
            let newCount = count + 1;
            this.setState({
                count: newCount
            })
            Modal.alert({ title: '',
            content: (<Row className="text-align-center">
            <Col className="margin-top-1r">密码输入错误请重试！</Col>
            <Col> <Icon iconName="android-sad " size={'280%'} iconColor={'#000'}   /></Col>
            </Row>),
            btn: {
              text: '确定',
              type: 'link',
              style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
            }, 
            type: 'large'
            },
          () => { console.log('nult callback'); });
        }
        
    }

    render(){
        const { number1,number2,number3 } = this.state;
        const self = this;
        return (<section className="bg-f5f5f5 padding-all minheight-100">
            <Row className="margin-top-3r">
                <Col className="line-height-3r text-align-center font-size-16">请输入密码</Col>
            </Row>
            <Row className="padding-all-1r border-radius-5f margin-top-3r" justify="center">
                <Col span={20}>
                    <Row justify="center">
                    <Col span={7} className="padding-all-1r bg-show">
                        <Input
                            value={number1}
                            placeholder="请输入"
                            maxLength={100}
                            innerStyle={{'textAlign': 'center'}}
                            onChange={(e,t,v)=>{
                                self.setValue('number1',v)
                            }}
                        />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={7} className="padding-all-1r  bg-show">
                        <Input
                            value={number2}
                            placeholder="请输入"
                            maxLength={100}
                            innerStyle={{'textAlign': 'center'}}
                            onChange={(e,t,v)=>{
                                self.setValue('number2',v)
                            }}
                        />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={7} className="padding-all-1r  bg-show">
                        <Input
                            value={number3}
                            placeholder="请输入"
                            maxLength={100}
                            innerStyle={{'textAlign': 'center'}}
                            onChange={(e,t,v)=>{
                                self.setValue('number3',v)
                            }}
                        />
                    </Col>
                    </Row>
                </Col>
                <Col className="margin-top-3r" span={10}>
                    <Buttons
                    text="确认"
                    type={'primary'}
                    size={'large'}
                    style={{color:'#fff', borderRadius: '0.5rem'}}
                    onClick={()=>{
                      this.submitCode()
                    }}
                  />
                  </Col>
            </Row>
        </section>)
    }
}

export default Secret;