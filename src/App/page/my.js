import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
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
          userInfo: {}
      };
    }

    switchChange(date){
        console.log(date);
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
        const userName = storage.getStorage("babyDayUser")
        return(
          <section className="bg-f5f5f5">
            <Row justify="center" >
              <Col span={24} className="padding-all">
                <TransAnimal >
                <Row justify="center" className="padding-all-1r bg-6E9EFB border-radius-5f">
                  <Col span={12} className="text-align-left">
                    <Icon iconName={'quote '} size={'150%'} iconColor={'#fff'}   />
                  </Col>
                  <Col span={12} className="text-align-right">
                    <Icon iconName={'android-settings '} size={'150%'} iconColor={'#fff'}   />
                  </Col>
                  <Col className="text-align-center">
                    <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r">
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="text-align-center margin-top-1r">
                    <span className="textclolor-white">{userName}</span>
                  </Col>
                </Row>
                </TransAnimal>
              </Col>
              <Col span={24} className="padding-all overflow-hide">
                <div className="bg-show margin-top-2 border-radius-5f">
                <Item
                    leftContent={{text: (<Row><Col span={6}><Icon iconName={'android-list '} size={'150%'} iconColor={'#4698F9'}  /></Col>
                      <Col span={18}>我的记录</Col></Row>), style: {flex: '5'}}} 
                    rightContent={{text: '每天记录', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight />
                <Item
                    leftContent={{text: (<Row><Col span={6}><Icon iconName={'arrow-graph-up-right '} size={'150%'} iconColor={'#4698F9'}  /></Col>
                    <Col span={18}>数据展示</Col>
                    </Row>), style: {flex: '5'}}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight />
                <Item
                    leftContent={{text: (<Row><Col span={6}><Icon iconName={'compose '} size={'150%'} iconColor={'#4698F9'}  /></Col>
                    <Col span={18}>新增记录</Col>
                    </Row>), style: {flex: '5'}}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-8 textclolor-gray text-align-right'}}
                    showRight 
                    onClick={()=>{goLink('/CreateArticle')}} />
                </div>
              </Col>
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
