import React, { Component } from "react";
import {Icon, Modal, Form, Input, message, DatePicker } from 'antd'
import { login } from "@/store/actions";
import UserImg from '@/assets/images/user_img.png'
import CascaderCity from '../components/CascaderCity'
import Menu from './../components/menu'

import "./index.less";
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const { TextArea } = Input;
class User extends Component {
  state = {
    uid: '',
    userInfo: {
      nickname: '',
      sex:'',
      email: '',
      birth:'',
    },
    receiveMes:{},
    visibleUserInfo: false,
    visibleAddress: false,
    modalUserInfo: {},
    modalAddress: {},
  };

  componentDidMount() {
    this.init();
    this.initAddressGet();
  }

  init = () =>{
    const {userInfo} = this.state
    const uid = JSON.parse(localStorage.getItem('userUid'))
    if (uid && uid !== '') {
      const userInfoNew = JSON.parse(localStorage.getItem('userInfoMes'))
      this.setState({
        uid,
        userInfo: {
          ...userInfo,
          ...userInfoNew,
        }
      })
    } else {
      message.error('登录时效，请重新登录')
      setTimeout(() => {
        this.props.history.push("/login");
      }, 1500);
    }
  }

  initAddressGet = () => {
    const uid = JSON.parse(localStorage.getItem('userUid'))
    console.log(uid)
    login({cmd: 'getAddressList', uid})()
      .then(res => {
        console.log(res)
        if(`${res.result}` === '0'){
          // message.success('修改成功')

        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
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
          <Icon className='btn-item' type="edit" onClick={() => {
            this.setState({visibleAddress: true}
          )}} />
          <Icon className='btn-item' type="delete" />
        </div>
      </div>
    )
  }

  // 用户信息弹窗js
  changeModalInfo = (value, key) => {
    const {modalUserInfo} = this.state;
    modalUserInfo[key] = value;
    this.setState({
      modalUserInfo,
    })
  }

  handleOkInfo = () => {
    const {modalUserInfo} = this.state;
    const {nickname = '', sex = '', birth = ''} = modalUserInfo
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
    console.log(modalUserInfo)
    this.changeUserMes();
    this.setState({
      visibleUserInfo: false,
    });
  }

  changeUserMes = () => {
    const {modalUserInfo, uid} = this.state;
    login({cmd: 'editUserInfo', uid, ...modalUserInfo})()
      .then(res => {
        console.log(res)
        if(`${res.result}` === '0'){
          message.success('修改成功')
          this.initAddressGet()
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }
  reGetUserInfo = () =>{
    const {uid} = this.state;
    const params = {cmd: 'userInfo', uid}
    login(params)()
      .then((res) => {
        if (`${res.result}` === '0') {
          localStorage.setItem('userInfoMes', JSON.stringify(res.body))
          this.setState({
            userInfo: res.body
          })
        } else {
          message.error(`${res.resultNote}`);
        }
       
      })
      .catch((error) => {
        message.error(error);
      });    
  }

  renderUserInfo = () => {
    const {modalUserInfo, visibleUserInfo} = this.state;
    const {nickname = '', sex = '', email = '', birth = ''} = modalUserInfo
    const defaltData = {}
    if (birth !== ''){
      defaltData.defaultValue = moment(birth, dateFormat)
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
            <Input className='item-detail' value={nickname} onChange={e => this.changeModalInfo(e.target.value, 'nickname')} />
          </div>
          <div className='info-item'>
            <span className='item-left-title'>性别：</span>
            <div className='item-detail gender-box'>
              <span className={`gender-item ${sex === '男' ? 'active' : ''}`} onClick={() => this.changeModalInfo('男', 'sex')}>男</span>
              <span className={`gender-item ${sex === '女' ? 'active' : ''}`}  onClick={() => this.changeModalInfo('女', 'sex')}>女</span>
            </div>
          </div>
          <div className='info-item'>
            <span className='item-left-title'>生日：</span>
            <DatePicker className='item-detail' onChange={(mom,val) => this.changeModalInfo(val, 'birth')}  {...defaltData} format={dateFormat} />
          </div>
        </div>
      </Modal>
    )
  }

  // 地址弹窗中的js
  handleOkAdd = e => {
    const {modalAddress} = this.state;
    const {name = '', phone = '', province_city_town = [], address = ''} = modalAddress
    if (name === ''){
      message.error('填写姓名')
      return;
    } else if (phone === ''){
      message.error('填写电话')
      return;
    } else if (province_city_town === []){
      message.error('填写省市区')
      return;
    } else if (address === ''){
      message.error('填写详细地址')
      return;
    }
    const {uid} = this.state;
    const params = {cmd: 'addAddress', uid, ...modalAddress}
    login(params)()
      .then((res) => {
        if (`${res.result}` === '0') {
          message.success('地址添加成功！')
          console.log(res)
        } else {
          message.error(`${res.resultNote}`);
        }
       
      })
      .catch((error) => {
        message.error(error);
      }); 

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
    const {modalAddress} = this.state;
    modalAddress[key] = value
    this.setState({
      modalAddress,
    })
  }

  changeModalMesCity = (value, key) => {
    const {modalAddress} = this.state;
    modalAddress[key] = value.messageZH || ''
    modalAddress['cityCode'] = value.message || ''
    this.setState({
      modalAddress,
    })
  }

  renderAddressNewEdit = () => {
    const {visibleAddress, modalAddress} = this.state;
    const {name = '', phone = '', proviceCity = [], address = ''} = modalAddress
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
              <CascaderCity defaultValue={proviceCity} onChange={value => this.changeModalMesCity(value, 'province_city_town')} />
          </div>
          <div className='address_item detail_address'>
              <TextArea placeholder='详细地址' rows={4} value={address}  onChange={e => this.changeModalMes(e.target.value, 'address')}/>
          </div>
        </div>
      </Modal>
    )
  }

  goChangePassword = () => {
    this.props.history.push("/forget");
  }

  render() {
    const { userInfo } = this.state
    const { nickname = '', sex = '', email = '', birth = '' } = userInfo;
    return (
      <div className="myself-container">
        <Menu/>
        <div className='right-user-info'>
          <div className='right-title'>账户信息</div>
          <div className='user-mes'>
            <img src={UserImg} className='user-img' />
            <div className='detail-mes'>
              <div className='detail-item'>
                <span className='item-message'>{nickname}&nbsp;&nbsp;&nbsp;&nbsp;{sex}</span>
              </div>
              <div className='detail-item'>
                <span className='item-message'>{email}</span>
                <span className='item-message'>生日：{birth}</span>
                <span className='item-message'>
                  <i className='item-btn' onClick={() => {
                    const {userInfo} = this.state;
                    this.setState({
                      visibleUserInfo: true,
                      modalUserInfo: {...userInfo}
                    })
                  }}>编辑</i>
                  <i className='item-btn' onClick={this.goChangePassword}>修改密码</i>
                </span>
              </div>
            </div>
          </div>

          <div className='right-title'>收货地址</div>
          <div className='my-address'>
            <div onClick={() => { this.setState({visibleAddress: true})}} className='address address-empty'>
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
// export default withRouter(connect({ login })(User));
