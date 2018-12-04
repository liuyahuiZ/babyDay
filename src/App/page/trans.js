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
    Input,
    TransAnimal,
    DashBoard
  } = Components;
  
class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        options: [],
        tabContentStyle: '',
        startX: 0,
        startY: 0,
        aboveX: 0,
        lock: false,
        limitHight: 150,
        limitlow: 80,
        loadingIconStyle: 'transroute',
        refresh: false,
        scrollTop: 0,
        charge: 0,
        x: 0,
        y: 0,
        z: 0,
        styles: '',
        layStyle: '',
        user:''
      };
    }

    componentDidMount() {
      const self = this;
      self.drag(self, []);
    }

    setValue(key,val){
      this.setState({[key]: val});
    }

    drag(self, arr) {
      const content = this.$$transContent;
      this.arr = arr;
      content.addEventListener('touchstart', (e) => {
        // e.preventDefault();
        if(self.state.refresh) {
          e.preventDefault()
          return;
        }
        const touch = e.touches[0];
        // console.log('touchstart', touch.pageY, self.state.tabContentStyle);
        self.setState({ 
          startX: touch.pageX,
          startY: touch.pageY,
          lock: true,
          startTime:  Date.now()
        });
        //  console.log('startY:',touch.pageY)
      }, false);
      content.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        let style =  this.processMovement(self,e,true,content);
        
      }, false);
      content.addEventListener('touchend', (e) => {
        e.preventDefault();
        self.setState({
          styles: '',
          layStyle: ''
        })
      }, false);
    }

    processMovement(self,e, touchEnabled, elem){

      // var bdst = bd.scrollTop || htm.scrollTop,
      //   bdsl = bd.scrollLeft,
       let pageX = (touchEnabled)? e.touches[0].pageX : e.pageX;
       let pageY = (touchEnabled)? e.touches[0].pageY : e.pageY;
       let offsets = elem.getBoundingClientRect();
   
       let w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth;
       let h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight;
        // wMultiple = 320/w,
        // offsetX = 0.52 - (pageX - offsets.left)/w,
        // offsetY = 0.52 - (pageY - offsets.top)/h,
        // dy = (pageY - offsets.top) - h / 2,
        // dx = (pageX - offsets.left ) - w / 2;
        // let yRotate = -(dx - offsetX)*(0.07 * wMultiple);
        // let xRotate = -(dy - offsetY)*(0.1 * wMultiple);

        // console.log(pageX, pageY-100);
        let xRout =  -( w / 2 - (pageX-offsets.left))/7 ;
        let yRout = ( h / 2 - (pageY-offsets.top))/7;
        // console.log('Rout',xRout, yRout)
        let imgCSS = 'rotateX(' + yRout + 'deg) rotateY(' + xRout + 'deg)';

        let layStyle = 'rotateX(' + yRout/2 + 'deg) rotateY(' + xRout/2 + 'deg) translateX(' + (xRout /2) + 'px) translateY(' + -(yRout /2) + 'px)';

        self.setState({
          styles: imgCSS,
          layStyle: layStyle
        })
      //   arad = Math.atan2(dy, dx),
      //   angle = arad * 180 / Math.PI - 90;
      // if (angle < 0) {
      //   angle = angle + 360;
      // }
      // console.log('translateX(' + (offsetX ) * ((2.5) / wMultiple) + 'px) translateY(' + (offsetY ) * (( 2.5) / wMultiple) + 'px)')
    }
        

    render() {
        const {article, x, y, z, styles, layStyle, user} = this.state;
        const self = this;
      // 右上    transform: rotateX(20deg) rotateY(3deg) rotateZ(0deg);
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
            <div className="has-header articles" >
            <Row>
              <Col>
              <Input
                        value={user}
                        placeholder="请输入关键词"
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('user',v)
                        }}
                        />
              </Col>
            </Row>
            <div className="margin-top-5r " ></div>
            <div className="padding-all-2r" ref={(r) => { this.$$transContent = r }}  style={{ 'transform': styles, 'transformOrigin': '50% 50%', 'transformStyle': 'preserve-3d'}}>
                <Row className="margin-top-2r " justify='center' align='center'>
                  <Col className='text-align-center' span={20}>
                    <div className="display-inline-block border-all border-radius-100  border-color-ff8e70 middle-round-8">
                      <div className="display-inline-block border-all border-radius-100  border-color-ff8e70 middle-round margin-top-1r line-height-4r" style={{'transform':layStyle}}>
                      0-0
                      </div>
                    </div>
                  </Col>
                  
                </Row>
            </div>
            
            <TransAnimal >
              <Row className=" margin-top-2r" justify="center" >
                <Col span={24} className="" >
                  <img alt="text" className="border-radius-6" style={{boxShadow: '0 10px 20px rgba(0, 0, 0, 0.7)'}} 
                  src="http://47.88.2.72:2016/getphotoPal/2017-3-28/14906636798813.jpg" />
                  <span> 123 789 789 78877 8777 </span>
                </Col>
              </Row>
              </TransAnimal>
              
            </div>
          </section>
        );
    }
}
export default OcrDoc;
