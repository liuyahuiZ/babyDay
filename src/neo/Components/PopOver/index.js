import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Transition from '../Transition';
import styles from './style';

class PopOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      focus: false,
    };
  }
  componentDidMount() {
    const self = this;
    document.addEventListener('click', (e) => {
      const child = self.$$popover.children;
      const contentchild = self.$$popcontent.children;
      let status = true;
      let num = '';
      for (let i = 0; i < child.length; i++) {
        if (e.target === child[i]) {
          status = false;
          num = i;
        }
      }
      let contentstatus = true;
      for (let i = 0; i < contentchild.length; i++) {
        if (e.target === contentchild[i]) {
          contentstatus = false;
        }
      }
      if (e.target !== self.$$popover &&
        e.target !== self.$$popcontent && status && contentstatus) {
        this.setState({ focus: false });
      } else if (e.target === self.$$popover) {
        self.focus();
      } else if (status === false) {
        if (num === 1) {
          this.setState({ focus: true });
        } else {
          self.focus();
        }
      } else if (e.target === self.$$popcontent || contentstatus === false) {
        this.setState({ focus: true });
      } else {
        this.setState({ focus: true });
      }
    }, false);
  }
  focus() {
    let status = this.state.focus;
    if (status) {
      status = false;
    } else {
      status = true;
    }
    this.setState({ focus: status });
  }

  render() {
    const { popContent, placement } = this.props;
    const Children = this.props.children;
    const popoverStyle = this.state.focus ? styles.show : styles.hide;

    const placementStyle = styles[`loacl${placement}`];
    return (
      <div
        style={arrayUtils.merge([styles.container])}
        ref={(r) => { this.$$popover = r; }}
        className="trans"
      >
        {Children}
        <Transition
          act={this.state.focus ? 'enter' : ''}
          duration={166}
          enter={'pop-enter'}
          leave={'pop-leave'}
        ><div
          style={arrayUtils.merge([styles.popoverContent, popoverStyle, placementStyle])}
          ref={(r) => { this.$$popcontent = r; }}
        >{popContent}</div></Transition>
      </div>
    );
  }
}

PopOver.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})), PropTypes.func]),
  popContent: PropTypes.oneOfType([PropTypes.shape({}),
    PropTypes.string]),
  placement: PropTypes.string,
};

PopOver.defaultProps = {
  children: [],
  popContent: '',
  radius: 0,
  placement: ''
};


export default PopOver;
