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
  const { login } = props;
  const [loading, setLoading] = useState(false);
  const [catename, setCatename] = useState('')
  const [cateContent, setCateContent] = useState('')
  
  const [ cigarStatus, setCigarStatus] = useState(true); // 
  const [ cigarList, setCigarList] = useState([]); // 列表数据

  useEffect(() => {
    const categoryId = localStorage.getItem('categoryId')
    initGetCigarInfo({categoryId})
    getCategoryList()
    
  }, []);

  // 获取列表接口信息获取
  const initGetCigarInfo = (data) => {
    const params = {cmd: 'getProductList', ...data}
    login(params)
      .then((res) => {
        if (`${res.result}` === '0') {
          setCigarList(res.body.dataList)
          setCatename(res.body.zhcatename)
          setCateContent(res.body.zhcontent)
        } else {
          message.error(`${res.resultNote}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  }

  // 获取各种分类
  // getCategoryList

  const getCategoryList = () => {
    login({cmd: 'getCategoryList'})
      .then((res) => {
        if (`${res.result}` === '0') {
          console.log(res.body)
        } else {
          message.error(`${res.resultNote}`);
        }
        setLoading(false);
      })
      // .catch((error) => {
      //   setLoading(false);
      //   message.error(error);
      // });
  }

  // 添加购物车
  const addCarHeratAction = (type, goodsId) => {
    const uid = localStorage.getItem('userUid') || ''
    const params = {cmd: type, uid, productList: [{
      "id": goodsId,
      "count": "1"
    }]}
    if (uid === '') {
      message.error('未登录');
    } else {
      login(params)
      .then((res) => {
        if (`${res.result}` === '0') {
          message.success(`添加${type === 'addCart' ? '购物车' : '心愿单'}成功`);
        } else {
          message.error(`${res.resultNote}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
    }
  }

  // 操作栏，下拉框
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  // 条状列表展示
  const renderItemTiao = (dataing, index) =>{
    return(
      <div className='cigar-item-content' key={`kkkk-${index}`}>
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
            <Rate className='rate' disabled allowHalf defaultValue={dataing.point} />
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
              <div onClick={() => addCarHeratAction('addXinyuandan', dataing.id)} className='myheart'>
                <Icon className='icon-heart' type="heart" theme="filled"  />
              </div>
              <Button onClick={() => addCarHeratAction('addCart', dataing.id)} type='primary' className='add-bus'>加入购物车</Button>
            </div>
          </div>
      </div>
    )
  }

  // 田字格列表展示
  const renderItemPin = (dataing, index) =>{
    return(
      <div className='pinzige-content' key={`pin-item-${index}`}>
        {/* top */}
        <div className='top-fen-content'>
          <div className='left-fen'>{dataing.fen}</div>
          <div className='right-mes'>
            <Rate className='rate' disabled allowHalf defaultValue={dataing.point} />
            <div className='user-content'>
              <Icon className='user-icon' type="user" />
              <span className='user-number'>{dataing.number}</span>
            </div>
          </div>
        </div>
        {/* middle */}
        <img className='cigar-img' src={dataing.image} alt='cigar' />
        {/* bottom */}
        <div className='bottom-content'>
          <div className='cigar-price'>{dataing.price}</div>
          <div className='top-mes'>
            <span className='title-name'>{dataing.zh_name}</span>
            <span className='title-descript'>{dataing.baozhuang_zh_name}</span>
          </div>
          <div className='action-content'>
            <Button type='primary' onClick={() => addCarHeratAction('addCart', dataing.id)} className='add-bus'>加入购物车</Button>
            <div className='myheart'>
              <Icon className='icon-heart' onClick={() => addCarHeratAction('addXinyuandan',dataing.id)} type="heart" theme="filled"  />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    loading ? <div>loading</div> :
    <div className='CigarDetailPage'>
      <div className='left-content'>left</div>
      <div className='right-content'>
        <div className='title-mes'>{catename}</div>
        <div className='descrip-mes'>{cateContent}</div>
        {/* 操作栏 */}
        <div className='tool-box'>
          <Icon className={`pinzige ${cigarStatus && 'active'}`} onClick={() => setCigarStatus(true)} theme="filled" type="appstore" />
          <Icon className={`tiaozhuang ${!cigarStatus && 'active'}`} onClick={() => setCigarStatus(false)} type="menu" />
          <Select className='select-action' defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
        <div className='right-cigar-box'>
          {cigarList && cigarList.map((item, index) => (
            cigarStatus ? renderItemPin(item, index) : renderItemTiao(item, index)
          ))}
        </div>
      </div>
    </div>
  );
};

const CigarDetail = Form.create()(CigarDetailPage);

export default connect((state) => state.user, { login })(
  CigarDetail
);
