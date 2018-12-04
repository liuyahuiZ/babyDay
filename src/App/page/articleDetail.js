import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';

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
    Panel
  } = Components;
  
class OcrDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {}
      };
    }

    setValue(key,val){
        this.setState({[key]: val});
    }
    _viewAppear(){
        this.getDetail();
    }

    getDetail(){
        // console.log(UrlSearch());
        const self = this;
        let obg = UrlSearch();
        let reqbody={
            "id" : obg.id,
          }
          fetch( config.ROOT_URL+ 'article/articleDetail', { method: 'GET', data: reqbody})
          .then(data => {
            //   console.log(data)
              self.setValue('article', data.respBody[0])
          })
    }

    submitClick(){
    }
        

    render() {
        const {article} = this.state;
        const map1 = [1,2,3,4,5,6,7,8,9,2,3,4,5,1,1,2,3,1,13,1,1,2,3,1,1,3,1,1,3,2,1,1,2,3]
        // const imgDom = map1.map((itm, idx)=>{
        //     return (<img src={`http://img.fox800.xyz/images/book_22_chapter_${pageNo}_${idx}.jpg?x-oss-process=image/resize,m_lfit,w_640,limit_0/auto-orient,1/quality,Q_90`} />)
        // })
        return(
          <section className="bg-show">
            <Header
              leftContent={{
                text: (<Icon iconName={'ios-arrow-back'} size={'180%'} iconColor={'#000'} />), style:{flex: '1.3',width: '23%', paddingLeft: '0.2rem'},
                onClick: ()=>{hashHistory.goBack();}
              }}
              centerContent={{text: 'jssdk测试', style:{flex: '3.5'} }}
              rightContent={{text:'', style:{flex: '1.5'}}}
            />
            <div className="has-header articles">
            <Row className="padding-all-1r " justify="center">
              <Col span={24} className="font-size-12 line-height-4r ">
               {article.title}
              </Col>
              <Col span={24} className="font-size-8 textcolor-aeaeae">
              {article.user} | {article.createTime}
              </Col>
              <Col className="margin-top-2 ">
              {article.imgGroup ? <img className='width-100'
                    src={`http://localhost:2019/files/getTheImage?path=${(article.imgGroup.filePath + '/'+article.imgGroup.fileName)}`}
                /> : ''}
              </Col>
              
              <Col span={24} className="margin-top-2 overflow-x-scroll" >
                <div dangerouslySetInnerHTML={{__html: article.content}}></div>
              </Col>
            
            </Row>
            </div>
          </section>
        );
    }
}
export default OcrDoc;
