import React from 'react';
import { PropTypes } from 'prop-types';

import style from './style';

const Loading = (props) => {
  const { text } = props;

  return (
    <div style={style}>{ text }</div>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
};

Loading.defaultProps = {
  text: '加载中',
};

export default Loading;
