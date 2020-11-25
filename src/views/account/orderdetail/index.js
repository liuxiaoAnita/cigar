import React, { Component } from "react";
import { Tooltip, Icon, Popover, Button, message, Statistic  } from "antd";
import { login } from "@/store/actions";
import {getQueryVariable} from '@/utils'


import "./index.less";
const statusArr = ['', '待付款', '待发货', '待收货', '已收货', '已评价']
class OrderDetailPage extends Component {
  state = {
    orderData: {

    }
  };
  componentDidMount() {
    this.getOrderData()
  }

  getOrderData = () => {
    const orderId = getQueryVariable('orderId')
    login({
      cmd: 'getOrderById',
      orderId,
    })().then(res => {
      if (`${res.result}` === '0') {
        this.setState({
          orderData: res.body
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

  renderOrderStatus = () => {
    const {orderData} = this.state
    return(
      <>
        <div className='info-title'>订单详情</div>
        <div className='order-top'>
          <span className='order-id'>订单号：{orderData.orderId || ''}</span>
          <span className='order-status'>订单状态：{statusArr[orderData.status]}</span>
          <Button className='order-kefu'>联系客服</Button>
        </div>
      </>
    )
  }

  renderProgress = () => {
    const {orderData} = this.state
    return(
      <>
      <div className='order-progress'>
        <div className='progress progress-name'>
          {/* 订单状态（1：待付款2：待发货3：待收货：4：已收货5：已评价） */}
          <span className={`progress-item selected`}>下单</span>
          <span className={`progress-item ${orderData.status >= 2 && 'selected'}`}>付款</span>
          <span className={`progress-item ${orderData.status >= 3 && 'selected'}`}>已发货</span>
          <span className={`progress-item ${orderData.status >= 4 && 'selected'}`}>交易成功</span>
        </div>
        <div className='progress progress-time'>
          <span className='progress-item'>{orderData.createDate}</span>
          <span className='progress-item'>{orderData.payTime}</span>
          <span className='progress-item'>{orderData.sendTime}</span>
          <span className='progress-item'>{orderData.reciveOrderTime}</span>
        </div>
      </div>
      <div className='wuliu-detail'>物流公司：{orderData.companyName}&nbsp;&nbsp;&nbsp;&nbsp;{orderData.expNo ? `运单号：${orderData.expNo}` :''}</div>
      </>
    )
  }

  renderOrderDetail = () => {
    const {orderData} = this.state
    return (
      <>
      <div className='title-mess'>商品信息</div>
      <div className='detail-box-content'>
        {orderData.dataList && orderData.dataList.map((item, index) =>(
          <div className='detail-item-mes' key={`detail-item-${index}`}>
            <div className='left-message'>
              <img src={item.image} />
              <div className='name-message'>
                <span>{item.zh_name}</span>
                <span>{item.en_name}</span>
                <span>{item.baozhuang_en_name}</span>
              </div>
            </div>
            <div className='right-message'>
              <span>${item.price}&nbsp;&nbsp;X&nbsp;&nbsp;{item.number}</span>
            </div>
          </div>
        ))}
      </div>
      </>
    )
  }

  renderReceiveMes = () => {
    const {orderData} = this.state
    return (
      <>
      <div className='title-mess'>收货信息</div>
      <div className='receive-box-content'>
        <span className='receive-item'><i className='name'>姓名：</i>{orderData.userName}</span>
        <span className='receive-item'><i className='name'>联系电话：</i>{orderData.userPhone}</span>
        <span className='receive-item'><i className='name'>收货地址：</i>{orderData.address}</span>
      </div>
      </>
    )
  }

  renderPayStatus = () => {
    const {orderData} = this.state
    return(
      <>
      <div className='title-mess'>支付方式</div>
      <div className='receive-box-content'>
        {/* （1：微信2：支付宝） */}
        <span className='receive-item'><i className='name'>支付方式：</i>{Number(orderData.pay_type) === 1 ? '微信' : '支付宝'}</span>
      </div>
      </>
    )
  }

  renderGoodsTotal = () =>{
    const {orderData} = this.state
    return(
      <div className='summary-bottom-content'>
        <div className='item left'>
          <span>商品总价：</span>
          <span>运费：</span>
        </div>
        <div className='item right'>
          <span>{orderData.goodsmoney}</span>
          <span>{orderData.sendMoney}</span>
        </div>
      </div>
    )
  }

  render() {
    const {orderData} = this.state
    return (
      <div className="order-detail-content-page">
        <div className='order-info'>
          {this.renderOrderStatus()}
          {this.renderProgress()}
          <div className='order-detail-content'>
            {/* 订单中产品的list */}
            {this.renderOrderDetail()}
            {/* 渲染收货地址 */}
            {this.renderReceiveMes()}
            {/* 支付方式 */}
            {this.renderPayStatus()}
            {/* 商品总价 */}
            {this.renderGoodsTotal()}
            <div className='real-money-totle'>实付金额：{orderData.amount} </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetailPage;

