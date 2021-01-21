import React, { Component } from "react";
import {Icon, Modal, Form, Input, message, DatePicker, Popconfirm } from 'antd'
import { login } from "@/store/actions";
import UserImg from '@/assets/images/user_img.png'
import img01 from '@/assets/UserImg/wd_tx01.png'
import img02 from '@/assets/UserImg/wd_tx02.png'
import img03 from '@/assets/UserImg/wd_tx03.png'
import img04 from '@/assets/UserImg/wd_tx04.png'
import img05 from '@/assets/UserImg/wd_tx05.png'
import img06 from '@/assets/UserImg/wd_tx06.png'
import img07 from '@/assets/UserImg/wd_tx07.png'
import img08 from '@/assets/UserImg/wd_tx08.png'
import CascaderCity from '../components/CascaderCity'
import Menu from './../components/menu'
import ModalAddAress from './ModalAddAress'

import "./index.less";
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const { TextArea } = Input;


let imageArr = [
  img01, img02, img03, img04, img05, img06, img07, img08
]
let userImageArr = []
imageArr.forEach((item, index) => userImageArr.push({
  imageUrl: item,
  id: `${index}`
}))
class User extends Component {
  state = {
    uid: '',
    addressData: [],
    userInfo: {
      nickname: '',
      sex:'',
      email: '',
      birth:'',
      icon: '',
    },
    choseTouxiang: '1',
    touxiang: '1',
    receiveMes:{},
    visibleUserInfo: false,
    visibleAddress: false,
    visibleUserImg: false,
    confirmLoading: false,
    modalUserInfo: {},
    modalAddress: {},
  };

  componentDidMount() {
    this.init();
    this.initAddressGet();
    this.reGetUserInfo();
  }

  init = () =>{
    const {userInfo} = this.state
    const uid = localStorage.getItem('userUid') || ''
    if (uid && uid !== '') {
      const userInfoNew = JSON.parse(localStorage.getItem('userInfoMes'))
      const newInfo = {
        ...userInfo,
        ...userInfoNew,
      }
      const { icon = '1' } = newInfo
      this.setState({
        uid,
        userInfo: {
          ...userInfo,
          ...userInfoNew,
        },
        touxiang: icon.charAt(icon.length - 1),
        choseTouxiang: icon.charAt(icon.length - 1),
      })
    } else {
      message.error('登录时效，请重新登录')
      setTimeout(() => {
        this.props.history.push("/login");
      }, 1500);
    }
  }

  initAddressGet = () => {
    const uid = localStorage.getItem('userUid') || ''
    login({cmd: 'getAddressList', uid})()
      .then(res => {
        console.log(res)
        if(`${res.result}` === '0'){
          // message.success('修改成功')
          this.setState({
            addressData: res.body.dataList || []
          })
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

  renderAddress = (itemData = {}) => {
    const {address, id, name, phone, province_city_town } = itemData
    return  (
      <div className='address address-item'>
        <span className='shou-huo-name'>{name}</span>
        <span className='detail-mes'>
          <i className='phone'>{phone}</i>
          <i className='detail-address'> {province_city_town}{address} </i>
        </span>
        <div className='btn-box'>
          <Icon className='btn-item' type="edit" onClick={() => {
            this.setState({
              visibleAddress: true,
              modalAddress: {...itemData},
            }
          )}} />

        <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() =>this.handelDeleAddress(id)}
            okText="Yes"
            cancelText="No"
          >
            <Icon className='btn-item' type="delete" />
          </Popconfirm>
          
        </div>
      </div>
    )
  }

  handelDeleAddress = id => {
    login({cmd: 'deleteAddress', id})()
      .then(res => {
        console.log(res)
        if(`${res.result}` === '0'){
          message.success('删除成功！');
          this.initAddressGet()
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
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
          this.reGetUserInfo()
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }
  reGetUserInfo = () =>{
    const uid = localStorage.getItem('userUid') || ''
    const params = {cmd: 'userInfo', uid}
    login(params)()
      .then((res) => {
        if (`${res.result}` === '0') {
          const { icon = '1' } = res.body;
          localStorage.setItem('userInfoMes', JSON.stringify(res.body))
          this.setState({
            userInfo: res.body,
            touxiang: icon.charAt(icon.length - 1),
            choseTouxiang: icon.charAt(icon.length - 1),
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
        title="账户信息"
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
  handleOkAdd = modalAddress => {
    const {uid} = this.state;
    const params = {cmd: `${modalAddress.id ? 'editAddress' : 'addAddress'}`, uid, ...modalAddress}
    login(params)()
      .then((res) => {
        if (`${res.result}` === '0') {
          message.success(res.resultNote)
          this.initAddressGet()
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
      modalAddress: {},
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


  goChangePassword = () => {
    this.props.history.push("/forget");
  }

  handleUserImgOk = () => {
    console.log('handleUserImgOk')
    const { choseTouxiang } = this.state;
    const uid = localStorage.getItem('userUid') || '';
    login({uid, cmd: 'editIcon', icon: choseTouxiang})()
    .then(res => {
      if (`${res.result}` === '0') {
        message.success('头像设置成功！');
        this.setState({
          visibleUserImg: false,
        })
        this.reGetUserInfo();
      } else {
        message.error(`${res.resultNote}`);
      }
    })
    .catch((error) => {
      message.error(error);
    });
  }

  render() {
    const { userInfo, addressData, modalAddress, visibleAddress, visibleUserImg, confirmLoading, touxiang, choseTouxiang } = this.state
    const { nickname = '', sex = '', email = '', birth = ''} = userInfo;
    console.log('icon')
    console.log(touxiang)
    return (
      <div className="myself-container">
        <Menu/>
        <div className='right-user-info'>
          <div className='right-title'>账户信息</div>
          <div className='user-mes'>
            <img
              alt='头像'
              src={imageArr[touxiang -1 || '1']}
              className='user-img'
              onClick={() => this.setState({ visibleUserImg: true, })}
            />

            <Modal
              title="更换头像"
              visible={visibleUserImg}
              onOk={this.handleUserImgOk}
              confirmLoading={confirmLoading}
              onCancel={() => this.setState({
                visibleUserImg: false,
                choseTouxiang: touxiang,
              })}
              okText="确认"
              cancelText="取消"
            >
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {imageArr.map((item, index) => (
                  <div key={`userImage_${index}`} onClick={() => {
                    this.setState({
                      choseTouxiang: index + 1,
                    })
                  }} style={{width: '23%', margin: '8px 0'}} className='userImgItem' >
                    <img src={item} alt='' style={{width: '100%'}}  />
                    {choseTouxiang - 1 === index && <Icon className='is-active' type="check-circle" />}
                  </div>
                ))}
              </div>
            </Modal>
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
            {addressData && addressData.length < 6 && (
              <div onClick={() => { this.setState({visibleAddress: true, modalAddress: {}})}} className='address address-empty'>
                <Icon className='icon-add' type="plus-circle" />
                <span>添加新地址</span>
              </div>
            )}
            {/* 收货地址进行循环展示 todo */}
            {addressData && addressData.map((item, index) => (
              <React.Fragment key={`address-item-${index}`}>
                {this.renderAddress(item)}
              </React.Fragment>
            ))}
          </div>
        </div>
        {this.renderUserInfo()}
        {visibleAddress && <ModalAddAress data={modalAddress} onChange={res => {this.setState({visibleAddress: false,}); if (res) this.handleOkAdd(res.newData)}} />}
      </div>
    );
  }
}

User = Form.create({})(User);
export default User;
// export default withRouter(connect({ login })(User));
