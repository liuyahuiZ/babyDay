import React , { Component }from 'react';
import { Components,utils } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import { recordList, findType, removeRecord } from '../api/index'
import moment from 'moment';
import BabyIcon from '../components/babyIcon';

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
    Panel, TagRadio, DatePicker, LoadMore, Toaster
  } = Components;
const { sessions, storage } = utils;
class MyRecordsDoc extends BaseView {
    constructor(props) {
      super(props);
      const startDate = moment().subtract(0, 'days').format('YYYY-MM-DD'); // 设置开始日期，没有就默认昨天的日期
	    const endDate =  moment().subtract(0, 'days').format('YYYY-MM-DD'); // 设置结束日期，没有就默认昨天的日期
      this.state = {
          confirmDirty: false,
          refreshed: false,
          productList: [],
          typeArr: [],
          loadText: '加载中',
          selectType: '',
          pageNumber: 1,
          pageSize: 10,
          enableLoad: 'canload',
          datePicker: {
            startDate,
            endDate,
            dateType: 2,
            allowToday: true,
            callback:(e)=>{this.setDate(e)}
         },
         selectDay: moment().format('YYYY-MM-DD'),
         userInfo: storage.getStorage('userInfo') || {}
      };
    }

    _viewAppear(){
      this.getType();
      this.getList();
    }
    setDate(date){
        console.log(date);
        const self = this;
        this.setState({
            selectDay: date.startDate,
            pageNumber: 1,
            productList: [],
            datePicker: {
              startDate: date.startDate,
              endDate: date.endDate,
              dateType: 2,
              allowToday: true,
              callback:(e)=>{this.setDate(e)}
           } 
        },()=>{
            self.getList()
        })
    }
    getType(){
      const self = this;
      findType({}).then((res)=>{
          let newData = {typeValue: '', typeKey: '全部', checked: true};
          if(res.respHead.code=='0000'){
            self.setState({
                typeArr: [newData, ...res.data]
            })
          }
      }).catch((err)=>{
          console.log(err);
          Toaster.toaster({ type: 'normal', position: 'top', content: err, time: 3000 }, true);
      })
    }

    getList(){
      const { selectDay, selectType, pageNumber, pageSize, productList, userInfo } = this.state;
      console.log(selectDay);
      const self = this;
      recordList({user: userInfo.phone, 
        dateTime: selectDay, 
        typecode: selectType,
        pageNumber: pageNumber,
        pageSize: pageSize
      }).then((res)=>{
        let page =  pageNumber;
        let products = productList;
        let enableLoad = 'loading';
          console.log(res);
          let loadText = '加载中'
          if(res.respHead.code=='0000'){

            products.push(...res.data.record);
            //products = products.concat(res.data.record);
            if( products.length >= res.data.pageInfo.allCount ) {
                enableLoad = 'loaded'
            } else{
                page = page + 1;
                enableLoad = 'canload';
            }
            if(res.data.record.length==0){
                loadText = '暂无数据'
            }
            self.setState({
                productList: products,
                enableLoad: enableLoad,
                pageNum: page,
                loadText: loadText
            })
          }
      }).catch((err)=>{
          console.log(err);
          self.setState({
            loadText: '暂无数据'
          })
      })
    }

    loadmore(){
        console.log('load...');
        const self = this;
        // 'loading' 'loaded' 'canload'
        self.setState({
          enableLoad: 'loading'
        })
        self.getTransList();
    }

    removeConfirm(itm){
      const self = this;
      Modal.formConfirm({ title: '',
        content: '确定删除该记录吗？',
        style: '',
        maxHeight: '80vh',
        btnConStyle: 'center',
        btnSure: {
            text: '确认',
            type: 'link',
            style: { 'height': '2rem'}
        },
        btnCancle: {
            text: '取消',
            type: 'link',
            style: { 'height': '2rem'}
        }
        },
        (id, callback) => { callback(id); self.rmRecord(itm) },
        (id, callback) => { callback(id); });
    }

    rmRecord(itm){
      const self = this;
      removeRecord({id: itm._id}).then((res)=>{
        console.log(res)
        let msg = '删除成功'
        if(res.respHead.code !== '0000'){
          msg = '删除失败'
        }
        self.setState({
          productList: [],
        },()=>{
          self.getList();
        })
        Toaster.toaster({ type: 'normal', position: 'top', content: msg, time: 3000 }, true);
      }).catch((err)=>{
        console.log(err)
      })
    }

  
    render() {
        const self = this;
        const {refreshed, productList, dateArr, selectDay, typeArr, loadText, enableLoad} = this.state;

        const tagTypeArr = typeArr&&typeArr.length > 0 ? typeArr.map((itm, idx)=>{
          return {value: itm.typeValue, text: itm.typeKey, checked: idx==0 ? true: false}
        }) : [];
        let mainHeight = productList&&productList.length > 0 ? {height: '85vh'} : {height: '9vh'};
        const productListDom = productList&&productList.length > 0 ? productList.map((itm, idx)=>{
          return (
          <Row className="padding-all border-radius-5f padding-bottom-3 margin-bottom-1r bg-show"  key={`${idx}-itm`}>
            <Col >
              <Row>
                  <Col span={3}>
                    <BabyIcon iconName={itm.typecode} size={'180%'} />
                  </Col>
                  <Col span={21}>
                    <Row>
                      <Col  className="font-size-12 " span={6}>{itm.time}</Col>
                      <Col span={18} className="text-align-right">
                      <Icon iconName={'trash-a'} size={'150%'} iconColor={'#855EF1'} onClick={()=>{ self.removeConfirm(itm) }}  />
                      </Col>
                      <Col span={6} className="textclolor-gray">{itm.type.text}</Col>
                      <Col span={18} className="text-align-right font-size-8  textclolor-gray">{itm.content}</Col>
                    </Row>
                  </Col>
              </Row>
            </Col>
          </Row>)
        }) : <div className="border-radius-5f bg-show text-align-center line-height-3r textclolor-666">{loadText}</div>;;
      return(
          <section className="bg-f5f5f5 padding-all">
              <Row justify='center' className="margin-top-2">
              <Col span={12} className="line-height-3r font-size-12">日常记录</Col>
              <Col span={12} className="line-height-3r text-align-right">
              <DatePicker {...this.state.datePicker} handleDateChange={(e)=>{console.log(e)}} date />
              </Col>
              <Col className="margin-top-1r">
                <TagRadio options={tagTypeArr}
                    checkStyle={{"backgroundColor":"#855EF1","color": '#fff'}} normalStyle={{"backgroundColor":"#eee","color": '#1a1a1a'}}
                    onChange={(v, it)=>{
                      console.log(it)
                      self.setState({
                        selectType: it.value,
                        productList: []
                      },()=>{
                        self.getList()
                      })
                      // self.setValue('type', it)
                    }} />
              </Col>
              
              <Col className="margin-top-1r">
              <LoadMore enableLoad={enableLoad} percent={20} 
                loadfunc={()=>{this.loadmore()}} style={mainHeight}
                >{productListDom}</LoadMore>
            </Col>
            </Row>
        </section>
        );
    }
}
export default MyRecordsDoc;