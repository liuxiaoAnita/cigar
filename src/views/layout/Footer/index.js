import React from "react";
import { connect } from "react-redux";
import "./index.less";

const Footer = (props) => {
  const footerList =[
    {titleName: '关于我们',id:'aboutUs'},
    {
      titleName: '客户流程',
      id: 'userLiucheng',
      children:[
        { name: '注册流程', },
        { name: '购物流程', },
      ]
    },
    {
      titleName: '联系我们',
      id: 'phoneUs',
      children:[
        { name: '服务时间： 周一至周五 (9:45-18:00)', },
        { name: '电邮： service@timecigar.com', },
        { name: '客服电话: 400-842-4625', },
      ]
    },
  ]
  const renderItem = (data) => {
    console.log(data)
    return(
      <div className='footer_detail'>
        {data.children && data.children.map((i, index) => (
          <span className='footer_mes' key={`footer-${data.id}_${index}`}>{i.name}</span>
        ))}
      </div>
    )
  }
  return (
    <div className='footer-content'>
     {footerList.map((item) => (
       <div key={`footer_item_${item.id}`} className='footer-item'>
         <span className='footer_name'>{item.titleName}</span>
         {item.children && renderItem(item)}
       </div>
     ))} 
    </div>
  );
};

export default connect(null, { })(Footer);
