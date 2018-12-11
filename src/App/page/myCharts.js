import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { UrlSearch, arrSetKey, objToArr, datedifference } from '../utils/index';
import BaseView from '../core/app';
import F2Charts from '../components/charts';
import LineCharts from '../components/lineCharts';
import { recordList, findType, removeRecord, recordListForType, recordListForTime } from '../api/index'
import moment from 'moment';

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
    Panel, DatePicker
  } = Components;
const { sessions, storage } = utils;
class MyCharts extends BaseView {
    constructor(props) {
      super(props);
      const startDate = moment().subtract(0, 'days').format('YYYY-MM-DD'); // 设置开始日期，没有就默认昨天的日期
	    const endDate =  moment().subtract(0, 'days').format('YYYY-MM-DD'); // 设置结束日期，没有就默认昨天的日期
      this.state = {
          article: {},
          productList: [],
          typeArr: [],
          loadText: '加载中',
          selectType: '',
          pageNumber: 1,
          pageSize: 100,
          enableLoad: 'canload',
          datePicker: {
            startDate,
            endDate,
            dateType: 2,
            allowToday: true,
            callback:(e)=>{this.setDate(e)}
         },
         selectDay: moment().format('YYYY-MM-DD'),
         userInfo: storage.getStorage('userInfo') || {},
         chartData: [],
         lineDate: []
      };
    }

    _viewAppear(){
      this.getType();
      this.getList();
      this.getRecordListForType();
    }

    getType(){
      const self = this;
      findType({}).then((res)=>{
          if(res.respHead.code=='0000'){
            self.setState({
                typeArr: res.respBody
            })
          }
      }).catch((err)=>{
          console.log(err);
          Toaster.toaster({ type: 'normal', position: 'top', content: err, time: 3000 }, true);
      })
    }

    getRecordListForType(){
      const { userInfo, datePicker } = this.state;
      const self = this;
      recordListForType({
        user: userInfo.phone,
        startDate: datePicker.startDate, 
        endDate: datePicker.endDate,
        dateNum: datedifference(datePicker.startDate, datePicker.endDate)
      }).then((res)=>{
        console.log(res);
        if(res.respHead.code=='0000'){
          self.setState({
            lineDate: res.respBody.record,
          })
        }
      }).catch((err=>{
        console.log(err);
      }));
    }

    getList(){
      const { selectDay, selectType, pageNumber, datePicker, pageSize, productList, userInfo } = this.state;
      console.log(selectDay);
      const self = this;
      recordListForTime({user: userInfo.phone, 
        startDate: datePicker.startDate, 
        endDate: datePicker.endDate,
        typecode: selectType,
        pageNumber: pageNumber,
        pageSize: pageSize
      }).then((res)=>{
        if(res.respHead.code=='0000'){
          self.setState({
              productList: res.respBody.record,
          }, ()=>{
            let data = arrSetKey(res.respBody.record, 'typecode');
            // console.log(data);
            let newData = objToArr(data.count);
            // console.log('newData',newData)
            self.setState({
              chartData: newData
            })
          })
        }
      }).catch((err)=>{
          console.log(err);
          self.setState({
            loadText: '暂无数据'
          })
      })
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
          self.getList();
          self.getRecordListForType()
      })
  }
        
    render() {
        const {chartData, lineDate} = this.state;
        return(
          <section className="bg-f5f5f5 padding-all">
          <Row justify='center' className="margin-top-2">
              <Col span={12} className="line-height-3r font-size-12">数据图表</Col>
              <Col span={12} className="line-height-3r text-align-right">
                <DatePicker {...this.state.datePicker} handleDateChange={(e)=>{console.log(e)}} simple />
              </Col>
              <Col className="margin-top-1r">
               <Row>
                 <Col className="padding-all border-radius-5f margin-bottom-1r bg-show">
                  <F2Charts id={'barChart'} data={chartData} />
                 </Col>
                 <Col className="padding-all border-radius-5f margin-bottom-1r bg-show">
                  <LineCharts id={'lineChart'} data={lineDate} />
                 </Col>
                </Row>
              </Col>
          </Row>
          </section>
        );
    }
}
export default MyCharts;
