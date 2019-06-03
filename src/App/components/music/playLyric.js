import React , { Component }from 'react';
import { Components, utils } from 'neo';
const {
    Toaster,
    Row,
    Col
} = Components;
class PlayLyricCtrl extends Component {
    constructor(props) {
      super(props);
      this.state = {
        autoPlay: this.props.autoPlay||'',
        options: this.props.options||{lyric: ''}
      };
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
      const self = this;
      this.setState({
        autoPlay: nextProps.autoPlay||'',
        options: nextProps.options||{lyric:''}
      })
    }
  
    handleClick(event) {
      this.props.onClick(event);
    }

    
    
    render() {
        const { autoPlay, options } = this.state;
        const self = this;
        let times = options&&options.lyric.match(/\[.*\]/g);
        let contents = options&&options.lyric.split(/\[.*\]/g);
        let lyricDom = contents&&contents.length > 0 ? contents.map((itm, idx)=>{
          return <div className={"width-100 textclolor-gray"} key={`${idx}-itm`}>{itm}</div>
        }) :'';
        return(
         <Row className="relative text-align-center padding-top-1r line-height-2r">
           <Col className="overflow-y-scroll heighth-60 textclolor-gray">{lyricDom}</Col>
         </Row>
        );
    }
}
export default PlayLyricCtrl;
