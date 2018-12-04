import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from './style';

import authFunc from '../../utils/auth';

import Loading from '../../Components/Loading';

import {
  Table,
  TableRow,
  TableRowColumn,
  TableHeaderRow,
  Pagination,
  Container,
  Button
} from '../../Components';

import filter from '../../utils/filter';

export default class TablePart extends Component {
  componentDidMount() {
    if (this.page) {
      this.search = this.page.search;
    }
  }
  getRuleArray(auth, crule, key) {
    if (!key) {
      return false;
    }
    this.auth = auth;
    let arr = [];
    for (let i = 0; i <= crule.length; i++) {
      if (crule[i] && crule[i].value && key === crule[i].value) {
        // console.log(crule[i].rule);
        arr = crule[i].rule;
        break;
      }
    }
    if (arr.indexOf(auth) < 0) {
      return false; // 该操作不在权限内
    }
    return true; // 该操作在权限内
  }

  getRuleResult(auth, crule, keys, item) {
    if (!keys) {
      return false;
    }
    this.auth = auth;
    let arr = [];
    // console.log(auth, crule, keys);
    for (let j = 0; j < crule.length; j++) {
      if (crule[j] && crule[j].value) {
        const signArr = [];
        for (let i = 0; i < keys.length; i++) {
          signArr[i] = { isAuth: item[keys[i]] === crule[j].value[i] };
        }
        let signresult = true;
        for (let i = 0; i < signArr.length; i++) {
          if (signArr[i].isAuth === false) {
            signresult = false;
          }
        }
        if (signresult) {
          arr = crule[j].rule;
          break;
        }
      } else if (crule[j].rule.length === 0) {
        arr = [];
      }
    }
    if (arr.indexOf(auth) < 0) {
      return false; // 该操作不在权限内
    }
    return true; // 该操作在权限内
  }

  getFixHeader() {
    const { operations } = this.props;
    const opLength =
      operations.filter(item => !item.auth || authFunc(item.auth)).length;

    const opWidth = opLength * styles.opBtnLength;
    return (
      <TableHeaderRow>
        {
          opLength ?
            <TableRowColumn style={{ width: opWidth, padding: '10px 0px' }} columnNumber={opLength}>
              操作
            </TableRowColumn>
          :
            ''
        }
      </TableHeaderRow>
    );
  }
  genHeader() {
    const { itemFormat, operations, showIndex } = this.props;
    const opLength =
      operations.filter(item => !item.auth || authFunc(item.auth)).length;

    const opWidth = opLength * styles.opBtnLength;
    return (
      <TableHeaderRow>
        { showIndex ?
          <TableRowColumn >
            序号
          </TableRowColumn>
          :
          ''
        }
        {
          itemFormat.map((item, idx) => {
            const key = `${item.title}-${idx}`;
            return (
              <TableRowColumn
                key={key}
                columnNumber={idx}
                title={item.title}
              >{item.title}</TableRowColumn>
            );
          })
        }
        {
          opLength ?
            <TableRowColumn style={{ width: opWidth }} columnNumber={opLength}>
              操作
            </TableRowColumn>
          :
            ''
        }
      </TableHeaderRow>
    );
  }
  genOperations(rowIdx, item) {
    const { operations, items, operationsRule } = this.props;
    const relyKey = item[operationsRule.relyKey];
    const crule = operationsRule.crule;

    // console.log(operationsRule.crule, item[operationsRule.relyKey]);
    const map = {
      add: '新增',
      delete: '删除',
      dateil: '查看',
      update: '编辑',
    };
    // 操作对象不存在，return null
    if (operations.length === 0) {
      return null;
    }
    return (
      <TableRowColumn columnNumber={1}>
        {
          operations.map((op) => {
            if (op.auth && !authFunc(op.auth)) {
              return null;
            }
            // console.log(this.getRuleArray(op.auth, crule, relyKey))
            if (typeof operationsRule.relyKey === 'object' && operationsRule.relyKey.length > 0) {
              if (crule && !this.getRuleResult(op.auth, crule, operationsRule.relyKey, item)) {
                return null;
              }
            } else if (crule && !this.getRuleArray(op.auth, crule, relyKey)) {
              return null;
            }

            const modal = op.modal ? op.modal : 'primary';
            if (op.type) {
              const func = () => {
                if (op.url) {
                  console.log(`跳转${op.url}`);
                } else {
                  op.func(rowIdx, items[rowIdx], this.search);
                }
              };
              return (
                <Button
                  key={`${rowIdx}-${op.type}`}
                  style={styles.opBtn}
                  text={map[op.type]}
                  onClick={func}
                  idx={rowIdx}
                  type={[modal, 'small']}
                />
              );
            }


            const func = () => {
              op.func(rowIdx, items[rowIdx], this.search);
            };

            return (
              <Button
                key={`${rowIdx}-${op.text}`}
                text={op.text}
                onClick={func}
                style={styles.opBtn}
                type={[modal, 'small']}
              />
            );
          })
        }
      </TableRowColumn>
    );
  }
  genRows() {
    const { items, itemFormat, showIndex } = this.props;
    return items.map((item, rowIdx) => {
      const rowKey = `rowKey${rowIdx}`;
      return (
        <TableRow
          key={rowKey}
          rowNumber={rowIdx}
        >
          {showIndex ?
            <TableRowColumn>{rowIdx + 1}</TableRowColumn>
          :
           ''
          }
          {
            itemFormat.map((config, colIdx) => {
              const { format, key, after } = config;
              let value = format ? filter(format, item[key]) : item[key];
              value = (value === '' || value === undefined || value === null) ? '——' : value;
              const tAfter = (value || after) ? (after) : '';
              return (
                <TableRowColumn
                  key={key}
                  columnNumber={colIdx}
                  title={value}
                  style={config.style}
                >{value}{tAfter}</TableRowColumn>
              );
            })
          }
          {
            this.genOperations(rowIdx, item)
          }
        </TableRow>
      );
    });
  }
  genFixRows() {
    const { items } = this.props;
    return items.map((item, rowIdx) => {
      const rowKey = `rowKey${rowIdx}`;
      return (
        <TableRow
          key={rowKey}
          rowNumber={rowIdx}
        >
          {
            this.genOperations(rowIdx, item)
          }
        </TableRow>
      );
    });
  }
  render() {
    const {
      isLoading,
      title,
      showTitle,
      minWidth,
      maxHeight,
      beforeSearch,
      success,
      searchParams,
      url,
      method,
      items,
      showPage,
      operationsFix,
      tableStyle
    } = this.props;

    const paginationStyle = Object.assign({}, styles.pagination);
    const outerWrapperStyle = Object.assign({}, styles.contener);
    const innerWrapperStyle = {};
    if (minWidth) {
      tableStyle.minWidth = minWidth;
    }
    if (maxHeight) {
      innerWrapperStyle.maxHeight = maxHeight;
      outerWrapperStyle.maxHeight = maxHeight;
      // innerWrapperStyle.overflowX = 'visible';
    }

    if (!items || !items.length || items.length === 0) {
      paginationStyle.display = 'none';
    }
    const fixTable = operationsFix ? (<Table hoverable center >
      {this.getFixHeader()}
      {this.genFixRows()}
    </Table>) : '';
    return (
      <div>
        {
          <Container
            title={title}
            showTitle={showTitle}
          >
            {
              isLoading ?
                <Loading />
              :
                <div style={outerWrapperStyle}>
                  <div style={styles.tableContainer}>
                    <Table
                      hoverable center style={tableStyle}
                      ref={(r) => { this.$$mainTable = r; }}
                    >
                      {this.genHeader()}
                      {this.genRows()}
                    </Table>
                  </div>
                  <div style={styles.fixdRight}>
                    {fixTable}
                  </div>
                </div>
            }
            {
              !items.length && !isLoading ?
                <div style={styles.empty}>列表为空</div>
              :
                null
            }
            {
              showPage ?
                <Pagination
                  url={url}
                  method={method}
                  beforeSearch={beforeSearch}
                  success={success}
                  searchParams={searchParams}
                  style={paginationStyle}
                  ref={(item) => {
                    this.page = item;
                  }}
                />
              : ''
            }
          </Container>
        }

      </div>
    );
  }
}

TablePart.propTypes = {
  title: PropTypes.string,
  showTitle: PropTypes.bool,
  url: PropTypes.string.isRequired,
  method: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  itemFormat: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  operations: PropTypes.arrayOf(PropTypes.shape()),
  operationsRule: PropTypes.shape(),
  tableStyle: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  beforeSearch: PropTypes.func,
  success: PropTypes.func,
  searchParams: PropTypes.shape(),
  showPage: PropTypes.bool,
  operationsFix: PropTypes.bool,
  showIndex: PropTypes.bool
};

TablePart.defaultProps = {
  title: '查询结果',
  showTitle: true,
  url: '',
  method: '',
  isLoading: false,
  operations: [],
  operationsRule: {},
  tableStyle: {},
  minWidth: null,
  maxHeight: null,
  success: () => {},
  beforeSearch: () => {},
  searchParams: {},
  showPage: true,
  items: [],
  operationsFix: false,
  showIndex: false
};
