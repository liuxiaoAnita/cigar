import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import intl from 'react-intl-universal';
import { Form, Icon, Input, Button, message, Rate, Select  } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";

const { Option } = Select;
const CigarDetailPage = (props) => {
  const { form, token, login, getUserInfo } = props;
  const { getFieldDecorator } = form;
  const [loading, setLoading] = useState(false);

  const dataing = {// 精品商品列表
    "id":"",// 商品id
    "zh_name": '中文名' , //中文名
    "en_name": '英文名' , //英文名
    "baozhuang_en_name": '包装英文名' , //包装英文名
    "baozhuang_zh_name": '包装中文名' , //包装中文名
    "number": '评价人数' , //评价人数
    "cart": '是否加入购物车（1：是2：否）' , //是否加入购物车（1：是2：否）
    "xinyuan": '是否加入心愿（1：是2：否）' , //是否加入心愿（1：是2：否）
    "point": '2.6' , //评星
    "fen": '6.2' , //分数
    "price": '11.1' , //会员价
    "old_price": '21' , //市场价
    "image": 'tupian' , //图片
}
  useEffect(() => {
    const categoryId = localStorage.getItem('categoryId')
    initGetCigarInfo(categoryId)
   
  }, []);

  const initGetCigarInfo = (categoryId) => {
    const params = {cmd: 'getProductList', categoryId}
    login(params)
      .then((res) => {
        if (`${res.result}` === '0') {
          console.log(res)
        } else {
          message.error(`${res.resultNote}`);
          setLoading(false);
        }
       
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  const renderItem = () =>{
    return(
      <div className='cigar-item-content'>
        {/* left */}
        <img className='left-image' src={dataing.image} />
        {/* middle */}
        <div className='item-cigar-box'>
          <div className='top-mes'>
            <span className='title-name'>{dataing.zh_name}</span>
            <span className='title-descript'>{dataing.baozhuang_zh_name}</span>
          </div>
          <div className='bottom-star'>
            <span className='fen'>{dataing.fen}</span>
            <Rate className='rate' allowHalf defaultValue={dataing.point} />
            <div className='user-content'>
              <Icon className='user-icon' type="user" />
              <span className='user-number'>{dataing.number}</span>
            </div>
          </div>
        </div>
        {/* right */}
        <div className='right-price'>
            <div className='cigar-price'>{dataing.price}</div>
            <div className='action-content'>
              <div className='myheart'>
                <Icon className='icon-heart' type="heart" theme="filled"  />
              </div>
              <Button type='primary' className='add-bus'>加入购物车</Button>
            </div>
          </div>
      </div>
    )
  }

  return (
    <div className='CigarDetailPage'>
      <div className='left-content'>left</div>
      <div className='right-content'>
        <div className='title-mes'>古巴雪茄</div>
        <div className='descrip-mes'>欧洲人认为只有在古巴产的烟叶和雪茄才是最好的。于是从1510年开始，古巴成批量的向欧洲出售。古巴烟厂很多，但著名品牌雪茄烟厂家都在哈瓦那，哈瓦那雪茄代表着古巴雪茄的最高水平，成为古巴雪茄的代名词。</div>
        
        {/* 操作栏 */}
        <div className='tool-box'>
          <Icon className='pinzige' theme="filled" type="appstore" />
          <Icon className='tiaozhuang' type="menu" />
          <Select className='select-action' defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
        <div>
          {renderItem()}
        </div>
      </div>
    </div>
  );
};

const CigarDetail = Form.create()(CigarDetailPage);

export default connect((state) => state.user, { login })(
  CigarDetail
);
