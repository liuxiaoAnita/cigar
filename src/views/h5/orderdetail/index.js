import React, { Component } from "react";
import { Tooltip, Icon, Popover, Button, message, Statistic  } from "antd";
import KeFu from '@/components/KeFu'
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
      <div className='order-detail-box-mes'>
        <div className='info-title'>订单详情</div>
        <div className='order-top'>
          <span className='order-id progress-item'>订单编号：{orderData.orderId || ''}</span>
          {orderData && orderData.createDate && <span className='progress-item'>下单时间：{orderData.createDate}</span>}
          {orderData && orderData.payTime && <span className='progress-item'>支付时间：{orderData.payTime}</span>}
          {orderData && orderData.sendTime && <span className='progress-item'>发货时间：{orderData.sendTime}</span>}
          {orderData && orderData.reciveOrderTime && <span className='progress-item'>签收时间：{orderData.reciveOrderTime}</span>}
        </div>
      </div>
    )
  }

  renderProgress = () => {
    const {orderData} = this.state
    return(
      <>
      <div className='wuliu-detail'>
        <Icon className='car' type="car" />

        物流信息：{orderData.companyName}&nbsp;&nbsp;&nbsp;&nbsp;{orderData.expNo ? `运单号：${orderData.expNo}` :''}</div>
      </>
    )
  }

  renderOrderDetail = () => {
    const {orderData} = this.state
    return (
      <>
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
              <span>${item.price}<br />X&nbsp;&nbsp;{item.number}</span>
            </div>
          </div>
        ))}
                    {/* 商品总价 */}
                    {this.renderGoodsTotal()}
      </div>
      </>
    )
  }

  renderReceiveMes = () => {
    const {orderData} = this.state
    return (
      <div className='receive-box-content'>
        <Icon className='environment' type="environment" />
        <div className='receive-inner'>
          <span className='receive-item'>
            <i className='name'>{orderData.userName}</i>
            <i className='name'>{orderData.userPhone}</i>
          </span>
          <span className='receive-item'>{orderData.address}</span>
        </div>
      </div>
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
          <span><i>商品总价：</i>{orderData.goodsmoney}</span>
          <span><i>运费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</i>{orderData.sendMoney}</span>
        </div>
        <div className='real-money-totle'><i>实付金额：</i>{orderData.amount} </div>

      </div>
    )
  }

  renderBottomFooter = () => {
    return(
      <>
        <div className='bottomFooter'></div>
        <div className='bottomFooter fixed'>
          <Button type='primary' onClick={() => this.setState({isShowKeFu: true})}>联系客服</Button>
          {/* <Button type='primary'>确认收货</Button> */}
        </div>
      </>
    )
  }

  render() {
    const {orderData} = this.state
    return (
      <div className="order-detail-h5-page">
        <div className='header-title car-top-mes'>
          <span>{statusArr[orderData.status]}</span>
          <Icon className='car' type="car" />
        </div>
        <div className='header-title fixed'>
          <div className='left-mes'>
          <Icon
            className='title-icon'
            type="left"
            onClick={() => {
              console.log(this.props.history.go(-1))
            }}
          />
          <span className='title-mes'>订单详情</span>
          </div>
        </div>
        <div className='order-info'>
          {this.renderProgress()}
            {/* 渲染收货地址 */}
            {this.renderReceiveMes()}
          <div className='order-detail-content'>
            {/* 订单中产品的list */}
            {this.renderOrderDetail()}
          </div>
          {/* 货物详情 */}
          {this.renderOrderStatus()}

        </div>
        {this.renderBottomFooter()}
        {this.state.isShowKeFu && <KeFu onChange={() => this.setState({isShowKeFu: false})} />}
      </div>
    );
  }
}

export default OrderDetailPage;

