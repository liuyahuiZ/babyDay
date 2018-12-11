import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import Demo from './demo';
import My from './my';

const {
    Buttons,
    Toaster,
    Item,
    Header,
    Row,
    Col,
    Icon,
    MenuTab
  } = Components;
const { sessions, storage } = utils;
  
class TabDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        liveInfo: null,
        resourceKey: sessions.getStorage('resourceKey') || '1'
      };
    }
    componentDidMount(){
      this.initUser();
    }

    randomString (len) {
      len = len || 32;
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      let maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    }

    initUser(){
      let babyDayUser = storage.getStorage("babyDayUser")
      console.log('babyDayUser', babyDayUser);
      if(babyDayUser&&babyDayUser!=='') return;
      let tmp_name = (Date.parse(new Date())/1000);
      let userid = 'babyDayUser-' + tmp_name + '-' + (Math.round(Math.random()*9999));
      let username = this.randomString(5) 
      storage.setStorage("babyDayUser",username);
      storage.setStorage("babyDayUserId",userid);
    }

    tabChange(v){
        const self = this;
        self.setState({
          'resourceKey': v
        });
        sessions.setStorage('resourceKey', v)
    }

    render() {
      const { resourceKey } = this.state;
      const tabOptions = [{ tabName: (<Row><Col style={{'height': '0.8rem','top': '-0.5rem'}} className="relative">
      <Icon iconName={'android-home'} size={'200%'} iconColor={resourceKey== '1' ? '#855EF1' : '#aaa'} />
      </Col>
      <Col className={`${resourceKey== '1' ? 'textcolor-855EF1' : 'textcolor-313132'} font-size-8`}>首页</Col></Row>), iconName: 'ios-home-outline', keyword: '1', content:(<Demo status={resourceKey== '1'} />)},
        { tabName: (<Row><Col style={{'height': '0.8rem','top': '-0.5rem'}} className="relative">
        <Icon iconName={'android-person'} size={'200%'} iconColor={resourceKey== '2' ? '#855EF1' : '#aaa'} />
      </Col>
    <Col className={`${resourceKey== '2' ? 'textcolor-855EF1' : 'textcolor-313132'} font-size-8`}>我的</Col></Row>), iconName: 'outlet ', keyword: '2', content:(<My status={resourceKey== '2'} />)}];
      const typeOption = {
        showIcon: false,
        activeColor: '',
        defaultColor: ''
      };
      return(
        <section className="bg-f5f5f5">
          <MenuTab options={tabOptions} typeOption={typeOption} active={this.state.resourceKey} onChange={(v)=>{
                this.tabChange(v);
              }} />
        </section>
      );
    }
}
export default TabDoc;
