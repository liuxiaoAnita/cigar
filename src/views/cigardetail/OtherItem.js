import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import intl from 'react-intl-universal';
import { Form, Icon, Input, Button, message, Radio, Select  } from "antd";
import { connect } from "react-redux";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";

const { Option } = Select;
const ColorItemContent = (props) => {
  const { dataList = [], onChose, titleName = '', idName = ''} = props;
  const [loading, setLoading] = useState(false);
  const [isShow, setShow] = useState(false);
  
  return (
    loading ? <div>loading</div> :
    <div className='render-left-item'>
      {dataList &&
        <div className={`other-father showFahter ${isShow && 'showAll'}`} >
          <div className='top-message' onClick={() => setShow(!isShow)}>
            <span>{titleName}</span>
            <i className='jian-tou'></i>
          </div>
          <Radio.Group  className='bottom-child' onChange={e => onChose([e.target.value])}>
            {dataList.map((item, index) => (
              <Radio className='child-item-key' key={`left-other-item-${index}`} value={item.id}>
                {idName === 'jiage_id' ? `${item.min}-${item.max === '' ? '以上' : item.max}` : item.zh_name}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      }  
    </div>
  );
};

const ColorContent = Form.create()(ColorItemContent);

export default connect((state) => state.user, { login })(
  ColorContent
);
