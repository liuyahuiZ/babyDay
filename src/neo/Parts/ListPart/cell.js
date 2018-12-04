import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import authFunc from '../../utils/auth';
import genInput from '../factory';
import Transition from '../../Components/Transition';
import * as arrayUtils from '../../utils/array';
import Contener from './Contener';
import ContenerRow from './ContenerRow';
import ContenerRowColumn from './ContenerRowColumn';
import ContenerHeaderRow from './ContenerHeaderRow';


import {
  Button,
  Buttons,
  Icon,
  Label
} from '../../Components';

import filter from '../../utils/filter';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemLength: this.props.items.length,
      hideArr: [],
      action: false,
      items: this.props.items
    };
    this.genInput = genInput.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items
    });
  }
  setHideArr(item) {
    const hide = this.state.hideArr;
    if (Object.keys(hide).indexOf(item.key) < 0) {
      hide[item.key] = item;
    }
    this.setState({
      hideArr: hide
    });
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
  getItem(rowIdx, itemFormat, item) {
    const hide = this.state.hideArr;
    return itemFormat.map((config, colIdx) => {
      const { format, key, after } = config;
      const value = format ? filter(format, item[key]) : item[key];
      const tAfter = (value || after) ? (after) : '';
      config.value = value;
      if (config.type === 'selects') {
        if (item[key].options) {
          config.value = item[key].value;
          config.options = item[key].options;
        }
      }
      if (config.type === 'Text' && item[key]) {
        if (item[key].format) {
          config.value = item[key].format[item[key].value];
        }
      }
      // 对value是DISPLAYNONE 做特殊处理
      let getInput = this.genInput(config, rowIdx);
      if (config.rule) {
        const result = config.rule.rulefunc(config.value);
        getInput = result ? config.rule.errorText : getInput;
      }
      if (Object.keys(hide).indexOf(config.key) >= 0) {
        return null;
      }
      if (config.items) {
        return config.items.map((ite, itemIdx) => {
          let val = '';
          if (item[key] && item[key][ite.key]) {
            val = format ? filter(format, item[key][ite.key]) : item[key][ite.key];
          }
          ite.value = val;
          ite.parentKey = config.key;
          let itegetInput = this.genInput(ite, rowIdx);
          if (ite.rule) {
            const iteResult = ite.rule.rulefunc(ite.value);
            itegetInput = iteResult ? ite.rule.errorText : itegetInput;
          }
          const itemKey = `${key}-item`;
          return (
            <ContenerRowColumn
              key={itemKey}
              columnNumber={`${colIdx}-${itemIdx}`}
              title={value}
              style={ite.titleStyle}
            >{itegetInput}{tAfter}</ContenerRowColumn>
          );
        });
      }
      return (
        <ContenerRowColumn
          key={key}
          columnNumber={colIdx}
          title={value}
          style={config.titleStyle}
        >{getInput}{tAfter}</ContenerRowColumn>
      );
    });
  }
  genHeader() {
    const { itemFormat, operations, showIndex, sort, showSort } = this.props;
    const hide = this.state.hideArr;
    const opLength =
      operations.filter(item => !item.auth || authFunc(item.auth)).length;

    const opWidth = opLength * styles.opBtnLength;
    const self = this;
    return (
      <ContenerHeaderRow>
        { showIndex ?
          <ContenerRowColumn title={'sort'}>
            序号
          </ContenerRowColumn>
          :
          ''
        }
        {
          itemFormat.map((item, idx) => {
            if (Object.keys(hide).indexOf(item.key) >= 0) {
              return null;
            }
            const key = `${item.title}-${idx}`;
            const deleteIcon = item.canDelete ?
              <Icon iconName={'android-remove-circle'} size={'120%'} />
            : '';
            return (
              <ContenerRowColumn
                key={key}
                columnNumber={idx}
                title={item.title}
                style={item.titleStyle}
                onClick={() => {
                  if (item.canDelete) {
                    self.setHideArr(item);
                  }
                }}
              >{item.title} {deleteIcon}</ContenerRowColumn>
            );
          })
        }
        {
          opLength ?
            <ContenerRowColumn style={{ width: opWidth }} columnNumber={opLength}>
              操作
            </ContenerRowColumn>
          :
            ''
        }
        {
          showSort && sort.length > 0 ?
            <ContenerRowColumn style={{ width: 2 * styles.opBtnLength }}>
              排序
            </ContenerRowColumn>
          :
            ''
        }
      </ContenerHeaderRow>
    );
  }
  genInfo() {
    const { itemFormat, operations, showIndex, sort, showSort, showInfo } = this.props;
    const hide = this.state.hideArr;
    const opLength =
      operations.filter(item => !item.auth || authFunc(item.auth)).length;

    const opWidth = opLength * styles.opBtnLength;
    if (showInfo === false) {
      return null;
    }
    return (
      <ContenerHeaderRow>
        { showIndex ?
          <ContenerRowColumn title={'sort'} style={arrayUtils.merge([styles.infoHeader])}>
            index
          </ContenerRowColumn>
          :
          ''
        }
        {
          itemFormat.map((item, idx) => {
            if (Object.keys(hide).indexOf(item.key) >= 0) {
              return null;
            }
            const key = `${item.info}-${idx}`;
            if (item.items) {
              return item.items.map((ite, itemIdx) => {
                const itemkey = `${idx}-${itemIdx}`;
                return (
                  <ContenerRowColumn
                    key={itemkey}
                    columnNumber={itemkey}
                    title={ite.title}
                    style={arrayUtils.merge([ite.titleStyle, styles.infoHeader])}
                  >{ite.info}</ContenerRowColumn>
                );
              });
            }
            return (
              <ContenerRowColumn
                key={key}
                columnNumber={idx}
                title={item.title}
                style={arrayUtils.merge([item.titleStyle, styles.infoHeader])}
              >{item.info}</ContenerRowColumn>
            );
          })
        }
        {
          opLength ?
            <ContenerRowColumn
              title={'(插入/删除)'}
              style={arrayUtils.merge([styles.infoHeader, { width: opWidth }])}
              columnNumber={opLength}
            >
              (插入/删除)
            </ContenerRowColumn>
          :
            ''
        }
        {
          showSort && sort.length > 0 ?
            <ContenerRowColumn
              title={'(向上/向下)'}
              style={arrayUtils.merge([styles.infoHeader, { width: 2 * styles.opBtnLength }])}
            >
              (向上/向下)
            </ContenerRowColumn>
          :
            ''
        }
      </ContenerHeaderRow>
    );
  }
  genOperations(rowIdx, item) {
    const { operations, operationsRule } = this.props;
    const { items } = this.state;
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
      <ContenerRowColumn
        title={'(向上/向下)'}
        columnNumber={1}
      >
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
      </ContenerRowColumn>
    );
  }
  genWeight(rowIdx, item, length) {
    const { sort, showSort } = this.props;
    const { items } = this.state;
    // 操作对象不存在，return null
    if (showSort === false || sort.length === 0) {
      return null;
    }
    return (
      <ContenerRowColumn
        title={'排序'}
        style={{ width: 2 * styles.opBtnLength }}
        columnNumber={1}
      >
        {
          sort.map((op) => {
            const modal = op.modal ? op.modal : 'primary';

            const func = () => {
              op.func(rowIdx, items[rowIdx]);
            };
            if (rowIdx === 0 && op.action === 'up') {
              return null;
            } else if (rowIdx === (length - 1) && op.action === 'down') {
              return null;
            }
            return (
              <Buttons
                key={`${rowIdx}-${op.action}`}
                text={<Icon iconName={`arrow-${op.action}-c`} size={'120%'} style={{ color: '#fff' }} />}
                onClick={func}
                style={styles.opBtn}
                type={modal}
                size={'small'}
              />
            );
          })
        }
      </ContenerRowColumn>
    );
  }
  genRows() {
    const { itemFormat, showIndex } = this.props;
    const { items } = this.state;
    const rows = items.map((item, rowIdx) => {
      const rowKey = `rowKey${rowIdx}`;
      return (
        <Transition
          act={'enter'}
          duration={166}
          enter={'listTem-enter'}
          leave={'listTem-leave'}
          key={rowKey}
        >
          <ContenerRow
            key={rowKey}
            rowNumber={rowIdx}
          >
            {showIndex ?
              <ContenerRowColumn
                title={'index'}
              >{rowIdx + 1}</ContenerRowColumn>
            :
             ''
            }
            {
              this.getItem(rowIdx, itemFormat, item)
            }
            {
              this.genOperations(rowIdx, item)
            }
            { this.genWeight(rowIdx, item, items.length) }
          </ContenerRow>
        </Transition>
      );
    });
    return rows;
  }
  delHideArr(item) {
    const hide = this.state.hideArr;
    delete hide[item.key];
    // if (Object.keys(hide).indexOf(item.key) < 0) {
    //   hide[item.key] = item;
    // }
    this.setState({
      hideArr: hide
    });
  }
  render() {
    const { hideArr } = this.state;
    const self = this;
    const hideArrs = Object.values(hideArr).map((item) => {
      const key = `${item.title}-label`;
      return (<Label
        key={key} text={item.title} colors={'#fff'}
        iconName={'android-cancel'} size={'80%'} onClick={() => { self.delHideArr(item); }}
      />);
    });
    return (
      <div style={styles.partContner} className="transi">
        {hideArrs}
        <Contener
          hoverable center
          ref={(r) => { this.$$mainContener = r; }}
          style={styles.ContenerStyle}
        >
          {this.genHeader()}
          {this.genInfo()}
          {this.genRows()}
        </Contener>
      </div>
    );
  }
}

Cell.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  itemFormat: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  operations: PropTypes.arrayOf(PropTypes.shape()),
  operationsRule: PropTypes.shape(),
  showIndex: PropTypes.bool,
  sort: PropTypes.arrayOf(PropTypes.shape()),
  showSort: PropTypes.bool,
  showInfo: PropTypes.bool
  // style: PropTypes.shape({})
};

Cell.defaultProps = {
  options: [],
  callbackRM: {},
  operations: [],
  operationsRule: {},
  items: [],
  showIndex: false,
  showSort: false,
  showInfo: false,
  sort: []
};

export default Cell;
