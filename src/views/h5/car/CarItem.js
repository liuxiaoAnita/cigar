import React , { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Icon, InputNumber, Dropdown, Modal, Layout, Avatar,Input, Popconfirm, Divider, Button, message, Spin  } from "antd";
import { getCarMes, getUserInfo, login } from "@/store/actions";
import "./index.less";

const LayoutHeader = (props) => {
  const {
    editStatus,
    dataItem,
    deleteFun,
    getCarMes,
  } = props;
 
  const [loading, setLoading] = useState(false);
  const [editNum, setEditNum] = useState(0);

  useEffect(() => {
    console.log('dataItem====')
    console.log(dataItem)
    setEditNum(dataItem.qty)
  }, [dataItem])

  useEffect(() => {
    if (!editStatus &&  editNum > 0 &&(dataItem.qty !== editNum)) {
      console.log(dataItem.qty - editNum)
      // console.log(dataItem)
      setLoading(true)
      const uid = localStorage.getItem('userUid') || ''
      login({
        uid,
        cmd: 'editCartCount',
        cartId: dataItem.id,
        count: editNum,
      })()
        .then(res => {
          if (`${res.result}` === '0') {
            console.log('--------')
            setLoading(false)
            getCarMes({uid})
          } else {
          }
        })
    }

  }, [editStatus])

  const handelItem = () => {
    console.log(dataItem.id)
    // if(!editStatus) {
    //   props.history.push(`/detail?id=${dataItem.id}`)
    // }
  }

  return (
    <div className='car-list-item' onClick={() => handelItem()}>
      <img src={dataItem.image} className='picture' />
      <div className='detail-mes'>
        <span className='thing-name' title='sdfsjdfsd' >{dataItem.zh_name}<br />{dataItem.en_name}</span>
        <div className='price-mes'>
          <del className='old-price'>{dataItem.old_price}</del>
          <span className='price'>{dataItem.price}</span>
        </div>
      </div>
      <div className='delete-btn'>
        <Icon className={`${editStatus ? '' : 'hide'} delete-icon`} type="delete" onClick={deleteFun} />
        {editStatus ? (
          <div className='edit-content'>
            <div className='edit-btn' onClick={() => { if (editNum > 0) setEditNum(editNum - 1)}}> - </div>
              <InputNumber
                className='InputNumber'
                size="large"
                min={1}
                value={editNum}
                onChange={setEditNum}
              />
            <div className='edit-btn' onClick={() => { setEditNum(editNum + 1)}}> + </div>
          </div>
        ) : (
          <div className='edit-not'>{dataItem.qty}</div>
        )}
        
        
        
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
    ...state.app,
    ...state.user,
    ...state.settings,
    ...state.car,
  };
};
export default withRouter(connect(mapStateToProps, { login, getUserInfo, getCarMes })(LayoutHeader));
