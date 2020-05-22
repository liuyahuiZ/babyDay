import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch, datedifference } from '../utils';
import { goLink } from '../utils/common';
import moment from 'moment';
import { findUser } from '../api/index';

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
    Collapse,
    Panel,
    TransAnimal
  } = Components;
  const { sessions, storage } = utils;
class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: storage.getStorage('userInfo') || {}
      };
    }

    componentDidMount(){
      let obg = UrlSearch();
      let userInfo = storage.getStorage('userInfo')
      if(userInfo&&userInfo!==''&&obg.clean){
        storage.removeStorage('userInfo');
        storage.removeAllStorage();
      }else {
        this.getUserInfo()
      }
    }

    switchChange(date){
        console.log(date);
    }

    getUserInfo(){
      const {userInfo} = this.state;
      const self = this;
      findUser({
          "phone": userInfo.phone,
      }).then((res)=>{
          console.log('findUser', res);
          if(res.respHead.code=='0000') { 
              let oldInfo = res.data[0]
              self.setState({
                userInfo: oldInfo || {}
              })
              storage.setStorage('userInfo', oldInfo)
          }
      }).catch((err)=>{
          console.log(err);
      })
  }

    checkUser(){
      const { userInfo } = this.state;
      if(!(userInfo&&userInfo.phone)) {
        goLink('/Registor');
      }
    }

    submitClick(){
        Modal.alert({ title: 'warning',
          content: (<div> others
            <Buttons
              text="click to do a new Alert "
              type={'link'}
              onClick={() => {
                Modal.formConfirm({ title: 'Form Open',
                content: (
                  1231
                ),
                style: '',
                btnConStyle: 'center',
                btnSure: {
                  text: '确认',
                  type: 'link',
                  style: { 'height': '2rem'}
                },
                btnCancle: {
                  text: '取消',
                  type: 'link',
                  style: { 'height': '2rem'}
                }
              },
              (id, callback) => { callback(id); },
              (id, callback) => { callback(id); alert('this is cancle callback'); });
              }}
            />
          </div>),
          btn: {
            text: '确定',
            type: 'link',
            style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
          }, 
          type: 'large'
        },
        () => { console.log('nult callback'); });
    }
        

    render() {
        const { userInfo } = this.state;
        const self = this;
        return(
          <section className="bg-f5f5f5">
            <Row justify="center" >
              <Col span={24} className="padding-all">
                <TransAnimal >
                <Row  className="padding-all-1r bg-855EF1-7039F8-180 border-radius-5f relative overflow-hide">
                  <Col span={12} className="text-align-left">
                    {/* <Icon iconName={'quote '} size={'150%'} iconColor={'#fff'}   /> */}
                  </Col>
                  <Col span={12} className="text-align-right zindex-10" onClick={()=>{
                    goLink('/UserInfo')
                  }}>
                    <Icon iconName={'android-settings '} size={'150%'} iconColor={'#fff'}   />
                  </Col>
                  <Col className="zindex-10" onClick={()=>{
                    self.checkUser()
                  }}>
                  <Row>
                    <Col span={10}>
                      <div className="middle-round-6 border-radius-round bg-gray display-inline-block line-height-4r overflow-hide border-all border-color-fff">
                          {userInfo.imgUrl? <img className="width-100" src={`${config.ROOT_URL}files/getTheImage?path=${userInfo.imgUrl}`} />
                          : <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />}
                      </div>
                    </Col>
                    <Col span={14} className="margin-top-3">
                    { userInfo&&userInfo.username ? 
                        <Row>
                          <Col className="textclolor-white font-size-12" >{userInfo.username} <span className="font-size-16"> {datedifference(moment().format('YYYY-MM-DD'), userInfo.birthday) + 1}</span> 天</Col>
                          <Col className="textclolor-white" > 生日 {userInfo.birthday}</Col>
                        </Row>
                      : ''}
                      </Col>
                  </Row>
                    
                  </Col>
              
                  <Col className="margin-top-1r zindex-10">
                  { userInfo&&userInfo.username ? <Row>
                      <Col className="margin-top-1r" span={12}>
                        <Row>
                          <Col className="textclolor-white " >体重</Col>
                          <Col className="textclolor-white font-size-16" >{userInfo.weight}</Col>
                        </Row>
                      </Col>
                      <Col className="margin-top-1r" span={12}>
                        <Row>
                          <Col className="textclolor-white " >身高</Col>
                          <Col className="textclolor-white font-size-16" >{userInfo.height}</Col>
                        </Row>
                      </Col>
                    </Row> : ''}
                  </Col>
                  <div className="width-100 opacity-2 heightp-100 absolute-left zindex-9 water"></div>
                </Row>
                </TransAnimal>
                  
              </Col>
              {/* <div class="animate wave">
                <div class="w1"></div>
                <div class="w2"></div>
                <div class="w3"></div>
                <div class="w4"></div>
              </div> */}
              <Col span={24} className="padding-all overflow-hide">
              {userInfo.phone ?  <div className="bg-show margin-top-2 border-radius-5f">
                <Item
                    leftContent={{text: (<Row><Col span={6}><Icon iconName={'android-list '} size={'150%'} iconColor={'#855EF1'}  /></Col>
                      <Col span={18}>我的记录</Col></Row>), style: {flex: '5'}}} 
                    rightContent={{text: '每天记录', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight 
                    onClick={()=>{goLink('/MyRecords')}}
                    />
                <Item
                    leftContent={{text: (<Row><Col span={6}><Icon iconName={'arrow-graph-up-right '} size={'150%'} iconColor={'#855EF1'}  /></Col>
                    <Col span={18}>数据展示</Col>
                    </Row>), style: {flex: '5'}}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight 
                    onClick={()=>{goLink('/MyCharts')}}
                    />
                <Item
                    leftContent={{text: (<Row><Col span={6}><Icon iconName={'compose '} size={'150%'} iconColor={'#855EF1'}  /></Col>
                    <Col span={18}>新增记录</Col>
                    </Row>), style: {flex: '5'}}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight 
                    onClick={()=>{goLink('/CreateArticle')}} />
                <Item
                    leftContent={{text: (<Row><Col span={6}><Icon iconName={'android-calendar'} size={'150%'} iconColor={'#855EF1'}  /></Col>
                    <Col span={18}>日历</Col>
                    </Row>), style: {flex: '5'}}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight 
                    onClick={()=>{goLink('/Clender')}} />
                <Item
                    leftContent={{text: (<Row><Col span={6}><Icon iconName={'ios-musical-notes '} size={'150%'} iconColor={'#855EF1'}  /></Col>
                    <Col span={18}>音乐</Col>
                    </Row>), style: {flex: '5'}}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight 
                    onClick={()=>{goLink('/MusicCategory')}} />
                </div> :
                <div className="bg-show margin-top-2 border-radius-5f">
                <Item
                    leftContent={{text: (<Row><Col span={6}><Icon iconName={'android-list '} size={'150%'} iconColor={'#855EF1'}  /></Col>
                      <Col span={18}>Baby信息</Col></Row>), style: {flex: '5'}}} 
                    rightContent={{text: '去注册', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight 
                    onClick={()=>{goLink('/BindUser')}}
                    />
                </div>
              }
                
              </Col>
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
