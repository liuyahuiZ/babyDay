import React, { cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { addClass, removeClass, removeAllClass } from '../utils/dom';

export default class Transition extends React.Component {
  componentDidMount() {
    this.element = findDOMNode(this);
    this.element.display = 'none';
    this.action(this.props.act);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.act !== this.props.act) {
      this.action(nextProps.act);
    }
  }

  action(act) {
    switch (act) {
      case 'enter':
        this.enter();
        break;
      case 'leave':
        this.leave();
        break;
      default :
        this.enter();
    }
  }

  enter() {
    if (this.leaving) {
      clearTimeout(this.leaving);
    }
    const { enter, leave } = this.props;
    const el = this.element;
    addClass(el, leave);
    setTimeout(() => {
      addClass(el, enter);
      removeClass(el, leave);
      setTimeout(() => { removeClass(el, enter); }, 1000);
    }, 300);
  }

  leave() {
    const { leave, enter } = this.props;
    const el = this.element;
    addClass(el, enter);
    setTimeout(() => {
      removeClass(el, enter);
      addClass(el, leave);
    }, 300);
  }

  render() {
    const { children, duration } = this.props;
    // const styles = {
    //   transitionDuration: `${duration}ms`,
    // };
    this.duration = duration;
    return cloneElement(children, {});
  }
}

Transition.propTypes = {
  // act: PropTypes.oneOf(['enter', 'leave']),
  act: PropTypes.string,
  children: PropTypes.element,
  duration: PropTypes.number,
  enter: PropTypes.string,
  leave: PropTypes.string,
};

Transition.defaultProps = {
  duration: 400,
  tf: '',
  act: '',
  children: '',
  enter: '',
  leave: ''
};
