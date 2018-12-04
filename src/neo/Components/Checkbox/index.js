import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommonCheckbox from './box';
import styles from './style';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkArr: {},
      options: this.props.options
    };
    this.getValue = this.getValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkAll = this.checkAll.bind(this);
  }
  componentDidMount() {
    this.initState(this.props.options);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options
    });
  }
  getValue() {
    return this.state.checkArr;
  }
  initState(options) {
    const arr = this.state.checkArr;
    for (let i = 0; i < options.length; i++) {
      if (options[i].disabled !== true) {
        if (options[i].checkStatus === 'checked') {
          arr[options[i].value] = { value: options[i].value, text: options[i].text, checkStatus: 'checked' };
        } else {
          arr[options[i].value] = { value: options[i].value, text: options[i].text, checkStatus: 'unchecked' };
        }
      }
    }
    this.setState({ checkArr: arr });
  }
  handleChange(item) {
    if (item.disabled) {
      return;
    }
    const arr = this.state.checkArr;
    if (item.checkStatus === 'unchecked') {
      arr[item.value] = { value: item.value, text: item.text, checkStatus: 'checked' };
    } else {
      arr[item.value] = { value: item.value, text: item.text, checkStatus: 'unchecked' };
    }
    this.setState({ checkArr: arr });
    this.props.onChange(arr);
  }
  checkAll(status) {
    const arr = this.state.checkArr;
    const keys = Object.keys(arr);
    for (let i = 0; i < keys.length; i++) {
      if (arr[keys[i]].disabled) {
        return;
      }
      if (status) {
        arr[keys[i]].checkStatus = 'checked';
      } else {
        arr[keys[i]].checkStatus = 'unchecked';
      }
    }
    this.setState({ checkArr: arr });
    this.props.onChange(arr);
  }
  render() {
    const { disabled, style } = this.props;
    const { options } = this.state;
    const containerStyle = Object.assign({}, styles.container, style);

    // const name = Base.genRandomId();
    const self = this;
    const compon = options.map((item, idex) => {
      const keys = `${idex}-checkbox`;
      const inputDisabled = disabled || item.disabled;
      const arr = this.state.checkArr;
      let checkStatus = item.checkStatus;
      if (arr[item.value]) {
        checkStatus = arr[item.value].checkStatus;
      }
      return (<CommonCheckbox
        key={keys}
        disabled={inputDisabled}
        change={self.handleChange}
        checkStatus={checkStatus}
        value={item.value}
        text={item.text}
      />);
    });

    return (
      <div
        style={containerStyle}
        ref={(commonCheckbox) => { this.commonCheckbox = commonCheckbox; }}
      >
        {compon}
      </div>
    );
  }
}

Checkbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})),
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  options: [],
  disabled: false,
  style: {},
  onChange: () => {}
};

export default Checkbox;
