import React , { Component }from 'react';
import { Components,utils } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import { recordList, findType } from '../api/index'
import moment from 'moment';

const {
    Row,
    Col,
    Icon,
    Buttons,
    Switch,
    Item,
    Header,
    PullRefresh,
    Carousel,
    Modal,
    Collapse,
    Panel, TagRadio
  } = Components;
const { sessions, storage } = utils;
class SwitchDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          confirmDirty: false,
          refreshed: false,
          productList: [],
          typeArr: [],
          loadText: '加载中',
          selectType: '',
      };
    }

    _viewAppear(){
      console.log('indemo');
      this.initClander();
      this.getType();
    }

    setData(itm){
      this.setState({'selectDay': itm},()=>{
        this.getList();
      });
    }

    initClander(){
      const self = this;
      moment.locale('en', {
        weekdays : [
            "周日", "周一", "周二", "周三", "周四", "周五", "周六"
          ]
      });
      
      let weekOfday = moment().format('dddd');
      var today = moment().format('YYYY-MM-DD');
      let dataArr=[];
      let length = 13;
      for(let i=13;i>=0;i--){
        let num = i;
        let Name = moment().add('days', num).format('dddd')
        if(num===0){ Name = '今天'} else if(num===1) {Name = '昨天'}
        dataArr.push({
          dateName: Name,
          date: moment().add('days', num).format('DD'),
          dateTime: moment().add('days', num).format('YYYY-MM-DD')
        })
      }
      this.setState({
        dateArr: dataArr,
        selectDay: dataArr[dataArr.length-1]
      },()=>{
        self.getList()
      });

    }

    getType(){
      const self = this;
      findType({}).then((res)=>{
          console.log(res);
          let newData = {typeValue: '', typeKey: '全部', checked: true};
          if(res.respHead.code=='0000'){
            self.setState({
                typeArr: [newData, ...res.respBody]
            })
          }
      }).catch((err)=>{
          console.log(err);
          Toaster.toaster({ type: 'normal', position: 'top', content: err, time: 3000 }, true);
      })
    }

    getList(){
      const { selectDay, selectType } = this.state;
      console.log(selectDay);
      let babyDayUser = storage.getStorage("babyDayUser");
      const self = this;
      recordList({user: babyDayUser, dateTime: selectDay.dateTime, typecode: selectType}).then((res)=>{
          console.log(res);
          if(res.respHead.code=='0000'){
            let loadText = '加载中'
            if(res.respBody.record.length==0){
              loadText = '暂无数据'
            }
            self.setState({
              productList: res.respBody.record,
              loadText: loadText
            })
          } else {
            self.setState({
              loadText: '暂无数据'
            })
          }
      }).catch((err)=>{
          console.log(err);
          self.setState({
            loadText: '暂无数据'
          })
      })
    }
    loadFunc(){
      setTimeout(() => {
        this.setState({
          refreshed: true,
        })
      }, 3000);
    }
    goCreateArticle(link){
      if(link) {
        hashHistory.push(link);
      }
    }

  
    render() {
        const self = this;
        const {refreshed, productList, dateArr, selectDay, typeArr, loadText} = this.state;
        const carouselMap = [{ tabName: 'first', content: (<img alt="text" src="http://47.88.2.72:2016/getphotoPal/2017-4-13/14920521723196.png" />), isActive: true },
        { tabName: 'second', content: (<img alt="text" src="http://47.88.2.72:2016/getphotoPal/2017-4-13/14920532977814.jpg" />), isActive: false },
        { tabName: 'thired', content: (<img alt="text" src="http://47.88.2.72:2016/getphotoPal/2017-3-28/14906636798813.jpg" />), isActive: false }];
        const listMap = [{ tabName: 'first', content: (<div className="padding-all-15x bg-show"><div className="padding-all-10x bg-FECAAD textclolor-gray-red border-radius-100 ">抢100优惠券</div></div>), isActive: true },
        { tabName: 'second', content: (<div className="padding-all-15x bg-show"><div className="padding-all-10x bg-F1F8FD textclolor-alink border-radius-100 ">1元秒杀24期免息</div></div>), isActive: false },
        { tabName: 'thired', content: (<div className="padding-all-15x bg-show"><div className="padding-all-10x bg-F1F8FD textclolor-alink border-radius-100 ">小白卡满1000减30</div></div>), isActive: false }]

        const tagTypeArr = typeArr&&typeArr.length > 0 ? typeArr.map((itm, idx)=>{
          return {value: itm.typeValue, text: itm.typeKey, checked: idx==0 ? true: false}
        }) : [];

        const productListDom = productList&&productList.length > 0 ? productList.map((itm, idx)=>{
          return (
          <Row className="padding-all border-radius-5f padding-bottom-3 margin-bottom-1r bg-show"  key={`${idx}-itm`}>
            <Col >
              <Row>
                  <Col span={3}>
                    <Icon iconName={'social-codepen '} size={'180%'} iconColor={'#4698F9'} />
                  </Col>
                  <Col span={21}>
                    <Row>
                      <Col span={6} className="font-size-12 ">{itm.time}</Col>
                      <Col span={18} className="text-align-right font-size-8  textclolor-gray">{itm.content}</Col>
                      <Col className="textclolor-gray">{itm.type.text}</Col>
                    </Row>
                  </Col>
              </Row>
            </Col>
          </Row>)
        }) : <div className="border-radius-5f bg-show text-align-center line-height-3r textclolor-666">{loadText}</div>;;
      const clenderDom = dateArr.length > 0 ? dateArr.map((itm, idx)=>{
          return (<Col key={`${idx}-date`} span={24/7} onClick={()=>{ self.setData(itm); console.log(itm);}}>
          <Row><Col className="font-size-small textclolor-black-low text-align-center">{itm.dateName}</Col>
          <Col className="font-size-small textclolor-black-low text-align-center">
          <div className={`${selectDay.date==itm.date ? 'bg-6E9EFB textclolor-white' :' textclolor-333 ' } display-inline-block font-size-small  small-round text-align-center border-radius-100`}>{itm.date}</div>
          </Col></Row>
          </Col>)
      }) : <Col className="text-align-center font-size-small textclolor-white line-height-2r">{loadText}</Col>;
        console.log(tagTypeArr);
      return(
          <section className="padding-all">
              <div className="heighr-10 border-radius-5f overflow-hide relative">
              <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'10rem'}} dotDefaultStyle={{width: '5px'}} dotActiveStyle={{}} showDotsText={false} dragAble />
              </div>
              <Row justify='center' className="margin-top-2">
              <Col className="line-height-3r font-size-12">日常记录</Col>
              <Col>
                <Row className="margin-top-2 border-radius-5f bg-show padding-all">{clenderDom}</Row>
              </Col>
              <Col className="margin-top-1r">
                <TagRadio options={tagTypeArr}
                    checkStyle={{"backgroundColor":"rgb(65, 150, 252)","color": '#fff'}} normalStyle={{"backgroundColor":"#eee","color": '#1a1a1a'}}
                    onChange={(v, it)=>{
                      console.log(it)
                      self.setState({
                        selectType: it.value
                      },()=>{
                        self.getList()
                      })
                      // self.setValue('type', it)
                    }} />
              </Col>
              
              <Col className="margin-top-1r">{productListDom}</Col>
            </Row>
        </section>
        );
    }
}
export default SwitchDoc;