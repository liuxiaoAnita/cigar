import React , { useEffect, useState } from 'react';
import {withRouter} from "react-router-dom";
import { Icon, } from 'antd';

import "./index.less";

const HomeBanner = (props) => {
  const { rightAxure, titleName } = props

  // useEffect(() => {
  //   setBannerList([...data])
  // }, [data])

  return (
    <div className='h5-header-box'>
      
      <div className='title-name'><Icon className='icon' type="left" /><span >{titleName}</span></div>
      {rightAxure}
    </div>
  );
};

export default withRouter(HomeBanner);
