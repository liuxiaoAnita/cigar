import React, { Component } from "react";
import { login } from "@/store/actions";
import {colorItem} from '@/utils/index'
import BannerThings from "@/components/Banner/things.js";
import BannerTop from "@/components/Banner/bannerTop.js";
import ItemBox from "@/components/Banner/ItemBox.js";

import {getQueryVariable} from '@/utils'
import { Button, Icon, Input, InputNumber, message} from "antd";

import "./index.less";
class User extends Component {
  state = {
    users: [],
    isHasDetail: false,
    dataList: {},
    count: 0,
    productList: [], // 推荐产品
    topList: [], // 也喜欢的商品
  };

  componentDidMount() {
    const id = getQueryVariable('id') || ''
    this.setState({
      thingId: id,
    },() => {
      this.init(this.state.thingId)
    })
  }

  init = (id) =>{
    const uid = localStorage.getItem('userUid') || '';
    if (id) {
      login({cmd: 'getProductById', uid, id})()
      .then(res => {
        console.log(res)
        if(`${res.result}` === '0'){
          // message.success('修改成功')
          this.setState({
            dataList: res.body,
            productList: res.body.productList|| [],
            topList: res.body.topList|| [],
            isHasDetail: true,
          })
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
    } else {
      message.info('没有这个产品详情~')
    }
  }

  renderTop = () => {
    const { dataList, count, productList, topList } = this.state
    return (
      <div className='detail-item-message'>
        <div className='top-mess'>
          <div className='left-content'>
            <div className='image-content'>
              <div><img src='' width={400} height={400} /></div>
              <div>

              </div>
            </div>
            <div className='message-detail-content'>
              <span className='name'>{dataList.zh_name}</span>
              <span className='zh-name'><i>中文名：</i>{dataList.en_name}</span>
              <span className='en-name'><i>英文名</i>{dataList.en_name}</span>
              <span className='brand-name'><i>品牌</i>{dataList.brand_zh_name}</span>
              <span className='baozhuang-name'><i>包装</i>{dataList.baozhuang_zh_name}</span>
              <span className='pinxing-name'><i>品型</i>{dataList.pinxing_zh_name}</span>
              <span className='changdu'><i>长度(毫米)</i>{dataList.changdu}</span>
              <span className='huanjing'><i>环径</i>{dataList.huanjing}</span>
              <div className='xiangxing-content'>
                {dataList.xiangxing_zh_name.map((item, index) =>(
                  <div
                    className='xiangxing-item'
                    key={`xiangxing-item-${index}`}
                    style={{color: colorItem[index], borderColor: colorItem[index]}}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <span className='price-num'>￥{dataList.price}</span>
              <div className='count-box'>
                <span className='count-title'>数量</span>
                <span className='count-button jian-btn' onClick={() =>{ if (count > 0) this.setState({count: count - 1})}}>-</span>
                <Input className='count-input' value={count} onChange={e => this.setState({count: e.target.value})} />
                <span className='count-button jia-btn' onClick={() => this.setState({count: count + 1})}>+</span>
              </div>
              <div className='button-box'>
                <Button className='buy-button'>立即购买</Button>
                <Button className='car-button' type="primary">加入购物车</Button>
                <div className='myheart'><Icon className='icon-heart' type="heart" theme="filled"  /></div>

              </div>
            </div>
          </div>
          <div className='right-content'>
            <span className='top-message'>喜欢它的人也喜欢</span>
            {topList.map((item, index) => (
              <div onClick={() => {
                this.props.history.push(`/detail?id=${item.id}`)
                this.setState({
                  thingId: item.id,
                },() => {
                  this.init(this.state.thingId)
                })
              }} key={`detail-right-item-${index}`} className='right-item'>
                <ItemBox item={item} />
              </div>
            ))}
          </div>
        </div>


        <BannerTop title='推荐产品' descr='RECOMMENDED PRODUCTS' />
        <BannerThings data={productList} />
      </div>
    )
  }

  render() {
    const {isHasDetail} = this.state
    return (
      <div className="thing-detail-container">
        {isHasDetail ? this.renderTop() : '暂无信息'}
      </div>
    );
  }
}

export default User;
