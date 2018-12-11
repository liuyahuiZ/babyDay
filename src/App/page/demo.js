import React , { Component }from 'react';
import { Components,utils } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import { recordList, findType } from '../api/index'
import moment from 'moment';
import {arrSetKey} from '../utils/index'
import BabyIcon from '../components/babyIcon';
const {
    Row,
    Col,
    Icon,
    Buttons,
    Item,
    Header,
    Carousel,
    Modal,
    Collapse,
    Panel, TagRadio, Toaster
  } = Components;
const { sessions, storage } = utils;
class Demo extends Component {
    constructor(props) {
      super(props);
      this.state = {
          confirmDirty: false,
          refreshed: false,
          productList: [],
          typeArr: [],
          loadText: '加载中',
          selectType: '',
          dateArr: [],
          userInfo: storage.getStorage('userInfo') || {}
      };
    }
    componentWillMount(){
      
    }
    componentDidMount(){
      this.initClander();
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
      let length = 14;
      for(let i=0;i<length;i++){
        let num = -i;
        let Name = moment().add('days', num).format('dddd')
        if(num===0){ Name = '今天'} else if(num===-1) {Name = '昨天'}
        dataArr.push({
          dateName: Name,
          date: moment().add('days', num).format('DD'),
          dateTime: moment().add('days', num).format('YYYY-MM-DD')
        })
      }
      this.setState({
        dateArr: dataArr,
        selectDay: dataArr[0]
      },()=>{
        self.getList()
      });

    }

    getType(){
      const self = this;
      const { productList, typeArr } = this.state;
      if(typeArr&&typeArr.length>1){
        self.resetType()
        return;
      }
      findType({}).then((res)=>{
          let newData = {typeValue: '全部', typeKey: '', checked: true};
          if(res.respHead.code=='0000'){
            self.setState({
                typeArr: [newData, ...res.respBody]
            },()=>{self.resetType()})
          }
      }).catch((err)=>{
          console.log(err);
          Toaster.toaster({ type: 'normal', position: 'top', content: err, time: 3000 }, true);
      })
    }

    resetType(){
      const { productList, typeArr } = this.state;
      const self = this;
      let list = productList&&productList.length > 0 ? arrSetKey(productList, 'typecode') : [];
      // console.log(list);
      let newTypeArr = typeArr;
      if(list&&list.arr&&list.arr.length>0) {
        for(let i=0;i<newTypeArr.length;i++){
          if(newTypeArr[i].typeValue!=='全部') {
            newTypeArr[i].typeValue =  `${newTypeArr[i].typeKey} ${list.count[newTypeArr[i].typeKey] ||''}`
          };
        }
      }
      self.setState({
        typeArr: newTypeArr
      })
    }

    getList(status){
      const { selectDay, selectType, userInfo } = this.state;
      console.log(selectDay);
      const self = this;
      recordList({user: userInfo.phone, dateTime: selectDay.dateTime, typecode: selectType}).then((res)=>{
          console.log(res);
          if(res.respHead.code=='0000'){
            let loadText = '加载中'
            if(res.respBody.record.length==0){
              loadText = '暂无数据'
            }
            self.setState({
              productList: res.respBody.record,
              loadText: loadText
            },()=>{
              if(status!=='noRenderType'){
                self.getType();
              }
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
          return {value: itm.typeKey, text: itm.typeValue, checked: idx==0 ? true: false}
        }) : [];

        
        const productListDom = productList&&productList.length > 0 ? productList.map((itm, idx)=>{
          return (
          <Row className="padding-all border-radius-5f padding-bottom-3 margin-bottom-1r bg-show"  key={`${idx}-itm`}>
            <Col >
              <Row>
                  <Col span={3} className="relative margin-top-3">
                    <BabyIcon iconName={itm.typecode} size={'180%'} />
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
          <div className={`${selectDay.date==itm.date ? 'bg-855EF1 textclolor-white' :' textclolor-333 ' } display-inline-block font-size-small  small-round text-align-center border-radius-100`}>{itm.date}</div>
          </Col></Row>
          </Col>)
      }) : <Col className="text-align-center font-size-small textclolor-white line-height-2r">{loadText}</Col>;
      return(
          <section className="padding-all">
              <div className="heighr-6 border-radius-5f overflow-hide relative">
              <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'6rem'}} dotDefaultStyle={{width: '5px'}} dotActiveStyle={{}} showDotsText={false} dragAble />
              </div>
              <Row justify='center' className="margin-top-2">
              <Col className="line-height-3r font-size-12">日常记录</Col>
              <Col>
                <Row className="margin-top-2 border-radius-5f bg-show padding-all">{clenderDom}</Row>
              </Col>
              <Col className="margin-top-1r">
                <TagRadio options={tagTypeArr}
                    checkStyle={{"backgroundColor":"#855EF1","color": '#fff'}} normalStyle={{"backgroundColor":"#eee","color": '#1a1a1a'}}
                    onChange={(v, it)=>{
                      console.log(it)
                      self.setState({
                        selectType: it.value
                      },()=>{
                        self.getList('noRenderType')
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
export default Demo;