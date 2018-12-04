import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as arrayUtils from '../../utils/array';
import Icon from '../Icon';
import styles from './style';
import '../Style/comstyle.scss';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'hide',
      checked: false,
      iconName: 'android-arrow-dropdown'
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    this.doToggle();
  }
  setShow() {
    this.setState({ display: 'show' });
    this.setState({ iconName: 'android-arrow-dropdown' });
  }
  setHide() {
    this.setState({ display: 'hide' });
    this.setState({ iconName: 'android-arrow-dropright' });
  }
  doToggle() {
    if (this.props.display === 'show') {
      this.setShow();
    } else {
      this.setHide();
    }
  }
  toggle() {
    if (this.state.display === 'show') {
      this.setHide();
    } else {
      this.setShow();
    }
  }
  checkd() {
    this.props.onCheck(this.props);
  }
  delAmb() {
    this.props.onDelAmb(this.props);
  }
  render() {
    const Children = this.props.children;
    let item = '';
    let span = '';
    const self = this;
    const display = styles[this.state.display];
    let checked = '';
    let checkbox = '';
    if (this.props.checkStatus === 'checked') {
      checked = styles.checked;
    }
    checkbox = (<span style={arrayUtils.merge([styles.checkbox, checked])} onClick={() => { self.checkd(); }}><Icon iconName={'checkmark'} size={'90%'} iconColor={''} iconPadding={'0'} /></span>);
    if (this.props.checkStatus === 'ambivalent') {
      checked = styles.checked;
      checkbox = (<span style={arrayUtils.merge([styles.checkbox, checked])} onClick={() => { self.delAmb(); }}><Icon iconName={'minus-round'} size={'90%'} iconColor={''} iconPadding={'0'} /></span>);
    }
    if (!this.props.checkable) {
      checkbox = '';
    }
    const actived = this.props.active ? styles.active : '';

    if (Children) {
      if (Children.length === 0) {
        item = (<div style={arrayUtils.merge([styles.painner])}>
          <span onClick={() => { self.toggle(); }} style={styles.switch} />
          {checkbox}
          <span className="text" style={arrayUtils.merge([styles.text, actived])}>{this.props.title}</span></div>);
      } else {
        span = (<div style={arrayUtils.merge([styles.painner])}>
          <span onClick={() => { self.toggle(); }} style={styles.switch}><Icon iconName={self.state.iconName} size={'110%'} /></span>
          {checkbox}
          <span className="text" style={arrayUtils.merge([styles.text, actived])}>{this.props.title}</span></div>);
        item = (<ul style={arrayUtils.merge([styles.ul, styles.childPadding, display])}>
          {Children}</ul>);
      }
    }
    if (this.props.link) {
      item = (<Link to={this.props.link}>{item}</Link>);
    }

    return (
      <li className="trans" style={arrayUtils.merge([styles.li])}>
        {span}{item}
      </li>
    );
  }
}

TreeNode.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({}))]),
  title: PropTypes.string,
  checkStatus: PropTypes.string,
  onCheck: PropTypes.func,
  onDelAmb: PropTypes.func,
  checkable: PropTypes.bool,
  display: PropTypes.string,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  link: PropTypes.string,
};

TreeNode.defaultProps = {
  children: [],
  title: '',
  checkStatus: 'unchecked',
  checkable: false,
  active: false,
  prekey: '',
  display: 'hide',
  link: '',
  onCheck: () => {},
  onDelAmb: () => {},
};


export default TreeNode;
