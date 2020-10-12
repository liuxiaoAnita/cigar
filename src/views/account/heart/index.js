import React, { Component } from "react";
import Menu from '../components/menu';
import { Button, Icon, InputNumber } from "antd";

import "./index.less";
class User extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    // this.getUsers()
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

  renderHeart = () => {
    const heartData = {
      id:"", 
      "baozhuang_en_name": '111',
      "baozhuang_zh_name": '222',
      "zh_name": '333',
      "en_name": '444',
      "number": '555',
      "point": '666',
      "fen": '777',
      "price": '888',
      "old_price": '999',
      "image": 'rrr',
    }
    const dataList = [heartData,heartData,heartData,heartData,heartData]
    return (
      <div className='heart-content'>
        {dataList.map((item, index) => (
          <div key={`heart-item-${index}`} className='heart-item'>
            <img src={item.image} />

            <div className='item-detail-mes'>
              <span className='name'>{item.zh_name}</span>
              <span className='danwei'>{item.baozhuang_zh_name}</span>
              <span className='price'>{item.price}</span>
              <span className='btn-detail'>查看详细信息</span>
              <div className='action-btns'>
                <InputNumber className='num-input' size="large" min={1} max={100000} defaultValue={1} onChange={e => this.onChangeNumber(e)} />
                <Button className='add-shop' type='primary'>添加到购物车</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { users } = this.state
    
    return (
      <div className="heart-container">
        <Menu/>
        <div className='right-user-info'>
          <div className='right-title'><span>心愿单</span><Button type="primary">全部添加到购物车</Button></div>
          {/* {this.renderEmpty()} */}
          {this.renderHeart()}
        </div>
      </div>
    );
  }
}

export default User;
