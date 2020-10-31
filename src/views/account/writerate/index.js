import React, { Component } from "react";
import {Rate, Pagination } from 'antd'
import Menu from './../components/menu'

import "./index.less";
class MyRatePage extends Component {
  state = {
    orderList: []
    
  };
  componentDidMount() {
    // this.getUsers()
    const dataItem = {
      "productId": "",// 商品id
       "zh_name": "中文名",//中文名
       "en_name": "英文名",//英文名
       "baozhuang_en_name": "中文名中文名",//包装英文名
       "baozhuang_zh_name": "英文名英文名",//包装中文名
       "number": "1",//数量
       "price": "99",//价格
       "image": "",//图片
    };
    const orderList = [
      { productId: 1, ...dataItem },
      { productId: 2, ...dataItem },
      { productId: 3, ...dataItem }
    ]

    this.setState({
      orderList
    })

  }
  onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  }
  render() {
    const {orderList} = this.state
    
    return (
      <div className="write-rate-content-page">
        {orderList.map((item, index) => (
          <div key={`write-item-${index}`} className='write-item'>
            <div className='menu-detail-message'>
              <img src={item.image} className='detail-image' />
              <div className='detail-mess'>
                <span className='message-item'>{item.zh_name}</span>
                <span className='message-item'>{item.en_name}</span>
                <span className='message-item'>{item.baozhuang_en_name}</span>
                <span className='message-item message-price'>{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MyRatePage;

