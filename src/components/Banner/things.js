import React , { useState, useEffect } from 'react';
import {withRouter} from "react-router-dom";
import ItemBox from "@/components/Banner/ItemBox.js";
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
          <div onClick={() => {
            console.log(item.id)
            props.history.push(`/detail?id=${item.id}`)
            window.location.reload();
          }} className="swiper-slide" key={`things-swiper-item-${index}`}>
            <ItemBox item={item} />
            
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

export default withRouter(ThingsContent);
