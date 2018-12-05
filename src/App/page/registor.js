import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import { UrlSearch } from '../utils';
import FileUpUtil from '../servise/fileUp';
import config from '../config/config';
import { userUpdInfo } from '../api/index';

const {
    Buttons,
    Toaster,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    Rate,
    Loade,
    Input, FileUp
} = Components;
const { sessions, storage } = utils;

class RegistorUser extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          resourceKey: '1',
          height: '',
          weight: '',
          birthday: '',
          phone: '',
          active: 'man',
          nickName: '',
          remark: '',
          year: '',
          month: '',
          day: '',
          imgSrc: ''
      };
    }

    componentDidMount(){
        let obg = UrlSearch();
    }

    setValue(key,val){
        this.setState({[key]: val});
    }

    submitMark(){
      let obg = UrlSearch();
      let date = new Date;
      let userId = storage.getStorage("babyDayUserId");
      let nowYear = date.getFullYear()
      const { height, weight, birthday, phone, nickName, remark, active, year, month, day, imgSrc } = this.state;
      if(!nickName&&nickName==='') {
        Toaster.toaster({ type: 'error', position: 'top', content: '请输入昵称', time: 3000 }, true);
        return false;
      }
      if(!height&&height==='') {
          Toaster.toaster({ type: 'error', position: 'top', content: '请输入身高', time: 3000 }, true);
          return false;
      }
      if(!weight&&weight==='') {
        Toaster.toaster({ type: 'error', position: 'top', content: '请输入体重', time: 3000 }, true);
        return false;
      }
      if(!year&&year==='') {
        Toaster.toaster({ type: 'error', position: 'top', content: '请输入生日', time: 3000 }, true);
        return false;
      }
      if(!phone&&phone==='') {
        Toaster.toaster({ type: 'error', position: 'top', content: '请输入电话', time: 3000 }, true);
        return false;
      }
      if(!imgSrc&&imgSrc==='') {
        Toaster.toaster({ type: 'error', position: 'top', content: '请上传头像', time: 3000 }, true);
        return false;
      }
      
      
      Loade.show();
      let req = {
        userid: userId,
        birthday: `${year}-${month}-${day}`,
        height: height,
        weight: weight,
        username: nickName,
        phone: phone,
        remark: remark,
        sex: active,
        imgUrl: imgSrc
      }
      userUpdInfo(req).then((res)=>{
        Loade.hide();
        if(res.respHead.code=='0000') { 
            storage.setStorage('userInfo',req);
            hashHistory.goBack();
        }
        Toaster.toaster({ type: 'error', content: res.respHead.message, time: 3000 }); return;
        
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }

    fileUp(file, type) {
        let data = new FormData();
        data.append('file', file);
        data.append('userid', 'auto');
        const self = this;
        FileUpUtil(config.ROOT_URL + 'files/fileUp', {
          method: 'POST',
          mode: "cors",
          data: data
        }).then(data => {
          console.log(data);
          self.setValue('imgSrc', `${(data.respBody.filePath + '/'+data.respBody.fileName)}`)
        }).then(err => {
          console.log(err)
        })
      }
        

    render() {
        const { userInfo, height, weight, birthday, phone, active, nickName, remark, year, month, day, imgSrc } = this.state;
        const self = this;

        return(
          <section className="padding-all bg-f5f5f5 minheight-100">
            <Row justify="center">
              <Col span={22} >
              <TransAnimal >
                <Row justify="center" className="padding-all-1r overflow-hide relative">
                  <Col className="zindex-10 text-align-center margin-top-1r">
                    <div className="middle-round-6 border-radius-round bg-gray display-inline-block line-height-4r  overflow-hide">
                        <FileUp defaultSrc={`${config.ROOT_URL}files/getTheImage?path=${imgSrc}`} fileReady={(file) => {
                            // console.log(file);
                            self.fileUp(file);
                        }} callType={'H5'} fileType="blob" description="头像" />
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="zindex-10 text-align-center margin-top-1r">
                    <span className="zindex-10 textclolor-white">{userInfo.nickName}</span>
                  </Col>
                  <Col span={16}>
                    <Row justify="center">
                        <Col span={9} onClick={()=>{self.setValue('active','man')}} className={`${active=='man'? 'bg-6E9EFB textclolor-white' : 'bg-F1F8FD textclolor-333 border-all border-color-e5e5e5'} margin-top-p4r font-size-small text-align-center border-radius-6r line-height-25`}>
                            <Icon iconName="female" size={'130%'} iconColor={`${active=='man'? '#fff': '#333'}`} />
                            <span>男宝</span>
                        </Col>
                        <Col span={4}> </Col>
                        <Col span={9} onClick={()=>{self.setValue('active','woman')}} className={`${active=='woman'? 'bg-6E9EFB textclolor-white' : 'bg-F1F8FD textclolor-333 border-all border-color-e5e5e5'} margin-top-p4r font-size-small text-align-center border-radius-6r line-height-25`}>
                            <Icon iconName="male " size={'130%'} iconColor={`${active=='woman'? '#fff': '#333'}`} />
                            <span>女宝</span>
                        </Col>
                    </Row>
                  </Col>
                  {/* <Col className="zindex-10 text-align-center ">
                    <span className="zindex-10 font-size-small textclolor-white">{userInfo.describe || 'xxx'}</span>
                  </Col> */}
                </Row>
                </TransAnimal>
              </Col>
             
              <Col span={22} className="bg-show padding-all margin-top-2 border-radius-5f">
                <Row justify="center">
                    <Col span={8} className="textclolor-333 line-height-3r text-align-left">昵称</Col>
                    <Col span={16}>
                    <Input
                        placeholder="请输入昵称"
                        value={nickName}
                        innerStyle={{"backgroundColor":"#fff","color":"#333"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('nickName',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={8} className="textclolor-333 line-height-3r text-align-left">出生身高</Col>
                    <Col span={16}>
                    <Input
                        placeholder="请输入出生身高"
                        value={height}
                        innerStyle={{"backgroundColor":"#fff","color":"#333"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('height',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={8} className="textclolor-333 line-height-3r text-align-left">出生体重</Col>
                    <Col span={16}>
                    <Input
                        placeholder="请输入出生体重"
                        value={weight}
                        innerStyle={{"backgroundColor":"#fff","color":"#333"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('weight',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={8} className="textclolor-333 line-height-3r text-align-left">生日</Col>
                    <Col span={8}>
                    <Input
                        placeholder="请输入出生年"
                        value={year}
                        innerStyle={{"backgroundColor":"#fff","color":"#333"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('year',v)
                        }}
                        />
                    </Col>
                    <Col span={4}>
                    <Input
                        placeholder="月"
                        value={month}
                        innerStyle={{"backgroundColor":"#fff","color":"#333"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('month',v)
                        }}
                        />
                    </Col>
                    <Col span={4}>
                    <Input
                        placeholder="日"
                        value={day}
                        innerStyle={{"backgroundColor":"#fff","color":"#333"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('day',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={8} className="textclolor-333 line-height-3r text-align-left">电话</Col>
                    <Col span={16}>
                    <Input
                        placeholder="请输入电话"
                        value={phone}
                        innerStyle={{"backgroundColor":"#fff","color":"#333"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('phone',v)
                        }}
                        />
                    </Col>
                </Row>
                
                <Row justify="center">
                    <Col span={8} className="textclolor-333 line-height-3r text-align-left">备注</Col>
                    <Col span={16}>
                    <Input
                        placeholder="请输入备注"
                        value={remark}
                        innerStyle={{"backgroundColor":"#fff","color":"#333"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('remark',v)
                        }}
                        />
                    </Col>
                </Row>
              </Col>
              
              <Col className="margin-top-3" span={22}>
                <Buttons
                  text="注 册"
                  type={'primary'}
                  size={'large'}
                  onClick={()=>{
                    this.submitMark()
                  }}
                />
              </Col>
            </Row>
          </section>
        );
    }
}
export default RegistorUser;
