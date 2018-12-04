import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Item from './item';
import '../Style/list.scss';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }

  loop = data => data.map((item) => {
    if (item.children) {
        return (this.loop(item.children));
      }
    return (<Item 
    key={item.key} 
    leftContent={{text: item.title, style: {flex: '7'}}} 
    rightContent={{text: '', style: {flex: '1'}}} 
    link={item.link} 
    showRight
    />);
  });
  render() {
    const { Date, style} = this.props;

    return (
      <div  className="neo-list" style={style}>
        {this.loop(Date)}
      </div>
    );
  }
}

List.propTypes = {
  Date: PropTypes.arrayOf(PropTypes.shape({})),
  style: PropTypes.shape({})
};

List.defaultProps = {
  Date: [],
  style: {}
};


export default List;
