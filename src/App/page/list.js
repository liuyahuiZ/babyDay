import React , { Component }from 'react';
import {Components} from 'neo';
import {  hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import wx from 'weixin-js-sdk';
import BaseView from '../core/app';

const {
  Buttons,
  Toaster,
  Modal,
  Row,
  Col,
  Icon,
  Item,
  Header,
  PullRefresh,
  PopSelect
} = Components;
  
class ListDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          confirmDirty: false,
          refreshed: false,
      };
    }

    _viewAppear(){
      console.log('onload');
      this.getSign();
    }

    loadFunc(){
      console.log('onload');
      setTimeout(() => {
        this.setState({
          refreshed: true,
        })
      }, 3000);
    }

    getSign(){
      const self = this;
        let url =  encodeURIComponent(window.location.href.split('#')[0])
        let reqbody={
        "url" : url
        }
        fetch( config.ROOT_URL+ 'wx/sign', { method: 'POST', data: reqbody})
        .then(data => {
          console.log(data)
          // alert(JSON.stringify(data.respBody));
           wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wx15145e4f7b434571', // 必填，公众号的唯一标识
              timestamp: data.respBody.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.respBody.noncestr, // 必填，生成签名的随机串
              signature: data.respBody.signature,// 必填，签名，见附录1
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'chooseImage',
                'scanQRCode',
                'getLocation'
              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(()=>{
            console.log('wx.ready');
            // alert('wx.ready')
          });

          wx.error(function(res){

            console.log('wx err',res);
            // alert('wx.err'+JSON.stringify(res));

            //可以更新签名
          });
          wx.onMenuShareTimeline({
              title: 'shareTest', // 分享标题
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://47.88.2.72:2016/getphotoPal/2017-4-13/14920521723196.png', // 分享图标
              success: function () { 
                  // 用户确认分享后执行的回调函数
                  alert('分享成功')
              },
              cancel: function () { 
                  // 用户取消分享后执行的回调函数
                  alert('用户取消分享')
              }
          });
          wx.onMenuShareAppMessage({
              title: 'shareTest', // 分享标题
              desc: 'shareTestshareTestshareTest,', // 分享描述
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://47.88.2.72:2016/getphotoPal/2017-4-13/14920521723196.png', // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () { 
                  // 用户确认分享后执行的回调函数
                  alert('分享成功')
              },
              cancel: function () { 
                  // 用户取消分享后执行的回调函数
                  alert('用户取消分享')
              }
          });
        })
        .catch(error => console.log(error))
    }
    choseImage(){
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        console.log(res);
        }
      });
    }

    getNetWork(){
      wx.getNetworkType({
        success: function (res) {
          var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
          Modal.alert({ title: '当前网络状态',
            content: JSON.stringify(networkType),
            btn: {
              text: '确定',
              type: 'link',
              style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
            }, 
            type: 'large'
          },
          () => { console.log('nult callback'); });
        }
      });
    }

    getAddRess(){
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          console.log(res);
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          Modal.alert({ title: '当前地理位置',
            content: (<div>{`纬度 - ${latitude}, 经度 - ${longitude}, 速度 - ${speed}, 位置精度 - ${accuracy}`}</div>),
            btn: {
              text: '确定',
              type: 'link',
              style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
            }, 
            type: 'large'
          },
          () => { console.log('nult callback'); });
        }
      });
    }

    scan(){
      // wx.scanQRCode();
      // wx.scanQRCode({
      //   needResult: 1,
      //   desc: 'scanQRCode desc',
      //   success: function (res) {
      //     alert(JSON.stringify(res));
      //   }
      // });
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        desc: 'scanQRCode desc',
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          Modal.alert({ title: '扫描结果',
              content: result,
              btn: {
                text: '确定',
                type: 'link',
                style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
              }, 
              type: 'large'
            },
            () => { console.log('nult callback'); });
        }
        });
    }

    doPop(){
      PopSelect.formConfirm({
        title: '',
        options: [
        {
            "text": "上海",
            "value": "1"
        },
        {
            "text": "北京",
            "value": "2"
        },
        {
            "text": "杭州",
            "value": "3"
        },
        {
            "text": "广州",
            "value": "4"
        },
        {
            "text": "南京",
            "value": "5"
        },
        {
            "text": "苏州",
            "value": "6"
        },
        {
            "text": "深圳",
            "value": "7"
        }],
        btnSure: {
          text: '完成',
          type: 'link'
        },
        btnCancle: {
          text: '取消',
          type: 'link'
        } },
        (val) => {
          console.log(val)
         },
        (val) => { console.log(val) });
    }
    addRessDoPop(){
      PopSelect.formConfirm({
        type: 'address',
        title: '',
        defaultValue: ['湖南省','长沙市','开福区'],
        options: [],
        onChange: (e)=>{
          console.log(e);
        },
        btnSure: {
          text: '完成',
          type: 'link'
        },
        btnCancle: {
          text: '取消',
          type: 'link'
        }},
        (val) => {
          console.log(val)
         },
        (val) => { console.log(val) });
    }

    render() {
      const {refreshed} = this.state;
        return(
          <div>
            <Header
              leftContent={{
                text: (<Icon iconName={'ios-arrow-back'} size={'180%'} iconColor={'#000'} />), style:{flex: '1.3',width: '23%', paddingLeft: '0.2rem'},
                onClick: ()=>{hashHistory.goBack();}
              }}
              centerContent={{text: 'jssdk测试', style:{flex: '3.5'} }}
              rightContent={{text:'', style:{flex: '1.5'}}}
            />
            <div className="has-header" >
              <Item leftContent={{text:'基础组件'}} style={{padding: '0 0.5rem'}} />
              <Row className="padding-all-1r">
                <Col></Col>
                <Col className="padding-all-1r" span={24}>
                <Buttons
                  text="调用微信相机"
                  type={'primary'}
                  size={'large'}
                  onClick={()=>{
                    this.choseImage()
                  }}
                />
                </Col>
                <Col className="padding-all-1r">
                <Buttons
                  text="调用用户授权"
                  size={'large'}
                  type={'primary'}
                  onClick={()=>{
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx15145e4f7b434571&redirect_uri=http%3A%2F%2Fwww.wetalks.cn%2FF2E%2F%23%2FAccessAuthor&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect';
                  }}
                />
                </Col>
                <Col className="padding-all-1r">
                <Buttons
                  text="获取网络状态"
                  size={'large'}
                  type={'primary'}
                  onClick={()=>{
                    this.getNetWork();
                  }}
                />
                </Col>
                <Col className="padding-all-1r">
                <Buttons
                  text="获取当前位置"
                  size={'large'}
                  type={'primary'}
                  onClick={()=>{
                    this.getAddRess();
                  }}
                />
                </Col>
                <Col className="padding-all-1r">
                <Buttons
                  text="扫一扫"
                  size={'large'}
                  type={'primary'}
                  onClick={()=>{
                    this.scan();
                  }}
                />
                </Col>
                <Col className="padding-all-1r">
                  <Buttons text="城市选择"
                      type={'primary'}
                      size={'large'}
                      onClick={()=>{
                        this.doPop()
                      }} />
                </Col>
                <Col className="padding-all-1r">
                  <Buttons text="省市区三级选择"
                      type={'primary'}
                      size={'large'}
                      onClick={()=>{
                        this.addRessDoPop()
                      }} />
                </Col>
              </Row>
            </div>
          </div>
        );
    }
}
export default ListDoc;
