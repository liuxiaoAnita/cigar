import React, { Component } from "react";
import {Icon, Modal, Form, Input, message, DatePicker } from 'antd'
import UserImg from '@/assets/images/user_img.png'
import CascaderCity from '../components/CascaderCity'
import Menu from './../components/menu'

import "./index.less";
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const { TextArea } = Input;
class User extends Component {
  state = {
    userInfo: {
      name: '刘晓美女',
      gender:'女',
      email: '999999999@qq.com',
      birthday:'',
    },
    receiveMes:{},
    visibleUserInfo: false,
    visibleAddress: false,
  };

  componentDidMount() {
    // this.getUsers()
    
  }

  renderAddress = () => {
    return  (
      <div className='address address-item'>
        <span className='shou-huo-name'>炒鸡小梅西</span>
        <span className='detail-mes'>
          <i className='phone'>13588889999</i>
          <i className='detail-address'>
          辽宁沈阳市和平区南湖街道文艺路11号华润大厦B座23楼
          </i>
        </span>
        <div className='btn-box'>
          <Icon className='btn-item' type="edit" onClick={() => {this.setState({visibleAddress: true})}} />
          <Icon className='btn-item' type="delete" />
        </div>
      </div>
    )
  }

  // 用户信息弹窗js
  changeModalInfo = (value, key) => {
    const {userInfo} = this.state;
    userInfo[key] = value;
    this.setState({
      userInfo,
    })
  }

  handleOkInfo = () => {
    const {userInfo} = this.state;
    const {name = '', gender = '', birthday = ''} = userInfo
    if (name === ''){
      message.error('填写姓名')
      return;
    } else if (gender === ''){
      message.error('选择性别')
      return;
    } else if (birthday === ''){
      message.error('选择生日')
      return;
    }
    this.setState({
      visibleUserInfo: false,
    });
  }

  renderUserInfo = () => {
    const {userInfo, visibleUserInfo} = this.state;
    const {name = '', gender = '', email = '', birthday = ''} = userInfo
    const defaltData = {}
    if (birthday !== ''){
      defaltData.defaultValue = moment(birthday, dateFormat)
    }
    return (
      <Modal
        title="收货地址"
        visible={visibleUserInfo}
        onOk={this.handleOkInfo}
        onCancel={this.handleCancelAdd}
      >
        <div className='modal-user-info'>
          <div className='info-item'>
            <span className='item-left-title'>姓名：</span>
            <Input className='item-detail' value={name} onChange={e => this.changeModalInfo(e.target.value, 'name')} />
          </div>
          <div className='info-item'>
            <span className='item-left-title'>性别：</span>
            <div className='item-detail gender-box'>
              <span className={`gender-item ${gender === '男' ? 'active' : ''}`} onClick={() => this.changeModalInfo('男', 'gender')}>男</span>
              <span className={`gender-item ${gender === '女' ? 'active' : ''}`}  onClick={() => this.changeModalInfo('女', 'gender')}>女</span>
            </div>
          </div>
          <div className='info-item'>
            <span className='item-left-title'>生日：</span>
            <DatePicker className='item-detail' onChange={(mom,val) => this.changeModalInfo(val, 'birthday')}  {...defaltData} format={dateFormat} />
          </div>
        </div>
      </Modal>
    )
  }

  // 地址弹窗中的js
  handleOkAdd = e => {
    const {receiveMes} = this.state;
    const {name = '', phone = '', proviceCity = [], detailAddress = ''} = receiveMes
    if (name === ''){
      message.error('填写姓名')
      return;
    } else if (phone === ''){
      message.error('填写电话')
      return;
    } else if (proviceCity === ''){
      message.error('填写省市区')
      return;
    } else if (detailAddress === ''){
      message.error('填写详细地址')
      return;
    }
    this.setState({
      visibleAddress: false,
    });
  };

  handleCancelAdd = e => {
    console.log(e);
    this.setState({
      visibleAddress: false,
      visibleUserInfo: false,
    });
  };

  changeModalMes = (value, key) => {
    const {receiveMes} = this.state;
    receiveMes[key] = value
    this.setState({
      receiveMes,
    })
  }

  renderAddressNewEdit = () => {
    const {visibleAddress, receiveMes} = this.state;
    const {name = '', phone = '', proviceCity = [], detailAddress = ''} = receiveMes
    const {form} = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        title="收货地址"
        visible={visibleAddress}
        onOk={this.handleOkAdd}
        onCancel={this.handleCancelAdd}
      >
        <div className='add_edit_address'>
          <div className='address_item name_phone'>
            <Input className='receive-name' placeholder="姓名" value={name} onChange={e => this.changeModalMes(e.target.value, 'name')} />
            <Input placeholder="电话" className='receive-phone' value={phone} onChange={e => this.changeModalMes(e.target.value, 'phone')}/>
        </div>
          <div className='address_item provice_city'>
              {/* <CascaderCity defaultValue={["11", "1101", "110101"]} /> */}
              <CascaderCity defaultValue={proviceCity} onChange={value => this.changeModalMes(value, 'proviceCity')} />
          </div>
          <div className='address_item detail_address'>
              <TextArea placeholder='详细地址' rows={4} value={detailAddress}  onChange={e => this.changeModalMes(e.target.value, 'detailAddress')}/>
          </div>
        </div>
      </Modal>
    )
  }

  render() {
    const { userInfo } = this.state
    const { name = '', gender = '', email = '', birthday = '' } = userInfo;
    return (
      <div className="myself-container">
        <Menu/>
        <div className='right-user-info'>
          <div className='right-title'>账户信息</div>
          <div className='user-mes'>
            <img src={UserImg} className='user-img' />
            <div className='detail-mes'>
              <div className='detail-item'>
                <span className='item-message'>{name}&nbsp;&nbsp;&nbsp;&nbsp;{gender}</span>
              </div>
              <div className='detail-item'>
                <span className='item-message'>{email}</span>
                <span className='item-message'>生日：{birthday}</span>
                <span className='item-message'>
                  <i className='item-btn' onClick={() => this.setState({visibleUserInfo: true})}>编辑</i>
                  <i className='item-btn'>修改密码</i>
                </span>
              </div>
            </div>
          </div>

          <div className='right-title'>收货地址</div>
          <div className='my-address'>
            <div className='address address-empty'>
              <Icon className='icon-add' type="plus-circle" />
              <span>添加新地址</span>
            </div>
            {/* 收货地址进行循环展示 todo */}
            {this.renderAddress()}
            {this.renderAddress()}
          </div>
        </div>
        {this.renderAddressNewEdit()}
        {this.renderUserInfo()}
      </div>
    );
  }
}

User = Form.create({})(User);

export default User;
