import React, { useEffect, useState } from "react";
import {Button, InputNumber, message, Popconfirm} from 'antd'
import "./index.less";

const CigarItemPage = function (props) {
  const {data, editStatus, handelEditNum, onChange} = props;
  const [menuData, setMenuData] = useState({})
  const [status, setStatus] = useState(false)
  const [editNumber, setEditNum] = useState(0)


  useEffect(() => {
    setMenuData(data)
  }, [data, editStatus])

  const confirm = () => {
    handelEditNum({
      cmd: 'delCart',
      cartIds: [menuData.id],
    })
      .then(res => {
        if (`${res.result}` === '0') {
          message.success('删除成功！')
          onChange()
        } else {
          message.error('删除失败！')
        }
      })
  }
  return (
      <div className='detail-box'>
        <img src={menuData.image} className='thing-image' />
        <div className='item-name-show'>
          <span>{menuData.zh_name}</span>
          <span>{menuData.en_name}</span>
          <span>{menuData.baozhuang_zh_name}</span>
        </div>
        <div className='item-price-content'>
          <del className='price-del'>{menuData.old_price}</del>
          <div className='price-now'>{menuData.price}</div>
        </div>
        {!status && (
          <div
            style={{width: '100px', margin: '0 20px', height: '38px', fontSize: '28px', lineHeight: '38px'}}
          >
            {menuData.qty}
          </div>
        )}
        {status && 
          <InputNumber className='item-num-input' size="large" min={1} defaultValue={editNumber} onChange={setEditNum} />
        }
        <div className='item-price-totle'>{menuData.total}</div>
        <Popconfirm placement="bottom" title='确认删除？' onConfirm={confirm} okText="Yes" cancelText="No">
          <Button className='btn-delete' type="primary" shape="circle" icon="delete" />
        </Popconfirm>
        
        {status ? (
          <Button
            className='btn-edit'
            type="primary"
            onClick={() => {
              handelEditNum({
                cmd: 'editCartCount',
                cartId: menuData.id,
                count: editNumber,
              })
                .then(res => {
                  if (`${res.result}` === '0') {
                    setStatus(false);
                    message.success('编辑成功！')
                    onChange()
                  } else {
                    message.error('编辑失败！')
                  }
                })
            }}
            shape="circle"
            icon="save"
          />
        ) : (
          <Button
            className='btn-edit'
            type="primary"
            onClick={() => {
              setStatus(true)
              setEditNum(menuData.qty)
            }}
            shape="circle"
            icon="edit"
          />
        )}
      </div>
  );
};

export default CigarItemPage;
