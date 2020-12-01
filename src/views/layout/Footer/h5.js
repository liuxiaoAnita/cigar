import React from "react";
import { connect } from "react-redux";
import homeLogo from "@/assets/images/home_logo.png";
import Icon01 from "@/assets/images/home_icon_01.png";
import "./index.less";

const Footer = (props) => {
  const menuList = [
    {
      name: '首页',
      icon: Icon01,
      url: '',
    },
    {
      name: '首页',
      icon: Icon01,
      url: '',
    },
    {
      name: '首页',
      icon: Icon01,
      url: '',
    },
    {
      name: '首页',
      icon: Icon01,
      url: '',
    },
    {
      name: '首页',
      icon: Icon01,
      url: '',
    },
  ]
  return (
    <>
    <div className='h5-footer-content'>
      {menuList.map((item, index) => (
        <div
          className='h5-footer-item'
          key={`h5-footer-item-${index}`}
          onClick={() => {
            console.log(item.url)
          }}  
        >
          <img className='img' src={item.icon} />
          <span className='name'>{item.name}</span>
        </div>
      ))}
    </div>
    <div style={{minHeight: '70rem', width: '100%'}}></div>
    </>
  );
};

export default connect(null, { })(Footer);
