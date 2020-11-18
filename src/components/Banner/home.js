import React , { useEffect, useState } from 'react';
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";
import Swiper from "swiper/dist/js/swiper.min.js";

import "./index.less";

const HomeBanner = (props) => {
  const { data } = props
  const [swiperId, setSwiperId] = useState('');
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    setBannerList([...data])
  }, [data])
  new Swiper(swiperId, {
    // pagination: '.swiper-pagination',
    slidesPerView: 6,
    centeredSlides: false,
    autoplay:3000,
		loop:true,
		loopedSlides:3,
		spaceBetween:20,
		centeredSlides:true,
		slidesPerView : 'auto',
  });
  return (
    <div className='home-banner-box'>
      <div className="new-swiper swiper-container" ref={self => setSwiperId(self)}>
        <div className="swiper-wrapper" style={{height: '500px'}}>
          {bannerList.map((item, index) => (
            <div key={`banner-${index}-${Math.random()}`} className="swiper-slide">
              <img onClick={() => window.location.href = item.url} src={`${item.image}?random=${Math.random()}`} style={{width: '100%', height: '500px', cursor: 'pointer'}} />
            </div>
          ))}
        </div>
        {/* <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div> */}
      </div>
      {/* <div className="swiper-pagination"></div> */}
    </div>
  );
};

export default withRouter(HomeBanner);
