import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import styles from './style';
import TreeNode from './treeNode';

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkArr: [],
      parent: {},
      parents: [],
      contradiction: ''
    };
    this.onCheck = this.onCheck.bind(this);
    this.checkInChildres = this.checkInChildres.bind(this);
    this.chargeTree = this.chargeTree.bind(this);
    this.onDelAmb = this.onDelAmb.bind(this);
  }
  onCheck(item) {
    // console.log(item);
    let arr = this.state.checkArr;
    if (item.checkStatus === 'unchecked') {
      arr[item.title] = { checkStatus: 'checked' };
    } else {
      arr[item.title] = { checkStatus: 'unchecked' };
    }
    if (item.children.length > 0) {
      arr = this.chargeChildren(item.children, arr);
    }
    this.setState({ checkArr: arr });
    const self = this;
    // self.getAllFatherNode(this.props.Date, item.title, arr, self);
    this.getFatherNode(this.props.Date, item.title).then(() => {
      // console.log(this.state.parent);
      // console.log(this.state.parents);
      // console.log(result);
      const parents = this.state.parents;
      for (let i = 0; i < parents.length; i++) {
        const res = self.chargeTree(parents[i].children, this.state.checkArr);
        // console.log(res, parents[i].key);
        if (res.statu) {
          arr[parents[i].key] = { checkStatus: 'ambivalent' };
        } else {
          arr[parents[i].key] = { checkStatus: res.contrad };
        }
      }
      this.setState({ checkArr: arr });
      this.setState({ parents: [] });
    });
  }
  onDelAmb(itm) {
    let arr = this.state.checkArr;
    if (itm.children.length > 0) {
      arr = this.chargeChildren(itm.children, arr, 'checked');
    }
    arr[itm.title] = { checkStatus: 'checked' };
    this.setState({ checkArr: arr });
  }
  getFatherNode(arr, key) {
    return new Promise((resolve) => {
      const result = this.checkInChildres(arr, key);
      resolve(result);
    });
  }
  chargeTree(treeArr, checkArr) {
    this.treeArr = treeArr;
    let contradiction = '';
    let status = false;
    for (let i = 0; i < treeArr.length; i++) {
      const theCheck = checkArr[treeArr[i].title];
      if (theCheck) {
        if (contradiction !== '') {
          if (theCheck.checkStatus !== contradiction) {
            status = true;
            break;
          } else {
            status = false;
          }
        } else {
          status = true;
          contradiction = theCheck.checkStatus;
        }
      } else if (!theCheck && contradiction === 'unchecked') {
        status = false;
      } else {
        status = true;
      }
    }
    return { statu: status, contrad: contradiction };
  }
  // 递归遍历是否在子数组中，setState 找到的父节点
  checkInChildres(arr, key) {
    const theArrS = [];
    let checkArrS = false;
    let result = '';
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key !== key) {
        if (arr[i].children) {
          result = this.checkInChildres(arr[i].children, key);
          const arrs = this.state.parents;
          if (result.theArr && result.theArr.length === 0 && result.checkArr) {
            // console.log(arr[i]);
            theArrS.push(arr[i]);
            arrs.push(arr[i]);
            checkArrS = result.checkArr;
            this.setState({ parent: { checkArr: result.checkArr, theArr: arr[i] } });
            break;
          } else if (result.checkArr && result.theArr.length > 0) {
            arrs.push(arr[i]);
            theArrS.push(arr[i]);
            checkArrS = result.checkArr;
            break;
          }
          this.setState({ parents: arrs });
        }
      } else {
        checkArrS = true;
        break;
      }
    }
    return { checkArr: checkArrS, theArr: theArrS, results: result };
  }
  // 改变checkArr数组 key为 arr数组的每一个状态
  chargeChildren(arr, checkArr, status) {
    for (let i = 0; i < arr.length; i++) {
      if (status) {
        checkArr[arr[i].key] = { checkStatus: status };
      } else if (arr[i].props.checkStatus === 'unchecked') {
        checkArr[arr[i].key] = { checkStatus: 'checked' };
      } else {
        checkArr[arr[i].key] = { checkStatus: 'unchecked' };
      }

      if (arr[i].props.children.length > 0) {
        checkArr = this.chargeChildren(arr[i].props.children, checkArr, status);
      }
    }
    return checkArr;
  }
  loop = data => data.map((item) => {
    const arr = this.state.checkArr;
    const { checkable, display, activeNode } = this.props;
    const actived = activeNode && activeNode === item.title;
    const checkStatus = arr[item.key] ? arr[item.title].checkStatus : 'unchecked';
    if (item.children) {
      return (
        <TreeNode
          prekey={item.preKey} key={item.key} title={item.title} link={item.link}
          onCheck={this.onCheck}
          onDelAmb={this.onDelAmb} checkStatus={checkStatus} checkable={checkable}
          display={display} active={actived}
        >
          {this.loop(item.children)}
        </TreeNode>
      );
    }
    return (<TreeNode
      prekey={item.preKey} key={item.key} title={item.title} link={item.link} onCheck={this.onCheck}
      onDelAmb={this.onDelAmb} checkStatus={checkStatus} checkable={checkable} active={actived}
      display={display}
    />);
  });

  render() {
    const data = this.props.Date;
    return (
      <ul style={arrayUtils.merge([styles.ul])}>
        {this.loop(data)}
      </ul>
    );
  }
}

Tree.propTypes = {
  Date: PropTypes.arrayOf(PropTypes.shape({})),
  checkable: PropTypes.bool,
  display: PropTypes.string,
  activeNode: PropTypes.string,
};

Tree.defaultProps = {
  Date: [],
  checkable: false,
  display: 'hide',
  activeNode: ''
};


export default Tree;
