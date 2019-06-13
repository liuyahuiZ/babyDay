import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import { Loading } from '../../neo/Components';
import MusicPlayer from '../components/music/player'
import { getMusic, getLyric} from '../api/music'
import { UrlSearch } from '../utils';

const {
    Toaster,
    Row,
    Col,
    MenuTab, PopContainer, Icon, Buttons, ProgressDrag, ExModal, Loade
  } = Components;
const { sessions, storage } = utils;
  
class Music extends Component {
    constructor(props) {
      super(props);
      this.state = {
        liveInfo: null,
        musicList: this.props.musicList||storage.getStorage('musicList')||[],
        theMusic: storage.getStorage('theMusic')||{},
        nowIndex: storage.getStorage('nowIndex')||0,
        autoPlay: '',
        theLyric: storage.getStorage('theLyric')|| {lyric: ''},
      };
      this.doPopContainer = this.doPopContainer.bind(this);
    }
    componentWillReceiveProps(nextProps){
      const self = this;
      this.setState({
        musicList: nextProps.musicList||{}
      })
    }
    // {
    //   title: '演员', author: '李荣浩', player: '123', file: '13', fileUrl: 'http://m10.music.126.net/20190531154927/3f2ca3e4e642b4a22a3ba7ac07e32551/ymusic/872b/f67a/5bd8/6f59bf9be86b3536e5b30e26040c0400.mp3',
    //   infoImg: 'http://localhost:2019/files/getFile?path=uploads/14818193753876.png'
    // },{
    //   title: '小情歌', author: '苏打绿', player: '123', file: '13', fileUrl: 'http://localhost:2019/files/getFile?path=uploads/music/xiaoqg.mp3',
    //   infoImg: 'http://localhost:2019/files/getFile?path=uploads/14818159624230.png'
    // },{
    //   title: '喜剧之王', author: '李荣浩', player: '123', file: '13', fileUrl: 'http://localhost:2019/files/getFile?path=uploads/music/xjzw.mp3',
    //   infoImg: 'http://localhost:2019/files/getFile?path=uploads/3.png'
    // },{
    //   title: '小幸运', author: '田馥甄', player: '123', file: '13', fileUrl: 'http://localhost:2019/files/getFile?path=uploads/music/litleLuck.mp3',
    //   infoImg: 'http://localhost:2019/files/getFile?path=uploads/2.png'
    // },{
    //   title: '海阔天空', author: 'byong', player: '123', file: '13', fileUrl: 'http://localhost:2019/files/getFile?path=uploads/music/hktk.mp3',
    //   infoImg: 'http://localhost:2019/files/getFile?path=uploads/bg2.png'
    // },{
    //   title: '画风', author: '后弦', player: '123', file: '13', fileUrl: 'http://localhost:2019/files/getFile?path=uploads/music/1467813377.mp3',
    //   infoImg: 'http://localhost:2019/files/getFile?path=uploads/bg2.png'
    // }

    componentDidMount(){
      this.addListenr();
    }

    getMusicDetail(obg, idx){
      const self = this;
      getMusic({id: obg.id}).then((res)=>{
        console.log(res);
        obg.fileUrl = res.data[0].url
        // self.setState({
        //   musicList: res.playlist.tracks
        // })
        self.setMucis(obg,idx)
      }).catch((err)=>{
        console.log(err);
      })
      getLyric({id: obg.id}).then((res)=>{
        console.log(res);
        if(res.code=="200")
        self.setState({
          theLyric: res.lrc
        })
        storage.setStorage('theLyric', res.lrc);
      }).catch((err)=>{
        console.log(err);
      })
    }

    _viewAppear(){
    }

    timeChange(time) {//默认获取的时间是时间戳改成我们常见的时间格式
      //分钟
      let minute = time / 60;
      let minutes = parseInt(minute);
      if (minutes < 10) {
          minutes = "0" + minutes;
      }
      //秒
      let second = time % 60;
      let seconds = parseInt(second);
      if (seconds < 10) {
          seconds = "0" + seconds;
      }
      let allTime = "" + minutes + "" + ":" + "" + seconds + ""
      return allTime
    }

    setMucis(itm,index){
      console.log(itm,index)
      this.setState({theMusic: itm});
      this.setState({nowIndex: index});
      this.setState({autoPlay: 'autoplay'});
      storage.setStorage('theMusic', itm);
      storage.setStorage('nowIndex', index);
    }

    addListenr(){
      let o=this;
      let myVid=document.getElementById("audioPlay");
      myVid.addEventListener("loadeddata", //歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
          function() {
            let allTime=o.timeChange(myVid.duration)
            // console.log(myVid.duration,allTime)
            o.setState({allTime:allTime});
            o.setState({allString:myVid.duration});
              setInterval(function() {
                  let nowTime=o.timeChange(myVid.currentTime);
                  // console.log(nowTime);
                  // console.log(myVid.currentTime,myVid.duration)
                  if(parseInt(myVid.duration)-parseInt(myVid.currentTime)<=2){
                    o.setNext();
                  }
                  o.setState({currentTime:nowTime});
                  o.setState({currentString:myVid.currentTime});
              }, 1000);
          }, false);
    }

    
    //播放
    setPlay(){
      const {autoPlay} = this.state;
      let myVid=document.getElementById("audioPlay");
      if(autoPlay==''){
        this.setState({autoPlay: 'autoPlay'});
        myVid.play();//audio.play();// 这个就是播放
      }else{
        this.setState({autoPlay: ''});
        myVid.pause();// 这个就是暂停
      }
    }
    //下一首
    setNext(){
      const {musicList, nowIndex} = this.state;
      let next = nowIndex+1
      if(next >= musicList.length){
        next=0
      }
      this.getMusicDetail(musicList[next],next)
    }
    //上一首
    setPre(){
      const {musicList, nowIndex} = this.state;
      let pre = nowIndex-1
      if(pre<0){
        pre = musicList.length-1
      }
      this.getMusicDetail(musicList[pre],pre)
    }
    // 修改进度
    changeCurrent(percent){
      const {allString}= this.state;
      console.log(allString);
      let myVid=document.getElementById("audioPlay");
      myVid.currentTime = parseFloat(allString*(percent/100).toFixed(2));
      console.log(parseFloat(allString)*(percent/100));
    }

    doPopContainer(){
      const {musicList, theMusic} = this.state;
      const self = this;
      const musicListDom = musicList&&musicList.length>0 ?musicList.map((itm, idx)=>{
        return (<Row className="padding-all border-radius-5f border-bottom border-color-e5e5e5 padding-bottom-3 bg-show" key={`${idx}-itm`} onClick={()=>{
          self.getMusicDetail(itm, idx)
        }}>
          <Col span={4}>
            <div className="middle-round-3 border-radius-3r overflow-hide">
            <img className="width-100 height-100" alt="text" src={(itm.al&&itm.al.picUrl)||itm.album.artist.img1v1Url} />
            </div>
          </Col>
          <Col span={17}>
            <Row>
              <Col>{itm.name}</Col>
              <Col>{itm.al&&itm.al.name}</Col>
            </Row>
          </Col>
          <Col span={3}>{theMusic.id==itm.id? <Icon iconName={"checkmark-circled "} size={'180%'} iconColor={'#33cd75'} />:""}</Col>
        </Row>)
      }): '';
      PopContainer.confirm({
        content: (<Row>
          <Col className="padding-all border-bottom border-color-e5e5e5">列表共有{musicList.length}首</Col>
          <Col className="heighth-60 overflow-y-scroll">{musicListDom}</Col>
          <Col className="text-align-center line-height-3r" onClick={()=>{PopContainer.closeAll()}}>关闭</Col>
          </Row>),
        type: 'bottom',
        containerStyle: {},
      });
    }
    
    render() {
        const { autoPlay, theMusic, theLyric, currentTime, currentString, allString, allTime } = this.state;
        const self = this;
        

        return(
          <section className="bg-f5f5f5">
            <Row  className="padding-all ">
              <Col span={12} className="line-height-3r font-size-12">Music List</Col>
            </Row>
            <audio src={theMusic&&theMusic.fileUrl} autoPlay={autoPlay} loop="loop" id="audioPlay" >
            </audio>
            <MusicPlayer options={{
              autoPlay: autoPlay,
              theMusic: theMusic,
              theLyric: theLyric,
              currentTime: currentTime, 
              currentString: currentString, 
              allString: allString, 
              allTime: allTime,
              setPlay: ()=>{self.setPlay()},
              setNext: ()=>{self.setNext()},
              setPre: ()=>{self.setPre()},
              changeCurrent: (p)=>{self.changeCurrent(p)},
              listPop: ()=>{self.doPopContainer()}
            }} />
            
          </section>
        );
    }
}
export default Music;
