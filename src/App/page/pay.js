import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';

const {
    Buttons,
    Toaster,
    Header,
    Row,
    Col,
    Icon,
    Modal,
    Carousel,
    LoadMore
  } = Components;
  
class PayDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          productList: [],
          enableLoad: 'canload',
          currentPage: 1,
          pageSize: 5,
      };
    }

    componentDidMount(){
      console.log();
    }
    switchChange(date){
        console.log(date);
    }
       
    scrollenv(e){
      console.log(e);
    }

    handleClick(link) {
      if(link) {
          hashHistory.push(link);
      }
    }

    getProduct(){
      const {currentPage, pageSize, productList} = this.state;
      const self = this;
      let reqbody={
        "currentPage" : currentPage,
        "pageSize": pageSize,
      }
      fetch( config.ROOT_URL+ 'article/getArticle', { method: 'POST', data: reqbody})
      .then(data => {
          console.log(data)
          let page =  currentPage;
          let products = productList;
          let enableLoad = 'loading';
          if(data.respHead.code=='0000'){
            products = products.concat(data.respBody.list);
            if( products.length >= data.respBody.pageInfo.allCount ) {
              enableLoad = 'loaded'
            } else{
              page = currentPage + 1;
              enableLoad = 'canload';
            }
            self.setState({
              productList: products,
              enableLoad: enableLoad,
              currentPage: page
            })
          }else{

          }
      })
    }
    loadmore(){
      console.log('load...');
      const self = this;
      // 'loading' 'loaded' 'canload'
      self.setState({
        enableLoad: 'loading'
      })
      self.getProduct();
    }
    render() {
        const { productList, enableLoad } = this.state;
        const listMap = [{ tabName: 'first', content: (<div className="padding-all-1r bg-show"><div className="padding-all-10x bg-FECAAD textclolor-gray-red border-radius-100 ">抢100优惠券</div></div>), isActive: true },
        { tabName: 'second', content: (<div className="padding-all-1r bg-show"><div className="padding-all-10x bg-F1F8FD textclolor-alink border-radius-100 ">1元秒杀24期免息</div></div>), isActive: false },
        { tabName: 'thired', content: (<div className="padding-all-1r bg-show"><div className="padding-all-10x bg-F1F8FD textclolor-alink border-radius-100 ">小白卡满1000减30</div></div>), isActive: false }]

        const productListDom = productList.map((itm, idx)=>{
          return (
          <Row className="padding-all padding-bottom-3 bg-show border-bottom border-color-f5f5f5"  key={`${idx}-itm`} onClick={()=>{
            this.handleClick(`/articleDetail?id=${itm._id}`)
        }}>
            <Col className="padding-all">
              {itm.title}{itm.tirtle}
            </Col>
            <Col className="padding-all">
            {itm.imgGroup ? <img className='width-100'
        src={`http://localhost:2019/files/getTheImage?path=${(itm.imgGroup.filePath + '/'+itm.imgGroup.fileName)}`}
      /> : ''}
            {itm.img_group ? <img className='width-100'
        src={`http://localhost:2019/files/getTheImage?path=${'/uploads/'+itm.img_group[0].photopath}`}
          /> : ''}</Col>
            <Col  className="padding-all font-size-8">{itm.info}</Col>
          </Row>)
        });

        return(
          <LoadMore enableLoad={enableLoad} percent={20}  loadfunc={()=>{this.loadmore()}} className="bg-f5f5f5">
            <Row justify='center'>
              <Col className="bg-7ecef4 padding-all-2r">
                <Row>
                  <Col className="text-align-center" span={6}>
                    <Row className="padding-top-1r" justify="center">
                      <Col className="text-align-center">
                          <Icon iconName={'android-textsms '} size={'230%'} iconColor={'#fff'} />
                      </Col>
                      <Col className="text-align-center textclolor-white">Talk</Col>
                    </Row>
                  </Col>
                  <Col className="text-align-center" span={6}>
                    <Row className="padding-top-1r" justify="center">
                      <Col className="text-align-center">
                          <Icon iconName={'heart '} size={'230%'} iconColor={'#fff'} />
                      </Col>
                      <Col className="text-align-center textclolor-white">Heart</Col>
                    </Row>
                  </Col>
                  <Col className="text-align-center" span={6}>
                    <Row className="padding-top-1r" justify="center">
                      <Col className="text-align-center">
                          <Icon iconName={'filing '} size={'230%'} iconColor={'#fff'} />
                      </Col>
                      <Col className="text-align-center textclolor-white">Card</Col>
                    </Row>
                  </Col>
                  <Col className="text-align-center" span={6}>
                    <Row className="padding-top-1r" justify="center">
                      <Col className="text-align-center">
                          <Icon iconName={'android-color-palette '} size={'230%'} iconColor={'#fff'} />
                      </Col>
                      <Col className="text-align-center textclolor-white">Parint</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="bg-show overflow-hide heighr-5">
                <Carousel options={listMap} showHeight={false} showDotsText={false} showDots={true} dragAble />  
              </Col>
              <Col span={24} className="bg-show">
                  
              </Col>
              <Col className="bg-show margin-top-2 padding-all">
                <Row>
                  <Col className="line-height-2r textcolor-2d2d2d">理财推荐</Col>
                </Row>
                <Row>
                  <Col className="padding-all" span={12}>
                    <div className="heighr-4 bg-home"></div>
                  </Col>
                  <Col className="padding-all" span={12}>
                    <div className="heighr-4 bg-home"></div>
                  </Col>
                </Row>
              </Col>
              <Col className="bg-show margin-top-2 padding-all">
                <Row>
                  <Col className="line-height-2r textcolor-2d2d2d">保险推荐</Col>
                </Row>
                <Row>
                  <Col className="padding-all" >
                    <div className="heighr-4 bg-home"></div>
                  </Col>
                  <Col className="padding-all" span={12}>
                    <div className="heighr-4 bg-home"></div>
                  </Col>
                </Row>
              </Col>
              <Col>{productListDom}</Col>
            </Row>
          </LoadMore>
        );
    }
}
export default PayDoc;
