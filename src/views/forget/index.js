import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin, Divider } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import homeGWC from "@/assets/images/home_gwc.png";
import { login, getUserInfo } from "@/store/actions";
import {getQueryString} from '@/utils/index';

import "./index.less";

const ForgetPage = (props) => {
  const { form, token, login, getUserInfo } = props;
  const { getFieldDecorator } = form;
  const isShow = getQueryString('resetKey')
  console.log(isShow)
  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    login(username, password)
      .then((data) => {
        message.success("登录成功");
        handleUserInfo(data.token);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  };

  // 获取用户信息
  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => {})
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { username, password,yzm } = values;
        handleLogin(username, password, yzm);
      } else {
        console.log("检验失败!");
      }
    });
  };
  
  const renderTitle = (name,message) => (
    <div className='top-box'>
      {name && <><span className='top-name'>{name}</span>
      <Divider style={{margin: '20px 0'}} /></>}
      <span className='top-mess'>{message}</span>
    </div>
  )

  return (
    <DocumentTitle title={"忘记密码"}>
      <div className="login-container">
        <div className="content">
            <div className="title">忘记密码</div>
            <div className='login-box '>
              {(isShow && isShow.length > 0 ? 
              <Form onSubmit={handleSubmit} className='login-item next'>
                {renderTitle('', '请输入您的电子邮件地址来接收密码重置链接')}
                <Spin spinning={loading} tip="登录中...">
                  <Form.Item>
                    {getFieldDecorator("newPassword", {
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: "请输入新密码",
                        },
                      ],
                      initialValue: "", // 初始值
                    })(
                      <Input
                        prefix={
                          <Icon type="user" style={{ color: "#B78E74" }} />
                        }
                        type="password"
                        placeholder="新密码"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("agaiPpassword", {
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: "请输入新密码",
                        },
                      ],
                      initialValue: "", // 初始值
                    })(
                      <Input
                        prefix={
                          <Icon type="lock" style={{ color: "#B78E74" }} />
                        }
                        type="password"
                        placeholder="确认新密码"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      登录
                    </Button>
                  </Form.Item>
                </Spin>
              </Form>
              :
              <Form onSubmit={handleSubmit} className='login-item left'>
              {renderTitle('', '请输入您的电子邮件地址来接收密码重置链接')}
              <Spin spinning={loading} tip="登录中...">
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入邮箱",
                      },
                    ],
                    initialValue: "", // 初始值
                  })(
                    <Input
                      prefix={
                        <Icon type="user" style={{ color: "#B78E74" }} />
                      }
                      placeholder="用户名"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                <img width='60' className='yzmImage' src={homeGWC} alt='验证码' />

                  {getFieldDecorator("yzm", {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入验证码",
                      },
                    ],
                    initialValue: "", // 初始值
                  })(
                    <Input
                      // prefix={
                      //   <Icon type="lock" style={{ color: "#B78E74" }} />
                      // }
                      // type="password"
                      placeholder="验证码"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    发送邮件
                  </Button>
                </Form.Item>
              </Spin>
            </Form>
              )}
            </div>
        </div>
      </div>
    </DocumentTitle>
  );
};

const WrapForgetPage = Form.create()(ForgetPage);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapForgetPage
);
