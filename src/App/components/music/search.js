import React , { Component }from 'react';
import { Components, utils } from 'neo';
const {
    Toaster,
    Row,
    Col,
    MenuTab, PopContainer, Icon, Buttons, ProgressDrag, ExModal, Input
} = Components;
class SearchCtrl extends Component {
    constructor(props) {
      super(props);
      this.state = {
        autoPlay: this.props.autoPlay||'',
        options: this.props.options,
        keyWords: ""
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
        const { keyWords } = this.state;
        const self = this;
        return(
         <Row className="">
           <Col className="line-height-3r padding-left-1r heighr-3 border-radius-9r bg-show overflow-hide">
              <Row className="overflow-hide" onClick={()=>{}}>
                  {keyWords&&keyWords!=='' ? '' :<Col span={5}><Icon iconName={'ios-search-strong '} size={'130%'} /></Col>}
                  <Col span={19} className="textclolor-gray font-size-8 ">
                  <Input
                  value={keyWords}
                  placeholder="请输入关键词"
                  maxLength={100}
                  onChange={(e,t,v)=>{
                      self.setState({
                          keyWords: v
                      })
                  }}
                  /></Col>
                  {keyWords&&keyWords!=='' ?  <Col span={5}>
                  <Buttons
                    text={<Icon iconName={'ios-search-strong '} iconColor={"#fff"} size={'130%'} />}
                    type={'primary'}
                    size={'large'}
                    style={{backgroundColor: '#855EF1', color:'#fff', borderRadius: '6rem'}}
                    onClick={()=>{
                      self.props.callBack(keyWords)
                    }}
                  /></Col> : ''}
              </Row>
            </Col>
         </Row>
        );
    }
}
export default SearchCtrl;
