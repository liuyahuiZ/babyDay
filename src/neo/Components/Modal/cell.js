import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Buttons from '../Button/button';
import Icon from '../Icon';
import styles from './style';
import Transition from '../Transition';
import * as arrayUtils from '../../utils/array';
import '../Style/Animate.scss';


class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'enter'
    };
    this.hide = this.hide.bind(this);
  }
  hide(index) {
    this.setState({
      action: 'leave'
    });
    setTimeout(() => {
      this.props.callbackRM(index);
    }, 600);
  }
  render() {
    const self = this;
    const options = this.props.options;
    const leftCon = Object.assign({}, styles.leftCon);
    const rightX = Object.assign({}, styles.rightX);

    const contentMaxHeight = options.maxHeight ? { maxHeight: options.maxHeight } : '';
    const buttons = options.buttons.map((im) => {
      const rbutton = (<Buttons
        text={im.title}
        type={im.type}
        onClick={() => { im.callbk(options.id, self.hide); }}
        style={arrayUtils.merge([styles.buttonStyle, im.style])}
        plain={im.plain}
        key={im.title}
      />);
      return rbutton;
    });
    const btnConStyle = options.btnConStyle ? `textAlign${options.btnConStyle}` : '';
    const titleItem = options.title && options.title!== '' ? (<div style={arrayUtils.merge([styles.title, styles[options.style]])} >
    <div style={leftCon}>{options.title}</div>
  </div>): '';
    return (
      <div style={arrayUtils.merge([styles.box])} >
        <Transition
          act={self.state.action}
          duration={166}
          enter={'modals-enter'}
          leave={'modals-leave'}
        >
          <div
            style={arrayUtils.merge([styles.continer, styles[options.type],
              options.containerStyle])}
          >
            {titleItem}
            <div style={arrayUtils.merge([styles.content, contentMaxHeight])}>
              {options.content}</div>
            <div style={arrayUtils.merge([styles.foot, styles[btnConStyle]])}>
              {buttons}
            </div>
          </div>
        </Transition>
      </div>
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
