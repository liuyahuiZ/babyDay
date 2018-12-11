import React , { Component }from 'react';
import { Components } from 'neo';
const F2 = require('@antv/f2');

const {
    Row,
    Col,
} = Components;
  
class F2Charts extends Component {
    constructor(props) {
      super(props);
      this.state = {
          id: this.props.id || 'charts',
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
      const {data} = this.state;
      let clentWidth =  this.$$container.clientWidth;
      this.setState({
          renderStatue: 'LOADED',
          clentWidth: clentWidth
      },()=>{
          if(data&&data.length>0){
            self.renderCharts();
          }
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
        console.log('data', data)
        const chart = new F2.Chart({
            id: id,
            pixelRatio: window.devicePixelRatio // 指定分辨率
        });
        // Step 2: 载入数据源
        chart.source(data);
        // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
        chart.interval().position('key*value').color('key');
        // Step 4: 渲染图表
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
export default F2Charts;
