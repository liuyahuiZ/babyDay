import React , { Component }from 'react';
import { Components, utils } from 'neo';
import PlayerCtrl from './playerCtrl';
import RundumLine from './rundumLine';
import PlayLyric from './playLyric';
const {
    Toaster,
    Row,
    Col,
    MenuTab, PopContainer, Icon, Buttons, ProgressDrag, ExModal, Progress, Carousel
} = Components;
class MusicPlayer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        options: this.props.options ||{},
        autoPlay: '',
        MDdisplay: '',
        MDaction: ''
      };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps){
        const self = this;
        this.setState({
          options: nextProps.options||{}
        })
    }

    showPlayer(){
        this.setState({
            MDdisplay: 'show',
            MDaction: 'enter'
        })
    }
    
    render() {
        const { options, MDdisplay, MDaction} = this.state;
        const self = this;
        let theMusic = options.theMusic || {}
        let background=`url(${theMusic.al&&theMusic.al.picUrl||'http://p2.music.126.net/BZNpKSKkPTTv5ZnxdYAdUQ==/5850501371402948.jpg'}) no-repeat top left scroll`
        const carouselMap = [{ tabName: 'first', content: (<Row>
            <Col className="text-align-center ">
              <div className="line-height-3r textclolor-gray">{theMusic.name}</div>
              <div className="music-round display-inline-block overflow-hide margin-top-3r margin-bottom-1r">
                  <img className="width-100" alt="text" src={theMusic.al&&theMusic.al.picUrl||'http://p2.music.126.net/BZNpKSKkPTTv5ZnxdYAdUQ==/5850501371402948.jpg'} />
              </div>
              <RundumLine percent={options.currentString/options.allString*100} />
            </Col>
            </Row>), isActive: true },
        { tabName: 'second', content: (<PlayLyric options={options.theLyric} autoPlay={options.autoPlay} currentTime={options.currentTime} />), isActive: false }];

        return(
            <div>
                <Row className="fixed width-100 bg-show heighr-3 bottom-0">
                <Col className="relative"><Progress percent={options.currentString/options.allString*100} barColor={'#F96C43'} radius={10} style={{height: '2px', position: 'absolute', top: '0'}} /></Col>
              <Col span={10} className="width-100 line-height-3r padding-left-3 text-overflow" onClick={()=>{
                this.showPlayer()
              }}>{theMusic.name||'--'}</Col>
              <Col span={10}><PlayerCtrl autoPlay={options.autoPlay} options={options} /> </Col>
              <Col span={4} onClick={()=>{options.listPop()}} className="line-height-3r"><Icon iconName={"android-list "} size={'170%'} /></Col>
            </Row>
            <ExModal display={MDdisplay} action={MDaction} options={{
                content: (<div className="relative heighth-100 bg-333">
                  <Row className="relative zindex-10 padding-all-1r">
                    <Col span={4} className={'text-align-center'} onClick={() => { self.setState({
                      MDdisplay: 'hide',
                      MDaction: 'leave'
                    }) }} >
                        <Icon iconName={"chevron-down "} size={'180%'} iconColor={'#fff'} />
                    </Col>
                    <Col span={16} className={'text-align-center line-height-3r'}></Col>
                    
                    <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'27rem'}} innerStyle={{height:'27rem'}} dotDefaultStyle={{width: '5px'}} dotActiveStyle={{}} showDotsText={false} dragAble />
                    
                    <Col className="padding-all-1r ">
                    <Row className="textclolor-gray margin-top-1r">
                        <Col span={12} className="text-align-left">{options.currentTime}</Col>
                        <Col span={12} className="text-align-right">{options.allTime}</Col>
                    </Row>
                    
                    <ProgressDrag percent={options.currentString/options.allString*100} 
                    barColor={'#fff'} bgColor={'#333'}
                    style={{height: '5px'}} barRoundStyle={{}}
                    radius={20} onChange={(v)=>{ console.log(v); options.changeCurrent(v)}} />
                    </Col>
                    <Col className="padding-all-1r">
                        <PlayerCtrl  autoPlay={options.autoPlay} options={options} />
                    </Col>
                  </Row>
                  <div className="absolute top-0 width-100 heighth-100 img_bg " style={{background}}></div>
                  </div>),
              type: 'bottom',
              containerStyle: { top: '3rem'},
              }} />
              </div>
        );
    }
}
export default MusicPlayer;
