import React, { Component } from "react";
import Menu from './../components/menu'
import { Tooltip, Icon, Popover, Button, Pagination, Statistic  } from "antd";


import "./index.less";
class MyOrderPage extends Component {
  state = {
    users: [],
    isPayStatus: false,
    payData: [],
    payType: 'alipay'
  };
  componentDidMount() {
    // this.getUsers()
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

  renderList = () => {
    const order = {
      "orderId": "sfhkskdjkfjslfjsljl",// 订单号
      "qty": "1",// 订单商品数量
      "amount": "122",// 订单金额
      "createDate": "2020-02-02",// 下单时间
      "expCode": '快递公司编码',
      "companyName": "快递公司",
      "expNo": "快递单号",
      "status":"", //订单状态（1：待付款2：待发货3：待收货：4：已收货5：已评价）',
      "productList":[
        {
           "id":"",// 商品id
           "zh_name":"中文名",//中文名
           "en_name":"英文名",//英文名
           "baozhuang_en_name":"包装英文名",//包装英文名
           "baozhuang_zh_name":"包装中文名",//包装中文名
           "number":"111",//数量
           "price":"222",//价格
           "image":"",//图片
        },{
          "id":"",// 商品id
          "zh_name":"中文名",//中文名
          "en_name":"英文名",//英文名
          "baozhuang_en_name":"包装英文名",//包装英文名
          "baozhuang_zh_name":"包装中文名",//包装中文名
          "number":"111",//数量
          "price":"222",//价格
          "image":"",//图片
       },
      ]
    }
    const orderList = [
      {...order, orderId: '1',status : '1'},
      {...order, orderId: '2',status : '2'},
      {...order, orderId: '3',status : '3'},
      {...order, orderId: '4',status : '4'},
      {...order, orderId: '5',status : '5'},
    ]
    return (
      <div className='my-order-content'>
        <div className='order-box'>
          {orderList.map((item, index) => (
            <div className='order-item' key={`order-item-${index}-${item.orderId}`}>
              <div className={`title ${(Number(item.status) === 4 || Number(item.status) === 5) && 'get-cigar'}`}>
                <div className='left-data'>
                  <span className='date-mes'>{item.createDate}</span>
                  <span>订单号：{item.orderId}</span>
                </div>
                <div className='right-totle-price'>{item.amount}</div>
                {(Number(item.status) === 4 || Number(item.status) === 5) && (
                    <Icon type="delete" className='delete-button' onClick={() => this.handelDelete(item)} />
                )}
              </div>
              <div className='order-main-message'>
                <div className='order-left'>
                  {item.productList.map((i, k) => (
                    <div className='order-item-mes' key={`order-detail-${k}`}>
                      <img className='item-img' src={i.image} />
                      <div className='item-name-box'>
                        <span className='zh-name'>{i.zh_name}</span>
                        <span className='en-name'>{i.en_name}</span>
                        <span className=''>{i.baozhuang_en_name}</span>
                      </div>
                      <div className='item-price'>{i.price}</div>
                      <div className='item-number'>{i.number}</div>
                    </div>
                  ))}
                </div>
                <div className='kuaidi-message'>
                  <span className='kuaidi-status'>{this.switchStatus(Number(item.status), 'kuaidi')}</span>
                  <Tooltip title="请致电，联系客服"  className='send-status'>
                    <span>{this.switchStatus(Number(item.status), 'sendMes')}</span>
                  </Tooltip>
                </div>
                <div className='jiaoyi-message'>
                  <span className='jiaoyi-status'>{this.switchStatus(Number(item.status), 'jiaoyi')}</span>
                  {(Number(item.status) === 1 || Number(item.status) === 2 || Number(item.status) === 3) && (
                    <Popover className='check-send' content={this.renderWuliu(item)} title="物流信息" trigger="click">查看物流</Popover>
                  )}
                  <span className='order-detail-btn' onClick={() => this.handelDetail(item)}>订单详情</span>
                </div>
                <div className='jiaoyi-message'>
                  {Number(item.status) === 1 && <Button  type='primary' onClick={() => this.handelPayMoney(item)}>付款</Button>}
                  {(Number(item.status) === 2 || Number(item.status) === 3) && (
                    <Button type='primary' className='make-sure-get' onClick={() => this.handelGet(item)}>确认收货</Button>
                  )}
                  {(Number(item.status) === 4) && (
                    <Button onClick={() => this.handelRate(item)}>评价</Button>
                  )}
                  {(Number(item.status) === 5) && (
                    <Button type="primary" disabled>已评价</Button>
                  )}
                 
                </div>
              </div>
              
            </div>
          ))}
        </div>
        <div className='page-box'>
          <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={this.onChangePage} />
        </div>
      </div>
    )
  }

  // 页面跳转
  onChangePage = page => {
    console.log(page)
  }

  // 删除订单
  handelDelete = val => {
    console.log(val)
  }

  // 付款
  handelPayMoney = payData => {
    this.setState({
      isPayStatus: true,
      payData,
    })
  }

  // 确认收货
  handelGet = val => {
    console.log(val)
  }

  // 详情
  handelDetail = val => {
    console.log(val)
  }
  // 评价
  handelRate = val => {
    console.log(val)

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
    const {payData, payType} = this.state
    return (
      <>
        <div className='pay-background' />
        <div className='pay-box-alert'>
          <div className='pay-left-message'>
            <div className='title'>支付订单</div>
            <div className='NO-detail'>订单号：{payData.orderId}</div>
            <div className='total-money'><Statistic prefix={<span>￥</span>} value={payData.amount} precision={2} /></div>
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
    const {isPayStatus} = this.state
    return (
      <div className="my-order-content-page">
        <Menu/>
        <div className='right-order-info'>
            <div className='right-title'>订单记录</div>
            {/* {this.renderEmpty()} */}
            {this.renderList()}
        </div>
        {isPayStatus && this.renderPay()}
      </div>
    );
  }
}

export default MyOrderPage;

