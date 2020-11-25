import React , { useEffect, useState } from 'react';
import {withRouter} from "react-router-dom";
import { login } from "@/store/actions";
import { Button, message, Icon } from 'antd'
import { connect } from "react-redux";

import "./index.less";

const PayingPage = (props) => {
  const { goodsList, sumMoney = 0, onGoCar, saveCartOrder } = props
  const [goodsArr, setGoodsArr] = useState([]);
  const [goodsNumber, setGoodsNumber] = useState(0);
  const [addressShowAll, setAddressShowAll] = useState(false);
  const [addressSelected, setAddressSelected] = useState('');
  const [addressData, setAddressData] = useState([])

  useEffect(() => {
    console.log('====goodsList=======')
    setGoodsArr(goodsList)
    let goodsTotalNuber = 0
    goodsList.forEach(item => {
      console.log('item+++++++++++++++++++++++++++++')
      console.log(item)
      goodsTotalNuber += (item.qty || 0)
    })
    setGoodsNumber(goodsTotalNuber)
    initAddressGet();
  }, [goodsList])

  const initAddressGet = () => {
    const uid = localStorage.getItem('userUid') || ''
    login({cmd: 'getAddressList', uid})()
      .then(res => {
        console.log(res)
        if(`${res.result}` === '0'){
          // message.success('修改成功')
          setAddressData(res.body.dataList)
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

  return (
    <div className="order-detail-content-page">
       <div className='title-name'>确认订单</div>
        {/* 收货地址 */}
       <div className='address-content'>
          <div className='title-second'>选择收货地址</div>
          <div className={`address-box ${addressShowAll ? 'show' : 'hidden'}`}>
            {addressData.map((item, index) => (
              <div className={`address-item`} onClick={() => setAddressSelected(item.id)} key={`address-item-${index}-${item.id}`}>
                <span className='receive-name'>{item.name}</span>
                <span className='receive-phone'>{item.phone}</span>
                <span className='receive-address'>{item.address}</span>
                {addressSelected === item.id && <Icon className='edit-button' type="check"  />}
              </div>
            ))}
            <div className={`address-item add-new-address`} onClick={() => props.history.push('/myself')}>添加新地址</div>
          </div>
          {addressData && addressData.length > 4 && <div className='showAddress-btn' onClick={() => setAddressShowAll(!addressShowAll)}>{addressShowAll ? '显示更多收货地址' : '隐藏部分收货地址'}</div>}
       </div>
      {/* 商品信息 */}
        <div className='goods-content'>
          <span className='title-second'>商品信息</span>
          <div className='goods-detail'>
            {goodsArr.map((item, index) =>(
              <div className='goods-item' key={`goods-item-${index}`}>
                <div className='left-mes'>
                  <img src={item.image} />
                  <div className='goods-mes-name'>
                    <span className='goods-name'>{item.zh_name}</span>
                    <span className='goods-name'>{item.en_name}</span>
                    <span className='goods-name'>{item.zh_name}</span>
                  </div>
                </div>
                <div className='goods-price-num'>{item.price} X {item.qty}</div>
                <div className='goods-totle-price'>{item.total}</div>
              </div>
            ))}
          </div>
        </div>
      {/* 配送方式 */}
        <div className='send-content'>
          <div className='title-second'>配送方式：<i className='red-name'>快递配送</i></div>
          <div className='send-box'>
            <div className='send-item send-left-mes'>
              <span>商品件数</span>
              <span>商品总价</span>
            </div>
            <div className='send-item send-right-mes'>
              <span>{goodsNumber}个</span>
              <span>{sumMoney}</span>
            </div>
          </div>
        </div>
      {/* 总结 */}
        <div className='summary-content'>
          <div className='detail-message'>
            应付款<span>{sumMoney}</span>
          </div>
          <div className='button-box'>
            <Button className='back-bus' onClick={onGoCar}>返回购物车</Button>
            <Button className='get-order' onClick={() => {
              if (addressSelected === '') {
                message.error('地址不能为空')
              } else {
                saveCartOrder({addressId: addressSelected})
              }
            }} type='primary'>立即下单</Button>
          </div>
        </div>
      </div>
  );
};

export default withRouter(PayingPage);
