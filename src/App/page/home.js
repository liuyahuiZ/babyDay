import ReactDOM from 'react-dom';
import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
const {
    Row,
    Col,
    Icon
  } = Components;
  
class HomeDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          confirmDirty: false,
      };
    }
    
    handleClick(link) {
        if(link) {
            hashHistory.push(link);
        }
    }

    render() {
        return(
          <section className="bg-f5f5f5 images-allhei">
            {/* <Item leftContent={{text:'微信端项目'}} style={{padding: '0 0.5rem'}} /> */}
            <Row className="padding-all-1r">
                <Col className="">
                    <h3>F2E-Info</h3>
                </Col>
            </Row>
            <Row className="padding-all-1r" onClick={()=>{
                    this.handleClick('/Tab')
                }}>
                <Col span={12} className="padding-all-1r bg-show" >demo展示</Col>
                <Col span={12} className="padding-all-1r bg-show text-align-right">
                    <Icon iconName={'pizza'} size={'130%'} />
                </Col>
            </Row>
            <Row className="padding-all-1r" onClick={()=>{
                    // this.handleClick('/Lists')
                    this.handleClick('/BabyDay')
                }}>
                <Col span={12} className="padding-all-1r bg-show">BabyDay</Col>
                <Col span={12} className="padding-all-1r bg-show text-align-right">
                    <Icon iconName={'cube'} size={'130%'} />
                </Col>
            </Row>
            <Row className="padding-all-1r" onClick={()=>{
                    this.handleClick('/Ocr')
                }}>
                <Col span={12} className="padding-all-1r bg-show" >OCR测试</Col>
                <Col span={12} className="padding-all-1r bg-show text-align-right">
                    <Icon iconName={'easel '} size={'130%'} />
                </Col>
            </Row>
            <Row className="padding-all-1r" onClick={()=>{
                    this.handleClick('/Lists')
                }}>
                <Col span={12} className="padding-all-1r bg-show">微信jssdk测试</Col>
                <Col span={12} className="padding-all-1r bg-show text-align-right">
                    <Icon iconName={'clipboard '} size={'130%'} />
                </Col>
            </Row>
            <Row className="padding-all-1r" onClick={()=>{
                    // this.handleClick('/Lists')
                    window.location.href='http://www.wetalks.cn/neo-ui/';
                }}>
                <Col span={12} className="padding-all-1r bg-show">neo-ui</Col>
                <Col span={12} className="padding-all-1r bg-show text-align-right">
                    <Icon iconName={'cube'} size={'130%'} />
                </Col>
            </Row>
            {/* <Row className="padding-all-1r" onClick={()=>{
                    this.handleClick('/Pictures')
                }}>
                <Col span={12} className="padding-all-1r bg-show">pictures</Col>
                <Col span={12} className="padding-all-1r bg-show text-align-right">
                    <Icon iconName={'clipboard '} size={'130%'} />
                </Col>
            </Row> */}
            <Row className="padding-all-1r" onClick={()=>{
                    this.handleClick('/Trans')
                }}>
                <Col span={12} className="padding-all-1r bg-show">Trans</Col>
                <Col span={12} className="padding-all-1r bg-show text-align-right">
                    <Icon iconName={'clipboard '} size={'130%'} />
                </Col>
            </Row>
          </section>
        );
    }
}
export default HomeDoc;
