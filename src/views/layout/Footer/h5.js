import React, {useState} from "react";
import { connect } from "react-redux";
import { Icon } from 'antd';
import { withRouter } from 'react-router-dom'
import KeFu from '@/components/KeFu'
import homeLogo from "@/assets/images/home_logo.png";
import Icon01 from "@/assets/images/home_icon_01.png";
import tub2 from "@/assets/images/tub2.png";
import "./index.less";

const Footer = (props) => {
  const [isShowKeFu, setShowKeFu] = useState(false)
  const pathname = props.history.location.pathname
  const menuList = [
    {
      name: '首页',
      backgroundPosition: `0`,
      url: '/home',
      isActive: pathname === '/home',
    },
    {
      name: '客服',
      backgroundPosition: `-40rem`,
      url: 'kefu',
      isActive: false,
    },
    {
      name: 'KING',
      backgroundPosition: `-80rem`,
      url: '/search',
      isActive: pathname === '/search',
    },
    {
      name: '购物车',
      backgroundPosition: `-120rem`,
      url: '/car',
      isActive: pathname === '/car',
    },
    {
      name: '我的',
      backgroundPosition: `-160rem`,
      url: '/myself',
      isActive: pathname === '/myself',
    },
  ]

  return (
    <>
    <div className='h5-footer-content'>
      {menuList.map((item, index) => (
        <div
          className={`h5-footer-item ${item.isActive && 'active'}`}
          key={`h5-footer-item-${index}`}
          onClick={() => {
            if (item.url === 'kefu') {
              setShowKeFu(true)
            } else {
              props.history.push(item.url);
            }
          }}  
        >
          <div className='img'
            style={{
              background: `url(${tub2})`,
              backgroundPosition: `${item.backgroundPosition} ${item.isActive ? '-38rem' : '0'}`,
              backgroundSize: '182rem',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <span className='name'>{item.name}</span>
        </div>
      ))}
    </div>
    {isShowKeFu && <KeFu onChange={() => setShowKeFu(false)} />}
    <div style={{minHeight: '70rem', width: '100%'}}></div>
    </>
  );
};

export default withRouter(Footer);
