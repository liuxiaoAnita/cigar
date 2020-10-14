import React, { Component } from "react";
import { Tooltip, Icon, Popover, Button, Pagination, Statistic  } from "antd";


import "./index.less";
class OrderDetailPage extends Component {
  state = {
    orderData: {

    }
  };
  componentDidMount() {
    // this.getUsers()
    const orderData = {// 
      "orderId":"订单号",// 订单号
      "userName":"收货名字",// 收货名字
      "userPhone":"收货电话",// 收货电话
       "expCode": '快递公司编码',//快递公司编码
       "expNo": '快递单号',//快递单号
      "address":"地址地址地址地址地址地址",// 地址
      "companyName": '快递公司',//快递公司
      "payTime":"付款时间付款时间",// 付款时间
      "evaluate_time":"评价时间",// 评价时间
      "pay_type": '2',//支付类型（1：微信2：支付宝）
      "sendTime":"发货时间",// 发货时间
      "reciveOrderTime":"收货时间",// 收货时间
      "cancleReason":" 取消原因",// 取消原因
      "amount":"订单金额",// 订单金额
       "sendMoney":"配送费配送费",// 配送费
       "goodsmoney":"商品金额",// 商品金额
      "createDate":"下单时间",// 下单时间
      "coupon_money":" 优惠金额",// 优惠金额
      "status":"1",// 订单状态（1：待付款2：待发货3：待收货：4：已收货5：已评价）
      dataList:[{
        "productId":"111",// 商品id
         "zh_name":'中文名中文名中文名',///中文名
         "en_name":'english',////英文名
         "baozhuang_en_name":'包装英文名english',////包装英文名
         "baozhuang_zh_name":'包装中文名',////包装中文名
         "number":'10',////数量
         "price":'999.99',////价格
         "image":'src',////图片
    },{
      "productId":"111",// 商品id
       "zh_name":'中文名中文名中文名',///中文名
       "en_name":'english',////英文名
       "baozhuang_en_name":'包装英文名english',////包装英文名
       "baozhuang_zh_name":'包装中文名',////包装中文名
       "number":'10',////数量
       "price":'999.99',////价格
       "image":'src',////图片
  },{
    "productId":"111",// 商品id
     "zh_name":'中文名中文名中文名',///中文名
     "en_name":'english',////英文名
     "baozhuang_en_name":'包装英文名english',////包装英文名
     "baozhuang_zh_name":'包装中文名',////包装中文名
     "number":'10',////数量
     "price":'999.99',////价格
     "image":'src',////图片
}]
  }

  this.setState({
    orderData
  })
  }


  renderList = () => {
    return (
      <div>8888</div>
    )
  }

  renderOrderStatus = () => {
    const {orderData} = this.state
    return(
      <>
        <div className='info-title'>订单详情</div>
        <div className='order-top'>
          <span className='order-id'>订单号：{orderData.orderId || ''}</span>
          <span className='order-status'>订单状态：{orderData.status}</span>
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
          <span className='progress-item selected'>下单</span>
          <span className='progress-item'>付款</span>
          <span className='progress-item'>发货</span>
          <span className='progress-item'>交易成功</span>
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

