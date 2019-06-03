import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import Transition from '../Transition';
import PageTransition from '../PageTransition';

class ExModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {},
      id: 0,
      display: this.props.display, //'hide',
      action: this.props.action, //'enter'
      options: this.props.options
    };
    this.rmMsg = this.rmMsg.bind(this);
  }

  componentDidMount(){
    // this.toaster()
  }
  componentWillReceiveProps(nextProps){
    const self = this;
    this.setState({
      display: nextProps.display,
      action: nextProps.action,
      options: nextProps.options
    })
  }

  toaster() {
    if(this.state.display==='hide'){
        this.setState({ display: 'show', action: 'enter' });
    } else {
      this.setState({  display: 'hide', action: 'leave' });
    }
  }

  rmMsg(key) {
    this.setState({ display: 'hide' });
  }
  render() {
    const self = this;
    const { options, action, display } = this.state;
    const contbg = display==='show' ? (<Transition
      act={'enter'}
      duration={166}
      enter={'modalbg-enter'}
      leave={'modalbg-leave'}
    ><div style={styles.boxbg} ref={(r) => {
      self.$$boxbg = r;
    }} onClick={()=>{
      self.rmMsg();
    }} /></Transition>) : '';

    const cellDom = display==='show' ? <PageTransition
      act={action}
      duration={166}
      enter={`actionSheet-${options.type}enter`}
      leave={`actionSheet-${options.type}leave`}
    ><div style={styles.cont}>{options.content}</div></PageTransition> : '';

    return (
      <div style={styles.container} className="transi">
        {cellDom}
        {contbg}
      </div>
    );
  }
}

ExModal.propTypes = {
  callbackRM: PropTypes.func
  // style: PropTypes.shape({})
};

ExModal.defaultProps = {
  options: {},
  callbackRM: () => {}
};

export default ExModal;
