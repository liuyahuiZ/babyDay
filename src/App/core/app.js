import ReactDOM from 'react-dom';
import React, { Component } from 'react';

export default class BaseView extends Component {

    componentWillMount(){
        if(this.props.pageIn!==''){
          this._viewAppear();
        }
    }

    checkNull(obj){
        let keys = Object.keys(obj);
        let values = Object.values(obj);
        let status = false;
        for(let i= 0;i<keys.length;i++){
            if(typeof values[i] == 'object' && JSON.stringify(values[i])!=='{}'){
                status = true
                status = this.checkNull(values[i])
            }else if(values[i]!==''){
                status = true
            }else{
                status = false;
            }
        }
        return status;
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log(nextProps, nextState);
    //     console.log(this.checkNull(nextState));
    //     return this.checkNull(nextState);
    // }

    _viewAppear(){
        return false;
    }

    render(){
        return false;
    }
}