import React , { Component }from 'react';
import { Components } from 'neo';
const F2 = require('@antv/f2');

const {
    Row,
    Col,
} = Components;
  
class LineCharts extends Component {
    constructor(props) {
      super(props);
      this.state = {
          id: this.props.id || 'lineCharts',
          renderStatue: 'LOADING', // 'LOADING', 'LOADED'
          data: this.props.data || [],
          style:{
              height: 300
          }
      };
    }
        
    componentDidMount(){
      // Step 1: 创建 Chart 对象
      const self = this;
      let clentWidth =  this.$$container.clientWidth;
      console.log(clentWidth);
      this.setState({
          renderStatue: 'LOADED',
          clentWidth: clentWidth
      },()=>{
          self.renderCharts();
      })
    }

    componentWillReceiveProps(nextProps){
      const self = this;
      // console.log('nextProps', nextProps);
      const {data} = this.state;
      this.setState({
          data: nextProps.data
      }, ()=>{
          if(nextProps.data&&nextProps.data.length>0){
              if(data&&data.length>0&&(data[0].value==nextProps.data[0].value)) {return false;}
              self.renderCharts()
          }
          
      })
    }

    renderCharts(){
        const {id, data} = this.state;
        const chart = new F2.Chart({
            id: id,
            pixelRatio: window.devicePixelRatio // 指定分辨率
        });
        chart.source(data, {time: {
          type: 'timeCat',
          tickCount: 5,
          mask: 'MM-DD',
          range: [0, 1]
        }});
        chart.tooltip({
          showCrosshairs: true
        });
          
        chart.line().position('time*count').shape('typecode').color('typecode');
        // chart.area().position('time*count').shape('typecode').color('typecode');
        chart.render();
    }
    render() {
        const {id, style, renderStatue, clentWidth} = this.state;
        return(
          <section className="" ref={(r) => { this.$$container = r; }}>
            { renderStatue == "LOADED" ? <canvas id={id} width={clentWidth} height={style.height}></canvas> :
            <Row><Col className="text-align-center">加载中</Col></Row>}
          </section>
        );
    }
}
export default LineCharts;
