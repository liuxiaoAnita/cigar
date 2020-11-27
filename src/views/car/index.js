import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import {getQueryVariable} from '@/utils'

import NotLogin from '../error/nologin/index'
import { Divider, Button, InputNumber, Icon, message } from 'antd'
import CigarItem from './CigarItem'
import { login } from "@/store/actions";
import { getUsers } from "@/api/user";

import Paying from '@/views/account/paying'

import "./index.less";

class CarPage extends Component {
  state = {
    uid: '',
    users: [],
    loading: true,
    old_money: 0,
    order_money: 0,
    coupon_money: 0,
    sum_money: 0,
    dataList: [],
    isPayig: false,
  };
  getUsers = async () => {
    const result = await getUsers()
    const { users, status } = result.data
    if (status === 0) {
      console.log('----------------')
      console.log(users)
      this.setState({
        users
      })
    }
  }

  componentDidMount() {
    const isPayig = (getQueryVariable('isPay') || '') === 'paying'
    const uid = localStorage.getItem('userUid') || ''
    this.setState({
      uid,
      isPayig,
    })
    if(uid === '') {
      message.error('未登录，跳转登录页！')
      setTimeout(() => {
        this.props.history.push('/login')
      }, 1500);
    } else {
      this.getUsers()
      this.getCartList()
    }
    
  }

  // login
  getCartList = () => {
    const uid = localStorage.getItem('userUid') || ''
    login({cmd: 'cartList', uid})()
      .then((res) => {
        if (`${res.result}` === '0') {
          console.log(res.body)
          const {body = {}} = res
          const {old_money = 0, order_money = 0, coupon_money = 0, sum_money = 0, dataList = []} = body
          this.setState({
            ...this.state,
            old_money,
            order_money,
            coupon_money,
            sum_money,
            dataList,
          })
        } else {
          message.error(`${res.resultNote}`);
        }
        this.setState({loading: false})
      })
      .catch((error) => {
        this.setState({loading: false})
        message.error(error);
      });
  }

  handelEditNum = (params) => {
    const uid = localStorage.getItem('userUid') || ''
    return new Promise((resolve, reject) => {
      login({uid, ...params})()
      .then((res) => {
          resolve(res)
      })
      .catch((err) => {
        reject(err)
      });
    })
  }

  onChangeNumber = (value) => {
    console.log('changed', value);
  }

  handelSaveCar = () =>{
    this.handelEditNum({cmd: 'saveCartOrder'})
  }

  renderBusRight = () => {
    const {old_money, order_money, coupon_money, sum_money} = this.state
    return (
      <div className='car-right'>
      <div className='right-title'>订单详情</div>
      <div className='right-conent'>
        <div className='price-content'>
          <div className='right-detail'>
            <span className='name'>原价</span><span className='price'>¥ {old_money}</span>
          </div>
          <div className='right-detail'>
            <span className='name'>推广价</span><span className='price'>¥ {order_money}</span>
          </div>
          <div className='right-detail'>
            <span className='name'>优惠折扣</span><span className='price'>¥ {coupon_money}</span>
          </div>
        </div>
        <div className='totle-price-content'>
          <Divider dashed style={{background: '#626262', }} />
          <div className='totle-name'>订单金额</div>
          <div className='totle-price'>¥ {sum_money}</div>
          <Button className='totle-btn' type="primary" onClick={() => {this.setState({isPayig: true})}}>去结账</Button>
        </div>
      </div>
    </div>
    )
  }

  handelChangeNum = (type) => {
    console.log(type)
  }

  renderBusLeft = () => {
    const {dataList} = this.state
    return(
      <div className='left-mes'>
            <div className='bus-title-mes'>
              <span className='image'>产品</span>
              <span className='name'></span>
              <span className='price'>价格</span>
              <span className='number'>数量</span>
              <span className='totle'>小计</span>
            </div>
            {dataList.map((item, index) => {
              return(
                <React.Fragment  key={`car-detail-${index}`}>
                  <CigarItem
                    data={item}
                    handelEditNum={this.handelEditNum}
                    onChange={this.getCartList}
                  />
                </React.Fragment>
              )
            })}
          </div>
    )
  }

  renderEmpty = () => (
    <div className='empty-content'>
      <Icon className='shopping-car' type="shopping-cart" />
      <span className='detail-mes'>你的购物车还是空的</span>
      <span className='link-content'>您可以<i className='link-url' onClick={() => this.props.history.push('/home')}>点击此处</i>去购物</span>
    </div>
  )
  saveCartOrder = ({addressId = ''}) => {
    const { dataList } = this.state
    const cartList = [];
    dataList.forEach(item => {
      cartList.push(item.id)
    })
    this.handelEditNum({
      cmd: 'saveCartOrder',
      addressId,
      cartList,
    }).then(res => {
      if(res.result === '0') {
        this.props.history.push('/myorder')
      } else {
        message.error(res.resultNote)
      }
    })
  }

  render() {
    const { users } = this.state
    const {dataList,  isPayig, sum_money, } = this.state
    return (
      <div className='car-page'>
        {/* 未登录 */}
        {isPayig ? (
          <Paying
            goodsList={dataList} 
            sumMoney={sum_money}
            onGoCar={() => this.setState({isPayig: false})}
            saveCartOrder={this.saveCartOrder}
          />) : (
        <div className="car-shop-content">
          <div className='car-title'>购物车</div>
          <div className='car-detail'>
            {dataList.length > 0 ? (<>{this.renderBusLeft()} {this.renderBusRight()} </>) : this.renderEmpty() }
            {}
          </div>
        </div>
        )}
       
        
      </div>
    );
  }
}

export default withRouter(CarPage);
