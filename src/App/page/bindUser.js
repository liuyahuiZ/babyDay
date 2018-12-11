import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import { UrlSearch } from '../utils';
import { findUser } from '../api/index'
import { goLink } from '../utils/common';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    Input
  } = Components;
const { sessions, storage } = utils;
class BindUser extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: storage.getStorage('userInfo') || {
            nickname: ''
          },
          phone: '',
          code: ''
      };
    }
    componentDidMount(){
        let obg = UrlSearch();
    }

    setValue(key,val){
      this.setState({[key]: val});
    }

    bindUser(){
      const self = this;
      const { phone } = this.state
      if(!phone&&phone==='') {
        Toaster.toaster({ type: 'normal', position: 'top', content: '请填写手机号', time: 3000 }, true);
        return false;
      }
      findUser({
        "phone": phone,
      }).then((res)=>{
        console.log(res);
        if(res.respHead.code=='0000'){
          if(res.respBody&&res.respBody.length>0){
            Toaster.toaster({ type: 'normal', position: 'top', content: '绑定成功', time: 5000 });
            storage.setStorage('userInfo', res.respBody[0]);
            goLink('/Tab')
          }else{
            Toaster.toaster({ type: 'normal', position: 'top', content: '该账号未注册', time: 5000 });
          }
        }else{
          Toaster.toaster({ type: 'normal', position: 'top', content: res.msg, time: 5000 });
        }
      }).catch((err)=>{
        Toaster.toaster({ type: 'normal', position: 'top', content: JSON.stringify(err), time: 5000 });
      })
    }

    render() {
      const { phone, code} = this.state;
      const self = this;
        return(
          <section className="bg-f5f5f5">
            <Row className="padding-all ">
                <Col span={12} className="padding-all-1r line-height-3r">绑定手机号</Col>
                <Col span={12} className="padding-all-1r text-align-right line-height-3r textcolor-855EF1" onClick={()=>{
                  goLink('/Registor')
                }}>注册新账号 <Icon iconName={'ios-arrow-right '} size={'120%'} iconColor={'#855EF1'} /></Col>
                <Col span={24} className="bg-show margin-top-2 padding-all-1r border-radius-5f">
                  <Row className="">
                      <Col span={3} className="padding-top-1 text-align-center">
                        <Icon iconName={'iphone'} size={'190%'} iconColor={'#855EF1'} /> 
                      </Col>
                      <Col span={21}>
                      <Input
                          value={phone}
                          placeholder="请输入手机号"
                          maxLength={100}
                          onChange={(e,t,v)=>{
                              self.setValue('phone',v)
                          }}
                          />
                      </Col>
                  </Row>
                </Col>
                
                <Col className="margin-top-5r padding-all-1r" >
                  <Buttons
                    text="登陆"
                    type={'primary'}
                    size={'large'}
                    style={{backgroundColor: '#855EF1', color:'#fff', borderRadius: '3rem'}}
                    onClick={()=>{
                      this.bindUser()
                    }}
                  />
                </Col>
            </Row>
            {/* </div> */}
          </section>
        );
    }
}
export default BindUser;
