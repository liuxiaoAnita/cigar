import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import CarList from './carList';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import { getCarMes, getUserInfo, login } from "@/store/actions";

import "./index.less";
class CarPage extends Component {
  state = {
    carLisr: '',
    loginStatus: false,
    editStatus: false,
  }

  componentDidMount(){
    const userUid = localStorage.getItem('userUid') || ''
    if (userUid !== '') {
      this.setState({
        loginStatus: true,
      })
    }
  }

  renderLogin = () => (
    <div className='empty-content'>
      <Icon className='shopping-car' type="shopping-cart" />
      <span className='detail-mes'>未登录</span>
      <span className='link-content'>您可以<i className='link-url' onClick={() => this.props.history.push('/login')}>点击此处</i>去登录</span>
    </div>
  )

  render() {
    const { buyNum, isBuyNow} = this.state
    const { editStatus } = this.state
    return (
      <div className="h5-Car-Page" >
        <div className='top-title fixedTop'>购物车<span onClick={() => this.setState({editStatus: !editStatus})}>{editStatus ? '保存' : '编辑'}</span></div>
        <div className='top-title'>购物车<span></span></div>
        {
          this.state.loginStatus ? <CarList editStatus={editStatus} /> : this.renderLogin()
        }
        <div className='go-button-pay'>
          <Button type='primary' onClick={() => {
             this.props.history.push(`/car?isPay=paying`);
             this.setState({
               isPayig: true
             })
          }}>去结账</Button>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = (state) => {
  return {
    ...state,
    ...state.app,
    ...state.user,
    ...state.settings,
    ...state.car,
  };
};
export default withRouter(connect(WrappedNormalLoginForm, { login, getUserInfo, getCarMes })(CarPage));
