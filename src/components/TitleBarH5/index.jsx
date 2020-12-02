import React , { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { Icon } from 'antd'


import "./index.less";

const TitleBarH5 = (props) => {
  const { titleName = '' } = props

  return (
    <>
      <div className='h5-title-bar-background'  />
      <div className='h5-title-bar-content'>
        <span>{titleName}</span>
      </div>
    </>
  );
};

export default withRouter(TitleBarH5);
