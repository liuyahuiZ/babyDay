import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import Icon from '../Icon';
import '../Style/step.scss';

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value||0,
      stepOption: this.props.stepOption||[],
      nowStep: this.props.nowStep||0,
      stepStyle: this.props.stepStyle||{
        activeColor: '#fd5023',
        defaultColor: '#333'
      },
    };
  }
  componentWillReceiveProps(newProps){
    this.setState({
      stepOption: newProps.stepOption,
      nowStep: newProps.nowStep
    })
  }

  render() {
    const { stepOption, nowStep, stepStyle } = this.state;
    const stepDom = stepOption&&stepOption.length > 0 ? stepOption.map((itm, idx)=>{
        return <Col key={`${idx}-stepItm`} span={24/stepOption.length}>
            <Row className={`${(idx+1) < nowStep ? 'active': ''}`}>
            <Col className="text-align-center relative">
                <span className="step-number" style={(idx+1) <= nowStep ? {color: stepStyle.activeColor,borderColor: stepStyle.activeColor} :
                 {color: stepStyle.defaultColor,borderColor: stepStyle.defaultColor}}> 
                {(idx+1) < nowStep ? <Icon iconName="checkmark" size={'100%'} iconColor={'#F55936'} /> : (idx+1) }</span>
                { (idx + 1 < stepOption.length) ?  <div className="step-line" />: ''}
            </Col>
            <Col className="text-align-center step-title" style={(idx+1) <= nowStep ? {color: stepStyle.activeColor} :
                {color: stepStyle.defaultColor}}>{itm.title||''}</Col>
            <Col className="text-align-center step-description">{itm.description||''}</Col>
            </Row></Col>
    }) : '';
    return (
      <Row className="neo-step" justify={'center'}>
          {stepDom}
      </Row>
    );
  }
}

Step.propTypes = {
  value: PropTypes.number,
  style:  PropTypes.shape({}),
  fontSize: PropTypes.string,
  allCode: PropTypes.number,
  normalColor: PropTypes.string,
  activeColor: PropTypes.string,
  onChange: PropTypes.func,
};

Step.defaultProps = {
  value: 0,
  style: {},
  allCode: 100,
  fontSize: '100%',
  normalColor: '#EBEBEB',
  activeColor: '#EFCB47',
  onChange: () => {},
};


export default Step;
