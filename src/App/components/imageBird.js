import React , { Component }from 'react';
import { Components, utils } from 'neo';
const { Row, Col, Icon } = Components;
import config from '../config/config'  

class ImageBird extends Component {
    constructor(props) {
      super(props);
      this.state = {
         imgName: this.props.imgName,
         className: this.props.className,
         loadStatus: 'LOADING',
      };
    }
    componentDidMount() {
    }
  
    componentWillReceiveProps(nextProps){
        this.setState({
            className: nextProps.className,
            action: nextProps.action,
        })
    }

    render() {
        const { imgName, className, loadStatus, display } = this.state;
        const self = this;
        return(
        <div className={`width-100 ${loadStatus=='LOADING'? 'img_bg': ''} `}>
         <img onLoad={()=>{ console.log('load complate');
            self.setState({
                loadStatus: 'LOADED'
            })
         }} className={`width-100 ${className}`} src={`${config.ROOT_URL}files/getTheImage?path=${imgName}`} />
         </div>
        );
    }
}
export default ImageBird;
