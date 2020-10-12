import React, { Component } from "react";
import { Button, Icon } from "antd";
import BannerAdvert from "@/components/Banner/advert.js";
import TitleSplit from "@/components/TitleSplit/index.js";


import "./index.less";
class MyPlatterPage extends Component {
  state = {
    users: [],
    myOrder: [],
    totleCount: 0,
  };
  componentDidMount() {
    // this.getUsers()
  }

  handelChangeNum = (val, type = true) => {
    const {myOrder} = this.state;
    // 判断是否存在拼盘中，在盘中，进行数量增加
    myOrder.forEach((item) => {
      if (item.id === val.id) {
        if (type){
          item.count += 1;
        } else {
          if (item.count > 0) {
            item.count -= 1;
          } 
        }
      }
    })
    // 不在拼盘菜单中，进行添加新的品种
    const arrFilter = myOrder.filter(item => item.id === val.id)
    if (arrFilter.length === 0) myOrder.push({ ...val, count: 1, })
    // 订单的总价计算
    let totleCount = 0
    myOrder.forEach(item => {
      totleCount += item.price * item.count;
    })
    this.setState({
      myOrder,
      totleCount,
    })
  }

  renderPlatter = () => {
    const platter = {// 精品商品列表
      "id":"1",// 商品id
      "zh_name": '比雅达 蜜饯', //中文名
      "en_name": 'Jose L. Piedra Con', //英文名
      "baozhuang_en_name": '保利华 比利高', //包装英文名
      "baozhuang_zh_name": '保利华 比利高', //包装中文名
      "price": '10.00', //会员价
      "changdu": '127', //长度
      "huanjing": '50', //环径
      "old_price": '100.00', //市场价
      "image": '', //图片
    }
    const platterData = [
      {...platter, id: '1'},
      {...platter, id: '2'},
      {...platter, id: '3'},
      {...platter, id: '4'},
      {...platter, id: '5'},
    ];
    return (
      <div className='my-platter-content'>
      {platterData.map((item, index) => (
        <div className='my-platter-item' key={`platter-item-${index}`}>
          <img className='platter-image' src='' />
          <div className='title-name'>
            <span>产品名称</span>
            <span>数量</span>
          </div>
          <div className='platter-mes'>
            <div className='message'>
              <span className='name'>{item.zh_name}{item.en_name}</span>
              <span className='baozhuang'>{item.baozhuang_zh_name}</span>
              <span className='guige'>长度（毫米）{item.changdu}&nbsp;&nbsp;|&nbsp;&nbsp;环径 ${item.huanjing}</span>
            </div>
            <div className='action-box'>
              <span className='now-price'>￥{item.price}</span>
              <Button type="primary" onClick={() => this.handelChangeNum(item)}>添加拼盘</Button>
            </div>
          </div>
        </div>
      ))}
      </div>
    )
  }

  renderEmpty = () => (
    <div className='empty-content'>
      <Icon className='icon-image' type="account-book" />
      <span className='detail-mes'>无上架产品</span>
      <span className='link-content'><i className='link-url' onClick={() => this.props.history.push('/home')}>点击这里</i>去购物</span>
    </div>
  )

  renderRightMenu = () => {
    const {myOrder, totleCount} = this.state;
    return(
      <div className='right-menu'>
        <div className='list-menu-box'>
          {myOrder.map((item, index) => (
            <>{item.count > 0 && <div key={`my-order-right-${index}`} className='list-item'>
              <span className='name'>{item.zh_name}</span>
              <span className='count-number'>×{item.count}</span>
              <div className='btn-box'>
                <i className='minus' onClick={() => this.handelChangeNum(item, false)}>-</i>
                <i className='plus' onClick={() => this.handelChangeNum(item)}>+</i>
              </div>
            </div>}</>
          ))}
        </div>
        <div className='totle-price'>订单金额：{totleCount}</div>
        <div className='add-shop-action'>
          <Button className='add-shop-btn' onClick={this.handelAddShop} type='primary'>添加到购物车</Button>
          <Button className='add-heart-btn' onClick={this.handelAddHeart} type="link" block>
            <Icon className='icon-image' type="heart" />添加到心愿单
          </Button>
        </div>
      </div>
    )
  }

  handelAddShop = () => {
    console.log(this.state.myOrder)

  }

  handelAddHeart = () => {
    console.log(this.state.myOrder)
  }

  render() {
    return (
      <div className="MyPlatterPage-container">
        <BannerAdvert />
        <div className='platter-box'>
          <TitleSplit
            title='自选拼盘'
          />
          <div className='sub-title'>
            <span className='left-message'>本版面单支雪茄图片仅供参考，实际大小请以标示的雪茄环径长度为准。<br />请点击单支雪茄图片，获取详细资料</span>
            <div className='right-mes'>
              <span className='menu-name-title'>拼盘菜单</span>
              <span className='menu-sub-title'>运费¥20，自选10支或以上自动扣减运费</span>
            </div>
          </div>
          <div className='platter-content'>
            <div className='platter-left-detail'>
              
              {this.renderPlatter()}
              {/* {this.renderEmpty()} */}
            </div>
            <div className='platter-right'>
              {this.renderRightMenu()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPlatterPage;

