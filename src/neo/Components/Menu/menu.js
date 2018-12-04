import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import styles from './style';
import SubMenu from './subMenu';
import themes from './theme';
import '../Style/comstyle.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkArr: [],
      parent: {},
      parents: [],
      contradiction: '',
      activeNode: this.props.activeNode
    };
    this.setActive = this.setActive.bind(this);
  }
  componentDidMount() {
    const self = this;
    self.$$menu.onclick = function (ev) {
      let itm = {};
      if (ev.target.children.length > 0) {
        itm = ev.target.firstChild.dataset;
      } else {
        itm = ev.target.dataset;
      }
      if (itm && itm.content) {
        self.setActive(itm.content);
      }
    };
  }
  setActive(iem) {
    this.setState({ activeNode: iem });
  }
  loop = data => data.map((item) => {
    const { display, theme, collapsed } = this.props;
    const { activeNode } = this.state;
    const actived = activeNode && activeNode === item.otherName;
    const levels = item.key.split('-').length;
    const iconNames = item.iconName || '';
    if (item.display === 'none') {
      return '';
    }
    if (item.children) {
      return (
        <SubMenu
          prekey={item.preKey} key={item.key} level={levels} title={item.title} link={item.link}
          display={display} active={actived} iconName={iconNames} otherName={item.otherName}
          setActiveNode={this.setActive} themes={theme} collapseds={collapsed}
        >
          {this.loop(item.children)}
        </SubMenu>
      );
    }
    return (<SubMenu
      prekey={item.preKey} key={item.key} level={levels} title={item.title} link={item.link}
      active={actived} themes={theme} collapseds={collapsed} otherName={item.otherName}
      display={display} setActiveNode={this.setActive} iconName={iconNames}
    />);
  });

  render() {
    const data = this.props.Date;
    const { ulBg, ulborder } = themes[this.props.theme];
    const ulbg = { backgroundColor: ulBg, border: ulborder };
    const modalStyle = this.props.collapsed ? { width: '50px' } : '';
    return (
      <ul
        className="trans"
        style={arrayUtils.merge([styles.rootUl, ulbg, modalStyle])}
        ref={(r) => { this.$$menu = r; }}
      >
        {this.loop(data)}
      </ul>
    );
  }
}

Menu.propTypes = {
  Date: PropTypes.arrayOf(PropTypes.shape({})),
  display: PropTypes.string,
  activeNode: PropTypes.string,
  theme: PropTypes.string,
  collapsed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

Menu.defaultProps = {
  Date: [],
  checkable: false,
  display: 'hide',
  activeNode: '',
  theme: '',
  collapsed: false
};


export default Menu;
