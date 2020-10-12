import React , { useState } from 'react';
import { connect } from "react-redux";
import { BackTop ,Affix,Tooltip} from 'antd';
import LXKF from "@/assets/images/home_bt_lxkf.png";
import "./index.less";

const BackTopContent = () => {
  const [bottom, setBottom] = useState(10);

  return (
    <>
      <BackTop style={{bottom: '100px'}} onClick={() => {console.log('0000')}}>
        <Tooltip placement="left" title='客服电话：2222'>
          <img src={LXKF} width='40' />
        </Tooltip>
      </BackTop>
      <BackTop />
    </>
  );
};

export default connect(null, { })(BackTopContent);
