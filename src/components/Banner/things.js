import React , { useState } from 'react';
import { connect } from "react-redux";
import Swiper from "swiper/dist/js/swiper.min.js";
import cppic01 from "@/assets/images/home_cppic01.png";

import { Rate, Avatar  } from 'antd';
import "./things.less";

              
const ThingsContent = () => {
  const [swiperId, setSwiperId] = useState('');
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
          <div className="swiper-slide thing-item">
            <div className='item-top'>
              <div className='item-grade'>9.2</div>
              <div className='item-star'>
                <Rate allowHalf disabled defaultValue={2.5} />
                <span className='star-num'>
                  <Avatar icon="user" style={{background: 'transparent', color:'#73523C'}} />
                  999
                </span>
              </div>
            </div>
            <img
              width={200}
              height={250}
              src={cppic01}
            />
            {/* <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    /> */}
            <div className='thing-name'>罗密欧 · 朱丽叶 小高朗拿 纸盒（2008年出厂） Romeo y Julieta Petit Coronas C/P</div>
            <div className='thing-danwei'>25支/盒</div>
            <div className='unit-price'>
              <del className='del-price'>US$ 87.00</del>
              <span className='now-price'>US$ 77.00</span>
            </div>
            <div className='add-bus before'>加入购物车</div>
          </div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </div>
  );
};

export default connect(null, { })(ThingsContent);
