import React, { Component } from "react";
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import { connect } from "react-redux";
import {login} from "@/store/actions";

import "./index.less";
class LoginPage extends Component {
  state = {
    loginPhone: '',
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.handleLogin(values.username, values.password)
      }
    });
  };

  handleLogin = (param, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    const params = {"cmd":"userLogin", param, password}

    login(params)()
      .then((res) => {
        console.log(res)
        if (`${res.result}` === '0') {
          message.success("登录成功");
          localStorage.setItem('userUid', res.body.uid)
          this.props.history.push("/myself");
        } else {
          message.error(`${res.resultNote}`);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };
  // componentDidMount() {

  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="h5-login-Page" >
        <div className='top-title'>客户登录</div>
        <div className='sub-title-mes'>已加入会员</div>
        <div className='title-mes'>如果您已经拥有账户，请使用您的电子邮件地址登录</div>
        <Form className="" onSubmit={this.handleSubmit} className="h5-login-container login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名称"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '输入密码' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <div className='form-button-box'>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <Button className="forget-form-button" onClick={() => this.props.history.push('/forget')}>
              忘记密码
            </Button>
            </div>
          </Form.Item>
        </Form>

        <div className='sub-title-mes'>新会员</div>
        <div className='title-mes'>创建一个新的账户，让我们为您提供更优质的服务</div>
        <Button className="register-button" onClick={() => this.props.history.push('/register')}>注册</Button>
      </div>
    );
  }
}


const WrappedNormalLoginForm = Form.create()(LoginPage);
export default connect(null)(
  WrappedNormalLoginForm
);