import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import {getQueryString} from '@/utils/index'
import "./menu.less";

const MenuLeftPage = (props) => {
  console.log(props.location.pathname)
  const menuData = [
    {titleName: '账户信息', id: 'myself'},
    {titleName: '订单记录', id: 'myorder'},
    {titleName: '心愿单', id: 'heart'},
    {titleName: '我的评价', id: 'myrate'},
  ]
  const defaultKey = getQueryString('key')
  return (
    <div className='left-menu-content'>
      <div className='menu-title'>我的账户</div>
      <div className='menu-detail'>
        {menuData.map((item, index) => (
          <span 
            key={`menu-item-${index}`}
            className={`menu-item ${props.location.pathname === '/' + item.id && 'active'}`}
            onClick={() => props.history.push(`/${item.id}`)}
          >
              {item.titleName}
          </span>
        ))}
      </div>
    </div>
  );
};

export default withRouter(connect(null, { })(MenuLeftPage));
