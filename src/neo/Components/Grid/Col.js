import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/comstyle.scss';
import * as arrayUtils from '../../utils/array';

class Col extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      defaultAllWidth: 24
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
  }
  handleClick(event) {
    this.props.onClick(event);
  }
  render() {
    const { flex, style, span, colgutter, className } = this.props;
    const flexLength = flex ? `flex-${flex}` : '';
    const widthStyle = { width: `${(span / this.state.defaultAllWidth) * 100}%` };
    const gutterStyle = colgutter ? { padding: `0 ${colgutter / 2}px` } : '';
    const ClassName = `col ${flexLength} ${className}`;
    return (
      <div className={ClassName} style={arrayUtils.merge([widthStyle, gutterStyle, style])} onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}

Col.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.func,
    PropTypes.node, PropTypes.element]),
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.shape({}),
  span: PropTypes.number,
  colgutter: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Col.defaultProps = {
  children: [],
  flex: '',
  style: {},
  span: 24,
  colgutter: 0,
  className: '',
  onClick: () => {},
};


export default Col;
