import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Input } from '../';
import styles from './style';

import fetch from '../../utils/fetch';
import Toaster from '../Toaster';

const { pageStyle, leftStyle, rightStyle, pageSizeStyle } = styles;

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 20,
      pageNumber: 0,
      totalCount: 0,
      totalPage: 0,
    };

    this.changePageSize = this.changePageSize.bind(this);
    this.gotoPrePage = this.gotoPrePage.bind(this);
    this.gotoNextPage = this.gotoNextPage.bind(this);
    this.gotoPage = this.gotoPage.bind(this);
    this.search = this.search.bind(this);
  }
  // params: 即时响应输入框参数
  getData(pnum, params, pageSz) {
    const { totalPage } = this.state;
    const { success, url, beforeSearch, searchParams, method } = this.props;
    const nowPageSize = (pageSz !== '' && pageSz) ? pageSz : this.state.pageSize;
    const Method = method && method !== '' ? method : 'POST';
    if (pnum <= 0 || pnum > totalPage) {
      return;
    }
    if (!pnum) {
      pnum = 1;
    }
    const pageInfo = {
      pageNumber: pnum,
      pageSize: nowPageSize
    };
    beforeSearch();
    const paramsAll = params || searchParams;
    const dataPara = Object.assign({}, pageInfo, paramsAll);
    fetch(url, {
      method: Method,
      data: dataPara,
      headers: {
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId')
      }
    }).then((res) => {
      const msgType = (res.code === '0000') ? 'success' : 'error';
      if (res.code === '0000') {
        const { totalCount, pageCount, resultsContent } = res.data;

        this.setState({
          pageNumber: +pnum || 1,
          // totalPage: page.totalPage,
          // totalCount: page.totalCount
          totalPage: pageCount,
          totalCount
        });

        success(resultsContent, res.data);
      } else {
        Toaster.toaster({ type: msgType, content: res.message, time: 3000 });
      }
    });
  }
  // 供外部调用
  search(params) {
    this.getData(undefined, params);
  }
  changePageSize(e) {
    const n = +e.target.innerText;

    this.setState({
      pageSize: n
    });

    this.getData(this.state.pageNumber, this.props.searchParams, n);
  }
  gotoPage() {
    const n = this.$$input.getValue();

    if (!/^\d+$/.test(n)) {
      return;
    }
    this.getData(n);
  }
  gotoPrePage() {
    const { pageNumber } = this.state;
    this.getData(pageNumber - 1);
  }
  gotoNextPage() {
    const { pageNumber } = this.state;
    this.getData(pageNumber + 1);
  }

  render() {
    const { pageSize, pageNumber, totalCount, totalPage } = this.state;
    const { style } = this.props;
    const containerStyle = Object.assign({}, pageStyle, style);

    return (
      <div style={containerStyle}>
        <div style={leftStyle}>
          每页展示：

          <a
            role="button"
            onClick={this.changePageSize}
            style={pageSizeStyle[pageSize === 20 ? 'current' : 'common']}
          >
            20
          </a>
          /
          <a
            role="button"
            onClick={this.changePageSize}
            style={pageSizeStyle[pageSize === 50 ? 'current' : 'common']}
          >
            50
          </a>
          /
          <a
            role="button"
            onClick={this.changePageSize}
            style={pageSizeStyle[pageSize === 100 ? 'current' : 'common']}
          >
            100
          </a>
          条
        </div>
        <div style={rightStyle}>
          总计：{totalCount} 条
          <Button
            style={{
              margin: '0 5px 0 20px'
            }}
            text={'上一页'}
            type={['small']}
            onClick={this.gotoPrePage}
          />
          {pageNumber}/{totalPage}
          <Button
            style={{
              margin: '0 5px 0 5px'
            }}
            text={'下一页'}
            type={['small']}
            onClick={this.gotoNextPage}
          />
          <Input
            style={{
              width: '60px',
              margin: '0 5px 0 0',
              position: 'relative',
              top: '1px'
            }}
            value={pageNumber.toString()}
            type="number"
            max={totalPage}
            min={0}
            valid="number"
            maxLengthShow={false}
            ref={(dom) => { this.$$input = dom; }}
          />
          <Button
            text="跳转"
            type={['small']}
            onClick={this.gotoPage}
          />
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string,
  beforeSearch: PropTypes.func,
  success: PropTypes.func,
  searchParams: PropTypes.shape({}),
  style: PropTypes.shape({})
};

Pagination.defaultProps = {
  style: {},
  method: '',
  searchParams: {},
  success: () => {},
  beforeSearch: () => {}
};

export default Pagination;
