import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import FileUpUtil from '../servise/fileUp';
import config from '../config/config';
import {accMul, UrlSearch} from '../utils';

const {
    Buttons,
    Toaster,
    Item,
    Header,
    Row,
    Col,
    Icon,
    FileUp
  } = Components;
  
class OcrLiveDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        liveInfo: null
      };
      console.log(UrlSearch());
    }

    fileUp(file){
      let obg = UrlSearch();
      let data = new FormData();
      data.append('file', file);
      data.append('name', obg.name);
      data.append('idnumber', obg.idnumber);
      data.append('return_image', true);
      
      const self = this;
      FileUpUtil( config.ROOT_URL+ 'ocr/live', { method: 'POST',
        mode: "cors",
        data: data }).then(res => {
          console.log(res)
          if(res.respHead.code == '0000'){
            let userInfo  = JSON.parse(res.respBody);
            self.setState({
              liveInfo: userInfo.verification_score,
              defaultSrc:  `data:image/jpg;base64,${userInfo.base64_image}`
            })
          }
        }).then(err => {
          console.log(err)
        })
    }


    render() {
        const {liveInfo, defaultSrc} = this.state;
        const frontInfoDom = liveInfo ? (<Row>
          <Col>相似度: { accMul(liveInfo, 100).toFixed(2) }%</Col>
        </Row>) : '';
        return(
          <section className="bg-f5f5f5">
            <Header
              leftContent={{
                text: (<Icon iconName={'ios-arrow-back'} size={'180%'} iconColor={'#000'} />), style:{flex: '1.3',width: '23%', paddingLeft: '0.2rem'},
                onClick: ()=>{hashHistory.goBack();}
              }}
              centerContent={{text: 'Ocr', style:{flex: '3.5'} }}
              rightContent={{text:'', style:{flex: '1.5'}}}
            />
            <Row className="has-header" justify="center">
                <Col className="padding-all-1r ">
                  <Item leftContent={{text:'ocr测试-活体采样'}} style={{padding: '0 0.5rem'}} />
                </Col>
                <Col span={20} className="padding-all-1r border-all bg-show border-color-999 heighr-25">
                  <FileUp fileReady={(file)=>{
                    this.fileUp(file);
                  }} callType={'H5'} fileType="blob" description="活体采样" accept="video/*" defaultSrc={defaultSrc} />
                </Col>
                <Col className="padding-all-1r ">
                  <Item leftContent={{text:'返回结果'}} style={{padding: '0 0.5rem'}} />
                  {frontInfoDom}
                </Col>
            </Row>
          </section>
        );
    }
}
export default OcrLiveDoc;
