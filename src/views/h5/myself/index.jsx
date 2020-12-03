import React, { Component } from "react";
import {message, Icon, Drawer, Button} from 'antd';
import KeFu from '@/components/KeFu'
import {login} from "@/store/actions";

import "./index.less";

class MyselfPage extends Component {
  state = {
    isLogin: false,
    isShowKeFu: false,
    userMes: {},
  };
  componentDidMount() {
    const uid = localStorage.getItem('userUid') || '';
    if ( uid !=='' ) {
      this.setState({
        isLogin: true,
      })
      this.getUserMes()

    }
  }

  getUserMes = () => {
    const uid = localStorage.getItem('userUid') || '';
    login({uid, cmd: 'userInfo'})()
    .then(res => {
      if (`${res.result}` === '0') {
        this.setState({
          userMes: res.body,
        })
      } else {
        message.error(`${res.resultNote}`);
      }
    })
    .catch((error) => {
      message.error(error);
    });
  }

  renderNoLogin = () =>(
    <div className='h5-no-login-box'>
      <div className='top-show-mes'>
        <Icon className='user-icon' type="user" />
        <div className='top-button-box'>
          <Button className='btn' onClick={() => {
            this.props.history.push('/login')
          }} type='primary'>登录</Button>
          <Button className='btn' onClick={() => {
            this.props.history.push('/register')
          }}>注册</Button>
        </div>
      </div>
    </div>
  )

  renderLogin = () => {
    const {userMes} = this.state
    const { 
    email= "",
    icon= "",
    nickname = "",
    phone = "",
    sex = "",
    wx = "" } = userMes
    return (
      <div className='user-message-box'>
        <div className='user-detail-mes'>
          <img className='user-icon' src={icon} />
          <div className='user-mes'>
            <span className='nickname'>{nickname}</span>
            <span className='sex-user'>{sex === '女' ? '女士' : '先生'}</span>
          </div>
          <div className='user-id'>id:</div>
        </div>
        <div className='other-item'>
          <span className='item'>账户信息 <i>{email}</i></span>
          <span className='item'>收货地址</span>
          <span className='item'>我的订单</span>
          <span className='item'>心愿单</span>
          <span className='item'>我的评价</span>
        </div>
      </div>
    )
  }

  render() {
    const { isLogin, isShowKeFu } = this.state
    return (
      <div className="h5-myself-container">
        {isShowKeFu && <KeFu onChange={() => this.setState({ isShowKeFu: false})} />}
        {isLogin ? this.renderLogin() : this.renderNoLogin()}

        {/* 公共部分 */}
        <div className='other-message-box'>
          <div className='other-item'>
            <span className='item'>注册流程</span>
            <span className='item'>购物流程</span>
            <span
              className='item'
              onClick={() => {
                this.setState({
                  isShowKeFu: true,
                })
              }}
            >
              联系我们
            </span>
          </div>
          <div className='other-item'>
            <span className='item'>关于我们</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MyselfPage;
