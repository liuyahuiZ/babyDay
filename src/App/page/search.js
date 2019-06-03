import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import formate from '../utils/formate'
import { goLink } from '../utils/common';
import { musicSearch } from '../api/music';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    Switch,
    Loade,
    RandomNumber,
    TransAnimal, Input
  } = Components;
const { sessions, storage } = utils;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            loadText: '加载中',
            hasCard: "LOADING", // LOADING ,  HASCARD, NULLCARD
            keyWords: "",
            musicList: []
        };
    }
    
    _viewAppear(){
    }

    doSearch(){
        const { keyWords } = this.state;
        const self = this;
        musicSearch({
            keywords: keyWords
        }).then((res)=>{
            console.log(res);
            if(res.code=="200"){
                self.setState({
                    musicList: res.result.songs
                })
            } else{
                self.setState({
                    musicList: []
                })
            }
            
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    render(){
        const { keyWords, musicList } = this.state;
        const self = this;
        const musicListDom = musicList&&musicList.length>0 ?musicList.map((itm, idx)=>{
            return (<Row className="padding-all border-radius-5f padding-bottom-3 margin-bottom-1r bg-show" key={`${idx}-itm`} onClick={()=>{
              self.getMusicDetail(itm, idx)
            }}>
              <Col span={4}>
                <div className="middle-round-3 border-radius-3r overflow-hide">
                <img className="width-100 height-100" alt="text" src={itm.album.artist&&itm.album.artist.img1v1Url} />
                </div>
              </Col>
              <Col span={20}>
                <Row>
                  <Col>{itm.name}</Col>
                  <Col>{itm.album.artist&&itm.album.artist.name}</Col>
                </Row>
              </Col>
            </Row>)
          }): '';
        return (<section className="bg-f5f5f5 padding-all minheight-100">
            <Row className="line-height-3r padding-left-1r heighr-3 border-radius-9r bg-show overflow-hide margin-bottom-1r" >
                <Col span={4}><Icon iconName={'ios-search-strong '} size={'130%'} /></Col>
                <Col span={14} className="textclolor-gray ">
                <Input
                    value={keyWords}
                    placeholder="请输入关键词"
                    maxLength={100}
                    onChange={(e,t,v)=>{
                        self.setState({
                            keyWords: v
                        })
                    }}
                    />
                </Col>
                <Col span={6} className="padding-all-2x">
                <Buttons
                    text="查询"
                    type={'primary'}
                    size={'large'}
                    style={{backgroundColor: '#855EF1', color:'#fff', borderRadius: '3rem', height: '2.3rem'}}
                    onClick={()=>{
                      this.doSearch()
                    }}
                  /></Col>
            </Row>
            {musicListDom}
        </section>)
    }
}

export default Search;