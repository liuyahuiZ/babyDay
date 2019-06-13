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
        currentTime: this.props.currentTime||'',
        options: this.props.options||{lyric: ''}
      };
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
      const self = this;
      // console.log(nextProps.currentTime)
      const {currentTime} = this.state;
      if(currentTime == nextProps.currentTime) return;
      this.setState({
        autoPlay: nextProps.autoPlay||'',
        currentTime: nextProps.currentTime||'',
        options: nextProps.options||{lyric:''}
      })
    }
  
    handleClick(event) {
      this.props.onClick(event);
    }

    checkTime(id, it){
      const { currentTime } = this.state;
      if(!id) return false;
      let repStr = id&&id.replace(/\[|]/g,'')
      let idTimeArr = repStr.split(':');
      let nowTimeArr = currentTime.split(':');
      let status = false;
      if(parseFloat(nowTimeArr[0])>=parseFloat(idTimeArr[0])){
        status = true;
        if((parseFloat(nowTimeArr[1])>=parseFloat(idTimeArr[1]))){
          status =  true;
        } else {
          status =  false;
        }
        
      }
      
      
      return status
    }
    
    
    render() {
        const { autoPlay, options, currentTime } = this.state;
        const self = this;
        let times = options&&options.lyric.match(/\[.*\]/g);
        let contents = options&&options.lyric.split(/\[.*\]/g);
        let lyricDom = contents&&contents.length > 0 ? contents.map((itm, idx)=>{
          return <div className={`${self.checkTime(times[idx-1], itm)? 'textcolor-F55936' : 'textclolor-gray'} width-100 `} key={`${idx}-itm`}>{itm}</div>
        }) :'';
        return(
         <Row className="relative text-align-center padding-top-1r line-height-2r">
           <Col className="overflow-y-scroll heighth-60 textclolor-gray">{lyricDom}</Col>
         </Row>
        );
    }
}
export default PlayLyricCtrl;
