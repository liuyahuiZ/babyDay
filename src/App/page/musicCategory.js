import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import { musicCategrary } from '../api/music';
import { goLink } from '../utils/common';
import { Input } from '../../neo/Components';

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
    Search
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

    render(){
        const { categoryList } = this.state;
        const self = this;
        let cateGoryDom = categoryList&&categoryList.length > 0 ? categoryList.map((itm, idx)=>{
            return (<Col span={12} className={'padding-all-3x margin-bottom-1r '} key={`${idx}-itm`} onClick={()=>{goLink('/Music', {id: itm.id})}}>
            <Row className="border-radius-5f padding-bottom-3 bg-show overflow-hide">
                <Col span={24} className={"font-size-8"}><img alt="text" className="width-100" src={itm.coverImgUrl} /></Col>
                <Col span={24} className={"font-size-8 text-overflow"}>{itm.name}</Col>
            </Row></Col>)
        }):''
        return (<section className="bg-f5f5f5 padding-all minheight-100">
            <Row justify="center">
                <Col span={12} className="line-height-3r font-size-12">音乐列表</Col>
                <Col span={12} className="line-height-3r padding-left-1r heighr-3 border-radius-9r bg-show overflow-hide">
                    <Row className="overflow-hide" onClick={()=>{goLink('/Search')}}>
                        <Col span={4}><Icon iconName={'ios-search-strong '} size={'130%'} /></Col>
                        <Col span={20} className="textclolor-gray font-size-8 ">热搜：网易音乐</Col>
                    </Row>
                </Col>
            </Row>
            <Row className="margin-top-1r">
            {cateGoryDom}
            </Row>
        </section>)
    }
}

export default MusicCategory;