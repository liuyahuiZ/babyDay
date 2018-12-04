import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import Icon from '../Icon';

class Rate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value||0,
      startLength: 5,
      allCount: 10,
      normalColor: this.props.normalColor,
      activeColor: this.props.activeColor,
    };
  }

  handleClick(i){
    const { allCode } = this.props;
    const { startLength } = this.state;
    let newValue = i/startLength * allCode;
    this.setState({
      value: newValue
    })
    this.props.onChange(newValue);
  }
  runderStart(length, checkedLength) {
    let icons = [];
    for(let i=1; i<=length; i++) {
      let iconNames = "android-star";
      let iconColor = this.state.normalColor;
      if(i<=checkedLength) {
        iconColor = this.state.activeColor;
      }
      if(i>checkedLength && i===Math.round(checkedLength)) {
         iconNames  ='android-star-half';
         iconColor = this.state.activeColor;
      }
      icons.push((<Icon  key={`${i}-icon`} iconName={iconNames} size={this.props.fontSize} iconColor={iconColor}
      onClick={()=>{
        this.handleClick(i);
      }} />))
    }
    return icons;
  }
  render() {
    const { allCode, style} = this.props;
    const { value, startLength, allCount } = this.state;
    const _rate = value / allCode * startLength;
    const com = this.runderStart(startLength, _rate);
    return (
      <Row className="nemo-rate" style={style} justify={'center'} align={'center'}>
          <Col style={{textAlign: 'center'}}>{com}</Col>
      </Row>
    );
  }
}

Rate.propTypes = {
  value: PropTypes.number,
  style:  PropTypes.shape({}),
  fontSize: PropTypes.string,
  allCode: PropTypes.number,
  normalColor: PropTypes.string,
  activeColor: PropTypes.string,
  onChange: PropTypes.func,
};

Rate.defaultProps = {
  value: 0,
  style: {},
  allCode: 100,
  fontSize: '100%',
  normalColor: '#EBEBEB',
  activeColor: '#EFCB47',
  onChange: () => {},
};


export default Rate;
