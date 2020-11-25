import React, { Component } from "react";
import {Button, Icon} from 'antd'

import "./index.less";
class PayingPage extends Component {
  state = {
    orderData: {
      addressShowAll: false,
    },
    addressSelected: {id: ''},

  };
  componentDidMount() {
    
  }
  componentWillReveiveProps() {
    console.log('this.props===============goodsList')
    console.log(this.props.goodsList)
  }

  handelAdress = addressSelected => {
    this.setState({
      addressSelected
    })
  }



  render() {
    const {orderData, addressShowAll, addressSelected} = this.state
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
    const dataList = [
      {...dataItem,id:1},
      {...dataItem,id:2},
      {...dataItem,id:3},
      {...dataItem,id:4},
      {...dataItem,id:5},
    ]
    const goodsList = [goodItem,goodItem,goodItem,goodItem,goodItem,]
    let goodsNumber = 0;
    goodsList.forEach(i => goodsNumber += Number(i.qty))
    const totleData = {
      "old_money":"原价",
        "order_money": "12321",//推广价
        "coupon_money": "232"//优惠价
    }
    console.log(addressSelected)
    return (
      <div className="order-detail-content-page">
       <div className='title-name'>确认订单</div>
        {/* 收货地址 */}
       <div className='address-content'>
          <div className='title-second'>选择收货地址</div>
          <div className={`address-box ${addressShowAll ? 'show' : 'hidden'}`}>
            {dataList.map((item, index) => (
              <div className={`address-item ${addressSelected.id === item.id ? 'selected' : ''}`} onClick={() => this.handelAdress(item)} key={`address-item-${index}-${item.id}`}>
                <span className='receive-name'>{item.name}</span>
                <span className='receive-phone'>{item.phone}</span>
                <span className='receive-address'>{item.address}</span>
                {/* <Icon className='edit-button' type="edit" /> */}
              </div>
            ))}
            <div className={`address-item add-new-address`}>添加新地址</div>
          </div>
          <div className='showAddress-btn' onClick={() => this.setState({addressShowAll: !addressShowAll})}>{addressShowAll ? '显示更多收货地址' : '隐藏部分收货地址'}</div>
       </div>
      {/* 商品信息 */}
      <div className='goods-content'>
        <span className='title-second'>商品信息</span>
        <div className='goods-detail'>
          {goodsList.map((item, index) =>(
            <div className='goods-item' key={`goods-item-${index}`}>
              <div className='left-mes'>
                <img src={item.image} />
                <div className='goods-mes-name'>
                  <span className='goods-name'>{item.zh_name}</span>
                  <span className='goods-name'>{item.en_name}</span>
                  <span className='goods-name'>{item.zh_name}</span>
                </div>
              </div>
              <div className='goods-price-num'>{item.price} X {item.qty}</div>
              <div className='goods-totle-price'>{item.total}</div>
            </div>
          ))}
        </div>
      </div>
      {/* 配送方式 */}
      <div className='send-content'>
        <div className='title-second'>配送方式：<i className='red-name'>快递配送</i></div>
        <div className='send-box'>
          <div className='send-item send-left-mes'>
            <span>商品件数</span>
            <span>商品总价</span>
          </div>
          <div className='send-item send-right-mes'>
            <span>{goodsNumber}个</span>
            <span>{totleData.order_money}</span>
          </div>
        </div>
      </div>
      {/* 总结 */}
      <div className='summary-content'>
        <div className='detail-message'>
          应付款<span>{totleData.order_money}</span>
        </div>
        <div className='button-box'>
          <Button className='back-bus'>返回购物车</Button>
          <Button className='get-order' type='primary'>立即下单</Button>
        </div>

      </div>

      </div>
    );
  }
}

export default PayingPage;

