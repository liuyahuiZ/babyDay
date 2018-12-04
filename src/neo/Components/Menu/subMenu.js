import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as arrayUtils from '../../utils/array';
import Transition from '../Transition';
import Icon from '../Icon';
import styles from './style';
import theme from './theme';
import '../Style/comstyle.scss';

class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'hide',
      checked: false,
      iconName: 'ios-arrow-down',
      hovered: false,
      Timer: '',
      collapseds: this.props.collapseds,
      enterAction: 'menu-enter',
      leaveAction: 'menu-leave'
    };
    this.toggle = this.toggle.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.MouseEnter = this.MouseEnter.bind(this);
    this.MouseLeave = this.MouseLeave.bind(this);
  }
  componentDidMount() {
    this.doToggle();
    this.setModal();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      collapseds: nextProps.collapseds,
      enterAction: nextProps.collapseds ? 'menucolspan-enter' : 'menu-enter',
      leaveAction: nextProps.collapseds ? 'menucolspan-leave' : 'menu-leave',
    });
    if (this.state.display === 'hide') {
      this.setState({
        iconName: 'ios-arrow-down'
      });
    }
    if (nextProps.collapseds) {
      this.setState({
        iconName: 'ios-arrow-right',
      });
    }
  }

  setModal() {
    if (this.props.collapseds) {
      this.setState({
        iconName: 'ios-arrow-right',
        enterAction: 'menucolspan-enter',
        leaveAction: 'menucolspan-leave'
      });
    }
  }

  setShow() {
    this.setState({ display: 'show' });
    this.setState({ iconName: 'ios-arrow-up' });
  }
  setHide() {
    this.setState({ display: 'hide' });
    this.setState({ iconName: 'ios-arrow-down' });
  }
  // 正常模式下
  toggle() {
    if (this.props.collapseds) { return; }
    if (this.state.display === 'show') {
      this.setHide();
    } else {
      this.setShow();
    }
  }
  doToggle() {
    if (this.props.collapseds) { return; }
    if (this.props.display === 'show') {
      this.setShow();
    } else {
      this.setHide();
    }
  }

  handleMouseEnter() {
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.setState({ hovered: false });
  }
  // 缩放模式下
  MouseLeave() {
    let timer = '';
    if (this.state.collapseds) {
      timer = setTimeout(() => {
        this.setState({ display: 'hide' });
      }, 300);
    }
    this.setState({ Timer: timer });
  }
  MouseEnter() {
    const Timer = this.state.Timer;
    clearTimeout(Timer);
    if (this.state.collapseds) {
      this.setState({ display: 'show' });
    }
  }

  render() {
    const { subUlBg, fontDefalutColor, fontActiveColor,
      iconDefalutColor, iconActiveColor, itemActiveBg,
      subUlBorder, BoxShadow } = theme[this.props.themes];
    const Children = this.props.children;
    let item = '';
    let span = '';
    let collapsedStyle = '';
    const self = this;

    const displayStyle = styles[this.state.display];
    const activedStyle = this.props.active ? { backgroundColor: itemActiveBg, color: fontActiveColor } : '';
    const hoverStyle = self.state.hovered ?
    { color: fontActiveColor } : { color: fontDefalutColor };

    const IconColor = self.props.active || self.state.hovered ? iconActiveColor : iconDefalutColor;
    let subUlbg = { backgroundColor: subUlBg };
    // preIcon
    const preIcon = (<Icon iconName={this.props.iconName} iconColor={IconColor} size={'110%'} />);
    let preIconItem = (<span style={styles.preIcon} >{preIcon}</span>);

    // 层级处理
    const level = this.props.level;
    const childPadding = level > 2 ? { paddingLeft: `${(level - 2) * 10}px` } : '';

    // 缩放模式处理
    if (self.state.collapseds) {
      collapsedStyle = styles.collapsedStyle;
      preIconItem = self.props.iconName && level <= 2 ? preIconItem : '';
      subUlbg = { backgroundColor: subUlBg, border: subUlBorder, boxShadow: BoxShadow };
    }
    let title = (<span
      style={arrayUtils.merge([styles.text, hoverStyle, activedStyle])}
      data-content={self.props.otherName}
    >
      {this.props.title}
    </span>);
    // 路由
    if (this.props.link) {
      title = (<Link to={this.props.link}>{title}</Link>);
    }
    if (Children) {
      if (Children.length === 0) {
        item = (<div
          style={arrayUtils.merge([styles.painner, activedStyle, childPadding])}
          onMouseLeave={self.handleMouseLeave}
          onMouseEnter={self.handleMouseEnter}
          data-content={self.props.title}
        >
          {preIconItem}
          {title}
          <span style={styles.switch} />
        </div>);
      } else {
        span = (<div
          style={arrayUtils.merge([styles.painner, childPadding])}
          onClick={() => { self.toggle(); }}
          onMouseLeave={self.handleMouseLeave}
          onMouseEnter={self.handleMouseEnter}
        >
          {preIconItem}
          <span
            style={arrayUtils.merge([styles.text, hoverStyle])}
            data-content={self.props.title}
          >
            {this.props.title}
          </span>
          <span style={styles.switch}>
            <Icon iconName={self.state.iconName} iconColor={IconColor} size={'110%'} />
          </span>
        </div>);

        item = (<Transition
          act={this.state.display === 'show' ? 'enter' : ''}
          duration={166}
          enter={self.state.enterAction}
          leave={self.state.leaveAction}
        >
          <ul style={arrayUtils.merge([styles.ul, subUlbg, displayStyle, collapsedStyle])}>
            {Children}
          </ul>
        </Transition>);
      }
    }

    return (
      <li
        className="trans" style={arrayUtils.merge([styles.li])}
        onMouseLeave={self.MouseLeave}
        onMouseEnter={self.MouseEnter}
      >
        {span}{item}
      </li>
    );
  }
}

SubMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.func,
    PropTypes.node, PropTypes.element]),
  title: PropTypes.string,
  display: PropTypes.string,
  active: PropTypes.bool,
  link: PropTypes.string,
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconName: PropTypes.string,
  themes: PropTypes.string,
  collapseds: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

SubMenu.defaultProps = {
  children: [],
  title: '',
  active: false,
  prekey: '',
  display: 'hide',
  level: '',
  link: '',
  iconName: '',
  themes: '',
  collapseds: false
};


export default SubMenu;
