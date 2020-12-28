import React, { Component } from "react";
import {message, Icon, Drawer, Button, Modal, DatePicker, Input} from 'antd';
import KeFu from '@/components/KeFu'
import {login} from "@/store/actions";
import moment from 'moment';

import "./index.less";

const dateFormat = 'YYYY/MM/DD';
class MyselfPage extends Component {
  state = {
    isLogin: false,
    isShowKeFu: false,
    userMes: {},
    visibleSettingDrawer: false,
    visibleMesDrawer: false,
    editUserStatus: false,
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
        <Icon type="setting" className='setting-btn' onClick={() => {
          this.setState({
            visibleSettingDrawer: true,
          })
        }} />
        <div className='user-detail-mes'>
          <img className='user-icon' src={icon} />
          <div className='user-mes'>
            <span className='nickname'>{nickname}</span>
            <span className='sex-user'>{sex === '女' ? '女士' : '先生'}</span>
          </div>
          <div className='user-id'>id:</div>
        </div>
        <div className='other-item'>
          <span className='item' onClick={() => this.setState({visibleMesDrawer: true})}>账户信息 <i>{email}</i></span>
          <span className='item' onClick={() => this.props.history.push('/myaddress')} >收货地址</span>
          <span className='item' onClick={() => this.props.history.push('/myorder')}>我的订单</span>
          <span className='item'>心愿单</span>
          <span className='item'>我的评价</span>
        </div>
      </div>
    )
  }

  onClose = () => {
    this.setState({
      visibleSettingDrawer: false,
      visibleMesDrawer: false,
    });
  }

  handleLogout = () => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        localStorage.clear();
        window.location.reload();
      },
    });
  };

    // 用户信息弹窗js
    changeModalInfo = (value, key) => {
      const { userMes } = this.state;
      userMes[key] = value;
      this.setState({
        userMes,
      })
    }

    handelSaveUser = () => {
      const {userMes} = this.state;
      const {nickname = '', sex = '', birth = ''} = userMes
      if (nickname === ''){
        message.error('填写姓名')
        return;
      } else if (sex === ''){
        message.error('选择性别')
        return;
      } else if (birth === ''){
        message.error('选择生日')
        return;
      }
      console.log(userMes)
      this.changeUserMes();
    }

    changeUserMes = () => {
    const uid = localStorage.getItem('userUid') || '';
      const {userMes} = this.state;
      login({cmd: 'editUserInfo', uid, ...userMes})()
        .then(res => {
          console.log(res)
          if(`${res.result}` === '0'){
            message.success('修改成功')
            this.getUserMes();
            this.setState({
              editUserStatus: false,
              visibleMesDrawer: false,
            })
          } else {
            message.error(`${res.resultNote}`);
          }
        })
        .catch((error) => {
          message.error(error);
        });
    }


  render() {
    const { isLogin, isShowKeFu, visibleSettingDrawer, visibleMesDrawer, userMes, editUserStatus } = this.state
    const { 
      nickname = "",
      birth = "",
      sex = "",
      wx = "" } = userMes
      const defaltData = {}
      if (birth !== ''){
        defaltData.defaultValue = moment(birth, dateFormat)
      }
      console.log(userMes)
    return (
      <div className="h5-myself-container">
        {isShowKeFu && <KeFu onChange={() => this.setState({ isShowKeFu: false})} />}
        {isLogin ? this.renderLogin() : this.renderNoLogin()}
        <Drawer
          title={false}
          placement='bottom'
          closable={false}
          onClose={this.onClose}
          visible={visibleSettingDrawer}
        >
          <div className='drawer-btn' onClick={() =>this.props.history.push('/forget')}>修改密码</div>
          <div className='drawer-btn' onClick={() => this.handleLogout()}>退出登录</div>
        </Drawer>
        <Drawer
          title={false}
          placement='right'
          closable={false}
          onClose={this.onClose}
          visible={visibleMesDrawer}
        >
          <div>
            <div className='modal-user-info'>
              <div className='info-item'>
                <span className='item-left-title'>姓名：</span>
                {editUserStatus ? 
                  <Input className='item-detail' value={nickname} onChange={e => this.changeModalInfo(e.target.value, 'nickname')} />
                : 
                  <div className='item-right-title'>{nickname}</div>
                }
              </div>
              <div className='info-item'>
                <span className='item-left-title'>性别：</span>
                {editUserStatus ? 
                  <div className='item-detail gender-box'>
                    <span className={`gender-item ${sex === '男' ? 'active' : ''}`} onClick={() => this.changeModalInfo('男', 'sex')}>男</span>
                    <span className={`gender-item ${sex === '女' ? 'active' : ''}`}  onClick={() => this.changeModalInfo('女', 'sex')}>女</span>
                  </div>
                : 
                  <div className='item-right-title'>{sex}</div>
                }
                
              </div>
              <div className='info-item'>
                <span className='item-left-title'>生日：</span>
                {editUserStatus ? 
                  <DatePicker className='item-detail' onChange={(mom,val) => this.changeModalInfo(val, 'birth')}  {...defaltData} format={dateFormat} />
                : 
                  <div className='item-right-title'>{birth}</div>
                }
              </div>
              <div className='info-item'>
                <span className='item-left-title'>微信ID：</span>
                {editUserStatus ? 
                  <Input className='item-detail' value={wx} onChange={e => this.changeModalInfo(e.target.value, 'wx')} />
                : 
                  <div className='item-right-title'>{wx}</div>
                }
              </div>
              {editUserStatus ? 
                <Button className='editUserBtn' type='primary' onClick={this.handelSaveUser}>保存</Button>
                :
                <Button className='editUserBtn' onClick={() => this.setState({editUserStatus: true})}>编辑</Button>
              }
            </div>
           
          </div>

        </Drawer>
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

