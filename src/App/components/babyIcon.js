import React , { Component }from 'react';
  
class BabyIcons extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
    }
  
    handleClick(event) {
      this.props.onClick(event);
    }

    format(iconName){
        const fmArr = {'吃奶': 'boot','拉拉': 'seek','尿尿': 'play','身高': 'boot','体重': 'feed','胀气操': 'food','体温': 'food'}
        return  `icon-${fmArr[iconName]}`
    }
    
    render() {
        const { iconName, className, size, iconColor, iconPadding, style } = this.props;
        const fontSize = { fontSize: size };
        const color = { color: iconColor };
        const padding = iconPadding ? { padding: iconPadding } : {};
        let pathArr = [1,2,3,4,5,6];
        const pathDom = pathArr.map((itm, idx)=>{
            return <span className={`path${itm}`} key={`${idx}-ioc`} />
        })
        const self = this;
        return(
         <span className={self.format(iconName)} 
         style={Object.assign({},fontSize, color, padding, style)}
         >{pathDom}</span>
        );
    }
}
export default BabyIcons;
