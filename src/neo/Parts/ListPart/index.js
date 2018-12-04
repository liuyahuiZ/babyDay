import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import Cell from './cell';
import isValid from '../../utils/validFuncs';
import * as arrayUtils from '../../utils/array';

class ListPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArr: this.props.listData,
      id: this.props.listData.length,
    };
    this.rmMsg = this.rmMsg.bind(this);
    this.addIdForArr = this.addIdForArr.bind(this);
    this.changeSelect = this.changeSelect.bind(this);
    this.checkValid = this.checkValid.bind(this);
  }
  componentDidMount() {
    this.addIdForArr();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataArr: nextProps.listData,
      id: nextProps.listData.length,
    });
  }
  getValue() {
    return this.state.dataArr;
  }
  addIdForArr() {
    const data = this.props.listData;
    for (let i = 0; i < data.length; i++) {
      data[i].id = i + 1;
    }
    this.setState({ dataArr: data });
  }
  remove(arr, id) {
    this.arr = arr;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }
  add() {
    const Newid = this.state.id + 1;
    const format = this.props.listOperation.listFormat;
    const obj = {};
    for (let i = 0; i < format.length; i++) {
      obj[format[i].key] = '';
      if (format[i].items) {
        const objc = {};
        for (let j = 0; j < format[i].items.length; j++) {
          objc[format[i].items[j].key] = '';
        }
        obj[format[i].key] = objc;
      }
    }
    obj.id = Newid;
    const newOptions = this.state.dataArr;
    newOptions.push(obj);
    this.setState({ id: Newid, dataArr: newOptions });
  }
  rmMsg(key) {
    const newOptions = this.state.dataArr;
    const newarr = this.remove(newOptions, key);
    this.setState({ dataArr: newarr });
  }
  sortArr(index, action) {
    const newOptions = this.state.dataArr;
    if (action === 'up') {
      const cache = newOptions[index];
      newOptions[index] = newOptions[index - 1];
      newOptions[index - 1] = cache;
    } else {
      const cache = newOptions[index];
      newOptions[index] = newOptions[index + 1];
      newOptions[index + 1] = cache;
    }
    this.setState({ dataArr: newOptions });
  }
  changeArr(rowIdx, key, value, parentKey) {
    const newOptions = this.state.dataArr;
    if (parentKey) {
      if (newOptions[rowIdx][parentKey] === undefined) {
        newOptions[rowIdx][parentKey] = {};
      }
      newOptions[rowIdx][parentKey][key] = value;
    } else {
      newOptions[rowIdx][key] = value;
    }
    this.setState({ dataArr: newOptions });
  }
  changeSelect(rowIdx, key, value, option) {
    const newOptions = this.state.dataArr;
    newOptions[rowIdx][key][option] = value;
    this.setState({ dataArr: newOptions });
  }

  checkData(data, listFormat) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    let statuslin = true;
    let nobo = '';
    let keyStr = '';
    if (values.indexOf('') >= 0) {
      statuslin = false;
      nobo = values.indexOf('');
      keyStr = keys[nobo];
      return { status: statuslin, key: keyStr, no: nobo };
    }

    for (let j = 0; j < listFormat.length; j++) {
      if (listFormat[j].valid) {
        statuslin = isValid(data[listFormat[j].key], listFormat[j].valid);
        nobo = j;
        keyStr = listFormat[j].key;
        break;
      }
      if (data[listFormat[j].key] === undefined || data[listFormat[j].key] === '') {
        statuslin = false;
        nobo = j;
        keyStr = listFormat[j].key;
        break;
      }  // listFormat[j].vaild
      if (typeof (listFormat[j].items) === 'object' && JSON.stringify(listFormat[j].items) !== '{}') {
        const res = this.checkData(data[listFormat[j].key], listFormat[j].items);
        if (res.status === false) {
          statuslin = res.status;
          nobo = res.no;
          keyStr = res.key;
          break;
        }
      }
    }
    return { status: statuslin, key: keyStr, no: nobo };
  }
  checkValid() {
    const dataArr = this.state.dataArr;
    const { listOperation } = this.props;
    let resultStatus = '';
    for (let i = 0; i < dataArr.length; i++) {
      resultStatus = this.checkData(dataArr[i], listOperation.listFormat);
    }
    return resultStatus;
  }
  render() {
    const { listOperation, style, showIndex, showSort, showInfo } = this.props;
    return (
      <div style={arrayUtils.merge([styles.container, style])} >
        <Cell
          itemFormat={listOperation.listFormat} items={this.state.dataArr}
          operations={listOperation.operations} showIndex={showIndex}
          sort={listOperation.sortOperations}
          showSort={showSort}
          showInfo={showInfo}
        />
      </div>
    );
  }
}

ListPart.propTypes = {
  style: PropTypes.shape({}),
  listOperation: PropTypes.shape({
    listFormat: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  listData: PropTypes.arrayOf(PropTypes.shape({})),
  showIndex: PropTypes.bool,
  showSort: PropTypes.bool,
  showInfo: PropTypes.bool
};

ListPart.defaultProps = {
  style: {},
  listOperation: {},
  listData: [],
  showIndex: false,
  showSort: false,
  showInfo: false
};

export default ListPart;
