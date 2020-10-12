import React from "react";
import { connect } from "react-redux";
import { Button } from 'antd';
import {setCookie} from '@/utils/index';
import "./index.less";

const WarnPage = (props) => {

  // const handelBtn = (data) => {
  //   setCookie('isRead', data)
  // }
  const {handelBtn} = props

  return (
    <>
    <div className='warn-background' />
    <div className='WarnPage-content'>
      <div className='warn-detail'>
        <h3 className='title'>郑重声明</h3>
        <span className='message'>
        根据《青少年保护法》（JuSchG）第9和10条，以下页面专门保留给成年休闲吸烟者和其他合法年龄的相关方。如果您尚未年满18岁，请立即离开本网站。根据我们的条款和条件第7条获得的更多信息。
        </span>
        <h3 className='warn-title'>忠告：吸烟危害健康</h3>
        <span className='message'>1.根据国家烟草法有关法鲁法规，本网站仅供年满18周岁人士浏览</span>
        <span className='message'>2.产品价格不包括税款，收件人需要根据当地标准负责支付各种税款</span>
        <span className='message'>3.所有交易实在XXXXXX进行，服务条款以及程序均受到国家法律管辖</span>
      </div>
      <div className='button-content'>
        <span className='ask-age'>请问您是否已经年满十八周岁？</span>
        <div className='ask-buttons'>
          <Button className='no-btn' onClick={() => handelBtn('no')}>否</Button>
          <Button className='yes-btn' onClick={() => handelBtn('already')} type="primary">是</Button>
        </div>
      </div>               
    </div>
    </>
  );
};

export default connect(null, { })(WarnPage);
