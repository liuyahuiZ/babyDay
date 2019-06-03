import React , { Component }from 'react';
import { Components, utils } from 'neo';
const {
    Toaster,
    Row,
    Col,
    MenuTab, PopContainer, Icon, Buttons, ProgressDrag, ExModal
} = Components;
class PlayerCtrl extends Component {
    constructor(props) {
      super(props);
      this.state = {
        autoPlay: this.props.autoPlay||'',
        options: this.props.options
      };
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
      const self = this;
      this.setState({
        autoPlay: nextProps.autoPlay||'',
        options: nextProps.options
      })
    }
  
    handleClick(event) {
      this.props.onClick(event);
    }

    
    
    render() {
        const { autoPlay, options } = this.state;
        const self = this;
        return(
         <Row className="text-align-center line-height-3r">
           <Col span={8} onClick={()=>{options.setPre()}}><Icon iconName={'ios-rewind  '} size={'170%'} /></Col>
           <Col span={8} onClick={()=>{options.setPlay()}}>{autoPlay!==''? <Icon iconName={'pause  '} size={'200%'} /> :<Icon iconName={'play '} size={'200%'} />}</Col>
           <Col span={8} onClick={()=>{options.setNext()}}><Icon iconName={'ios-fastforward  '} size={'170%'} /></Col>
         </Row>
        );
    }
}
export default PlayerCtrl;
