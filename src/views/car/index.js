import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import NotLogin from '../error/nologin/index'
import { Divider, Button, InputNumber, Icon } from 'antd'
import { getUsers } from "@/api/user";

import "./index.less";

class CarPage extends Component {
  state = {
    users: [],
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
    this.getUsers()
  }
  onChangeNumber = (value) => {
    console.log('changed', value);
  }

  renderBusRight = () => {
    return (
      <div className='car-right'>
      <div className='right-title'>订单详情</div>
      <div className='right-conent'>
        <div className='price-content'>
          <div className='right-detail'>
            <span className='name'>原价</span><span className='price'>¥ 990.12</span>
          </div>
          <div className='right-detail'>
            <span className='name'>推广价</span><span className='price'>¥ ¥ 950.32</span>
          </div>
          <div className='right-detail'>
            <span className='name'>优惠折扣</span><span className='price'>¥ 10.32</span>
          </div>
        </div>
        <div className='totle-price-content'>
          <Divider dashed style={{background: '#626262', }} />
          <div className='totle-name'>订单金额</div>
          <div className='totle-price'>¥ 940.00</div>
          <Button className='totle-btn' type="primary">去结账</Button>
        </div>
      </div>
    </div>
    )
  }

  renderBusLeft = () => {
    const shopaData = [
      {imgUrl: '', name: '比雅达 蜜饯', nameEng: 'Jose L. Piedra Conservas', guiGe: '25支/盒', priceBefore: 'US$ 87.00', price: 'US$ 73.95', number: '1', totlePrice: 'US$ 73.95'},
      {imgUrl: '', name: '比雅达 蜜饯', nameEng: 'Jose L. Piedra Conservas', guiGe: '25支/盒', priceBefore: 'US$ 87.00', price: 'US$ 73.95', number: '1', totlePrice: 'US$ 73.95'},
      {imgUrl: '', name: '比雅达 蜜饯', nameEng: 'Jose L. Piedra Conservas', guiGe: '25支/盒', priceBefore: 'US$ 87.00', price: 'US$ 73.95', number: '1', totlePrice: 'US$ 73.95'},
      {imgUrl: '', name: '比雅达 蜜饯', nameEng: 'Jose L. Piedra Conservas', guiGe: '25支/盒', priceBefore: 'US$ 87.00', price: 'US$ 73.95', number: '1', totlePrice: 'US$ 73.95'},
    ]
    return(
      <div className='left-mes'>
            <div className='bus-title-mes'>
              <span className='image'>产品</span>
              <span className='name'></span>
              <span className='price'>价格</span>
              <span className='number'>数量</span>
              <span className='totle'>小计</span>
            </div>
            {shopaData.map((item, index) => {
              return(
                <div key={`car-detail-${index}`} className='detail-box'>
                  <img src={item.imgUrl} className='thing-image' />
                  <div className='item-name-show'>
                    <span>{item.name}</span>
                    <span>{item.nameEng}</span>
                    <span>{item.guiGe}</span>
                  </div>
                  <div className='item-price-content'>
                    <del className='price-del'>{item.priceBefore}</del>
                    <div className='price-now'>{item.price}</div>
                  </div>
                  <InputNumber className='item-num-input' size="large" min={1} max={100000} defaultValue={1} onChange={() => this.onChangeNumber()} />
                  <div className='item-price-totle'>{item.totlePrice}</div>
                  <Button className='btn-delete' type="primary" shape="circle" icon="delete" title="删除" />
                </div>
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

  render() {
    const { users } = this.state
   
    return (
      <div className='car-page'>
          {/* 未登录 */}
        {/* <NotLogin /> */}
        <div className="car-shop-content">
          <div className='car-title'>购物车</div>
          <div className='car-detail'>
            {/* {this.renderBusLeft()}
            {this.renderBusRight()} */}
            {this.renderEmpty()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CarPage);
