import React, { Component } from "react";
import {message, Input, Drawer} from 'antd';
import {login} from "@/store/actions";

import "./index.less";

const { Search } = Input;
class SearchPage extends Component {
  state = {
    bannerList: [],
    adList: [],
    productList: [],
    bokeList: [],
    categoryList: [],
    categoryChild: [],
    showCategoryChild: false,
    activeArr: [],
  };
  componentDidMount() {
    this.getHomeMes()
  }

  getHomeMes = () => {
    const uid = localStorage.getItem('userUid') || ''
    login({cmd: 'getHomepage', uid})()
      .then(res => {
        if (`${res.result}` === '0') {
          console.log(res.body)
          const {body = {}} = res;
          const {bannerList = [], adList = [], productList = [], bokeList = [], categoryList = []} = body;

          this.setState({
            bannerList,
            adList,
            productList,
            bokeList,
            categoryList,
          })
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }

  renderCategory = () => {
    const { categoryList, activeArr} = this.state;
    return (
      <div className='search-category-content'>
        {categoryList.map((item, index) => (
          <div
            key={`category-item-${index}`}
            className={`category-item-content ${activeArr.indexOf(item.id) >= 0 ? 'active' : ''}`}
          >
            <span
              className={`category-item ${item.category2List.length > 0 && 'hasChild'} ${activeArr.indexOf(item.id) >= 0 ? 'active' : ''} `}
              onClick={() => this.handelCategory(item)}
            >
              {item.zh_name}
            </span>
            {item.category2List.length > 0 && <div className='category-child-box' >
              {item.category2List.map((i, k) => (
                <span className='category-child' onClick={() => this.handelCategory(i)} key={`category-inner-child-${k}`}>{i.zh_name}</span>
              ))}
            </div>}
          </div>
        ))}
      </div>
    )
  }

  handelCategory = (data) => {
    const { id = '', category2List = [] } = data
    if (category2List.length > 0) {
      const { activeArr = []} = this.state;
      const indexOfArr = activeArr.indexOf(id)
      if ( indexOfArr >= 0 ) {
        activeArr.splice(indexOfArr, 1)
        this.setState({
          activeArr
        })
      } else {
        this.setState({
          activeArr: [...new Set([...activeArr, id])]
        })
      }
    } else {
      this.props.history.push(`/detail?id=${id}`)
    }
  }

  render() {
    return (
      <div className="h5-search-container">
        <Search className='search-input' placeholder="品牌/名称" onSearch={value => console.log(value)} enterButton />
        {this.renderCategory()}
      </div>
    );
  }
}

export default SearchPage;

