import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import Menu from '../components/menu';
import { login, getCarMes } from "@/store/actions";
import { Button, Icon, InputNumber, message, Popconfirm} from "antd";

import "./index.less";
class User extends Component {
  state = {
    users: [],
    dataList: [],
  };

  componentDidMount() {
    this.init()
  }

  init = () =>{
    const uid = localStorage.getItem('userUid') || ''
    login({cmd: 'xinyuandanList', uid})()
      .then(res => {
        console.log(res)
        if(`${res.result}` === '0'){
          // message.success('修改成功')
          this.setState({
            dataList: res.body.dataList
          })
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

  renderEmpty = () => (
    <div className='empty-content'>
      <Icon className='icon-image' type="heart" />
      <span className='detail-mes'>您还没有心愿</span>
      <span className='link-content'><i className='link-url' onClick={() => this.props.history.push('/home')}>点击这里</i>去添加心愿</span>
    </div>
  )

  onChangeNumber = (e) => {
    console.log(e)
  }

  handelDelete = (ids) => {
    const uid = localStorage.getItem('userUid') || ''
    login({cmd: 'delXinyuandan', uid, ids: [ids]})()
      .then(res => {
        console.log(res)
        if(`${res.result}` === '0'){
          message.success('删除成功')
          this.init()
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

  addCar = (ids) => {
    const uid = localStorage.getItem('userUid') || ''
    login({cmd: 'saveXydCartOrder', uid, xinyuandanList: ids})()
      .then(res => {
        if(`${res.result}` === '0'){
          message.success('添加购物车成功')
          this.init();
          this.props.getCarMes({uid})
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

  renderHeart = () => {
    const {dataList} = this.state
    return (
      <div className='heart-content'>
        {dataList.map((item, index) => (
          <div key={`heart-item-${index}`} className='heart-item'>
            <img src={item.image} />
            <Popconfirm placement="bottom" title='确认删除？' onConfirm={() => this.handelDelete(item.id)} okText="Yes" cancelText="No">
              <Icon className='heart-item-delete-btn' type="delete" />
            </Popconfirm>
            <div className='item-detail-mes'>
              <span className='name'>{item.zh_name}</span>
              <span className='danwei'>{item.baozhuang_zh_name}</span>
              <span className='price'>{item.price}</span>
              {/* <span className='btn-detail'>查看详细信息</span> */}
              <div className='action-btns'>
                <InputNumber className='num-input' size="large" min={0} max={100000} defaultValue={item.number} onChange={e => this.onChangeNumber(e)} />
                <Button className='add-shop' type='primary' onClick={() => this.addCar([item.id])}>添加到购物车</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const {dataList} = this.state
    const allId = [];
    dataList.forEach(item => {
      allId.push(item.id)
    })
    return (
      <div className="heart-container">
        <Menu/>
        <div className='right-user-info'>
          <div className='right-title'>
            <span>心愿单</span>
            <Button type="primary" disabled={dataList.length === 0} onClick={() =>this.addCar(allId)}>全部添加到购物车</Button>
          </div>
          {dataList.length > 0 ? this.renderHeart() : this.renderEmpty()}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { getCarMes, })(User));
