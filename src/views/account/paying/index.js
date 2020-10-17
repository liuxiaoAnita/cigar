import React, { Component } from "react";
import {Icon} from 'antd'

import "./index.less";
class PayingPage extends Component {
  state = {
    orderData: {
      addressShowAll: false,
    }
  };
  componentDidMount() {
    // this.getUsers()
  }

  handelAdress = (id) => {
    console.log(id)
  }



  render() {
    const {orderData, addressShowAll} = this.state
    const dataItem = {
      "id":"123",
      "phone":"手机号",
      "name":"名字",
      "address":"地址",
       "province_city_town":"地址",
    }
    const goodItem = {
      "id": "1",// 商品id
      "baozhuang_en_name":"wwwww",//包装英文名
      "baozhuang_zh_name":"山东省",//包装中文名
      "zh_name":"阿萨德撒",//中文名
      "en_name":"ssss",//英文名
      "qty":"2",//数量
      "price":"33",//推广价
      "old_price":"55",//原价
      "image":"",//图片
      "total":"56",//小计
    }
    const dataList = [dataItem,dataItem,dataItem,dataItem,dataItem,dataItem,dataItem]
    const goodsList = [goodItem,goodItem,goodItem,goodItem,goodItem,]
    let goodsNumber = 0;
    goodsList.forEach(i => goodsNumber += Number(i.qty))
    const totleData = {
      "old_money":"原价",
        "order_money": "",//推广价
        "coupon_money": ""//优惠价
    }
    return (
      <div className="order-detail-content-page">
       <div className='title-name'>确认订单</div>
        {/* 收货地址 */}
       <div className='address-content'>
          <div className='address-title'>选择收货地址</div>
          <div className={`address-box ${addressShowAll ? 'show' : 'hidden'}`}>
            {dataList.map((item, index) => (
              <div className='address-item' onClick={() => this.handelAdress(item.id)} key={`address-item-${index}-${item.id}`}>
                <span className='receive-name'>{item.name}</span>
                <span className='receive-phone'>{item.phone}</span>
                <span className='receive-address'>{item.address}</span>
                {/* <Icon className='edit-button' type="edit" /> */}
              </div>
            ))}
          </div>
          <div className='showAddress-btn' onClick={() => this.setState({addressShowAll: !addressShowAll})}>{addressShowAll ? '显示更多收货地址' : '隐藏部分收货地址'}</div>
       </div>
      {/* 商品信息 */}
      <div className='goods-content'>
        <span className='title-mes'>商品信息</span>
        <div className='goods-detail'>
          {goodsList.map((item, index) =>(
            <div className='goods-item' key={`goods-item-${index}`}>
              <img src={item.image} />
              <div className='goods-mes-name'>
                <span className='goods-name'>{item.zh_name}</span>
                <span className='goods-name'>{item.en_name}</span>
                <span className='goods-name'>{item.zh_name}</span>
              </div>
              <div>{item.price} X {item.qty}</div>
              <div>{item.total}</div>
            </div>
          ))}
        </div>
      </div>
      {/* 配送方式 */}
      <div className='send-content'>
        <div className='send-title'>配送方式：<i>快递配送</i></div>
        <div className='send-box'>
          <div className='send-item send-left-mes'>
            <span>商品件数</span>
            <span>商品总价</span>
          </div>
          <div className='send-item send-right-mes'>
            <span>{goodsNumber}</span>
            <span>{totleData.order_money}</span>
          </div>
        </div>
      </div>

      </div>
    );
  }
}

export default PayingPage;

