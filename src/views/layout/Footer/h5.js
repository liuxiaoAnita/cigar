import React from "react";
import { connect } from "react-redux";
import homeLogo from "@/assets/images/home_logo.png";
import "./index.less";

const Footer = (props) => {
  const menuList = [
    {
      name: '首页',
      icon: homeLogo,
      url: '',
    },
    {
      name: '首页',
      icon: homeLogo,
      url: '',
    },
    {
      name: '首页',
      icon: homeLogo,
      url: '',
    },
    {
      name: '首页',
      icon: homeLogo,
      url: '',
    },
    {
      name: '首页',
      icon: homeLogo,
      url: '',
    },
  ]
  return (
    <div className='h5-footer-content'>
      {menuList.map((item, index) => (
        <div className='h5-footer-item' key={`h5-footer-item-${index}`}>
          <img className='img' src={item.icon} />
          <span className='name'>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default connect(null, { })(Footer);
