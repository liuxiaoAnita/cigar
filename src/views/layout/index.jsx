import React , { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Content from "./Content";
import Header from "./Header";
import HeaderH5 from "./Header/h5";
import Footer from "./Footer";
import FooterH5 from "./Footer/h5";
import Warning from "./Warning";
import BackTop from "./BackTop";
import RightPanel from "./RightPanel";
import TagsView from "./TagsView";
import { Layout } from "antd";
import {getCookie, setCookie} from '@/utils/index';
const Main = (props) => {
  const [isRead, setRead] = useState(getCookie('isRead') || '');
  const { tagsView, windowWidth } = props;
  const [isPC, setPC] = useState(false);
  
  const handelBtn = (data) => {
    setCookie('isRead', data)
    setRead(data)
  }

  useEffect(() => {
    setPC(windowWidth >= 1000)
    console.log('windowWidth')
    console.log(windowWidth)
  }, [windowWidth])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        { isRead !== 'already' && <Warning isPC={isPC} handelBtn={handelBtn}/> }
        {isPC ? <Header /> : <HeaderH5 />}
        {tagsView ? <TagsView /> : null}
        <Content style={{alignItem: 'auto'}}  isPC={isPC} windowWidth={ windowWidth } />
        <RightPanel />
        {isPC ? <Footer /> : <FooterH5 />}
        <BackTop isPC={isPC} />
      </Layout>
    </Layout>
  );
};
export default connect((state) => state.settings)(Main);
