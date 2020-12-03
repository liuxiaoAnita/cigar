import React, { Component } from "react";
import {Form, Icon, Input, Button, DatePicker, message, Select} from 'antd';
import { connect } from "react-redux";
import {login} from "@/store/actions";

import "./index.less";

const { Option } = Select;

class LoginPage extends Component {
  state = {
    loginPhone: '',
    confirmDirty: false,
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
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

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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
        <div className='sub-title-mes'>登录信息</div>
        <Form className="" onSubmit={this.handleSubmit} className="h5-login-container login-form">
         
        <Form.Item >
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '输入合法邮箱',
                },
                {
                  required: true,
                  message: '输入邮箱',
                },
              ],
            })(
              <Input
                placeholder="邮箱"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            )}
          </Form.Item>
          
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '输入密码',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input
                placeholder="密码"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '重新输入密码',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input
                placeholder="确认密码"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                onBlur={this.handleConfirmBlur} 
              />
            )}
          </Form.Item>
         
          <Form.Item>
            {getFieldDecorator('checkVal', {
              rules: [
                { required: true, message: '输入验证码' },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
              
            })(
              <Input
                prefix={<Icon type="check-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="验证码"
              />,
            )}
          </Form.Item>
          <div className='sub-title-mes'>个人信息</div>

          <Form.Item>
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '输入姓名', whitespace: true }],
            })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="姓名"
            />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '输入电话', whitespace: true }],
            })(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="电话"
            />
            )}
          </Form.Item>

          <div className='form-two-box'>
            <div className='left-date'>
              <Form.Item>
                {getFieldDecorator('birth', {})(<DatePicker placeholder='生日' />)}
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                {getFieldDecorator('sex', {})(
                  <Select placeholder='性别' style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value="man">男</Option>
                    <Option value="woman">女</Option>
                  </Select>
                )}
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            {getFieldDecorator('wxId', {})(
            <Input
              prefix={<Icon type="wechat" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="微信ID"
            />
            )}
          </Form.Item>
          <Form.Item>
            <div className='form-button-box'>
            <Button type="primary" htmlType="submit" className="login-form-button">
            创建
            </Button>
            </div>
          </Form.Item>
        </Form>

      </div>
    );
  }
}


const WrappedNormalLoginForm = Form.create()(LoginPage);
export default connect(null)(
  WrappedNormalLoginForm
);