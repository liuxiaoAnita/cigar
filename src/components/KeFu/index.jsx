import React , { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Icon } from 'antd'


import "./index.less";

const AdvertBanner = (props) => {
  const { onChange } = props

  return (
    <>
      <div className='kefu-h5-back' onClick={onChange} />
      <div className='kefu-h5-content'>
        <div className='kefu-h5-message'>
          <Icon className='icon-phone' type="phone" />
          <span className='phone-number'>400-842-4625</span>
          <span className='kefu-time'>周一至周五   9:30-23:00</span>
          <span className='kefu-other'>如有疑问，请电话咨询客服<br />客服将会为您解决您的问题</span>
        </div>
        <Icon onClick={onChange} className='close-btn' type="close" />
      </div>
    </>
  );
};

export default connect(null, { })(AdvertBanner);
