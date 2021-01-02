import React, { Component } from "react";
import {Form, Icon, Modal, Button, Drawer, message} from 'antd';
import H5Header from "@/components/H5Header";
import { connect } from "react-redux";
import {login} from "@/store/actions";

import "./index.less";
import ModalAddAress from "./ModalAddAress";
class LoginPage extends Component {
  state = {
    loginPhone: '',
    visible: false,
    rightTitleStasus: false,
    deleteId: '',
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
       {this.state.rightTitleStasus && <div className='btn-box'>
          <Icon className='btn-item' type="edit" onClick={() => {
            this.setState({
              visibleDrawer: true,
              modalAddress: {...itemData},
            }
          )}} />
            <Icon onClick={() => {
              this.setState({visible: true, deleteId: id})
            }} className='btn-item' type="delete" />
        </div>}
      </div>
    )
  }

  handelDeleAddress = () => {
    const {deleteId} = this.state
    login({cmd: 'deleteAddress', id: deleteId})()
      .then(res => {
        console.log(res)
        if(`${res.result}` === '0'){
          message.success('删除成功！');
          this.initAddressGet()
          this.setState({visible: false})
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

    // 地址弹窗中的js
    handleOkAdd = modalAddress => {
    const uid = localStorage.getItem('userUid') || ''
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
 
  handelSave = () => {
    console.log('handelSave');
    this.setState({
      rightTitleStasus: false
    })
  }

  render() {
    const { addressData, visible, rightTitleStasus, modalAddress } = this.state;
    const rightAxure = rightTitleStasus ? (
    <span className='rightTitleStasus'
      onClick={() => {
        this.setState({
          rightTitleStasus: false
        })
      }}>
        保存
      </span>
    ) : <span className='rightTitleStasus' onClick={() => this.setState({rightTitleStasus: true})}>编辑</span>;
    return (
      <div className="h5-my-address-Page" >
        <H5Header titleName='收货地址' rightAxure={rightAxure} />
        <div className='my-address'>
            {/* 收货地址进行循环展示 todo */}
            {addressData && addressData.map((item, index) => (
              <React.Fragment key={`address-item-${index}`}>
                {this.renderAddress(item)}
              </React.Fragment>
            ))}
            {addressData && addressData.length < 6 && (
              <div className='address address-empty' onClick={() => {this.setState({visibleDrawer: true})}}>
                <Icon className='icon-add' type="plus-circle" />
                <span>添加新地址</span>
              </div>
            )}
          </div>

          <Modal
            title="删除地址"
            visible={visible}
            onOk={this.handelDeleAddress}
            okText="确认"
            cancelText="取消"
          >
            <p>确认删除改地址？</p>
          </Modal>
          {this.state.visibleDrawer && <ModalAddAress  data={modalAddress}  onChange={val =>{
            this.setState({visibleDrawer: false});
            if (val) this.handleOkAdd(val.newData)}}
          />}
      </div>
    );
  }
}


const WrappedNormalLoginForm = Form.create()(LoginPage);
export default connect(null)(
  WrappedNormalLoginForm
);