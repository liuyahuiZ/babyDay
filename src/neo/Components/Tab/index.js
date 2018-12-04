import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import styles from './style';
import '../Style/Animate.scss';
import './tab.scss';

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      tabContentStyle: '',
      active: this.props.active
    };
    this.changeActive = this.changeActive.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options,
      active: nextProps.active
    });
  }
  componentDidMount() {
    const self = this;
    self.setState({ options: this.props.options });
    // self.$$tabHeader.onclick = function (ev) {
    //   let itm = {};
    //   if (ev.target.children.length > 0) {
    //     itm = ev.target.firstChild.dataset;
    //   } else {
    //     itm = ev.target.dataset;
    //   }
    //   if (itm.content) {
    //     self.changeActive(itm.content);
    //   }
    // };
  }
  changeActive(itm) {
    const arr = this.state.options;
    for (let i = 0; i < arr.length; i++) {
      if (itm === arr[i].keyword) {
        arr[i].isActive = true;
        this.setState({ tabContentStyle: { marginLeft: `${0 - (100 * i)}%` } });
      } else {
        arr[i].isActive = false;
      }
    }
    this.props.onChange(itm);
    this.setState({ options: arr });
  }
  render() {
    let containerHead = styles.containerHead;
    let tabContentStyle = styles.tabContent;
    let tabItem = styles.tabItem;
    let activeStyle = styles.tabActive;
    let tabSpan = styles.tabSpan
    if (this.props.modal && this.props.modal === 'MENULEFT') {
      containerHead = arrayUtils.merge([styles.containerHead,
        styles.floatLeft, styles.leftHeadWidth]);
      tabContentStyle = arrayUtils.merge([styles.tabContent,styles.leftContentWidth]);
      tabItem = arrayUtils.merge([styles.tabItem, styles.show]);
      activeStyle = styles.leftTabActive;
      tabSpan = arrayUtils.merge([styles.tabSpan, styles.borderNone]);
    }
    const tabHeader = this.state.options.map((itm) => {
      let tabStyle = '';
      if (itm.keyword === this.state.active) {
        tabStyle = activeStyle;
      }
      const span = (<div
        style={arrayUtils.merge([tabItem, tabStyle, itm.headStyle])} key={itm.keyword}
        data-content={itm.keyword} className={'tab-item'} onClick={()=>{
          this.changeActive(itm.keyword)
        }}
      >
        <div style={tabSpan} data-content={itm.keyword} className={'tab-span flex-1'}>{itm.tabName}</div>
      </div>);
      return span;
    });
    const tabContent = this.state.options.map((itm) => {
      let tabStyle = styles.hide;
      if (itm.keyword === this.state.active) {
        tabStyle = styles.show;
      }
      const span = (<div style={tabStyle} key={itm.keyword}>{itm.content}</div>);
      return span;
    });
    return (
      <div style={styles.container} className={'neo-tab'}>
        <div style={containerHead} className={`row ${ this.props.modal === 'MENULEFT' ? 'menu-left' : ''}`} ref={(r) => { this.$$tabHeader = r; }}>
          {tabHeader}
        </div>
        <div className="trans" style={ this.state.active? tabContentStyle: {}}>
          {tabContent}
        </div>
      </div>
    );
  }
}

Tab.propTypes = {
  options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({})), PropTypes.number]),
  modal: PropTypes.string,
  onChange: PropTypes.func,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Tab.defaultProps = {
  options: [],
  modal: '',
  onChange: () => {},
  active: 0
};


export default Tab;
