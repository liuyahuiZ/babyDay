import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Tree from './tree';
import styles from './style';
import Row from '../Grid/Row';
import Col from '../Grid/Col';

const x = 4;
const y = 3;
const z = 4; // 层级
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key, preKey });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
  return tns;
};
generateData(z);
class MyTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <Row>
        <Col span={12}>
          <Tree
            style={arrayUtils.merge([styles.container])}
            Date={gData}
          />
        </Col>
        <Col span={12}>
          <Tree
            style={arrayUtils.merge([styles.container])}
            Date={gData}
            display={'show'}
            checkable
          />
        </Col>
      </Row>
    );
  }
}

MyTree.propTypes = {
  options: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
};

MyTree.defaultProps = {
  options: []
};


export default MyTree;
