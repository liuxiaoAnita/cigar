import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import intl from 'react-intl-universal';
import {getQueryVariable} from '@/utils'
import { Form, Icon, Input, Button, message, Rate, Select  } from "antd";
import { connect } from "react-redux";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";
import ColorContent from './Color'
import OtherItem from './OtherItem'

const categoryType = localStorage.getItem('categoryType')

const { Option } = Select;
const CigarDetailPage = (props) => {
  const { login } = props;
  const [loading, setLoading] = useState(false);
  const [catename, setCatename] = useState('')
  const [cateContent, setCateContent] = useState('')
  const [leftContent, setLeftContent] = useState({})
  const [flag, setFlag] = useState('0'); // 0：升序1：降序
  const [orderBy, setOrderBy] = useState('0'); // 0：默认1：价格2：产品3：评分4：星级
  const [leftChose, setLeftChose] = useState({})
  
  const [ cigarStatus, setCigarStatus] = useState(true); // 
  const [ cigarList, setCigarList] = useState([]); // 列表数据



  useEffect(() => {
    initGetCigarInfo();
    getCategoryList();
  }, []);

  useEffect(() => {
    initGetCigarInfo();
  }, [orderBy, flag, leftChose]);

  // 获取列表接口信息获取
  const initGetCigarInfo = () => {
    const data = {
      ...leftChose,
      flag,
      orderBy,
    }
    console.log('props.history.location.search')
    const categoryId = getQueryVariable('categoryId')
    console.log(categoryId)

    const params = {categoryId, cmd: 'getProductList', ...data}
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
          setLeftContent(res.body)
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
    // orderBy
    console.log(`selected ${value}`);
  }

  // 条状列表展示
  const renderItemTiao = (dataing, index) =>{
    return(
      <div className='cigar-item-content' key={`kkkk-${index}`}>
        {/* left */}
        <img className='left-image' src={dataing.image}onClick={() =>{
          props.history.push(`/detail?id=${dataing.id}`)
          window.location.reload();
        }} />
        {/* middle */}
        <div className='item-cigar-box' onClick={() =>{
          props.history.push(`/detail?id=${dataing.id}`)
          window.location.reload();
        }}> 
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
        <div onClick={() =>{
          props.history.push(`/detail?id=${dataing.id}`)
          window.location.reload();
        }}>
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
        </div>
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

  // 空列表
  const renderEmpty = () => (
    <div className='empty-content'>
      <Icon className='icon-image' type="account-book" />
      <span className='detail-mes'>无上架产品</span>
      <span className='link-content'><i className='link-url' onClick={() => props.history.push('/home')}>点击这里</i>去购物</span>
    </div>
  )

  return (
    loading ? <div>loading</div> :
    <div className='CigarDetailPage'>
      <div className='left-content'>
        <div className='left-mess-title'>筛选条件</div>
        <div className='detail-mess-box'>
          {`${categoryType}` === '2' && 
            <ColorContent yanseList={leftContent.yanseList}
              onChose={(data) => setLeftChose({
                ...leftChose,
                yanse_id: data
              })}
            />
          }
          {`${categoryType}` === '2' && (
            <OtherItem
              dataList={leftContent.brandList}
              titleName='品牌'
              onChose={(data) => setLeftChose({
                ...leftChose,
                brand_id: data
              })}
            />
          )}
          {`${categoryType}` === '2' && (
            <OtherItem
              dataList={leftContent.baozhuangList}
              titleName='包装'
              idName='baozhuang_id'
              onChose={(data) => setLeftChose({
                ...leftChose,
                baozhuang_id: data
              })}
            />
          )}
          {`${categoryType}` === '2' && (
            <OtherItem
              dataList={leftContent.jiageList}
              titleName='价格'
              idName='jiage_id'
              onChose={(data) => setLeftChose({
                ...leftChose,
                jiage_id: data
              })}
            />
          )}
          {`${categoryType}` === '2' && (
            <OtherItem
              dataList={leftContent.xiangxingList}
              titleName='香型'
              idName='xiangxing_id'
              onChose={(data) => setLeftChose({
                ...leftChose,
                xiangxing_id: data
              })}
            />
          )}
        </div>

       
        </div>
      <div className='right-content'>
        <div className='title-mes'>{catename}</div>
        <div className='descrip-mes'>{cateContent}</div>
        {/* 操作栏 */}
        <div className='tool-box'>
          <Icon className={`pinzige ${cigarStatus && 'active'}`} onClick={() => setCigarStatus(true)} theme="filled" type="appstore" />
          <Icon className={`tiaozhuang ${!cigarStatus && 'active'}`} onClick={() => setCigarStatus(false)} type="menu" />
          <Select className='select-action' defaultValue="0" style={{ width: 120 }} onChange={e => setOrderBy(e)}>
            <Option value="0">默认</Option>
            <Option value="1">价格</Option>
            <Option value="2">产品</Option>
            <Option value="3">评分</Option>
            <Option value="4">星级</Option>
            {/* 0：默认1：价格2：产品3：评分4：星级 */}
          </Select>
          <Icon
            style={{color: '#B78E74', marginLeft: '16px', cursor: 'pointer'}}
            type={flag === '0' ? 'arrow-up' : 'arrow-down'}
            onClick={() => setFlag(flag === '0' ? '1' : '0')}
          />
        </div>
        <div className='right-cigar-box'>
          {cigarList && cigarList.map((item, index) => (
            cigarStatus ? renderItemPin(item, index) : renderItemTiao(item, index)
          ))}
          {cigarList.length === 0 && renderEmpty()}
        </div>
      </div>
    </div>
  );
};

const CigarDetail = Form.create()(CigarDetailPage);

export default connect((state) => state.user, { login })(
  CigarDetail
);
