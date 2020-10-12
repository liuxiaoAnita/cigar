import React, { Component } from "react";
import { getUsers } from "@/api/user";
import BannerHome from "@/components/Banner/home.js";
import BannerAdvert from "@/components/Banner/advert.js";
import BannerThings from "@/components/Banner/things.js";
import BoKe01 from "@/assets/images/home_tjpic03.png";
import Icon01 from "@/assets/images/home_icon_01.png";
import Icon02 from "@/assets/images/home_icon_02.png";
import Icon03 from "@/assets/images/home_icon_03.png";
import Icon04 from "@/assets/images/home_icon_04.png";

import "./index.less";
class User extends Component {
  state = {
    users: [],
  };
  componentDidMount() {
    // this.getUsers()
  }
  getUsers = async () => {
    const result = await getUsers()
    const { users, status } = result.data
    if (status === 0) {
      this.setState({
        users
      })
    }
  }

  renderTitle = (title, descr) => {
    title = title.split('')
    return (
      <div className='title-box'>
        <span className='title-name'>
          {title.map((item, index) => (
            <em key={`name-icon-${index}`} className='name-icon'>{item}</em>
          ))}
        </span>
        <span className='title-descr'>{descr}</span>
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
    return (
      <div className='boke-content'>
        <div className='boke-picture'>
          <img src={BoKe01} />
          <img src={BoKe01} />
          <img src={BoKe01} />
        </div>
        <div className='boke-descrpt'>
          {iconData.map((item, index) => (
            <div key={`boke-${index}-index`} className='desc-item'>
              <img src={item.imageUrl} />
              <span className='desc-title'>{item.title}</span>
              <span className='desc-detail'>{item.descript}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
       <BannerHome />
       <BannerAdvert />
       {this.renderTitle('推荐产品', 'RECOMMENDED PRODUCTS')}
       <BannerThings />
       {this.renderTitle('雪茄博客', 'ENJOY YOUR CIGAR MOMENT!')}
        {this.renderBoKe()}
      </div>
    );
  }
}

export default User;

