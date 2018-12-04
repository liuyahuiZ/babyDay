import React, { Component } from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import FileUpUtil from '../servise/fileUp';
import config from '../config/config';

const {
  Buttons,
  Toaster,
  Header,
  Row,
  Col,
  Icon,
  FileUp,
  Item,
  Tab,
  PopSelect
} = Components;

class OcrDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIdFront: {},
      userIdBack: {},
      resourceKey: '1',
      bankInfo: {}
    };
  }

  fileUp(file, type) {
    let data = new FormData();
    data.append('file', file);
    data.append('type', type || 'auto');
    const self = this;
    FileUpUtil(config.ROOT_URL + 'ocr/idFont', {
      method: 'POST',
      mode: "cors",
      data: data
    }).then(data => {
      console.log(data)
      if (data.respHead.code == '0000') {
        let userInfo = JSON.parse(data.respBody);
        let key = 'userIdFront';
        if (type !== 'front') {
          key = 'userIdBack'
        }
        self.setState({
          [key]: userInfo.info
        })
      }
    }).then(err => {
      console.log(err)
    })
  }

  bankUp(file) {
    let data = new FormData();
    data.append('file', file);
    const self = this;
    FileUpUtil(config.ROOT_URL + 'ocr/getBankInfo', {
      method: 'POST',
      mode: "cors",
      data: data
    }).then(data => {
      console.log(data)
      if (data.respHead.code == '0000') {
        let bankInfo = JSON.parse(data.respBody);
        console.log(bankInfo);
        self.setState({
          bankInfo: bankInfo.info
        })
      }
    }).then(err => {
      console.log(err)
    })
  }

  handleClick(link) {
    console.log(link);
    if (link) {
      hashHistory.push(link);
    }
  }

  tabChange(v) {
    const self = this;
    self.setState({
      'resourceKey': v
    });
  }

  render() {
    const { userIdFront, userIdBack, bankInfo } = this.state;
    const frontInfoDom = userIdFront.name ? (<Row>
      <Col>姓名: {userIdFront.name}</Col>
      <Col>卡号: {userIdFront.number}</Col>
      <Col>地址: {userIdFront.address}</Col>
    </Row>) : '';
    const frontBackDom = userIdBack.authority ? (<Row className="margin-top-2">
      <Col>所属地: {userIdBack.authority}</Col>
      <Col>到期日: {userIdBack.timelimit}</Col>
    </Row>) : '';
    const nextDom = userIdFront.name ? (
      <Row className="margin-top-2">
        <Col><Buttons text="活体采样"
          type={'primary'}
          size={'large'}
          onClick={() => {
            this.handleClick(`/OcrLive?name=${userIdFront.name}&idnumber=${userIdFront.number}`)
          }} /></Col>
      </Row>
    ) : '';
    const BankDom = bankInfo.bank_name ? (<Row className="margin-top-2">
      <Col>银行名称: {bankInfo.bank_name}</Col>
      <Col>卡号: {bankInfo.card_number}</Col>
    </Row>) : '';
    const tabOptions = [{
      tabName: '身份证', keyword: '1', content: (
        <Row className="bg-show" justify="center">
          <Col span={20} className="border-all border-color-999 margin-top-5 heighr-10">
            <FileUp fileReady={(file) => {
              this.fileUp(file, 'front');
            }} callType={'H5'} fileType="blob" description="身份证正面" />
          </Col>
          <Col span={20} className="border-all border-color-999 margin-top-5 heighr-10">
            <FileUp fileReady={(file) => {
              this.fileUp(file, 'back');
            }} callType={'H5'} fileType="blob" description="身份证反面" />
          </Col>
          <Col className="padding-all-1r ">
            <Row>
              <Col><Item leftContent={{ text: '返回结果' }} style={{ padding: '0 0.5rem' }} /></Col>
            </Row>
            {frontInfoDom}
            {frontBackDom}
            {nextDom}
          </Col>
        </Row>
      )
    },
    {
      tabName: '银行卡', keyword: '2', content: (
        <Row className="bg-show" justify="center">
          <Col span={20} className="border-all bg-show border-color-999 margin-top-5 heighr-10">
            <FileUp fileReady={(file) => {
              this.bankUp(file);
            }} callType={'H5'} fileType="blob" description="银行卡信息" />
          </Col>
          <Col className="padding-all-1r ">
            <Row>
              <Col><Item leftContent={{ text: '返回结果' }} style={{ padding: '0 0.5rem' }} /></Col>
            </Row>
            {BankDom}
          </Col>
        </Row>
      )
    }];

    return (
      <section className="bg-f5f5f5">
        {/* <Item leftContent={{text:'微信端项目'}} style={{padding: '0 0.5rem'}} /> */}
        <Header
          leftContent={{
            text: (<Icon iconName={'ios-arrow-back'} size={'180%'} iconColor={'#000'} />), style: { flex: '1.3', width: '23%', paddingLeft: '0.2rem' },
            onClick: () => { hashHistory.goBack(); }
          }}
          centerContent={{ text: 'Ocr测试', style: { flex: '3.5' } }}
          rightContent={{ text: '', style: { flex: '1.5' } }}
        />
        <Row className="has-header">
          <Col className="padding-all-1r ">
            <Tab options={tabOptions} active={this.state.resourceKey} onChange={(v) => {
              this.tabChange(v);
            }} />
          </Col>
        </Row>
      </section>
    );
  }
}
export default OcrDoc;
