import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Buttons from '../Button/button';
import styles from './style';
import PageTransition from '../PageTransition';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import Picker from '../Picker';
import * as arrayUtils from '../../utils/array';


class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'enter',
      value: this.props.options.options[0]||{},
      active: this.props.options.options[0].value||'',
      options: this.props.options
    };
    this.hide = this.hide.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.props.options.options[0]||{},
      active: this.props.options.options[0].value||'',
      options: this.props.options
    })
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
    const options = this.state.options;
    const leftCon = Object.assign({}, styles.leftCon);
    const rightX = Object.assign({}, styles.rightX);

    const contentMaxHeight = options.maxHeight ? { maxHeight: options.maxHeight } : '';
    const buttons = options.buttons.map((im, idx) => {
      const rbutton = (<Buttons
        key={`${idx}-bn`}
        text={im.title}
        type={im.type}
        onClick={() => { im.callbk(options.id, self.hide, self.state.value); }}
        style={styles.marginRight}
        plain={im.plain}
        key={im.title}
      />);
      return rbutton;
    });
    // const option = options.options.map((im, idx) => {
    //   const activeStyle = im.value === self.state.active ? styles.active : '';
    //   const item = (<div key={`${idx}-d`} style={arrayUtils.merge([styles.opeationItem, styles.textAligncenter, activeStyle])} onClick={()=> {
    //     this.setValue(im);
    //   }}>{im.text}</div>);
    //   return item;
    // })
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
            <div style={arrayUtils.merge([styles.content, contentMaxHeight])} className="scrollTouch">
              {/* {option} */}
              <Picker data={{list: options.options, 
              defaultValue: options.options[0],
              displayValue (name) {
                return name.text;
              }}} onChange={(v)=>{
                console.log(v);
                self.setValue(v)
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
