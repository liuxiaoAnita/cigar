import React, { Component } from "react";
import { Tooltip, Icon, Popover, Button, Pagination, Statistic, message, Popconfirm, Spin  } from "antd";
import { login } from "@/store/actions";


import "./index.less";
class MyOrderPage extends Component {
  state = {
    loading: true,
    visibleWuLiu: false,
    users: [],
    isPayStatus: false,
    payData: [],
    totalPage: 1,
    currentPage: 1,
    payDataDetail: {},
    payType: 'alipay'
  };
  componentDidMount() {
    this.getOrderList()
  }

  getOrderList = () => {
    const { currentPage } = this.state
    this.setState({loading: true})
    const uid = localStorage.getItem('userUid') || ''
    login({
      uid,
      cmd: 'orderList',
      nowPage: currentPage,
    })().then(res => {
      if (`${res.result}` === '0') {
        console.log(res.body.dataList)
        this.setState({
          payData: res.body.dataList || [],
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

  renderEmpty = () => (
    <div className='empty-content'>
      <Icon className='icon-image' type="profile" />
      <span className='detail-mes'>您还没有订单哦</span>
      <span className='link-content'><i className='link-url' onClick={() => this.props.history.push('/home')}>点击这里</i>去购物</span>
    </div>
  )

  switchStatus = (value, key) => {
    let switchVal = {}
    switch(value){
      case 1:
        switchVal = {
          kuaidi: '未发货',
          sendMes: '退款/退货',
          jiaoyi: '待付款',
        };
        break;
      case 2:
        switchVal = {
          kuaidi: '未发货',
          sendMes: '退款/退货',
          jiaoyi: '待发货',
        };
      break;
      case 3:
        switchVal = {
          kuaidi: '已发货',
          sendMes: '退款/退货',
          jiaoyi: '物流运输中',
        };
      break;
      case 4:
        switchVal = {
          kuaidi: '已签收',
          sendMes: '申请售后',
          jiaoyi: '交易完成',
        };
      break;
      case 5:
        switchVal = {
          kuaidi: '已签收',
          sendMes: '申请售后',
          jiaoyi: '交易完成',
        };
      break;
      default:
        break;
    }
    return switchVal[key]
  }

  getWuLiuData = val => {
    console.log(val.orderId)
    login({
      cmd: 'getLogisticsInfo',
      id: val.orderId,
    })().then(res => {
      if (`${res.result}` === '0') {
        console.log(res.body.dataList)
       
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

  renderList = () => {
    const { payData, currentPage, totalPage } = this.state;
    return (
      <div className='my-order-content'>
        <div className='order-box'>
          {payData && payData.map((item, index) => (
            <div className='order-item' key={`order-item-${index}-${item.orderId}`}>
              <div className={`title ${(Number(item.status) === 4 || Number(item.status) === 5) && 'get-cigar'}`}>
                <div className='left-data'>
                  <span>订单号：{item.orderId}</span>

                </div>
                <div className='right-status'>
                  {(Number(item.status) === 4 || Number(item.status) === 5) && (
                    <Popconfirm
                      title="确认删除该订单？"
                      onConfirm={() => this.handelDelete(item)}
                      okText="删除"
                      cancelText="取消"
                    >
                      <Icon type="delete" className='delete-button' />
                    </Popconfirm>
                  )}
                  <span className='status-mes'>{this.switchStatus(Number(item.status), 'kuaidi')}</span>
                </div>
               
              </div>
              <div className='order-main-message'>
                <div className='order-left'>
                  {item.productList.map((i, k) => (
                    <div className='order-item-mes' onClick={() => this.props.history.push(`/detail?id=${i.id}`)} key={`order-detail-${k}`}>
                      <img width='72' height='91' className='item-img' src={i.image} />
                      <div className='item-name-box'>
                        <span className='zh-name'>{i.zh_name}</span>
                        <span className='en-name'>{i.en_name}</span>
                        <span className=''>{i.baozhuang_en_name}</span>
                      </div>
                      <div className='price-box'>
                        <div className='item-price'>￥{i.price}</div>
                        <div className='item-number'>×{i.number}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='jiaoyi-message'>
                  <div>
                  {(Number(item.status) === 4 || Number(item.status) === 5) && (
                    <Tooltip title="请致电，联系客服"  className='send-status'>
                      <Button>{this.switchStatus(Number(item.status), 'sendMes')}</Button>
                    </Tooltip>
                  )}
                  </div>
                    <div>
                      <span className='item-totle-amount'>总价：<i>{item.amount}</i></span>
                  
                    {Number(item.status) === 1 && <Button  type='primary' onClick={() => this.handelPayMoney(item)}>付款</Button>}
                    {(Number(item.status) === 2 || Number(item.status) === 3) && (
                      <Button type='primary' className='make-sure-get' onClick={() => this.handelGet(item)}>确认收货</Button>
                    )}
                    {(Number(item.status) === 4) && (
                      <Button onClick={() => this.handelRate(item)}>评价</Button>
                    )}
                    {(Number(item.status) === 5) && (
                      <Button type="primary" disabled>评价完成</Button>
                    )}
                  
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
        <div className='page-box'>
          <Pagination showQuickJumper defaultCurrent={currentPage} total={totalPage} onChange={this.onChangePage} />
        </div>
      </div>
    )
  }

  // 页面跳转
  onChangePage = currentPage => {
    console.log(currentPage)
    this.setState({
      currentPage,
    }, () => {
      this.getOrderList()
    })
  }

  // 删除订单
  handelDelete = val => {
    console.log(val)
    const uid = localStorage.getItem('userUid') || ''
    login({
      uid,
      cmd: 'deleteOrder',
      id: val.orderId,
    })().then(res => {
      if (`${res.result}` === '0') {
        message.success('删除成功')
        this.getOrderList()
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

  // 付款
  handelPayMoney = payDataDetail => {
    console.log(payDataDetail)
    this.setState({
      isPayStatus: true,
      payDataDetail,
    })
  }

  // 确认收货
  handelGet = val => {
    const uid = localStorage.getItem('userUid') || ''
    login({
      uid,
      cmd: 'getOrder',
      id: val.orderId,
    })().then(res => {
      if (`${res.result}` === '0') {
        message.success('收货成功！');
        this.getOrderList();
      } else {
        message.error(`${res.resultNote}`);
      }
      this.setState({loading: false})
    })
    .catch((error) => {
      this.setState({loading: false})
      message.error(error);
    });
    console.log(val)
  }

  // 详情
  handelDetail = val => {
    const {orderId} = val
    this.props.history.push(`/orderdetail?orderId=${orderId}`)

  }
  // 评价
  handelRate = val => {
    const {orderId} = val
    console.log(val)
    this.props.history.push(`/writerate?orderId=${orderId}`)
  }

  // 查看快递信息
  renderWuliu = value => {
    const {
      expCode = '快递公司编码',
      companyName ="快递公司",
      expNo = "快递单号",
    } = value
    return (
      <div>
        <p>物流名称：{companyName}</p>
        <p>快递单号：{expNo}</p>
      </div>
    );
  }

  // 支付弹窗的页面
  renderPay = () => {
    const {payDataDetail, payType} = this.state
    return (
      <>
        <div className='pay-background' />
        <div className='pay-box-alert'>
          <div className='pay-left-message'>
            <div className='title'>支付订单</div>
            <div className='NO-detail'>订单号：{payDataDetail.orderId}</div>
            <div className='total-money'><Statistic prefix={<span>￥</span>} value={payDataDetail.amount} precision={2} /></div>
            <div className='check-title'>选择支付方式</div>
            <Button
              onClick={() => this.setState({payType: 'alipay'})}
              className=''
              className={`alipay-btn ${payType === 'alipay' && 'selected'}`}
              icon="alipay-circle"
            >
              支付宝支付
            </Button>
            <Button
              onClick={() => this.setState({payType: 'wechat'})}
              className={`wechat-btn ${payType === 'wechat' && 'selected'}`}
              icon="wechat"
            >
              微信支付
            </Button>
          </div>
          {payType === 'alipay' &&  (
            <div className='pay-right-QRCode alipay'>
              支付宝二维码
            </div>
          )}
          {payType === 'wechat' &&  (
            <div className='pay-right-QRCode wechat'>
              微信的二维码
            </div>
          )}
         
          <div className='close-btn' onClick={() => this.setState({isPayStatus: false})}>X</div>
        </div>
      </>
    )
  }

  render() {
    const {payData, isPayStatus, loading} = this.state
    return (
      <div className="my-order-h5-page">
        <div className='header-title fixed'>
          <Icon
            className='title-icon'
            type="left"
            onClick={() => {
              console.log(this.props.history.go(-1))
            }}
          />
          <span className='title-mes'>我的订单</span>
        </div>
        <div className='header-title'>
          <Icon
            className='title-icon'
            type="left"
            onClick={() => {
              console.log(this.props.history.go(-1))
            }}
          />
          <span className='title-mes'>我的订单</span>
        </div>
        <Spin spinning={loading} >
          <div className='order-info'>
              {(payData && payData.length > 0) ? this.renderList() : this.renderEmpty()}
          </div>
        </Spin>
        {isPayStatus && this.renderPay()}
      </div>
    );
  }
}

export default MyOrderPage;

