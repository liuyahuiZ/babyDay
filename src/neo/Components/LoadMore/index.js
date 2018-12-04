import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from '../Icon';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import './style.scss';

class LoadMore extends Component {
    constructor(props) {
      super(props);
      this.state = {
        options: [],
        enableLoad: this.props.enableLoad || 'loading', //'loading' 'loaded' 'canload'
        percent: this.props.percent || 10,
      };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            enableLoad: nextProps.enableLoad
        })
    }
    componentDidMount(){
        const self = this;
        this.$$scrolls.onscroll = (ev)=>{
           const {enableLoad, percent} = self.state;
            // console.log(enableLoad);
          if(enableLoad==='loading'||enableLoad==='loaded') return;
          if(ev.target.scrollTop + ev.target.offsetHeight > (ev.target.scrollHeight - ev.target.offsetHeight/percent)){
            // console.log('loading...');
            // console.log(ev.target.offsetHeight, ev.target.offsetHeight/percent,  (ev.target.scrollHeight - ev.target.offsetHeight/percent))
            self.props.loadfunc();
            self.setState({enableLoad: 'loading'});
          }
        };
    }
  
    render() {
        const { className, style } = this.props;
        const { enableLoad } = this.state;
        let loadingDomw = enableLoad==='loaded' ? '' : (<Row>
        <Col className='text-align-center'><Icon iconName={'ios-more '} size={'180%'} iconColor={'#999'} /></Col>
        </Row>); 
        const ClassName = `contain overflow-y-scroll ${className}`;
        return (
        <div className={ClassName} style={style} ref={(r) => { this.$$scrolls = r; }}>
            {this.props.children}
            {loadingDomw}
        </div>
        );
    }
}

LoadMore.propTypes = {
  text: PropTypes.string,
  loadfunc: PropTypes.func,
  percent: PropTypes.number,
  style: PropTypes.shape({}), 
};

LoadMore.defaultProps = {
  text: '加载中',
  loadfunc: ()=>{},
  percent: 10,
  style: {}
};

export default LoadMore;
