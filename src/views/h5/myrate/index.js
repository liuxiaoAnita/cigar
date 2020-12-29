import React, { Component } from "react";
import {Rate, Pagination, message, Icon, Spin } from 'antd'
import { login } from "@/store/actions";
import "./index.less";
class MyRatePage extends Component {
  state = {
    loading: true,
    currentPage: 1,  
    totalPage: 1, 
    rateData: []
  };
  componentDidMount() {
    this.getRateData()
  }

  getRateData = () => {
    const { currentPage } = this.state;
    const uid = localStorage.getItem('userUid') || '';
    login({
      uid,
      cmd: 'mycommentList',
      nowPage: currentPage,
    })().then(res => {
      if (`${res.result}` === '0') {
        console.log(res.body.dataList)
        this.setState({
          rateData: res.body.dataList || [],
          totalPage: res.body.totalPage || 1,
        })
      } else {
        message.error(`${res.resultNote}`);
      }
      this.setState({loading: false})
    })
    .catch((error) => {
      this.setState({loading: false})
      message.error(error);
    });
  }

  onChange = (currentPage) => {
    this.setState({
      currentPage
    }, () => {
      this.getRateData()
    })
  }

  renderEmpty = () => (
    <div className='empty-content'>
      <Icon className='icon-image' type="profile" />
      <span className='detail-mes'>您还没有评价哦</span>
      <span className='link-content'><i className='link-url' onClick={() => this.props.history.push('/home')}>点击这里</i>去购物</span>
    </div>
  )

  render() {
    const {rateData, currentPage, totalPage, loading} = this.state
    
    return (
      <div className="h5-rate-content-page">
        <div className='header-title'></div>
        <div className='header-title fixed'>
          <div className='left-mes'>
          <Icon
            className='title-icon'
            type="left"
            onClick={() => {
              console.log(this.props.history.go(-1))
            }}
          />
          <span className='title-mes'>我的评论</span>
          </div>
        </div>
        {loading ? <Spin spinning={loading} className='right-my-rate' /> : (
        <div className='right-my-rate'>
          <div className='rate-box'>
            {rateData.map((item, index) => {
              return(
                <div className='rate-item' key={`rate-itm-${index}-${item.commentId}`}>
                  <div className='rate-title'>
                    <span className='rate-id'>订单号：{item.commentId.substr(0, 10)}</span>
                    <span className='rate-date'>{item.create_date}</span>
                  </div>
                  <div className='rate-detail'>
                    <div className='left-mess'>
                      <span className='rate-conent'>{item.conent}</span>
                      <div className='detail-star'>
                        <span className='fenshu'>{item.fen}</span>
                        <Rate className='rate-star' allowHalf defaultValue={Number(item.point)} />
                      </div>
                    </div>
                    <div className='right-mess' onClick={() => {this.props.history.push(`/detail?id=${item.id}`)}}>
                      <img className='goods-img' src={item.image} />
                      <div className='detail-name-box'>
                        <span>{item.zh_name}</span>
                        <span>{item.en_name}</span>
                        <span>{item.baozhuang_zh_name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='page-box'>
            <Pagination showQuickJumper defaultCurrent={currentPage} total={totalPage} onChange={this.onChange} />
          </div>
          </div>
          )}
      </div>
    );
  }
}

export default MyRatePage;

