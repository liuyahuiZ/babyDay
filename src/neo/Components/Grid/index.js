import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import Col from './Col';
import styles from './style';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Row justify={'center'} align={'center'} style={styles.heights}>
          <Col flex={1} style={styles.textCenter}>
            <div style={styles.items}>flex-1</div>
          </Col>
          <Col flex={2} style={styles.textCenter}><div style={styles.items1}>flex-2</div></Col>
          <Col flex={1} style={styles.textCenter}><div style={styles.items}>flex-1</div></Col>
        </Row>
        <Row justify={'flex-start'} align={'center'} style={styles.heights}>
          <Col span={1} style={styles.textCenter}><div style={styles.items}>col-1</div></Col>
          <Col span={2} style={styles.textCenter}><div style={styles.items1}>col-2</div></Col>
          <Col span={2} style={styles.textCenter}><div style={styles.items}>col-2</div></Col>
          <Col span={4} style={styles.textCenter}><div style={styles.items1}>col-4</div></Col>
        </Row>
        <Row justify={'flex-start'} align={'center'} gutter={16} style={styles.heights}>
          <Col span={4} style={styles.textCenter}><div style={styles.items}>col-4</div></Col>
          <Col span={4} style={styles.textCenter}><div style={styles.items1}>col-4</div></Col>
          <Col span={8} style={styles.textCenter}><div style={styles.items}>col-8</div></Col>
          <Col span={8} style={styles.textCenter}><div style={styles.items1}>col-8</div></Col>
          <Col span={8} style={styles.textCenter}><div style={styles.items}>col-8</div></Col>
        </Row>
        <Row justify={'flex-start'} align={'center'} style={styles.heights}>
          <Col span={6} style={styles.textCenter}><div style={styles.items}>col-6</div></Col>
          <Col span={6} style={styles.textCenter}><div style={styles.items1}>col-6</div></Col>
          <Col span={6} style={styles.textCenter}><div style={styles.items}>col-6</div></Col>
          <Col span={6} style={styles.textCenter}><div style={styles.items1}>col-6</div></Col>
        </Row>
        <Row justify={'flex-start'} align={'center'} style={styles.heights}>
          <Col span={6} style={styles.textCenter}>
            <Row justify={'flex-start'} align={'center'} style={styles.heights}>
              <Col span={6} style={styles.textCenter}><div style={styles.items1}>内嵌col-6</div></Col>
              <Col span={6} style={styles.textCenter}><div style={styles.items}>内嵌col-6</div></Col>
              <Col span={6} style={styles.textCenter}><div style={styles.items1}>内嵌col-6</div></Col>
            </Row>
          </Col>
          <Col span={6} style={styles.textCenter}><div style={styles.items1}>col-6</div></Col>
          <Col span={6} style={styles.textCenter}><div style={styles.items}>col-6</div></Col>
          <Col span={6} style={styles.textCenter}><div style={styles.items1}>col-6</div></Col>
        </Row>
      </div>
    );
  }
}

Grid.propTypes = {
  options: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
};

Grid.defaultProps = {
  options: [],
};


export default Grid;
