import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Buttons from '../Button/button';
import Icon from '../Icon';
import styles from './style';
import PageTransition from '../PageTransition';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import * as arrayUtils from '../../utils/array';


class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'enter',
      value: this.props.options.options[0]||{},
      active: this.props.options.defaultValue.value||this.props.options.options[0].value||'',
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
  hide() {
    this.setState({
      action: 'leave'
    });
    setTimeout(() => {
      this.props.callbackRM();
    }, 600);
  }
  setValue(im) {
    this.setState({
      value: im,
      active: im.value
    })
    this.hide();
  }

  render() {
    const self = this;
    const options = this.state.options;
    const leftCon = Object.assign({}, styles.leftCon);
    const rightX = Object.assign({}, styles.rightX);

    const contentMaxHeight = options.maxHeight ? { maxHeight: options.maxHeight } : '';
    const option = options.options.map((im, idx) => {
      const activeStyle = im.value === self.state.active? styles.active : '';
      const noIconStyle = options.showIcon ? '' : styles.noIcon;
      const item = (<div key={`${idx}-d`} style={arrayUtils.merge([styles.opeationItem, styles.textAlignLeft, activeStyle, noIconStyle])} onClick={()=> {
        this.setValue(im);
        options.successCallback(im);
      }}>{ im.value === self.state.active && options.showIcon ? <Icon iconName={'android-done'} size={'100%'} iconColor={ '#007AFF' } style={styles.activeIcon} />: '' }{im.text}</div>);
      return item;
    })

    return (
        <PageTransition
          act={self.state.action}
          duration={166}
          enter={`actionSheet-${options.type}enter`}
          leave={`actionSheet-${options.type}leave`}
        >
          <div
            style={arrayUtils.merge([styles.continer,
              options.containerStyle])}
          >
            <div style={arrayUtils.merge([styles.content, contentMaxHeight, styles[options.type]])} className="scrollTouch">
              {option}
              {options.showCancleBtn ? (<div style={styles.cancleBtn} onClick={()=>{this.hide(); options.cancleCallback();}}>取消</div>): ''}
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
