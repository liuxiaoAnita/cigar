import React , { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Swiper from "swiper/dist/js/swiper.min.js";
import Banner from "@/assets/images/home_banner.png";



import "./advert.less";

const AdvertBanner = (props) => {
  const { data = [] } = props
  const [swiperId, setSwiperId] = useState('');
  const [bannerList, setBannerList] = useState([]);

  useEffect(() => {
    setBannerList([...data])
  }, [data])

  console.log('====')
  console.log(bannerList)
  new Swiper(swiperId, {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    // nextButton: '.swiper-button-next',
    // prevButton: '.swiper-button-prev',
    autoplay:3000,
    spaceBetween: 30,
    freeMode: true
  });
  return (
    <div className='advert-banner-box'>
      <div className="new-swiper swiper-container swiper-no-swiping" ref={self => setSwiperId(self)}>
        <div className="swiper-wrapper">
          {bannerList.map((item, index) => (
            <div key={`advert-swiper-item-${index}`} className="swiper-slide">
              <img onClick={() => window.location.href = item.url} style={{cursor: 'pointer', height: '70rem'}} src={item.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default connect(null, { })(AdvertBanner);
