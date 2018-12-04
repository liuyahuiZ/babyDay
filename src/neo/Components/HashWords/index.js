import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import Icon from '../Icon';

class HashWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      startLength: 5,
      allCount: 10,
    };
    this.getValue = this.getValue.bind(this);
  }
  getValue() {
    this.props.back();
  }
  runderStart(words) {
    let spans =[];
    let colorArr=["#007AFF","#5CC060","#F25757","#FB803A","#3DBDA5","#AE87FA","#CDCDCD"];
    let fontSizeArr=['30%','60%','50%','20%','80%','100%'];
    for(let i=0; i<=words.length; i++) {
      spans.push((<span key={`${i}-span`} style={{ color: colorArr[parseInt(6*Math.random())],
      fontSize:fontSizeArr[parseInt(5*Math.random())], float: 'left', display: 'inline-block', padding:'0.2rem 0.4rem'  }}>{words[i]}</span>))
    }
    return spans;
  }
  render() {
    const { words, style} = this.props;
    const com = this.runderStart(words);
    return (
      <Row className="nemo-rate" style={arrayUtils.merge([{height: '4rem', overflow:'hidden'}, style])} align={'center'}>
          <Col>{com}</Col>
      </Row>
    );
  }
}

HashWords.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.shape({})
};

HashWords.defaultProps = {
  words: [],
  style: {}
};


export default HashWords;
