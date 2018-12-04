import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Buttons from '../Button/button';
import styles from './style';
import PageTransition from '../PageTransition';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import Picker from '../Picker';
import * as arrayUtils from '../../utils/array';
import { provins, citys, areas } from './address';


class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'enter',
      value: this.props.options.options[0]||{},
      options: this.props.options,
      _provins: {
        list: provins,
        defaultValue: this.props.options.defaultValue[0],
        displayValue: (name)=> {return name;}
      },
      _citys: {
        list: citys[this.props.options.defaultValue[0]],
        defaultValue: this.props.options.defaultValue[1],
        displayValue: (name)=> {
          return name;
        }
      },
      _areas: {
        list: areas[this.props.options.defaultValue[1]],
        defaultValue: this.props.options.defaultValue[2],
        displayValue: (name)=> {
          return name;
        }
      }
    };
    this.address = [];
    this.hide = this.hide.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  componentWillMount(){
    
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.props.options.options[0]||{},
      options: this.props.options
    })
  }


  handleChangeProvin (provin) {
    const {options} = this.state;
    this.setState({
      _provins:{
        list: provins,
        defaultValue: provin,
        displayValue: (name)=> {return name;}
      },
      _citys:{
        list: citys[provin],
        defaultValue: citys[provin][0],
        displayValue: (name)=> {return name;}
      },
      _areas:{
        list: areas[citys[provin][0]],
        defaultValue: areas[citys[provin][0]][0],
        displayValue: (name)=> {return name;}
      }
    })

    this.address = [];
    this.address.push(provin);
    this.address.push(citys[provin][0]);
    this.address.push(areas[citys[provin][0]][0]);
    options.onChange(this.address);
  }

  handleChangeCity(city) {
    const {options} = this.state;
    this.address[1] = city;
    this.address[2] = areas[city][0];
    this.setState({
      _areas: {
        list: areas[city],
        defaultValue: areas[city][0],
        displayValue: (name)=> {return name;}
      }
    })
    options.onChange(this.address);
  }

  handleChangeArea(area) {
    const {options} = this.state;
    this.address[2] = area;
    options.onChange(this.address);
  }

  hide(index) {
    this.setState({
      action: 'leave'
    });
    setTimeout(() => {
      this.props.callbackRM(index);
    }, 600);
  }
  setValue(im) {
    this.setState({
      value: im,
      active: im.value
    })
  }

  render() {
    const self = this;
    const { options, _provins, _citys, _areas } = this.state;
    const leftCon = Object.assign({}, styles.leftCon);
    const rightX = Object.assign({}, styles.rightX);

    const contentMaxHeight = options.maxHeight ? { maxHeight: options.maxHeight } : '';
    const buttons = options.buttons.map((im, idx) => {
      const rbutton = (<Buttons
        key={`${idx}-bn`}
        text={im.title}
        type={im.type}
        onClick={() => { im.callbk(options.id, self.hide, self.address); }}
        style={styles.marginRight}
        plain={im.plain}
        key={im.title}
      />);
      return rbutton;
    });

    const btnConStyle = options.btnConStyle ? `textAlign${options.btnConStyle}` : '';
    return (
        <PageTransition
          act={self.state.action}
          duration={166}
          enter={'popselect-enter'}
          leave={'popselect-leave'}
        >
          <div
            style={arrayUtils.merge([styles.continer, styles[options.type],
              options.containerStyle])}
          >
            <div style={arrayUtils.merge([styles.header, styles[btnConStyle]])}>
              <Row>
                <Col span={6} style={styles.textAlignLeft}>{buttons[1]}</Col>
                <Col span={12} style={styles.textAlignCenter}>{options.title}</Col>
                <Col span={6} style={styles.textAlignRight}>{buttons[0]}</Col>
              </Row>
            </div>
            <div style={arrayUtils.merge([styles.content, contentMaxHeight])} className="scrollTouch ui-picker-address">
              {/* {option} */}
              <Picker data={_provins} onChange={(v)=>{
                self.handleChangeProvin(v)
              }} />
              <Picker data={_citys} onChange={(v)=>{
                self.handleChangeCity(v)
              }} />
              <Picker data={_areas} onChange={(v)=>{
                self.handleChangeArea(v)
              }} />
            </div>
          </div>
        </PageTransition>
    );
  }
}

Cell.propTypes = {
  callbackRM: PropTypes.func,
  options: PropTypes.shape({})
};

Cell.defaultProps = {
  options: {
    type: 'middle',
    style: 'normal'
  },
  callbackRM: () => {}
};

export default Cell;
