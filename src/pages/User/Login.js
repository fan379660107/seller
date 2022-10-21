import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, Button } from 'antd';
import styles from './Login.less';
import global from '@/global.less';
import {
  failTip,
  sucTip,
  setLocalStorageTime,
  sldSvgIcon,
  saveSettleData,
  sldCheckMobile,
  getSldImgSet,sldComLanguage,mobile_reg
} from '@/utils/utils';
import router from 'umi/router';

const FormItem = Form.Item;
let admin_login_logo = require('../../assets/sld_java_logo.png');
let main_seller_center_logo_local = admin_login_logo;
let com_img_info = getSldImgSet('com_img_info');
if (com_img_info != '') {
  admin_login_logo = com_img_info.filter(item => item.name == 'main_seller_center_logo')[0].imageUrl || main_seller_center_logo_local;
}
const default_login_img = {
  admin_login_bg: require('../../assets/sld_login_bg.png'),//登录背景
  admin_login_left_bg: require('../../assets/sld_login_left.png'),//登录左侧图片
  main_seller_center_logo: admin_login_logo,//登录页logo
  vendor_login_head_portrait: require('../../assets/touxiang@2x.png'),//操作成功头像
};
@connect(({ login, common }) => ({
  login, common,
}))
@Form.create()
export default class LoginPage extends Component {
  state = {
    countDownC: false, //短信验证码防抖动
    countDownM: 0, //短信验证码倒计时
    type: 'account',
    autoLogin: true,
    login_img: {},
    error_info: '',  //登录错误提示信息
    is_show_err: false,
    register_error_info: '', //注册错误提示信息
    is_show_registe_err: false,
    register_captcha: '',//注册——图形验证码
    login_captcha: '',//登录——图形验证码
    visibleModal: false,
    modal_type: 'register',  //区分忘记密码和立即注册弹框
    visibleModalSuccess: false,
  };

  register_captcha = '';//注册——图形验证码key
  login_captcha = '';//登录——图形验证码key

  componentDidMount() {
    localStorage.clear();
    this.get_init_img();
    this.getCaptcha('register_captcha');
    this.getCaptcha('login_captcha');
  }

  //获取图形验证码
  getCaptcha = (type) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/get_captcha',
      callback: (res) => {
        if (res.state == 200) {
          this[type] = res.data.key;
          this.setState({ [type]: 'data:image/png;base64,' + res.data.captcha });
        }
      },
    });
  };

  //获取初始化信息
  get_init_img = () => {
    const { dispatch } = this.props;
    let { login_img } = this.state;
    dispatch({
      type: 'login/get_login_img',
      callback: (res) => {
        if (res.state == 200) {
          login_img = { ...default_login_img };
          res.data.map(item => {
            if (item.imageUrl) {
              login_img[item.name] = item.imageUrl;
            }
          });
          localStorage.setItem('com_img_info', JSON.stringify(res.data));
          this.setState({ login_img });
        }
      },
    });
  };

  //登录操作
  handleSubmits = () => {
    this.props.form.validateFieldsAndScroll(['username', 'password', 'verifyCode'], (err, values) => {
      if (values.username == undefined || values.username == '') {
        failTip(`${sldComLanguage('用户名不能为空')}`);
      } else if (values.password == undefined || values.password == '') {
        failTip(`${sldComLanguage('密码不能为空')}`);
      } else if (values.verifyCode == undefined || values.verifyCode == '') {
        failTip(`${sldComLanguage('验证码不能为空')}`);
      } else {
        //用户登录
        values.verifyKey = this.login_captcha;
        const { dispatch } = this.props;
        dispatch({
          type: 'login/login',
          payload: { ...values },
          callback: (res) => {
            if (res.state == 200 || res.state == 267) {
              localStorage.setItem('sld_token', res.data.access_token);
              localStorage.setItem('sld_refresh_token', res.data.refresh_token);
              {
                setLocalStorageTime();
              }
              localStorage.setItem('user_info', JSON.stringify({ user_name: values.username }));
              if (res.state == 267) {
                //登录的时候初始化入驻状态
                if (res.data.applyState == 0) {
                  //未入驻
                  saveSettleData('state', '');
                  saveSettleData('cur_step', 0);
                  router.push('/apply/settled_protocol');
                } else {
                  saveSettleData('cur_step', 3);
                  router.push('/apply/open_up');
                }
              }
            } else {
              failTip(res.msg);
              this.getCaptcha('login_captcha');
            }
          },
        });
      }
    });
  };

  showDefault = (type) => {
    let { login_img } = this.state;
    login_img[type] = default_login_img[type];
    this.setState({ login_img });
  };

  handleForgetPwd = () => {
    this.setState({
      title: `${sldComLanguage('找回密码')}`,
      visibleModal: true,
      modal_type: 'forgetPwd',
    });
  };

  handleRegister = () => {
    this.getCaptcha('register_captcha');
    this.setState({
      title: `${sldComLanguage('商家账号注册')}`,
      visibleModal: true,
      modal_type: 'register',
    });
  };

  checkVendorName = (rule, value, callback) => {
    if(!value){
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入商家账号')}`,
      });
      return;
    }
    if (value.length < 6 || value.length > 20) {
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入6-20位数字与字母组合的商户账号')}`,
      });

    } else if (!(/^[0-9a-zA-Z]+$/.test(value))) {
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('商户账号只能输入数字和字母')}`,
      });
    } else if (/^[0-9]+$/.test(value)) {
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('商户账号不能输入纯数字')}`,
      });
    } else if (/^[a-zA-Z]+$/.test(value)) {
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('商户账号不能输入纯字母')}`,
      });
    } else {
      callback();
    }
  };

  checkImgCode = (rule, value, callback) => {
    if(!value){
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入图形验证码')}`,
      });
      return;
    }
    if (value.length < 4 || !(/^[0-9a-zA-Z]+$/.test(value))) {
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入正确的图形验证码')}`,
      });
    }else {
      callback();
    }
  };

  checkSmsCode = (rule, value, callback) => {
    if(!value){
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入短信验证码')}`,
      });
      return;
    }
    if (value.length < 6 || !(/^[0-9]+$/.test(value))) {
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入正确的短信验证码')}`,
      });
    }else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if(!value){
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入密码')}`,
      });
      return
    }
    if (value.length < 6 || value.length > 20) {
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入6～20位密码')}`,
      });
    } else {
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        callback('');
        this.setState({
          is_show_registe_err: true,
          register_error_info: `${sldComLanguage('密码不可以有中文')}`,
        });
      }else if(!(/^\S*$/.test(value))){
        callback('');
        this.setState({
          is_show_registe_err: true,
          register_error_info: `${sldComLanguage('密码中不可以有空格')}`,
        });
      }
      callback();
    }
  };

  checkConfirmPassword = (rule, value, callback) => {
    if(!value){
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入确认密码')}`,
      });
      return
    }
    if (value.length < 6 || value.length > 20) {
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入6～20位密码')}`,
      });
    } else {
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        callback('');
        this.setState({
          is_show_registe_err: true,
          register_error_info: `${sldComLanguage('密码不可以有中文')}`,
        });
      }else if(!(/^\S*$/.test(value))){
        callback('');
        this.setState({
          is_show_registe_err: true,
          register_error_info: `${sldComLanguage('密码中不可以有空格')}`,
        });
      }
      callback();
    }
  };

  checkMobile = (rule, value, callback) => {
    if(!value){
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入手机号')}`,
      });
      return
    }
    if (!mobile_reg.test(value)) {
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入正确的手机号')}`,
      });
    } else {
      callback();
    }
  };

  checkEmail = (rule, value, callback) => {
    let emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (value&&value.length != undefined && value.length > 100) {
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('最多输入100位')}`,
      });
    }
    if (value && !emailReg.test(value)) {
      callback('');
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入正确的邮箱')}`,
      });
    } else {
      callback();
    }
  };

  handleCancelModal = () => {
    this.setState({
      visibleModal: false,
      visibleModalSuccess: false,
    });
    this.props.form.resetFields();
  };

  handleOkModal = (e) => {
    e.preventDefault();
    const { modal_type } = this.state;
    if (modal_type == 'register') {
      this.handleOkModalRegister();
    } else {
      this.handleOkModalForget();
    }
  };

  handleOkModalRegister = () => {
    let _this = this;
    this.props.form.validateFieldsAndScroll(['vendorName', 'vendorPassword', 'vendorEmail', 'confirmPassword', 'vendorMobile', 'verifyCode', 'smsCode'], (err, values) => {
      if(!err){
        if (values.vendorPassword != values.confirmPassword) {
          this.setState({
            register_error_info: `${sldComLanguage('密码和确认密码不一致')}`,
            is_show_registe_err: true,
          });
          return false;
        }
        values.verifyKey = this.register_captcha;
        const { dispatch } = this.props;
        dispatch({
          type: 'login/register',
          payload: values,
          callback: res => {
            if (res.state == 267) {
              {
                setLocalStorageTime();
              }
              localStorage.setItem('sld_token', res.data.access_token);
              localStorage.setItem('sld_refresh_token', res.data.refresh_token);
              localStorage.setItem('user_info', JSON.stringify({ user_name: values.vendorName }));
              saveSettleData('state', '');
              saveSettleData('cur_step', 0);
              this.setState({
                visibleModal: false,
                visibleModalSuccess: true,
              }, () => {
                //自动请求更新验证码
                _this.getCaptcha('register_captcha');
              });
            } else {
              //自动请求更新验证码
              this.getCaptcha('register_captcha');
              this.setState({
                is_show_registe_err: true,
                register_error_info: res.msg,
              });
            }
          },
        });
      }else{

      }
    });
  };

  handleOkModalForget = () => {
    this.props.form.validateFieldsAndScroll(['vendorPassword', 'confirmPassword', 'vendorMobile', 'smsCode'], (err, values) => {
      if (!err) {
        if (values.vendorPassword != values.confirmPassword) {
          this.setState({
            register_error_info: `${sldComLanguage('新密码和确认密码不一致')}`,
            is_show_registe_err: true,
          });
          return false;
        }
        const { dispatch } = this.props;
        let param = {};
        param.mobile = values.vendorMobile;
        param.smsCode = values.smsCode;
        param.newPwd = values.vendorPassword;
        param.confirmPwd = values.confirmPassword;
        dispatch({
          type: 'login/lookForPwd',
          payload: param,
          callback: res => {
            if (res.state == 200) {
              sucTip(`${sldComLanguage('恭喜你！成功找回密码')}`);
              this.handleCancelModal();
              // this.setState({
              //   visibleModal: false,
              // });
            } else {
              this.setState({
                is_show_registe_err: true,
                register_error_info: res.msg,
              });
            }
          },
        });
      }
    });
  };


  handleSuccessBtn = () => {
    let { modal_type } = this.state;
    if (modal_type == 'register') {
      //去入驻
      router.replace('/apply/settled_protocol');
    } else {
      //去登陆
      router.replace('/user/login');
    }
  };

  handleChangeRegister = () => {
    this.setState({
      is_show_registe_err: false,
    });
  };

  //倒计时
  countDown = () => {
    let { countDownM } = this.state;
    countDownM = countDownM - 1;
    let _this = this;
    this.setState({
      countDownM,
    }, () => {
      if (countDownM == 0) {
        clearTimeout(_this.timeOutId);
      } else {
        _this.timeOutId = setTimeout(() => _this.countDown(), 1000);
      }
    });

  };

  //获取短信验证码
  getSmsCode(type) {
    if (this.state.countDownC) {
      return;
    } else if (this.state.countDownM) {
      return;
    }
    let mobile = this.props.form.getFieldValue('vendorMobile');
    let captcha = this.props.form.getFieldValue('verifyCode');//图形验证码
    if (mobile == undefined || (mobile != undefined && !mobile)) {
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入手机号')}`,
      });
    } else if (!sldCheckMobile(mobile)) {
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入正确的手机号')}`,
      });
    } else if (type == 'register' && (captcha == undefined || (captcha != undefined && !captcha))) {
      this.setState({
        is_show_registe_err: true,
        register_error_info: `${sldComLanguage('请输入图形验证码')}`,
      });
    } else {
      const { dispatch } = this.props;
      let _this = this;
      let param = {};
      param.mobile = mobile;
      param.type = type;
      if (type == 'register') {
        param.verifyCode = captcha;
        param.verifyKey = this.register_captcha;
      }
      this.setState({
        countDownC: true,
      })
      dispatch({
        type: 'common/get_sms_code',
        payload: param,
        callback: (res) => {
          if (res.state == 200) {
            this.setState({
              countDownM: 60,
              countDownC: false,
            }, () => {
              _this.countDown();
            });
          } else {
            this.setState({
              countDownC: false,
              is_show_registe_err: true,
              register_error_info: res.msg,
            });
          }
        },
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { login_img, error_info, modal_type, is_show_err, register_captcha, login_captcha, title, visibleModal, visibleModalSuccess, register_error_info, is_show_registe_err, countDownM } = this.state;
    return (
      <div className={styles.full_screen}
           style={{
             backgroundImage: window.location.href.indexOf('user') != -1 ? 'url(' + login_img.admin_login_bg + ')' : 'none',
             backgroundSize: 'contain',
           }}>
        <div className={styles.left_bg}>
          <img
            src={login_img.admin_login_left_bg}
            onError={() => this.showDefault('admin_login_left_bg')}
          />
          <div className={`${global.flex_row_center_center} ${styles.login_logo_wrap}`}>
            <img className={styles.login_logo} src={login_img.main_seller_center_logo} onError={(e) => {
              e.target.onerror = null;
              e.target.src = main_seller_center_logo_local;
            }}/>
          </div>
          <p className={styles.main_title}>{sldComLanguage('欢迎登录商家中心后台')}</p>
          <div className={styles.right_bg}>
            <div className={styles.formlogin}>
              <Form layout="horizontal" onSubmit={(e) => this.handleSubmits(e)}>
                <FormItem
                >
                  {getFieldDecorator('username')(
                    <Input
                      maxLength={50}
                      placeholder={sldComLanguage('请输入用户名')}
                      prefix={<img src={require('../../assets/sld_login_username.png')}
                                   style={{ color: 'rgba(0,0,0,.25)' }}/>}
                      onPressEnter={() => this.props.form.submit(this.handleSubmits)}
                    />,
                  )}
                </FormItem>

                <FormItem
                  style={{ marginTop: 20 }}
                >
                  {getFieldDecorator('password')(
                    <Input
                      maxLength={50}
                      type="password"
                      placeholder={sldComLanguage('请输入密码')}
                      prefix={<img src={require('../../assets/sld_login_pwd.png')}/>}
                      onPressEnter={() => this.props.form.submit(this.handleSubmits)}
                    />,
                  )}
                </FormItem>

                <FormItem
                  style={{ marginTop: 20 }}
                >
                  {getFieldDecorator('verifyCode')(
                    <Input
                      maxLength={4}
                      placeholder={sldComLanguage('请输入验证码')}
                      prefix={<img src={require('../../assets/sld_login_img_code.png')}
                                   style={{ color: 'rgba(0,0,0,.25)' }}/>}
                      suffix={<img src={login_captcha} onClick={() => this.getCaptcha('login_captcha')}
                                   className={styles.verification_code}/>}
                      onPressEnter={() => this.props.form.submit(this.handleSubmits)}
                    />,
                  )}
                </FormItem>

                <div className={`${styles.sld_login_btn_wrap} ${global.flex_column_start_start}`}>
                  <div className={`${styles.sld_login_btn} ${global.flex_row_center_center}`}
                       onClick={() => this.props.form.submit(this.handleSubmits)}>
                    {sldComLanguage('立即登录')}
                  </div>
                  <div className={`${global.flex_row_between_center} ${styles.operate}`}>
                    <a onClick={this.handleForgetPwd}>{sldComLanguage('忘记密码')}</a>
                    <a onClick={this.handleRegister}>{sldComLanguage('立即注册')}</a>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
        {/* 注册、找回密码弹出框 */}

        <Modal
          title={title}
          visible={visibleModal}
          footer={false}
          onCancel={this.handleCancelModal}
          width={450}
        >
          <div className={styles.form_login_modal}>
            <Form onSubmit={(e) => this.handleOkModal(e)}>

              {modal_type == 'register' &&
              <FormItem
                style={{ textAlign: 'center' }}
              >
                {getFieldDecorator('vendorName', {
                  rules: [
                    {
                      validator: this.checkVendorName,
                    },
                  ],
                })(
                  <Input
                    maxLength={20}
                    onChange={this.handleChangeRegister}
                    placeholder={sldComLanguage('请输入6~20位数字字母组合')}
                    allowClear
                    prefix={<p className={styles.user_name}><span className={styles.must}>*</span>{sldComLanguage('商家账号')}</p>}
                  />,
                )}
              </FormItem>
              }

              <FormItem
                style={{ marginTop: 20, textAlign: 'center' }}
              >
                {getFieldDecorator('vendorMobile', {
                  rules: [
                    {
                      validator: this.checkMobile,
                    },
                  ],
                })(
                  <Input
                    maxLength={11}
                    onChange={this.handleChangeRegister}
                    placeholder={sldComLanguage('请输入手机号')}
                    allowClear
                    prefix={<p className={styles.user_name}><span className={styles.must}>*</span>{sldComLanguage('手机号')}</p>}
                  />,
                )}
              </FormItem>

              {modal_type == 'register' &&
              <FormItem
                style={{ marginTop: 20, textAlign: 'center' }}
              >
                {getFieldDecorator('verifyCode', {
                  rules: [
                    {
                      validator: this.checkImgCode,
                    },
                  ],
                })(
                  <Input
                    maxLength={4}
                    onChange={this.handleChangeRegister}
                    placeholder={sldComLanguage('请输入验证码')}
                    prefix={<p className={styles.user_name}><span className={styles.must}>*</span>{sldComLanguage('验证码')}</p>}
                    suffix={<img src={register_captcha} onClick={() => this.getCaptcha('register_captcha')}
                                 className={styles.verification_code}/>}
                  />,
                )}
              </FormItem>
              }

              <FormItem
                style={{ marginTop: 20, textAlign: 'center' }}
              >
                {getFieldDecorator('smsCode', {
                  rules: [
                    {
                      validator: this.checkSmsCode,
                    },
                  ],
                })(
                  <Input
                    maxLength={6}
                    onChange={this.handleChangeRegister}
                    placeholder={sldComLanguage('请输入短信验证码')}
                    prefix={<p className={styles.user_name}><span className={styles.must}>*</span>{sldComLanguage('短信验证码')}</p>}
                    suffix={<div className={`${global.flex_row_between_center} ${styles.get_sms_code_wrap}`}><span
                      className={`${styles.v_split}`}>|</span><span className={styles.sms_code}
                                                                    style={{ opacity: countDownM > 0 ? 0.3 : 1 }}
                                                                    onClick={() => this.getSmsCode(modal_type == 'register' ? 'register' : 'retrieve')}>{countDownM ? `${countDownM}${sldComLanguage('s后重新获取')}` : `${sldComLanguage('获取验证码')}`}</span>
                    </div>}
                  />,
                )}
              </FormItem>

              {modal_type == 'register' &&
              <FormItem
                style={{ marginTop: 20, textAlign: 'center' }}
              >
                {getFieldDecorator('vendorEmail', {
                  rules: [
                    {
                      validator: this.checkEmail,
                    },
                  ],
                })(
                  <Input
                    maxLength={100}
                    onChange={this.handleChangeRegister}
                    placeholder={sldComLanguage('请输入邮箱')}
                    allowClear
                    prefix={<p className={styles.user_name}>{sldComLanguage('邮箱')}</p>}
                  />,
                )}
              </FormItem>
              }

              <FormItem
                style={{ marginTop: 20, textAlign: 'center' }}
              >
                {getFieldDecorator('vendorPassword', {
                  rules: [
                    {
                      validator: this.checkPassword,
                    },
                  ],
                })(
                  <Input.Password
                    maxLength={20}
                    onChange={this.handleChangeRegister}
                    placeholder={sldComLanguage('请设置6～20位字母、数字或符号组成的密码')}
                    prefix={<p className={styles.user_name}><span
                      className={styles.must}>*</span>{modal_type == 'register' ? `${sldComLanguage('设置密码')}` : `${sldComLanguage('新密码')}`}</p>}
                  />,
                )}
              </FormItem>

              <FormItem
                style={{ marginTop: 20, textAlign: 'center' }}
              >
                {getFieldDecorator('confirmPassword', {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: ' ',
                    },
                    {
                      validator: this.checkConfirmPassword,
                    },
                  ],
                })(
                  <Input.Password
                    maxLength={20}
                    onChange={this.handleChangeRegister}
                    placeholder={sldComLanguage('请再次输入密码')}
                    prefix={<p className={styles.user_name}><span className={styles.must}>*</span>{sldComLanguage('确认密码')}</p>}
                  />,
                )}
              </FormItem>


              {is_show_registe_err &&
              <div className={styles.register_error}>
                {sldSvgIcon('#ef1216', 16, 16, 'cuowutishi')}
                {register_error_info}~
              </div>
              }

              <FormItem
                style={{ textAlign: 'center' }}
              >
                <Button htmlType="submit" size={'small'} style={{ height: 40 }}
                        className={styles.registerBtn}>{modal_type == 'register' ? `${sldComLanguage('提交注册')}` : `${sldComLanguage('找回密码')}`}</Button>
              </FormItem>


            </Form>
          </div>

        </Modal>

        {/* 操作成功提示框 */}
        <Modal
          title={title}
          visible={visibleModalSuccess}
          footer={false}
          onCancel={this.handleCancelModal}
          width={450}
        >
          <div className={styles.success_wrap}>
            <div className={`${styles.head_wrap} ${global.flex_column_center_center}`}>
              {sldSvgIcon('rgba(255, 74, 33, .2)', 65, 65, 'ziyuan113')}
              <p style={{ fontSize: 16, marginTop: 10 }}>{sldComLanguage('注册成功')}</p>
            </div>
            <Button className={styles.success_btn}
                    onClick={this.handleSuccessBtn}>{sldComLanguage('点击入驻')}</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

