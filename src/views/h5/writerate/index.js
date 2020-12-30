import React, { Component } from "react";
import {colorItem} from '@/utils/index';
import {  message,Rate, Input, Button  } from "antd";
import { login } from "@/store/actions";
import WrietItem from './WriteItem'
import {getQueryVariable} from '@/utils'
import "./index.less";

const { TextArea } = Input;
class MyRatePage extends Component {
  state = {
    orderData: [],
    xiangxing: [],
    xiangxingArr: [],
    xiangSelected: [],
    starVal: 0,

    pingjiaArr: [],
    
  };
  componentDidMount() {
    this.getOrderData();
    this.getCategoryList();
  }

  getOrderData = () => {
    const orderId = getQueryVariable('orderId')
    login({
      cmd: 'getOrderById',
      orderId,
    })().then(res => {
      if (`${res.result}` === '0') {
        this.setState({
          orderData: res.body.dataList
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

  getCategoryList = () => {
    login({cmd: 'getCategoryList'})()
      .then((res) => {
        if (`${res.result}` === '0') {
          this.setState({
            xiangxing: res.body.xiangxingList,
            xiangxingArr: res.body.xiangxingList,
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


  onChange = value => {
    value = `${value}`
    console.log(value)
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
        this.setState({
          starVal,
        })
      }
    }
  };

  changeSelected = (value, type) => {
    const {xiangxingArr, xiangSelected} = this.state
    if (type === 'add') {
      const result = xiangxingArr.filter(item => item.id !== value.id)
      this.setState({
        xiangSelected: [ ...xiangSelected, value],
        xiangxingArr: result
      })
    } else {
      const result = xiangSelected.filter(item => item.id !== value.id)
      this.setState({
        xiangxingArr: [ ...xiangxingArr, value],
        xiangSelected: result
      })
    }
  }

  onItemChange = (val) => {
    const { pingjiaArr } = this.state
    const filterArr = pingjiaArr.filter(item => item.productId === val.productId) || []
    if (filterArr.length) {
      pingjiaArr.forEach((item, index) => {
        if(item.productId === val.productId) {
          pingjiaArr[index] = val
        }
      })
    } else {
      pingjiaArr.push(val)
    }
    this.setState({
      pingjiaArr
    })
  }

  submitAction = () => {
    console.log('filterArr')
    const orderId = getQueryVariable('orderId')
    const uid = localStorage.getItem('userUid') || ''
    const { pingjiaArr } = this.state
    const filterArr = pingjiaArr.filter(item => item.point > 0 && item.pinfen > 0) || []
    console.log(filterArr)
    console.log(pingjiaArr)
      if(filterArr.length === pingjiaArr.length) {
      this.setState({loading: true})
      login({uid, cmd: 'commentOrder', productList: pingjiaArr, orderId})()
      .then((res) => {
        if (`${res.result}` === '0') {
          message.success('评价成功~')
          this.props.history.push('/myorder')
        } else {
          message.error(`${res.resultNote}`);
        }
        this.setState({loading: false})
      })
      .catch((error) => {
        this.setState({loading: false})
        message.error(error);
      });
    } else {
      message.error('评星、评分是必填项')
    }
  }

  render() {
    const {orderData, xiangxingArr} = this.state
    return (
      <div className="write-rate-h5-page">
        {orderData.map((item, index) => (
          <WrietItem
            item={item}
            key={`write-item-${index}`}
            xiangxingArr={xiangxingArr}
            onChange={this.onItemChange}
          />
        ))}
        {orderData && <div className='submit-box'>
          <Button className='submit-button' onClick={this.submitAction} type='primary'>提交评价</Button>
        </div>}
      </div>
    );
  }
}

export default MyRatePage;

