import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Modal
  } = Components;
  
class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {}
      };
    }
    componentDidMount(){
        console.log(UrlSearch());
        let obg = UrlSearch();
        if(this.props.pageIn!==''){
          this.getUserinfo(obg.code);
        }   
    }

    getUserinfo(code){
        const self = this;
        fetch( config.ROOT_URL+ 'wx/getWebAccessToken', { method: 'POST', data: {
            code: code
        }}).then(data => {
          console.log(data)
          Modal.alert({ title: '用户信息',
              content: JSON.stringify(data),
              btn: {
                text: '确定',
                type: 'link',
                style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
              }, 
              type: 'large'
            },
          () => { console.log('nult callback'); });
        //   Toaster.toaster({ type: 'success', position: 'top', content: JSON.stringify(data), time: 5000 });
          self.setState({
            userInfo: JSON.parse(data.respBody)
          })
        })
    }

    render() {
      const {userInfo} = this.state;
      const userInfoDom = userInfo.nickname ? (<Row justify="center">
        <Col>姓名: { userInfo.nickname }</Col>
        <Col>地址: { userInfo.country } - { userInfo.province } - { userInfo.city }</Col>
        <Col>头像: <image src={ userInfo.headimgurl } /></Col>
      </Row>) : '';
        return(
          <section className="bg-f5f5f5">
            {/* <Item leftContent={{text:'微信端项目'}} style={{padding: '0 0.5rem'}} /> */}
            <Header
              leftContent={{
                text: (<Icon iconName={'ios-arrow-back'} size={'180%'} iconColor={'#000'} />), style:{flex: '1.3',width: '23%', paddingLeft: '0.2rem'},
                onClick: ()=>{hashHistory.goBack();}
              }}
              centerContent={{text: '用户授权回调页面', style:{flex: '3.5'} }}
              rightContent={{text:'', style:{flex: '1.5'}}}
            />
            <Row className="has-header">
                <Col className="padding-all-1r ">
                  <Item leftContent={{text:'用户授权回调'}} style={{padding: '0 0.5rem'}} />
                </Col>
                <Col className="padding-all-1r heighr-25">
                  {userInfoDom}
                </Col>
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
