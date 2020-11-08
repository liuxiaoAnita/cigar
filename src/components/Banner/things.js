import React , { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Swiper from "swiper/dist/js/swiper.min.js";
import cppic01 from "@/assets/images/home_cppic01.png";

import { Rate, Avatar  } from 'antd';
import "./things.less";

              
const ThingsContent = (props) => {
  const { data } = props
  const [swiperId, setSwiperId] = useState('');
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    setBannerList([...data])
  }, [data])

  new Swiper(swiperId, {
    pagination: '.swiper-pagination',
    slidesPerView: 4,
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    freeMode: true
  });
  return (
    <div className='thing-banner-box'>
      <div className="swiper-container" ref={self => setSwiperId(self)}>
        <div className="swiper-wrapper">
          {bannerList.map((item, index) => (
          <div className="swiper-slide thing-item" key={`things-swiper-item-${index}`}>
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
            <div className='add-bus before'>加入购物车</div>
          </div>
          ))}
        
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default connect(null, { })(ThingsContent);
