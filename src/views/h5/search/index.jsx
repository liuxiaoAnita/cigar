import React, { Component } from "react";
import ItemBox from "@/components/Banner/ItemBox.js";
import {message, Input, Drawer} from 'antd';
import {login} from "@/store/actions";

import "./index.less";

const { Search } = Input;
class SearchPage extends Component {
  state = {
    searchVal: '',
    categoryList: [],
    categoryChild: [],
    showCategoryChild: false,
    activeArr: [],
    searchList: [],
  };
  componentDidMount() {
    this.getHomeMes()
  }
  // getProductList

  getHomeMes = () => {
    const uid = localStorage.getItem('userUid') || ''
    login({cmd: 'getHomepage', uid})()
      .then(res => {
        if (`${res.result}` === '0') {
          console.log(res.body)
          const {body = {}} = res;
          const { categoryList = [] } = body;

          this.setState({
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

  getSearchMes = () => {
    const { searchVal } = this.state
    login({cmd: 'getProductList', name: searchVal})()
      .then(res => {
        if (`${res.result}` === '0') {
          console.log(res.body)
          const {dataList = []} = res.body
          this.setState({
            searchList: [...dataList,...dataList,...dataList],
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

  onSearchFun = val => {
    this.setState({
      searchVal: val,
    }, () => {
      this.getSearchMes()
    })
  }

  render() {
    const { searchVal, searchList } = this.state
    return (
      <div className="h5-search-container">
        <div className='search-background' />
        <Search className='search-input' placeholder="品牌/名称" onSearch={value => this.onSearchFun(value)} enterButton />
        {searchVal.length === 0 && this.renderCategory()}
        {searchVal.length > 0 && (
          <div className='search-content'>
            <div className='search-val'>搜索结果：'{searchVal}'</div>
            {searchList.length === 0 ? (
              <div className='search-empty'>
                <span>没有搜索到<i>'{searchVal}'</i>相关信息</span>
                <span>请重新搜索</span>
              </div>
            ) : (
              <div className='search-box'>
                {searchList.map((item, index) => (
                  <div className="search-item" key={`searcch-item-${index}`}>
                    <ItemBox item={item} />
                  </div>
                ))}
              </div>
            )}
            
          </div>
        )}
      </div>
    );
  }
}

export default SearchPage;

