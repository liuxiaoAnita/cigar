import React , { useEffect, useState } from 'react';
import {withRouter} from "react-router-dom";
import { login } from "@/store/actions";
import {colorItem} from '@/utils/index';
import {  message, Rate, Input, Button  } from "antd";

import "./index.less";
const { TextArea } = Input;

const PayingPage = (props) => {
  const { item, xiangxingArr, onChange } = props;
  const [content, setContent] = useState('')
  const [starVal, setStartVal] = useState(0)
  const [rateVal, setRateVal] = useState(0)
  const [xiangSelected, setXiangSelected] = useState([])
  const [xiangArray, setXiangArray] = useState([])

  useEffect(() => {
    const ids = [];
    xiangSelected.forEach(item => ids.push(item.id))
    onChange({
      productId: item.productId,
      content,
      ids,
      pinfen: starVal,
      point: rateVal,
    })
  }, [starVal, rateVal, xiangSelected, content])

  useEffect(() => {
    setXiangArray(xiangxingArr)
  }, [xiangxingArr])

  const onChangeRate = value => {
    value = `${value}`
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      const resultVal = Math.round(Number(value)*10)
      const valueArr = value.split('.')
      let starVal = resultVal / 10
      if (value.indexOf('.')) {
        if (valueArr[1]) {} else {
          starVal = value
        }
      }
      if (resultVal > 100 || resultVal < 0) {
        message.error('分数大于零，小于10')
      } else {
        setStartVal(starVal)
      }
    }
  };

  const changeSelected = (value, type) => {
    if (type === 'add') {
      const result = xiangArray.filter(item => item.id !== value.id)
      setXiangSelected([ ...xiangSelected, value])
      setXiangArray(result)
    } else {
      const result = xiangSelected.filter(item => item.id !== value.id)
      setXiangArray([ ...xiangArray, value])
      setXiangSelected(result)
    }
  }

  return (
    <div className='write-item'>
      <div className='menu-detail-message'>
        <img src={item.image} className='detail-image' />
        <div className='message-detail-content'>
        <span className='name'>{item.zh_name}</span>
        <span className='zh-name'><i>中文名：</i>{item.en_name}</span>
        <span className='en-name'><i>英文名</i>{item.en_name}</span>
        <span className='brand-name'><i>品牌</i>{item.brand_zh_name}</span>
        <span className='baozhuang-name'><i>包装</i>{item.baozhuang_zh_name}</span>
        <span className='pinxing-name'><i>品型</i>{item.pinxing_zh_name}</span>
        <span className='changdu'><i>长度(毫米)</i>{item.changdu}</span>
        <span className='huanjing'><i>环径</i>{item.huanjing}</span>
        <span className='price-num'>￥{item.price}</span>
        </div>
      </div>
      <div className='write-content'>
        <span className='title-name'>评价产品</span>
        <div className='action-rate'>
          <TextArea className='TextArea' onChange={e => setContent(e.target.value)} value={content} rows={10} width={640} />
          <div className='ActionBox'>
            <span className='title-name'>给此款产品打个星吧</span>
            <div className='sub-title'>
              <span className='item-sub'>很失望</span>
              <span className='item-sub'>非常满意</span>
            </div>
            <Rate className='Rate' allowHalf onChange={val => setRateVal(val)} defaultValue={rateVal} />
          </div>
        </div>
        <div className='fenshu-box'>
          <div className='title-name'>请给此款产品评分吧</div>
          <div className='fenshu-detail'>
            <span className='count-button' onClick={() => onChangeRate( Number(starVal) - 0.1 )}>-</span>
            <Input
              className='input'
              value={starVal}
              onChange={e => onChangeRate(e.target.value)}
              placeholder="Input a number"
              maxLength={25}
            />
            <span className='count-button' onClick={() => onChangeRate(Number(starVal) + 0.1)}>+</span>
          </div>
        </div>
        <div className='tags-content'>
          <span className='title-name'>请给此款产品添加标签</span>
          <div className='selected-tag-box'>
            {xiangSelected.map((item, index) => (
              <span
                className='tag-item'
                key={`tag-selected-${index}`}
                style={{color: colorItem[index], borderColor: colorItem[index]}}
                onClick={() => changeSelected(item, 'jian')}
              >
                {item.zh_name}
              </span>
            ))}
          </div>
          <div className='tag-box'>
            {xiangArray.map((item, index) => (
              <span
                className='tag-item'
                key={`tag-item-${index}`}
                style={{color: colorItem[index], borderColor: colorItem[index]}}
                onClick={() => changeSelected(item, 'add')}
              >
                {item.zh_name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PayingPage);
