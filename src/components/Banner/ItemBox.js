import React , { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { login } from "@/store/actions";
import { Rate, Avatar } from 'antd';
// import { connect } from "react-redux";

import "./ItemBox.less";
import { message } from 'antd';

const BannerTop = (props) => {
  const { item, onclick } = props

  const addCarAction = () => {
    const uid = localStorage.getItem('userUid') || ''
    if (uid === '') {
      message.info('未登录~')
    } else {
      login({cmd: 'addCart', uid, productList: [{
        id: item.id,
        count: 1,
      }]})()
        .then(res => {
          if (`${res.result}` === '0') {
            message.success('添加购物车成功~')
          } else {
            message.error(`${res.resultNote}`);
          }
        })
        // .catch((error) => {
        //   message.error(error);
        // });
    }
  }

  return (
    <div className='ItemContent thing-item'>
      <div onClick={() => {
        props.history.push(`/detail?id=${item.id}`)
        window.location.reload();
      }}>
        <div className='item-top'>
          <div className='item-grade'>{item.fen}</div>
          <div className='item-star'>
            <Rate allowHalf disabled defaultValue={item.point} />
            <span className='star-num'>
              <Avatar icon="user" style={{background: 'transparent', color:'#73523C'}} />
              {item.number}
            </span>
          </div>
        </div>
        <img
          className='item-image'
          height={250}
          src={item.image}
        />
        <div className='thing-name'>{item.zh_name}</div>
        <div className='thing-danwei'>{item.baozhuang_zh_name}</div>
        <div className='unit-price'>
          <del className='del-price'>US$ {item.old_price}</del>
          <span className='now-price'>US$ {item.price}</span>
        </div>
      </div>
      <div className='add-bus before' onClick={() => addCarAction()}>加入购物车</div>
    </div>
  );
};

export default withRouter(BannerTop);
