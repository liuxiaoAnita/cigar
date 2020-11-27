import React , { useEffect, useState } from 'react';
import {withRouter} from "react-router-dom";
import { login } from "@/store/actions";
import { Spin, message, Pagination, Rate } from 'antd'
import { connect } from "react-redux";

import "./index.less";

const PayingPage = (props) => {
  const { id } = props
  
  const [loading, setLoading] = useState(true);
  const [nowPage, setNowPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    initAddressGet();
  }, [id])

  const initAddressGet = () => {
    login({cmd: 'commentList', id})()
      .then(res => {
        console.log(res)
        if(`${res.result}` === '0'){
          setCommentList(res.body.dataList)
          setTotalPage(res.body.totalPage)
        } else {
          message.error(`${res.resultNote}`);
        }
        setLoading(false)
      })
      .catch((error) => {
        message.error(error);
        setLoading(false)
      });
  }

     // 页面跳转
    const onChangePage = currentPage => {
      setNowPage(currentPage)
      initAddressGet()
    }

  return (
    <div className="detail-comment-list-page">
      {loading && <Spin spinning={loading} className='loadingComment' />}
      {!loading && commentList && commentList.map((item, index) => (
        <div className='comment-item' key={`comment-item-${index}`}>
          <img className='icon' src={item.icon} />
          <div className='comment-message'>
            <div className='nickName'>{item.nickname}</div>
            <div className='createDate'>{item.create_date}</div>
            <div className='conent'>{item.conent || '默认好评'}</div>
            <div className='fenAndRate'>
              <span className='fen'>{item.fen}</span>
              <Rate className='rate' allowHalf disabled defaultValue={item.point}  />
            </div>
          </div>
        </div>
      ))}
      <div className='page-box'>
        <Pagination defaultCurrent={nowPage} total={totalPage} onChange={onChangePage} />
      </div>
    </div>
  );
};

export default withRouter(PayingPage);
