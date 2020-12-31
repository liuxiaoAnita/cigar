import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import intl from 'react-intl-universal';
import { Form, Icon, Input, Button, message, Rate, Select  } from "antd";
import { connect } from "react-redux";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";

const categoryType = localStorage.getItem('categoryType')

const { Option } = Select;
const ColorItemContent = (props) => {
  const { yanseList = [], onChose } = props;
  const [loading, setLoading] = useState(false);
  const [isShow, setShow] = useState(false);
  
  return (
    loading ? <div>loading</div> :
    <div className='render-left-item'>
      {yanseList && 
        <div className={`color-father showFahter ${isShow && 'showAll'}`} >
          <div className='top-message' onClick={() => setShow(!isShow)}>
            <span>颜色</span>
            <i className='jian-tou'></i>
          </div>
          <div className='bottom-child'>
            {yanseList.map((item, index) => (
              <div className='child-item'  key={`child-category-${index}`}>
                <img src={item.icon} onClick={() => onChose(item.id)} className='color' width={40} height={40} />
              </div>
            ))}
          </div>
        </div>
      }  
    </div>
  );
};

const ColorContent = Form.create()(ColorItemContent);

export default connect((state) => state.user, { login })(
  ColorContent
);
