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

    _viewAppear(){

    }


    submitClick(){
    }
        

    render() {
        const {article} = this.state;
        const map1 = [1,2,3,4,5,6,7,8,9,2,3,4,5,1,1,2,3,1,13,1,1,2,3,1,1,3,1,1,3,2,1,1,2,3,6,7,7,7,7,8,8,6,6,5,6,65,3,1,1,3,1,2,3,31,12,31,2,213,3,2,2,4,3,3,3,1,3,3,]
        const pageNo = '1081';
        // http://img.fox800.xyz/images/book_22_chapter_${pageNo}_${idx}.jpg?x-oss-process=image/resize,m_lfit,w_640,limit_0/auto-orient,1/quality,Q_90
        // 1468
        // http://img.fox800.xyz/images/book_76_chapter_3196_1.jpg?x-oss-process=image/resize,m_lfit,w_640,limit_0/auto-orient,1/quality,Q_90
        // const pageNo = '3250';
        // URL	http://p.qiremanhua.com/uploads/chapter/10261/201803/5ab0d230ca7b0.jpg
      
        // URL	http://img.fox800.xyz/images/book_31_chapter_789_18.jpg?x-oss-process=image/resize,m_lfit,w_640,limit_0/auto-orient,1/quality,Q_90
        //  802 1080 1081~1093

        // URL	http://img.fox800.xyz/images/book_114_chapter_5136_1.jpg?x-oss-process=image/resize,m_lfit,w_640,limit_0/auto-orient,1/quality,Q_90

        // http://img.fox800.xyz/images/book_59_chapter_2229_2.jpg?x-oss-process=image/resize,m_lfit,w_640,limit_0/auto-orient,1/quality,Q_90	200	GET	img.fox800.xyz	/images/book_59_chapter_2229_2.jpg?x-oss-process=image/resize,m_lfit,w_640,limit_0/auto-orient,1/quality,Q_90	Thu Jul 12 16:46:37 CST 2018	747	194229	Complete	640x3733
        // 34 39 42 43 45 46 49 50 52 54 57 59 60 64 69 78 89 91 94 98
        const imgDom = map1.map((itm, idx)=>{
            return (<img src={`http://img.fox800.xyz/images/book_59_chapter_${pageNo}_${idx}.jpg?x-oss-process=image/resize,m_lfit,w_640,limit_0/auto-orient,1/quality,Q_90`} />)
        })
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
 
              
              <Col span={24} className="margin-top-2 overflow-x-scroll" >
              {imgDom}
              </Col>
            
            </Row>
            </div>
          </section>
        );
    }
}
export default OcrDoc;
