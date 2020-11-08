import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, message, Spin, Divider,DatePicker ,Select } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import debounce from '@/utils/debounce'
import homeGWC from "@/assets/images/home_gwc.png";
import { login, getUserInfo } from "@/store/actions";
import {getQueryString} from '@/utils/index';
import "./index.less";

const { Option } = Select;
const RegisterPage = (props) => {
  const { form, login } = props;
  const { getFieldDecorator } = form;
  const [loading, setLoading] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [code, setCode] = useState('')
  const [iconUrl, setIconUrl] = useState('')

  useEffect(() => {
    getSmsUrl()
  }, []);

  const getSmsUrl = () => {
    login({cmd: 'sendSms'})
    .then(res => {
      console.log(res)
      if(`${res.result}` === '0'){
        console.log(res.body)
        const {body} = res
        setCode(body.code)
        setIconUrl(body.icon)
      } else {
        message.error(`${res.resultNote}`);
        setLoading(false);
      }
    })
  }

  const handleLogin = (params) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    login(params)
      .then((res) => {
        console.log(res)
        if(`${res.result}` === '0'){
          message.success("注册成功，即将跳转登录页");
          setTimeout(() => {
            props.history.push("/login");
          }, 1000);
          setLoading(false);
        } else {
          message.error(`${res.resultNote}`);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
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
        let birth = '';
        if (values['birth']) {
          birth = values['birth'].format('YYYY-MM-DD')
        }
        console.log('注册function')
        const params = {"cmd":"userRegist", ...values, birth}
        console.log(params)
        handleLogin(params);
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

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('保持密码一致哦');
    } else {
      callback();
    }
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value)
  };

  const checkPassword =  (rule, value, callback) => {//必须为字母加数字且长度不小于8位
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
                        {getFieldDecorator("eamil", {
                          rules: [
                            {
                              type: 'email',
                              message: 'The input is not valid E-mail!',
                            },
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
                            { validator: checkPassword }
                            // ({ getFieldValue }) => ({
                            //   validator(rule, value) {
                            //     if (!value || getFieldValue('password') === value) {
                            //       return Promise.resolve();
                            //     }
                            //     return Promise.reject('The two passwords that you entered do not match!');
                            //   },
                            // }),
                          ],
                          initialValue: "", // 初始值
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
                        {getFieldDecorator("confirm", {
                          rules: [
                            {
                              required: true,
                              whitespace: true,
                              message: "请确认密码",
                            },
                            {
                              validator: compareToFirstPassword,
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
                            onBlur={handleConfirmBlur}
                          />
                        )}
                      </Form.Item>
                      <Form.Item>
                        <img width='60' className='yzmImage' onClick={debounce(getSmsUrl, 1000)} src={`${iconUrl}?random=${Math.random()}`} alt='验证码' />
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
                  {getFieldDecorator("nickname", {
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
                  {getFieldDecorator("phone", {
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
                <div>
                      <div>
                      <Form.Item>
                        {getFieldDecorator('birth', {})(<DatePicker placeholder='生日' />)}
                      </Form.Item>
                      </div>
                      <div>
                      {getFieldDecorator('sex', {})(
                      <Select placeholder='性别' style={{ width: 120 }} onChange={handleChange}>
                        <Option value="man">男</Option>
                        <Option value="woman">女</Option>
                      </Select>
                      )}
                      </div>
                </div>

                <Form.Item>
                  {getFieldDecorator("wx", {})(
                    <Input
                    prefix={
                      <Icon type="wechat" style={{ color: "#B78E74" }} />
                    }
                    placeholder="微信ID"
                  />
                  )}
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

const WrapForgetPage = Form.create()(RegisterPage);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapForgetPage
);
