import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Menu from './menu';
import styles from './style';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import Buttons from '../Button/button';

const gData = [
  { title: '开发指南', key: '0-0', preKey: '0', iconName: 'cube', otherName: '开发指南' },
  { title: '基础组件',
    key: '0-1',
    preKey: '0',
    iconName: 'android-send',
    children: [
      { title: 'Components',
        key: '0-1-0',
        preKey: '0-1',
        iconName: 'cube',
        children: [
          { title: 'Grid', key: '0-1-0-15', preKey: '0-1-0', otherName: 'Grid' },
          { title: 'Button', key: '0-1-0-0', preKey: '0-1-0', otherName: 'Button', display: 'none' },
          { title: 'Input', key: '0-1-0-1', preKey: '0-1-0', otherName: 'Input' },
          { title: 'DatePicker', key: '0-1-0-2', preKey: '0-1-0', otherName: 'DatePicker' },
          { title: 'Select', key: '0-1-0-4', preKey: '0-1-0', otherName: 'Select' },
          { title: 'Radio&Checkbox', key: '0-1-0-3', preKey: '0-1-0', otherName: 'Radio&Checkbox' },
          { title: 'Switch', key: '0-1-0-5', preKey: '0-1-0', otherName: 'Switch' },
          { title: 'Label', key: '0-1-0-11', preKey: '0-1-0', otherName: 'Label' },
          { title: 'Icons', key: '0-1-0-7', preKey: '0-1-0', otherName: 'Icons' },
          { title: 'Progress', key: '0-1-0-8', preKey: '0-1-0', otherName: 'Progress' },
          { title: 'Toaser', key: '0-1-0-6', preKey: '0-1-0', otherName: 'Toaser' },
          { title: 'Confirm', key: '0-1-0-16', preKey: '0-1-0', otherName: 'Confirm' },
          { title: 'Tab', key: '0-1-0-9', preKey: '0-1-0', otherName: 'Tab' },
          { title: 'Collapse', key: '0-1-0-10', preKey: '0-1-0', otherName: 'Collapse' },
          { title: 'Tree', key: '0-1-0-12', preKey: '0-1-0', otherName: 'Tree' },
          { title: 'Carousel', key: '0-1-0-13', preKey: '0-1-0', otherName: 'Carousel' },
          { title: 'FileUp', key: '0-1-0-14', preKey: '0-1-0', otherName: 'FileUp' },
        ] },
      { title: 'Parts',
        key: '0-1-1',
        preKey: '0-1',
        display: 'none',
        children: [
          { title: 'SearchPart', key: '0-1-1-0', preKey: '0-1-1', otherName: 'SearchPart' },
          { title: 'EditPart', key: '0-1-1-3', preKey: '0-1-1', otherName: 'EditPart' },
          { title: 'DetailPart', key: '0-1-1-4', preKey: '0-1-1', otherName: 'DetailPart' },
          { title: 'DrawPart', key: '0-1-1-1', preKey: '0-1-1', otherName: 'DrawPart' },
          { title: 'TransferPart', key: '0-1-1-2', preKey: '0-1-1', otherName: 'TransferPart' },
          { title: 'ListPart', key: '0-1-1-5', preKey: '0-1-1', otherName: 'ListPart' },
        ] }
    ] },
    { title: '更新日志', key: '0-2', preKey: '0', iconName: 'android-send', otherName: '更新日志' },

]
;


// const generateData = (_level, _preKey, _tns) => {
//   const preKey = _preKey || '0';
//   const tns = _tns || gData;
//   const children = [];
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`;
//     tns.push({ title: key, key, preKey, level: key.split('-').length });
//     if (i < y) {
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
//   return tns;
// };
// generateData(z);
// console.log(gData);
class MyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      modal: 'inline',
      theme: 'dark'
    };
  }
  componentDidMount() {
  }

  Toogle() {
    const modal = this.state.modal;
    if (modal) {
      this.setState({
        modal: false
      });
    } else {
      this.setState({
        modal: true
      });
    }
  }
  ToogleTheme() {
    const theme = this.state.theme;
    if (theme === 'dark') {
      this.setState({
        theme: 'default'
      });
    } else {
      this.setState({
        theme: 'dark'
      });
    }
  }
  render() {
    return (
      <Row>
        <Col span={10}>
          <Menu
            style={arrayUtils.merge([styles.container])}
            Date={gData}
            activeNode={'Button'}
            theme={'default'}
          />
        </Col>
        <Col span={2} />
        <Col span={10}>
          <Menu
            style={arrayUtils.merge([styles.container])}
            Date={gData}
            activeNode={'Button'}
            theme={'dark'}
          />
        </Col>
        <Col span={24} >
          <Buttons
            text={'Toggle'}
            type={'primary'}
            size={'small'}
            onClick={() => {
              this.Toogle();
            }}
          />
          <Buttons
            text={'Toggle'}
            type={'primary'}
            style={{ marginLeft: '10px' }}
            size={'small'}
            onClick={() => {
              this.ToogleTheme();
            }}
          />
        </Col>
        <Col span={10}>
          <Menu
            style={arrayUtils.merge([styles.container])}
            Date={gData}
            activeNode={'Button'}
            theme={this.state.theme}
            collapsed={this.state.modal}
          />
        </Col>
      </Row>
    );
  }
}

MyMenu.propTypes = {
  options: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
};

MyMenu.defaultProps = {
  options: []
};


export default MyMenu;
