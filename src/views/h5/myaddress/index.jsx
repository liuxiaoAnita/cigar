import React, { Component } from "react";
import {Form, Icon, Input, Button, Popconfirm, message} from 'antd';
import { connect } from "react-redux";
import {login} from "@/store/actions";

import "./index.less";
class LoginPage extends Component {
  state = {
    loginPhone: '',
    addressData: [],
  }

  componentDidMount() {
    this.initAddressGet();
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
            title="确认删除?"
            onConfirm={() =>this.handelDeleAddress(id)}
            okText="删除"
            cancelText="取消"
          >
            <Icon className='btn-item' type="delete" />
          </Popconfirm>
          
        </div>
      </div>
    )
  }
 

  render() {
    const { addressData } = this.state;
    return (
      <div className="h5-my-address-Page" >
        <div className='my-address'>
            {addressData && addressData.length < 6 && (
              <div onClick={() => this.props.history.push('/editaddress')} className='address address-empty'>
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
    );
  }
}


const WrappedNormalLoginForm = Form.create()(LoginPage);
export default connect(null)(
  WrappedNormalLoginForm
);