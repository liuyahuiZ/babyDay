import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import { musicCategrary, musicList, musicSearch } from '../api/music';
import { goLink } from '../utils/common';
import Music from './music';
import MusicSearch from '../components/music/search';

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
    TransAnimal,
    Search, Input
  } = Components;
const { sessions, storage } = utils;

class MusicCategory extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            categoryList: sessions.getStorage('categoryList')||[],
            loadText: '加载中',
            wxConfig: sessions.getStorage('WXCONFIG') || {},
            hasCard: "LOADING", // LOADING ,  HASCARD, NULLCARD
            keyWords: ""
        };
    }
    _viewAppear(){
    }

    componentDidMount(){
        this.getMusicCategary();
    }
  
    getMusicCategary(){
        const self = this;
        const { categoryList } = this.state;
        if(categoryList&&categoryList.length>0) return;
        musicCategrary({}).then((res)=>{
            console.log(res);
            self.setState({
                categoryList: res.playlists
            })
            sessions.setStorage('categoryList', res.playlists);
        }).catch((err)=>{
            console.log(err);
        })
    }

    getMusicList(obg){
        Loade.show();
        const self = this;
        musicList({id: obg.id}).then((res)=>{
          Loade.hide();
          console.log(res);
          self.setState({
            musicList: res.playlist.tracks
          }, ()=>{
              self.$$theMusic.doPopContainer()
          })
          storage.setStorage('musicList', res.playlist.tracks)
        }).catch((err)=>{
          Loade.hide();
          console.log(err);
        })
    }

    doSearch(keyWords){
        const self = this;
        musicSearch({
            keywords: keyWords
        }).then((res)=>{
            console.log(res);
            if(res.code=="200"){
                self.setState({
                    musicList: res.result.songs
                },()=>{self.$$theMusic.doPopContainer()})
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
        const { categoryList, musicList } = this.state;
        const self = this;
        let cateGoryDom = categoryList&&categoryList.length > 0 ? categoryList.map((itm, idx)=>{
            return (<Col span={12} className={'padding-all-3x margin-bottom-1r '} key={`${idx}-itm`} onClick={()=>{self.getMusicList(itm)}}>
            <Row className="border-radius-5f padding-bottom-3 bg-show overflow-hide">
                <Col span={24} className={"font-size-8"}><img alt="text" className="width-100" src={itm.coverImgUrl} /></Col>
                <Col span={24} className={"font-size-8 text-overflow padding-all"}>{itm.name}</Col>
            </Row></Col>)
        }):''
        return (<section className="bg-f5f5f5 minheight-100">
            <Row justify="center" className="padding-all">
                <Col span={12} className="line-height-3r font-size-12">音乐列表</Col>
                <Col span={12} className="">
                    <MusicSearch callBack={(k)=>{
                        console.log(k);
                        self.doSearch(k);
                    }} />
                </Col>
            </Row>
            <Row className=" padding-all heighth-80 overflow-y-scroll">
            {cateGoryDom}
            </Row>
            <Row><Col><Music musicList={musicList} ref={(r) => { this.$$theMusic = r; }} /></Col></Row>
        </section>)
    }
}

export default MusicCategory;