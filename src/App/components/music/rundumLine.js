import React , { Component }from 'react';
import { Components, utils } from 'neo';
const {
    Toaster,
    Row,
    Col,
    MenuTab, PopContainer, Icon, Buttons, ProgressDrag, ExModal
} = Components;
class RundumLine extends Component {
    constructor(props) {
      super(props);
      this.state = {
        percent: this.props.percent||'',
        lineArr: 40,
        lengthArr: 120,
      };
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
      this.setState({
        percent: nextProps.percent||'',
      })
    }

    renderDom(){
      const { percent, lineArr, lengthArr } = this.state;
      let dom =[]
      for(let i=0;i<lineArr;i++){
        dom.push(<Col span={24/lengthArr} key={`${i}-itm`} style={{height: `${parseInt(Math.random()*100)}%`, backgroundColor: (i/lineArr)<=(percent/100)? '#FC5C4B' :'#898989', margin: '0 1px'}}></Col>)
      }
      return dom
      
    }
    
    render() {
        const { percent, lineArr } = this.state;
        const self = this;
        let lineDom = this.renderDom()
        return(
         <Row className="text-align-center heighr-3" justify="center" align="center">
           {lineDom}
         </Row>
        );
    }
}
export default RundumLine;
