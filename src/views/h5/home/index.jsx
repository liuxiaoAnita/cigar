import React, { Component } from "react";
import {message, Carousel} from 'antd';
import {login} from "@/store/actions";
import Icon01 from "@/assets/images/home_icon_01.png";
import BannerAdvert from "@/components/Banner/advert.js";
import BannerHome from "@/components/Banner/home.js";
import BannerTop from "@/components/Banner/bannerTop.js";
import BannerThings from "@/components/Banner/things.js";

import "./index.less";
class H5Home extends Component {
  state = {
    bannerList: [],
    adList: [],
    productList: [],
    bokeList: [],
    categoryList: [],
  };
  componentDidMount() {
    this.getHomeMes()
  }

  getHomeMes = () => {
    const uid = localStorage.getItem('userUid') || ''
    login({cmd: 'getHomepage', uid})()
      .then(res => {
        if (`${res.result}` === '0') {
          console.log(res.body)
          const {body = {}} = res;
          const {bannerList = [], adList = [], productList = [], bokeList = [], categoryList = []} = body;

          this.setState({
            bannerList,
            adList,
            productList,
            bokeList,
            categoryList,
          })
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

  renderCarousel = () => {
    const { bannerList } = this.state;
    return (
      <Carousel autoplay>
        {bannerList.map((item, index) => (
          <div className='banner-item-h5' key={`banner-h5-item-${index}`}>
            <img className='banner-h5-img' src={item.image} />
          </div>
        ))}
      </Carousel>
    )
  }

  renderCategory = () => {
    const { categoryList } = this.state;
    return(
      <div className='content-category-h5'>
        {categoryList.map((item, index) => (
          <div
            className='category-h5-item'
            key={`category-h5-item-${index}`}
            onClick={() => {
              console.log(item)
            }}
          >
            <img className='img' src={Icon01} />
            <span className='name'>{item.zh_name}</span>
          </div>
        ))}
      </div>
    )
  }

  renderBoKe = () => {
    const iconData = [
      {
        title: '正品保证',
        descript: '所有货品均从总代理商取货',
        imageUrl: Icon01
      },{
        title: '免费运送',
        descript: '全球运送免费',
        imageUrl: Icon01
      },{
        title: '会员特权',
        descript: '会员特有折扣，购买更优惠',
        imageUrl: Icon01
      },{
        title: '精致包装',
        descript: '严格精致的包装，让雪茄持久保持在最佳状态',
        imageUrl: Icon01
      },
    ]
    const {bokeList} = this.state
    return (
      <div className='h5-boke-content'>
        <div className='h5-boke-picture'>
          {bokeList.map((item, index) => (
            <img className='h5-boke-item-image' src={item} key={`boke-item-${index}`} />
          ))}
        </div>
        <div className='h5-boke-descrpt'>
          {iconData.map((item, index) => (
            <div key={`h5-boke-${index}-index`} className='h5-desc-item'>
              <img className='h5-desc-img' src={item.imageUrl} />
              <span className='h5-desc-title'>{item.title}</span>
              <span className='h5-desc-detail'>{item.descript}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }



  render() {
    const { bannerList, adList, categoryList, productList, bokeList } = this.state;
    console.log(categoryList)
    return (
      <div className="h5-app-container">
        {/* 首页的banner */}
        {bannerList && this.renderCarousel()}
        {/* 首页icon */}
        {categoryList && this.renderCategory()}
        {/* 首页广告位 */}
        <BannerAdvert data={adList} />
        {productList.length && <BannerTop title='推荐产品' descr='RECOMMENDED PRODUCTS' />}
        <BannerThings data={productList} />
        {bokeList.length && <BannerTop title='雪茄博客' descr='RECOMMENDED PRODUCTS' />}
        {bokeList && this.renderBoKe()}
      </div>
    );
  }
}

export default H5Home;

