import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class TransAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        options: [],
        tabContentStyle: '',
        startX: 0,
        startY: 0,
        aboveX: 0,
        lock: false,
        limitHight: 150,
        limitlow: 80,
        loadingIconStyle: 'transroute',
        refresh: false,
        scrollTop: 0,
        charge: 0,
        x: 0,
        y: 0,
        z: 0,
        styles: ''
      };

  }

  componentDidMount() {
    const self = this;
    self.drag(self, []);
  }
  setValue(key,val){
    this.setState({[key]: val});
  }

  drag(self, arr) {
    const content = this.$$transContent;
    this.arr = arr;
    content.addEventListener('touchstart', (e) => {
      // e.preventDefault();
      if(self.state.refresh) {
        // e.preventDefault()
        return;
      }
      const touch = e.touches[0];
      // console.log('touchstart', touch.pageY, self.state.tabContentStyle);
      self.setState({ 
        startX: touch.pageX,
        startY: touch.pageY,
        lock: true,
        startTime:  Date.now()
      });
      //  console.log('startY:',touch.pageY)
    }, false);
    content.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      let style =  this.processMovement(e,true,content);
      self.setState({
        styles: style
      })
    }, false);
    content.addEventListener('touchend', (e) => {
      // e.preventDefault();
      self.setState({
        styles: ''
      })
    }, false);
  }

  processMovement(e, touchEnabled, elem){
    // var bdst = bd.scrollTop || htm.scrollTop,
    //   bdsl = bd.scrollLeft,
    let pageX = (touchEnabled)? e.touches[0].pageX : e.pageX;
    let pageY = (touchEnabled)? e.touches[0].pageY : e.pageY;
    let offsets = elem.getBoundingClientRect();
    let w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth;
    let h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight;
    // wMultiple = 320/w,
    // offsetX = 0.52 - (pageX - offsets.left)/w,
    // offsetY = 0.52 - (pageY - offsets.top)/h,
    // dy = (pageY - offsets.top) - h / 2,
    // dx = (pageX - offsets.left ) - w / 2;
    // let yRotate = -(dx - offsetX)*(0.07 * wMultiple);
    // let xRotate = -(dy - offsetY)*(0.1 * wMultiple);

    let xRout =  -( w / 2 - (pageX-offsets.left))/7 ;
    let yRout = ( h / 2 - (pageY-offsets.top))/7;
    let imgCSS = 'rotateX(' + yRout + 'deg) rotateY(' + xRout + 'deg)';
    return imgCSS;
  }


  render() {
    const { styles } = this.state;
    return (
      <div ref={(r) => { this.$$transContent = r }}  style={{ 'transform': styles, 'transformOrigin': '50% 50%', 'transformStyle': 'preserve-3d'}}>
        {this.props.children}
      </div>
    );
  }
}

TransAnimal.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
};

TransAnimal.defaultProps = {
  value: '',
  style: {},
  type: 'text',
};

export default TransAnimal;
