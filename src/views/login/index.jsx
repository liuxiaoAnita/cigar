import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin, Divider } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";

const Login = (props) => {
  const { form, token, login, getUserInfo } = props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    login(username, password)
      .then((data) => {
        message.success("登录成功");
        handleUserInfo(data.token);
        props.history.push("/home");
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
        const { username, password } = values;
        handleLogin(username, password);
      } else {
        console.log("检验失败!");
      }
    });
  };

  const handelForget = () => {
    props.history.push("/forget");
  }

  const handelRegister = () => {
    props.history.push("/register");
  }
  
  const renderTitle = (name,message) => (
    <div className='top-box'>
      <span className='top-name'>{name}</span>
      <Divider style={{margin: '20px 0'}} />
      <span className='top-mess'>{message}</span>
    </div>
  )

  return (
    <DocumentTitle title={"用户登录"}>
      <div className="login-container">
        <div className="content">
            <div className="title">用户登录</div>
            <div className='login-box '>
              <Form onSubmit={handleSubmit} className='login-item left'>
                {renderTitle('已加入会员', '如果您已经拥有账户，请使用您的电子邮件地址登录')}
                <Spin spinning={loading} tip="登录中...">
                  <Form.Item>
                    {getFieldDecorator("username", {
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: "请输入用户名",
                        },
                      ],
                      initialValue: "admin", // 初始值
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
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: "请输入密码",
                        },
                      ],
                      initialValue: "123456", // 初始值
                    })(
                      <Input
                        prefix={
                          <Icon type="lock" style={{ color: "#B78E74" }} />
                        }
                        type="password"
                        placeholder="密码"
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
                    <span className='forget-password' onClick={handelForget}>忘记密码?</span>
                  </Form.Item>
                </Spin>
              </Form>
              <div className='login-item right'>
              {renderTitle('新会员', '创建一个新的账户，让我们为您提供更优质的服务')}
              <Button
                htmlType="submit"
                className="login-form-button"
                onClick={handelRegister}
              >
                注册
              </Button>
            </div>
            </div>
        </div>
      </div>
    </DocumentTitle>
  );
};

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapLogin
);
