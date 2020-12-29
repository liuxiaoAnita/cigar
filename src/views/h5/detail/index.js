import React, { Component } from "react";
import { login, getCarMes } from "@/store/actions";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import {colorItem} from '@/utils/index';
import { Spin, Tabs } from 'antd';
import BannerThings from "@/components/Banner/things.js";
import BannerTop from "@/components/Banner/bannerTop.js";
import ItemBox from "@/components/Banner/ItemBox.js";
import CommentList from './commentList'

import {getQueryVariable} from '@/utils'
import { Button, Icon, Input, InputNumber, message} from "antd";

import "./index.less";

const { TabPane } = Tabs;
class User extends Component {
  state = {
    users: [],
    isLoading: true,
    isHasDetail: false,
    dataList: {},
    count: 0,
    productList: [], // 推荐产品
    topList: [], // 也喜欢的商品
  };

  componentDidMount() {
    const id = getQueryVariable('id') || ''
    this.setState({
      thingId: id,
    },() => {
      this.init(this.state.thingId)
    })
  }

  init = (id) =>{
    const uid = localStorage.getItem('userUid') || '';
    this.setState({
      uid
    })
    if (id) {
      login({cmd: 'getProductById', uid, id})()
      .then(res => {
        if(`${res.result}` === '0'){
          // message.success('修改成功')
          this.setState({
            dataList: res.body,
            productList: res.body.productList|| [],
            topList: res.body.topList|| [],
            isHasDetail: true,
            isLoading: false,
          })
        } else {
          message.error(`${res.resultNote}`);
          this.setState({
            isLoading: false,
          })
        }
      })
      .catch((error) => {
        message.error(error);
        this.setState({
          isLoading: false,
        })
      });
    } else {
      message.info('没有这个产品详情~')
    }
  }

  changeCount = e => {
    const count = Number(e.target.value) || 0
    this.setState({count})
  }

  callback(key) {
    console.log(key);
  }

  addCarFun = () => {
    const id = getQueryVariable('id') || ''
    const uid = localStorage.getItem('userUid') || '';
    const count = 1;
    login({cmd: 'addCart', uid, productList: [{ id, count, }]})()
      .then(res => {
        if (`${res.result}` === '0') {
          this.props.getCarMes({uid})
          message.success('添加购物车成功~')
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

  goBuyPage = () => {
    const count = 1;
    const id = getQueryVariable('id') || '';
    if (count > 0) {
      this.props.history.push(`/car?buyId=${id}&buyNum=${count}`);window.location.reload()
    } else {
      message.error('请先选择购买个数')
    }
  }

  renderTop = () => {
    const { dataList, count, productList, topList, uid } = this.state
    return (
      <div className='detail-h5-item-message'>
        <div className='top-mess'>
          <div className='left-content'>
            <div className='left-top-message'>
              <div className='image-content'>
                <div><img  src={dataList.image} /></div>
                <div>

                </div>
              </div>
              <div className='message-detail-content'>
                <div className='message-one'>
                  <span className='name'>{dataList.zh_name}</span>
                  <span className='price-num'>￥{dataList.price}</span>
                  <div className='xiangxing-content'>
                    {dataList.xiangxing_zh_name.map((item, index) =>(
                      <div
                        className='xiangxing-item'
                        key={`xiangxing-item-${index}`}
                        style={{color: colorItem[index], borderColor: colorItem[index]}}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className='message-two'>
                  <span className='zh-name'><i>中文名：</i>{dataList.en_name}</span>
                  <span className='en-name'><i>英文名</i>{dataList.en_name}</span>
                  <span className='brand-name'><i>品牌</i>{dataList.brand_zh_name}</span>
                  <span className='baozhuang-name'><i>包装</i>{dataList.baozhuang_zh_name}</span>
                  <span className='pinxing-name'><i>品型</i>{dataList.pinxing_zh_name}</span>
                  <span className='changdu'><i>长度(毫米)</i>{dataList.changdu}</span>
                  <span className='huanjing'><i>环径</i>{dataList.huanjing}</span>
                
                </div>
              </div>
            </div>
            <div className='tabs-content'>
              <Tabs defaultActiveKey="1"  type="card">
                <TabPane tab="商品详情" key="1">
                  <div className='things-detail' dangerouslySetInnerHTML={{__html: dataList.content || '<p>暂无详情</p>'}}></div>
                </TabPane>
                <TabPane tab="评价" key="2">
                  <CommentList id={getQueryVariable('id')} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>


        <BannerTop title='推荐产品' descr='RECOMMENDED PRODUCTS' />
        <div className='tuijian-content'>
          {productList.map((item, index) => (
            <div className='item' key={`things-swiper-item-${index}`}>
              <ItemBox item={item} onclick={() => {
                  this.props.getCarMes({uid})
                }} />
            </div>
          ))}
        </div>
        <div className='button-box'>
        </div>
        <div className='button-box fixed'>
          <div className='myheart'><Icon className='icon-heart' type="heart" theme="filled"  /></div>
          <div>
            <Button className='car-button' onClick={this.addCarFun}>加入购物车</Button>
            <Button className='buy-button' type="primary" onClick={this.goBuyPage}>立即购买</Button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isHasDetail, isLoading} = this.state
    return (
        <Spin spinning={isLoading} >
          <div className="thing-detail-container">
          {
            !isLoading && (isHasDetail ? this.renderTop() : <div>暂无详情</div>)
          }
          </div>
        </Spin>
    );
  }
}

export default withRouter(connect(null, { getCarMes, })(User));
