import React , { useState } from 'react';
import { connect } from "react-redux";
import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import Warning from "./Warning";
import BackTop from "./BackTop";
import RightPanel from "./RightPanel";
import TagsView from "./TagsView";
import { Layout } from "antd";
import {getCookie, setCookie} from '@/utils/index';
const Main = (props) => {
  const [isRead, setRead] = useState(getCookie('isRead') || '');
  const { tagsView } = props;

  const handelBtn = (data) => {
    setCookie('isRead', data)
    setRead(data)
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        { isRead !== 'already' && <Warning handelBtn={handelBtn}/> }
        <Header />
        {tagsView ? <TagsView /> : null}
        <Content />
        <RightPanel />
        <Footer />
        <BackTop />
      </Layout>
    </Layout>
  );
};
export default connect((state) => state.settings)(Main);
