import React, { Component } from "react";
import {Rate, Pagination } from 'antd'
import Menu from './../components/menu'

import "./index.less";
class MyRatePage extends Component {
  state = {
    rateData: [
      {
        "icon":"",//头像
        "nickname": '比雅达 蜜饯 Jos',//昵称
        "create_date": '2020-08-16',//时间
        "conent": '质量很好 口感好 香味很足，味道很棒！好评',//内容
        "commentId":"23653254132323563236",// 评价ID
        "point": '2.1',//评星
        "fen": '9'//分数
      },
    ]
    
  };
  componentDidMount() {
    // this.getUsers()
  }
  onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  }
  render() {
    const {rateData} = this.state
    
    return (
      <div className="my-rate-content-page">
        <Menu/>
        <div className='right-my-rate'>
          <div className='title-name'>我的评价</div>
          <div className='rate-box'>
            {rateData.map((item, index) => {
              return(
                <div className='rate-item' key={`rate-itm-${index}-${item.commentId}`}>
                  <div className='rate-title'>
                    <span className='rate-date'>{item.create_date}</span>
                    <span className='rate-id'>订单号：{item.commentId}</span>
                  </div>
                  <div className='rate-detail'>
                    <div className='left-mess'>
                      <span className='rate-conent'>{item.conent}</span>
                      <div className='detail-star'>
                        <span className='fenshu'>{item.fen}</span>
                        <Rate className='rate-star' allowHalf defaultValue={Number(item.point)} />
                      </div>
                    </div>
                    <div className='right-mess'>
                      <img className='goods-img' src={item.icon} />
                      <div className='detail-name-box'>
                        {item.nickname}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='page-box'>
            <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={this.onChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default MyRatePage;

