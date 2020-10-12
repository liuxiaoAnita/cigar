import React , { useState } from 'react';
import { connect } from "react-redux";
import Swiper from "swiper/dist/js/swiper.min.js";
import Banner from "@/assets/images/home_banner.png";



import "./advert.less";

const AdvertBanner = () => {
  const [swiperId, setSwiperId] = useState('');
  new Swiper(swiperId, {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    // nextButton: '.swiper-button-next',
    // prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    freeMode: true
  });
  return (
    <div className='advert-banner-box'>
      <div className="new-swiper swiper-container" ref={self => setSwiperId(self)}>
        <div className="swiper-wrapper">
            <div className="swiper-slide"><img src={Banner} /></div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { })(AdvertBanner);
