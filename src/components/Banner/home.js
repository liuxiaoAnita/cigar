import React , { useState } from 'react';
import { connect } from "react-redux";
import Swiper from "swiper/dist/js/swiper.min.js";
import Banner01 from "@/assets/images/home_pic01.png";
import Banner02 from "@/assets/images/home_pic02.png";
import Banner03 from "@/assets/images/home_pic03.png";



import "./index.less";

const HomeBanner = () => {
  const [swiperId, setSwiperId] = useState('');
  new Swiper(swiperId, {
    slidesPerView: 6,
    centeredSlides: false,
    virtual: {
      // slides: this.state.newlist,
    },
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
        <div className="swiper-wrapper">
            <div className="swiper-slide"><img src={Banner01} /></div>
            <div className="swiper-slide"><img src={Banner02} /></div>
            <div className="swiper-slide"><img src={Banner03} /></div>
        </div>
        {/* <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div> */}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default connect(null, { })(HomeBanner);
