import React, { Component } from "react";
import {Form, Icon, Input, Button, DatePicker, message, Select} from 'antd';
import debounce from '@/utils/debounce'
import { connect } from "react-redux";
import {login} from "@/store/actions";

import "./index.less";

const { Option } = Select;

class LoginPage extends Component {
  state = {
    loginPhone: '',
    confirmDirty: false,
    yzmIcon: '',
    yzmImage: '',
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    this.props.form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        let birth = '';
        if (values['birth']) {
          birth = values['birth'].format('YYYY-MM-DD')
        }
        console.log('注册function')
        const params = {"cmd":"userRegist", ...values, birth}
        console.log(params)
        this.handleLogin(params);
      } else {
        console.log("检验失败!");
      }
    });
  };

  handleLogin = (params) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    this.setState({
      loading: true
    })
    login(params)()
      .then((res) => {
        console.log(res)
        if(`${res.result}` === '0'){
          message.success("注册成功，即将跳转登录页");
          setTimeout(() => {
            this.props.history.push("/login");
          }, 1000);
        } else {
          message.error(`${res.resultNote}`);
        }
        this.setState({
          loading: false
        })
      })
      .catch((error) => {
        message.error(error);
        this.setState({
          loading: false
        })
      });
  }; 

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToyzmCode = (rule, value, callback) => {
    const { form } = this.props;
    const { yzmIcon } = this.state
    if (value && value !== yzmIcon.toLowerCase()) {
      callback('验证码不正确');
    } else {
      callback();
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一样');
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

  componentDidMount() {
    this.getSmsUrl(true)
  }

  getSmsUrl = (status = false) => {
    
    login({cmd: 'sendSms'})()
    .then(res => {
      console.log(res)
      if(`${res.result}` === '0'){
        console.log(res.body)
        const {body} = res
        // setCode(body.code)
        // setIconUrl(body.icon)
        
        this.setState({
          yzmIcon: body.code,
          yzmImage: body.icon,
        }, () => {
          if (!status) {
            setTimeout(() => {
              this.props.form.setFieldsValue({yzm: ''})
        }, 1000);
          }
        })
      } else {
        message.error(`${res.resultNote}`);
      }
    })
  }

  checkPassword =  (rule, value, callback) => {//必须为字母加数字且长度不小于8位
    var str = value;
     if (str == null || str.length <8) {
      callback('字母加数字且长度不小于8位');
     }
     var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
     if (!reg1.test(str)) {
      callback('字母加数字且长度不小于8位');
     }
     var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
     if (reg.test(str)) {
      callback()
     } else {
      callback('字母加数字且长度不小于8位');
     }
 }

  render() {
    const { yzmImage, yzmIcon } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="h5-login-Page" >
        <div className='top-title'>客户登录</div>
        <div className='sub-title-mes'>登录信息</div>
        <Form className="" onSubmit={this.handleSubmit} className="h5-login-container login-form">
         
        <Form.Item >
            {getFieldDecorator('eamil', {
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
                { validator: this.checkPassword }
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
            {getFieldDecorator('yzm', {
              rules: [
                { required: true, message: '输入验证码' },
                {
                  validator: this.compareToyzmCode,
                },
              ],
              
            })(
              <Input
                prefix={<Icon type="check-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="验证码"
              />,
            )}
              <img width='60' className='yzmImage' onClick={debounce(this.getSmsUrl, 1000)} src={`${yzmImage}?random=${Math.random()}`} alt='验证码' />
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
                  <Select placeholder='性别' style={{ width: '140rem' }} onChange={this.handleChange}>
                    <Option value="man">男</Option>
                    <Option value="woman">女</Option>
                  </Select>
                )}
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            {getFieldDecorator('wx', {})(
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