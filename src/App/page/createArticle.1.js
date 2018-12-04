import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import FileUpUtil from '../servise/fileUp';
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
    Modal,
    Input,
    Textarea,
    FileUp
  } = Components;
  
class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          user: '',
          title: '',
          info: '',
          content: '',
          imgGroup: ''
      };
    }

    setValue(key,val){
        this.setState({[key]: val});
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
          self.setValue('imgGroup', data.respBody)
        }).then(err => {
          console.log(err)
        })
      }

    submitClick(){
        const { user, title, info, content,imgGroup } = this.state;
        if(!user&&user==='') {
            Toaster.toaster({ type: 'normal', position: 'top', content: '请填写用户', time: 3000 }, true);
            return false;
        }
        if(!title&&title==='') {
            Toaster.toaster({ type: 'normal', position: 'top', content: '请填写标题', time: 3000 }, true);
            return false;
        }
        if(!info&&info==='') {
            Toaster.toaster({ type: 'normal', position: 'top', content: '请填写简介', time: 3000 }, true);
            return false;
        }
        if(!content&&content==='') {
            Toaster.toaster({ type: 'normal', position: 'top', content: '请填写内容', time: 3000 }, true);
            return false;
        }
        if(!imgGroup||JSON.stringify(imgGroup)=='{}') {
            Toaster.toaster({ type: 'normal', position: 'top', content: '请选择图片', time: 3000 }, true);
            return false;
        }
        let reqbody={
            "user" : user,
            "title": title,
            "info": info,
            "content": content,
            "imgGroup": imgGroup
        }
        fetch( config.ROOT_URL+ 'article/createArctile', { method: 'POST', data: reqbody})
        .then(data => {
            console.log(data)
        })
    }
        

    render() {
        const self = this;
        const { user, title, info, content } = this.state;
        return(
          <section className="bg-f5f5f5">
            <Header
              leftContent={{
                text: (<Icon iconName={'ios-arrow-back'} size={'180%'} iconColor={'#000'} />), style:{flex: '1.3',width: '23%', paddingLeft: '0.2rem'},
                onClick: ()=>{hashHistory.goBack();}
              }}
              centerContent={{text: '创建文章', style:{flex: '3.5'} }}
              rightContent={{text:'', style:{flex: '1.5'}}}
            />
            <Row className="has-header" justify="center">
              <Col span={24} className="bg-show margin-top-2 padding-all">
                <Row className="border-bottom border-color-f5f5f5">
                    <Col span={2.5} className="padding-top-1">
                        <Icon iconName={'outlet  '} size={'150%'} iconColor={'#4698F9'}  />
                    </Col>
                    <Col span={21}>
                    <Input
                        value={user}
                        placeholder="请输入用户"
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('user',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row className="border-bottom border-color-f5f5f5">
                    <Col span={2.5} className="padding-top-1">
                    <Icon iconName={'social-bitcoin '} size={'150%'} iconColor={'#4698F9'}  />
                    </Col>
                    <Col span={21}>
                    <Input
                        placeholder="请输入标题"
                        value={title}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('title',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row className="border-bottom border-color-f5f5f5">
                    <Col span={2.5} className="padding-top-1">
                    <Icon iconName={'document-text '} size={'150%'} iconColor={'#4698F9'}  />
                    </Col>
                    <Col span={21}>
                    <Input
                        placeholder="请输入简介"
                        maxLength={100}
                        value={info}
                        onChange={(e,t,v)=>{
                            self.setValue('info',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row className="border-bottom border-color-f5f5f5">
                    <Col span={2.5} className="padding-top-1">
                    <Icon iconName={'document-text '} size={'150%'} iconColor={'#4698F9'}  />
                    </Col>
                    <Col span={21} className="padding-top-3">
                    <Textarea
                        placeholder="请输入内容"
                        value={content}
                        maxLength={100000}
                        onChange={(e)=>{
                            self.setValue('content',e)
                        }}
                        />
                    </Col>
                </Row>
                <Row className="bg-show padding-top-3 ">
                    <Col span={8} className="border-all border-color-999 heighr-8">
                    <FileUp fileReady={(file) => {
                    this.fileUp(file, 'front');
                    }} callType={'H5'} fileType="blob" description="图片" />
                    </Col>
                </Row>

              <Row className="margin-top-2r" >
                <Buttons
                  text="submit"
                  type={'primary'}
                  size={'large'}
                  onClick={()=>{
                    this.submitClick()
                  }}
                />
              </Row>
              </Col>
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
