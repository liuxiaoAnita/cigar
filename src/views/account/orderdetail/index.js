import React, { Component } from "react";
import { Tooltip, Icon, Popover, Button, Pagination, Statistic  } from "antd";


import "./index.less";
class OrderDetailPage extends Component {
  state = {
    users: [],
    isPayStatus: false,
    payData: [],
    payType: 'alipay'
  };
  componentDidMount() {
    // this.getUsers()
  }


  renderList = () => {
    return (
      <div>8888</div>
    )
  }


  render() {
    const {isPayStatus} = this.state
    return (
      <div className="order-detail-content-page">
        <div className='right-order-info'>
            <div className='right-title'>订单详情</div>
            {this.renderList()}
        </div>
        {isPayStatus && this.renderPay()}
      </div>
    );
  }
}

export default OrderDetailPage;

