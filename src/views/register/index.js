import React, { useState } from "react";
import { Form, Icon, Input, Button, message, Spin, Divider,DatePicker ,Select } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import homeGWC from "@/assets/images/home_gwc.png";
import { login, getUserInfo } from "@/store/actions";
import {getQueryString} from '@/utils/index';
import "./index.less";

const { Option } = Select;
const ForgetPage = (props) => {
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
        // handleLogin(username, password, yzm);
        console.log('注册function')
      } else {
        console.log("检验失败!");
      }
    });
  };
  
  const renderTitle = (name,message) => (
    <div className='top-box'>
      {name && <span className='top-name'>{name}</span>}
      {name && <Divider style={{margin: '20px 0'}} />}
      {message && <span className='top-mess'>{message}</span>}
    </div>
  )

  const onChangeBirthday = (date, dateString) => {
    console.log(date, dateString);
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  return (
    <DocumentTitle title={"建立新的账户"}>
      <div className="login-container">
        <div className="content">
            <div className="title">建立新的账户</div>
              <Form onSubmit={handleSubmit} >
              <Spin spinning={loading} tip="登录中...">
                <div className='login-box ' >
                  <div className='login-item next'>
                    {renderTitle('登录信息')}
                   
                      <Form.Item>
                        {getFieldDecorator("emailNumber", {
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
                              <Icon type="mail" style={{ color: "#B78E74" }} />
                            }
                            placeholder="邮箱"
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
                          initialValue: "", // 初始值
                        })(
                          <Input
                            prefix={
                              <Icon type="lock" style={{ color: "#B78E74" }} />
                            }
                            placeholder="密码"
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator("againPassword", {
                          rules: [
                            {
                              required: true,
                              whitespace: true,
                              message: "请确认密码",
                            },
                          ],
                          initialValue: "", // 初始值
                        })(
                          <Input
                            prefix={
                              <Icon type="lock" style={{ color: "#B78E74" }} />
                            }
                            type="password"
                            placeholder="确认密码"
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
                            placeholder="验证码"
                          />
                        )}
                      </Form.Item>
                  </div>
                  <div className='login-item left'>
              {renderTitle('个人信息', '')}
                <Form.Item>
                  {getFieldDecorator("userName", {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入姓名",
                      },
                    ],
                    initialValue: "", // 初始值
                  })(
                    <Input
                      prefix={
                        <Icon type="user" style={{ color: "#B78E74" }} />
                      }
                      placeholder="姓名"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("phoneNum", {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "请输入电话",
                      },
                    ],
                    initialValue: "", // 初始值
                  })(
                    <Input
                      prefix={
                        <Icon type="phone" style={{ color: "#B78E74" }} />
                      }
                      placeholder="电话"
                    />
                  )}
                </Form.Item>
                <Form.Item className='birthday-gender'>
                  <DatePicker placeholder='生日' onChange={onChangeBirthday} />
                  <Select placeholder='性别' style={{ width: 120 }} onChange={handleChange}>
                    <Option value="man">男</Option>
                    <Option value="woman">女</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                    <Input
                      prefix={
                        <Icon type="wechat" style={{ color: "#B78E74" }} />
                      }
                      placeholder="微信ID"
                    />
                </Form.Item>
            </div>
                </div>
                <Form.Item className='form-button'>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      创建
                    </Button>
                  </Form.Item>
              </Spin>

              </Form>
        </div>
      </div>
    </DocumentTitle>
  );
};

const WrapForgetPage = Form.create()(ForgetPage);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapForgetPage
);
