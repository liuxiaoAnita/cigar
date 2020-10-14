import React, { Component } from "react";

import "./index.less";
class PayingPage extends Component {
  state = {
    orderData: {

    }
  };
  componentDidMount() {
    // this.getUsers()
  }



  render() {
    const {orderData} = this.state
    return (
      <div className="order-detail-content-page">
       PayingPage
      </div>
    );
  }
}

export default PayingPage;

