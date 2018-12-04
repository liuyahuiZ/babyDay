import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import styles from './style';
import '../Style/Animate.scss';
import './tab.scss';
import Icon from '../Icon';

class MenuTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      tabContentStyle: '',
      active: this.props.active,
      typeOption: this.props.typeOption
    };
    this.changeActive = this.changeActive.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options,
      active: nextProps.active,
    });
  }
  componentDidMount() {
    const self = this;
    self.setState({ options: this.props.options });
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
    const { typeOption, options, active } = this.state;
    let containerHead = arrayUtils.merge([styles.containerHead, typeOption.headStyle ]);
    let tabContentStyle = styles.tabContent;
    let tabItem = styles.tabItem;
    let activeStyle = styles.tabActive;
    let tabSpan = styles.tabSpan
    
    const tabHeader = options.map((itm) => {
      let tabStyle = '';
      let colors = typeOption.defaultColor
      if (itm.keyword === active) {
        tabStyle = activeStyle;
        colors = typeOption.activeColor
      }
      const span = typeOption.showIcon ? (<div style={arrayUtils.merge([tabItem, tabStyle, itm.headStyle])} key={itm.keyword}
      data-content={itm.keyword} className={'tab-item'} onClick={()=>{
        this.changeActive(itm.keyword)
      }}>
        <div className="tab-icon"><Icon iconName={itm.iconName} size={'150%'} iconColor={colors} /> </div>
        <div className="tab-title" style={{'color': colors}}>{itm.tabName}</div>
      </div>) :(<div
        style={arrayUtils.merge([tabItem, tabStyle, itm.headStyle])} key={`${itm.keyword}-noicon`}
        data-content={itm.keyword} className={'tab-item'} onClick={()=>{
          this.changeActive(itm.keyword)
        }}
      >
        <div style={arrayUtils.merge([tabSpan, {'color': colors}])} className={'tab-span flex-1'} >{itm.tabName}</div>
      </div>);
      return span;
    });
    const tabContent = options.map((itm) => {
      let tabStyle = styles.hide;
      if (itm.keyword === active) {
        tabStyle = styles.show;
      }
      const span = (<div style={tabStyle} key={`${itm.keyword}-cont`}>{itm.content}</div>);
      return span;
    });
    return (
      <div style={styles.container} className={'menu-tab'}>
        <div className="trans contain" style={tabContentStyle}>
          {tabContent}
        </div>
        <div style={containerHead} className={'row tab-header'} ref={(r) => { this.$$tabHeader = r; }}>
          {tabHeader}
        </div>
      </div>
    );
  }
}

MenuTab.propTypes = {
  options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({})), PropTypes.number]),
  modal: PropTypes.string,
  onChange: PropTypes.func,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  typeOption: PropTypes.shape({})
};

MenuTab.defaultProps = {
  options: [],
  modal: '',
  onChange: () => {},
  active: 0,
  typeOption: {
    showIcon: false,
    activeColor: '#999',
    defaultColor: 'rgb(70, 152, 249)',
    headStyle: {}
  }
};


export default MenuTab;
