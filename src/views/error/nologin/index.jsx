import React from "react";
import { withRouter } from 'react-router-dom'
import { Button, Row, Col } from "antd";
import errImg from "@/assets/images/404.png";
import "./index.less";

const NotLogin = (props) => {
  const { history } = props;
  const goHome = () => history.replace("/login");
  return (
    <Row className="not-found">
      <Col span={12}>
        <img src={errImg} alt="404" />
      </Col>
      <Col span={12} className="right">
        <h1>未登录</h1>
        <h2>抱歉，你访问的页面需要先登录</h2>
        <div>
          <Button type="primary" onClick={goHome}>
            登录
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default withRouter(NotLogin);
