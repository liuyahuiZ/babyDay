import ReactDOM from 'react-dom';
import React , { Component }from 'react';
import {Components, Parts, utils} from 'neo';
import { Router, Route, hashHistory, IndexRedirect, History } from 'react-router';
import '../style/comment.scss';
import '../style/common.scss';
import '../style/font.scss';
import Static from './static';

const { Button, PageTransition } = Components;
const { HeaderPart } = Parts
const { sessions } = utils;

class LayOut extends Component {
    constructor(props, context) {
        super(props, context);
      this.state = {
          action: 'enter',
          compontArr: [],
          titleArr: [],
          historyArr:[],
          moving: true,
      };
    }
    componentDidMount(){
        const arr = [];
        const histArr = [];
        arr.push(this.props.children);
        histArr.push(this.props.location.pathname);
        this.setState({
            compontArr: arr,
            historyArr: histArr,
            titleArr: histArr,
            moving: false
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        const { moving, historyArr } = this.state;
        if(moving) {
            this.setState({
                moving: false
            });
            return;
        }
        if(nextProps.location.pathname === '/') {
            this.setState({
                historyArr: [],
            })
            this.changeContent('leave', nextProps)
            return
        }
        if(!sessions.getStorage('isFirst')){
            sessions.setStorage('isFirst', 'is')
            return 
        }
        if(nextProps.location.action === "PUSH") {
            this.changeContent('enter', nextProps)
        } else if(nextProps.location.action === "POP") {
            this.changeContent('leave', nextProps)
        }
    }
    
    changeContent(action, nextProps){
        const self = this;
        const arr = this.state.compontArr;
        const titArr = this.state.titleArr;
        
        if(arr.length < 2) {   
            let child = React.cloneElement(nextProps.children, { pageIn: 'viewAppear' });
            arr.push(child);
            titArr.push(nextProps.location.pathname);
        }
        this.setState({
            compontArr: arr,
            action: action,
            titleArr: titArr,
            moving: true,
        })
        setTimeout(()=> {
            const arr = self.state.compontArr;
            const titArr = this.state.titleArr;
            arr.shift();
            titArr.shift();
            let child = React.cloneElement(arr[0], { pageIn: '' });
            self.setState({
                compontArr: [child],
                titleArr:titArr,
                moving: false
            })
        }, 600)
    }

    actions(){
        const {historyArr, action} = this.state;
        hashHistory.goBack();
    }
    render() {
        const self = this;
        const {compontArr, titleArr} = this.state;
        const Action = this.state.action;
        let actionArr = [{action: 'leave', enter: 'doc-leave', leave:'doc-enter' },
        {action: 'enter', enter: 'doc-enter', leave:'doc-leave-end' }];
        if(Action === 'enter') {
            actionArr = [{action: 'leave', enter: 'doc-enter', leave:'doc-leave-end' },
            {action: 'enter', enter: 'doc-enter', leave:'doc-leave' }];
        }
        
        let ZIndex = 5;
        const components = compontArr.map((item, idx) => {
            return (<PageTransition
                disable={ compontArr.length === 1 ? false : true }
                act={actionArr[idx].action}
                enter={ (compontArr.length ==1) ? actionArr[idx].leave : actionArr[idx].enter}
                leave={ (compontArr.length ==1) ? actionArr[idx].enter : actionArr[idx].leave}
                key={`${item.props.location.pathname}-com`}
                ><div className="pageContent transf pages" style={{zIndex: ZIndex + idx}}>{item}</div>
                </PageTransition>);
        });
        return(
            <div>
                {/* <HeaderPart titlepart={titleArr} action={Action} onback={() => {this.actions()}}/> */}
                {components}
                {/* <div className="pageContent transf">{this.props.children}</div> */}
            </div>
        );
    }
}

export default LayOut;
