import React , { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Icon, Menu, Dropdown, Modal, Layout, Avatar,Input, Popconfirm, Divider, Button, message, Spin  } from "antd";
import { getCarMes, getUserInfo, login } from "@/store/actions";

import CarItem from './CarItem';

import "./index.less";

const LayoutHeader = (props) => {
  const {
    editStatus,
    login,
    getCarMes,
    dataList,
  } = props;
  
  
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteData, setDeleteData] = useState({}); //
  const [shopaData, setShopaData] = useState([]); //
  const [uid, setUid] = useState('')

  useEffect(() => {
    if (dataList && dataList.length >= 0) {
      setShopaData(dataList);
      console.log(dataList);
    }
  }, [dataList])


  
  useEffect(() => {
    initFun()
  }, [])

  const initFun = () => {
    const userUid = localStorage.getItem('userUid') || ''
    setUid(userUid)
    if (userUid && userUid !== '') {
      getCarMes({uid: userUid})
    }
  }

  const deleteFun = (menuData = deleteData) => {
    const uid = localStorage.getItem('userUid') || '';
    console.log(menuData)
    setLoading(true);
    login({
      uid,
      cmd: 'delCart',
      cartIds: [menuData.id],
    })
      .then(res => {
        if (`${res.result}` === '0') {
          message.success('删除成功！');
          initFun();
          setLoading(false);
          setVisible(false)
        } else {
          message.error('删除失败！');
        }
      })
  }

  const  renderEmpty = () => (
    <div className='empty-content'>
      <Icon className='shopping-car' type="shopping-cart" />
      <span className='detail-mes'>你的购物车还是空的</span>
      <span className='link-content'>您可以<i className='link-url' onClick={() => props.history.push('/home')}>点击此处</i>去购物</span>
    </div>
  )


  return (
    <Spin spinning={loading} tip="">
      <div className='car-content'>
        {shopaData && shopaData.length === 0 && renderEmpty()}
        {shopaData && shopaData.length > 0 && shopaData.map((item, index) => (
          // <div  key={`data-item-${index}`}>00</div>
          <CarItem key={`data-item-${index}`} dataItem={item} editStatus={editStatus} deleteFun={() => {
            setVisible(true);
            setDeleteData(item)
          }} />
        ))}
      </div>
      <Modal
        title=""
        visible={visible}
        onOk={() => deleteFun()}
        onCancel={() => setVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <p>确认删除？</p>
      </Modal>
    </Spin>
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
