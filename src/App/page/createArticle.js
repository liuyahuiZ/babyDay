import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import FileUpUtil from '../servise/fileUp';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import { createRecord, findType, addType, removeType } from '../api/index';
import moment from 'moment';
import BabyIcon from '../components/babyIcon';

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
    FileUp,
    TagRadio,
    PopContainer,
    Picker,
    LabelGroup
  } = Components;
const { sessions, storage } = utils;
  
class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          user: '',
          title: '',
          info: '',
          content: '',
          imgGroup: '',
          dataMap: sessions.getStorage("dataMap") ||[{type: { value: 1, text: '拉拉'}, time: '00:00:00'}],
          typeArr: [],
          userInfo: storage.getStorage('userInfo') || {}
      };
    }

    componentDidMount(){
        this.getType();
    }

    setValue(key, idx, val){
        const { dataMap } = this.state;
        let newDate = dataMap[idx];
        newDate[key] = val;
        dataMap[idx] = newDate;
        this.setState({dataMap: dataMap});
        sessions.setStorage("dataMap", dataMap);
    }

    getType(){
        const self = this;
        findType({}).then((res)=>{
            console.log(res);
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
    setArr(num){
        let arr = []
        for(let i=0;i<num;i++){
            if(i<=9) { i = `0${i}`}
            arr.push({
                "text": i,
                "value": i
            })
        }
        return arr;
    }
    selectOver(v, idx){
        console.log(v);
        this.setValue('time', idx, v);
        this.setValue('timeStr', idx, new Date().getTime());
        let today = moment().format('YYYY-MM-DD');
        this.setValue('actTimeStr', idx, new Date(`${today} ${v}`).toJSON());
        console.log(new Date(`${today} ${v}`).toJSON());
    }
    selectTime(idx){
      const self = this;
      const Hours = this.setArr(24);
      const Minuit = this.setArr(60);
      const Second = this.setArr(60);
      let theHours = 0;let theMinuit = 0;let theSecond = 0;
      PopContainer.confirm({
        content: (<Row>
            <Col span={24} className={'text-align-center'}  >
                <Row>
                    <Col span={12} className="text-align-left line-height-2r padding-all" onClick={() => { PopContainer.closeAll() }}>
                    <Icon iconName={"android-close"} size={'130%'} iconColor={'#000'} /></Col>
                    <Col span={12} className="text-align-right line-height-2r padding-all" onClick={() => { PopContainer.closeAll();
                    self.selectOver(`${theHours}:${theMinuit}:${theSecond}`, idx) }}>完成</Col>
                </Row>
            </Col>
            <Col span={8} className={'overflow-hide text-align-center line-height-2r'}>时</Col>
            <Col span={8} className={'overflow-hide text-align-center line-height-2r'}>分</Col>
            <Col span={8} className={'overflow-hide text-align-center line-height-2r'}>秒</Col>
            <Col span={8} className={'overflow-hide'}>
                <Picker data={{list: Hours, 
                defaultValue: Hours[0],
                displayValue (name) {
                    return name.text;
                }}} onChange={(v)=>{
                    theHours = v.value;
                    // self.setValue(v)
                }} />
            </Col>
            <Col span={8} className={'overflow-hide'}>
            <Picker data={{list: Minuit, 
              defaultValue: Minuit[0],
              displayValue (name) {
                return name.text;
              }}} onChange={(v)=>{
                theMinuit = v.value;
                // self.setValue(v)
              }} />
            </Col>
            <Col span={8} className={'overflow-hide'}>
            <Picker data={{list: Second, 
              defaultValue: Second[0],
              displayValue (name) {
                return name.text;
              }}} onChange={(v)=>{
                theSecond = v.value;
                // self.setValue(v)
              }} />
            </Col>
        </Row>),
      type: 'bottom',
      containerStyle: { top: '3rem'},
      });
    }

    submitClick(){
        const { dataMap, userInfo } = this.state;
        console.log(dataMap);
        let req = {
            user: userInfo.phone,
            records: dataMap
        }
        createRecord(req).then((res)=>{
            console.log(res);
            if(res.respHead.code=='0000'){
                Modal.alert({ title: '',
                content: (<div className="text-align-center">添加成功</div>),
                maxHeight: '80vh',
                containerStyle:{},
                btn: {
                    text: '确定',
                    type: 'link',
                    style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
                }, 
                type: 'large'
                },
                () => { console.log('nult callback'); hashHistory.goBack(); });
                sessions.removeStorage("dataMap");
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    addArr(){
        const { dataMap } = this.state;
        let newArr = dataMap;
        newArr.push({type: { value: 1, text: '拉拉'}});
        this.setState({
            dataMap: newArr
        })
        sessions.setStorage("dataMap", newArr);
    }
    deleteArr(itm, idx){
        const { dataMap } = this.state;
        let newArr = dataMap;
        newArr.splice(idx, 1);
        this.setState({
            dataMap: newArr
        })
        sessions.setStorage("dataMap", newArr);
    }
    addNewType(){
        const { textContent, userInfo } = this.state;
        const self = this;
        addType({
            typeKey: textContent,
            typeValue: textContent,
            remark: '',
            user: userInfo.phone
        }).then((res)=>{
            console.log(res);
            if(res.respHead.code=='0000'){
                self.getType()
            } else{
                Toaster.toaster({ type: 'normal', position: 'top', content: res.respHead.message, time: 3000 }, true);
            }
            
        }).catch((err)=>{
            console.log(err);
            Toaster.toaster({ type: 'normal', position: 'top', content: err, time: 3000 }, true);
        })
    }
    editType(){
        const { textContent } = this.state;
        const self = this;
        Modal.formConfirm({ title: '',
        content: (
            <Row>
                <Col>
                <Textarea
                    placeholder="请输入内容"
                    value={textContent}
                    maxLength={100000}
                    maxLengthShow={false}
                    onChange={(e)=>{
                        self.setState({
                            textContent: e
                        })
                    }}
                    />
                </Col>
            </Row>
        ),
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
        (id, callback) => { callback(id); self.addNewType() },
        (id, callback) => { callback(id); });
    }

    
    render() {
        const self = this;
        const { dataMap, typeArr } = this.state;
        const tagTypeArr = typeArr&&typeArr.length > 0 ? typeArr.map((itm, idx)=>{
            return {value: itm.typeValue, text: (<Row><Col><BabyIcon iconName={itm.typeKey} size={'180%'} /></Col>
            <Col>{itm.typeKey}</Col></Row>), checked: idx==0 ? true: false}
        }) : [];
        return(
          <section className="bg-f5f5f5  padding-all ">
            {/* <Header
              leftContent={{
                text: (<Icon iconName={'ios-arrow-back'} size={'180%'} iconColor={'#000'} />), style:{flex: '1.3',width: '23%', paddingLeft: '0.2rem'},
                onClick: ()=>{hashHistory.goBack();}
              }}
              centerContent={{text: '新增记录', style:{flex: '3.5'} }}
              rightContent={{text:'', style:{flex: '1.5'}}}
            /> */}
            <Row>
                <Col span={24} className="line-height-3r font-size-12">新增记录</Col>
            </Row>
            <Row justify="center">
                <Col span={24} className="margin-top-2">
                {dataMap&&dataMap.length>0 ? dataMap.map((itm, idx)=>{
                    return (<Row key={`${idx}-k`} className="margin-bottom-1r bg-show padding-all border-radius-5f">
                    <Col className="text-align-right" > { idx==0 ? '' :  <Icon iconName={'trash-a'} size={'150%'} iconColor={'#855EF1'} onClick={()=>{self.deleteArr(itm, idx)}}  />  }</Col>
                    <Col><Row className="border-bottom border-color-f5f5f5">
                        <Col span={2.5} className="line-height-3r">
                            <Icon iconName={'outlet'} size={'150%'} iconColor={'#855EF1'}  />
                        </Col>
                        <Col span={21.5} className="padding-top-3">
                            <TagRadio options={tagTypeArr}
                            checkStyle={{"backgroundColor":"#855EF1","color": '#fff','borderRadius': '0.5rem'}} normalStyle={{"backgroundColor":"#eee","color": '#1a1a1a','borderRadius': '0.5rem'}}
                            onChange={(v, it)=>{
                              console.log(it)
                              self.setValue('type', idx, {text: it.value,value:it.value})
                            }} />
                            
                        </Col>
                        <Col span={2.5} className="line-height-3r">
                            
                        </Col>
                        <Col span={6} className="line-height-3r"> 
                            <Buttons
                            text={<Icon iconName={'android-add-circle '} size={'150%'} iconColor={'#fff'}  />}
                            type={'primary'}
                            size={'small'}
                            style={{backgroundColor: '#855EF1', color:'#fff', borderRadius: '3rem'}}
                            onClick={()=>{
                                self.editType()
                            }}
                            />
                        </Col>
                    </Row>
                    <Row className="border-bottom border-color-f5f5f5">
                        <Col span={2.5} className="line-height-3r">
                            <Icon iconName={'ios-time '} size={'150%'} iconColor={'#855EF1'}  />
                        </Col>
                        <Col span={21} className="line-height-3r" onClick={()=>{self.selectTime(idx)}}>
                            时间 {itm.time}
                        </Col>
                    </Row>
                    <Row className="">
                        <Col span={2.5} className="line-height-3r">
                        <Icon iconName={'compose'} size={'150%'} iconColor={'#855EF1'}  />
                        </Col>
                        <Col span={21} className="padding-top-3">
                        <Textarea
                            placeholder="请输入内容"
                            value={itm.content}
                            maxLength={100000}
                            maxLengthShow={false}
                            onChange={(e)=>{
                                self.setValue('content', idx,e)
                            }}
                            />
                        </Col>
                    </Row>
                    </Col></Row>)
                }) : <div/>}
                <Row onClick={()=>{self.addArr()}} className="text-align-center bg-show border-radius-5f line-height-3r">
                <Col><Icon iconName={'android-add '} size={'150%'} iconColor={'#855EF1'}  /> 新增</Col>
                </Row>
              </Col>
              <Col span={18} className="margin-top-2r padding-all" >
                <Buttons
                  text="提交"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#855EF1', color:'#fff', borderRadius: '3rem'}}
                  onClick={()=>{
                    this.submitClick()
                  }}
                />
              </Col>
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
