import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import '../../Style/search.scss';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import Input from '../Input';
import Buttons from '../Button/button';
import Icon from '../Icon';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    this.doSearch = this.doSearch.bind(this);
    this.doBack = this.doBack.bind(this);
  }
  doSearch() {
    const inputValue = this.$$input.getValue()
    console.log(inputValue);
    this.props.searchClick(inputValue);
  }
  doBack() {
    this.props.back();
  }
  render() {
    const { backIconOption, inputOption, buttonOption, style} = this.props;

    return (
      <div  className="nemo-search-container" style={style}>
        <Row>
            <Col span={6} className={"font-end"} onClick={this.doBack}>
            <Icon iconName={'ios-arrow-back'} size={'150%'} iconColor={'#000'} />
            <span className={"left-text"}>{backIconOption.text}</span>
            </Col>
            <Col span={15}>
                <Input {...inputOption} ref={(r) => {
                    this.$$input = r;
                }}/>
            </Col>
            <Col span={3}>
                <Buttons onClick={this.doSearch} {...buttonOption} />
            </Col>
        </Row>
      </div>
    );
  }
}

Search.propTypes = {
  backIconOption: PropTypes.shape({}),
  inputOption: PropTypes.shape({}),
  buttonOption: PropTypes.shape({}),
  style:  PropTypes.shape({}),
};

Search.defaultProps = {
  backIconOption: {},
  inputOption: {},
  buttonOption: {},
  style: {}
};


export default Search;
