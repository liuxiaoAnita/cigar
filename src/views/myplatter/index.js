import React, { Component } from "react";
import { Button, Icon, message } from "antd";
import { login } from "@/store/actions";
import BannerAdvert from "@/components/Banner/advert.js";
import TitleSplit from "@/components/TitleSplit/index.js";


import "./index.less";
class MyPlatterPage extends Component {
  state = {
    loading: true,
    users: [],
    myOrder: [],
    totleCount: 0,
    dataList: []
  };
  componentDidMount() {
    // this.getUsers()
    this.getZxppList()
  }

  getZxppList = () => {
    const categoryId = localStorage.getItem('categoryId')
    const params = {cmd: 'getZxppList', categoryId}
    login(params)()
      .then((res) => {
        if (`${res.result}` === '0') {
          console.log(res.body.dataList)
          this.setState({
            dataList: res.body.dataList || []
          })
        } else {
          message.error(`${res.resultNote}`);
        }
        this.setState({loading: false})
      })
      .catch((error) => {
        this.setState({loading: false})
        message.error(error);
      });
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
    const {dataList} = this.state
    return (
      <div className='my-platter-content'>
      {dataList.map((item, index) => (
        <div className='my-platter-item' key={`platter-item-${index}`}>
          <img className='platter-image' src={item.image} />
          <div className='title-name'>
            <span>产品名称</span>
            <span>数量</span>
          </div>
          <div className='platter-mes'>
            <div className='message'>
              <span className='name'>{item.zh_name || item.en_name}</span>
              <span className='baozhuang'>{item.baozhuang_zh_name}</span>
              <span className='guige'>长度（毫米）{item.changdu}&nbsp;&nbsp;|&nbsp;&nbsp;环径 {item.huanjing}</span>
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
            <React.Fragment key={`my-order-right-${index}`} >
              {item.count > 0 && <div className='list-item'>
                <span className='name'>{item.zh_name}</span>
                <span className='count-number'>×{item.count}</span>
                <div className='btn-box'>
                  <i className='minus' onClick={() => this.handelChangeNum(item, false)}>-</i>
                  <i className='plus' onClick={() => this.handelChangeNum(item)}>+</i>
                </div>
              </div>}
            </React.Fragment>
          ))}
        </div>
        <div className='totle-price'>订单金额：{totleCount}</div>
        <div className='add-shop-action'>
          <Button className='add-shop-btn' onClick={() => this.handelAddShop('addCart')} type='primary'>添加到购物车</Button>
          <Button className='add-heart-btn' onClick={() => this.handelAddShop('addXinyuandan')} type="link" block>
            <Icon className='icon-image' type="heart" />添加到心愿单
          </Button>
        </div>
      </div>
    )
  }

  handelAddShop = (type) => {
    const uid = localStorage.getItem('userUid') || ''
    if (uid === '') {
      message.error('先登录！')
    } else{
      const {myOrder = []} = this.state
      if (myOrder.length < 0) {
        message.error('未添加内容')

      } else {
        const productList = []
        myOrder.forEach(item => {
          productList.push({
            id: item.id,
            count: item.count
          })
        })
        login({cmd: type, uid, productList})()
          .then((res) => {
            if (`${res.result}` === '0') {
              message.success(`添加${type === 'addCart' ? '购物城' : '心愿单'}成功！`)
             
            } else {
              message.error(`${res.resultNote}`);
            }
            this.setState({loading: false})
          })
          .catch((error) => {
            this.setState({loading: false})
            message.error(error);
          });
      }
    }
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

