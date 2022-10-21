import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Button, Form, Input, Modal, Spin } from 'antd';
import {
  sldIconBtn,
  failTip,
  sucTip,
  list_com_page_size_10,
  dragSldTableColumn,
  sldHandlePaginationData,
  formItemLayoutModal,
  getTableNum,
  sldComLanguage,
  sldtbaleOpeBtnText,
  sldPopConfirmDiy,
  sldLlineRtextAddGoodsAddMargin,
  getSldEmptyH,
  sldCheckMobile,
  mobile_reg,
} from '@/utils/utils';
import global from '@/global.less';
import styles from './video.less';
import StandardTable from '@/components/StandardTable';
import Search from '@/components/Search/Search';

let pageSize = list_com_page_size_10;
const FormItem = Form.Item;
let sthis = '';
@connect(({ promotion, common }) => ({
  promotion,
  common,
}))
@Form.create()
export default class MemberList extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      countDownM: 0, //短信验证码倒计时
      initLoading: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',
      params: { pageSize: pageSize },//搜索条件
      upload_img_info: {},//上传的图片信息
      operateData: [],//操作的数据
      search_data: [{
        type: 'input',
        label: `${sldComLanguage('会员名称')}`,
        name: 'memberName',
        placeholder: `${sldComLanguage('请输入会员名称')}`,
      },{
        type: 'input',
        label: `${sldComLanguage('会员昵称')}`,
        name: 'memberNickName',
        placeholder: `${sldComLanguage('请输入会员昵称')}`,
      },{
        type: 'input',
        label: `${sldComLanguage('手机号')}`,
        name: 'memberMobile',
        placeholder: `${sldComLanguage('请输入会员手机号')}`,
      },],
      addData: [{
        type: 'input',
        label: `${sldComLanguage('手机号')}`,//
        name: 'memberMobile',
        placeholder: `${sldComLanguage('请输入手机号')}`,
        initialValue: '',
        rules: [{
          required: true,
          message: `${sldComLanguage('请输入手机号')}`,
        }, {
          pattern: mobile_reg,
          message: `${sldComLanguage('请输入正确的手机号')}`,
        }],
      },
      ],//modal框的数据
      formValues: {},//搜索条件
      columns: [
        {
          title: ' ',
          dataIndex: 'bindId',
          align: 'center',
          width: 55,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('会员名称')}`,
          dataIndex: 'memberName',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('昵称')}`,
          dataIndex: 'memberNickName',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('手机号')}`,
          dataIndex: 'memberMobile',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('会员状态')}`,
          dataIndex: 'memberStateValue',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('短视频状态')}`,
          dataIndex: 'svideoStateValue',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('直播状态')}`,
          dataIndex: 'liveStateValue',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('操作')}`,
          width: 100,
          align: 'center',
          render: (text, record) => (
            <Fragment>
              {/*删除后不可恢复，是否确定删除？*/}
              {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operate(record.bindId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
            </Fragment>
          ),
        },
      ],
    };
  }

  cur_edit_id = '';//当前操作数据id
  sel_area_name = '';//选择的地区名称
  componentDidMount() {
    this.get_list({ pageSize: pageSize });
  }

  //会员操作  del：删除
  operate = (id, type) => {
    const { params } = this.state;
    const { dispatch } = this.props;
    let dis_type = '';
    let param_data = {};
    if (type == 'del') {
      dis_type = 'promotion/del_video_member';
      param_data.bindId = id;
    }
    dispatch({
      type: dis_type,
      payload: param_data,
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list(params);
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  //绑定会员
  add = () => {
    let { addData, operateData } = this.state;
    operateData = JSON.parse(JSON.stringify(addData));
    this.setState({
      modalVisible: true,
      type: 'add',
      title: `${sldComLanguage('绑定会员')}`,
      operateData,
    });
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'promotion/get_video_member_list',
      payload: { ...params },
      callback: (res) => {
        this.setState({ initLoading: false });
        if (res.state == 200) {
          if ((res.data.list == null || res.data.list.length == 0) && this.state.params.current > 1) {
            params.current = params.current - 1;
            this.get_list(params);
          } else {
            this.setState({
              data: res.data,
            });
          }
        }
      },
    });
  };

  handleSelectRows = (rows, rowkeys) => {
    this.setState({
      selectedRows: rows,
      selectedRowKeys: rowkeys,
    });
  };

  handleTablePagination = (pagination, filtersArg, sorter, type = 'main') => {
    const { formValues } = this.state;
    if (type == 'main') {
      const params = sldHandlePaginationData(pagination, filtersArg, sorter, formValues);
      pageSize = params.pageSize;
      this.setState({ params });
      this.get_list(params);
    }
  };


  //表格拖动
  resizeTable = (index, size, type, data) => {
    let datas = dragSldTableColumn(index, size, data);
    this.setState({ [type]: datas });
  };

  //获取短信验证码
  getSmsCode() {
    if (this.state.countDownM) {
      return;
    }
    let mobile = this.props.form.getFieldValue('mobile');
    if (mobile == undefined || (mobile != undefined && !mobile)) {
      failTip(`${sldComLanguage('请输入手机号')}`);
    } else if (!sldCheckMobile(mobile)) {
      failTip(`${sldComLanguage('请输入正确的手机号')}`);
    } else {
      const { dispatch } = this.props;
      let _this = this;
      dispatch({
        type: 'promotion/get_video_sms_code',
        payload: {mobile:mobile},
        callback: (res) => {
          if (res.state == 200) {
            this.setState({
              countDownM: 60,
            }, () => {
              _this.countDown();
            });
          } else {
            failTip(res.msg);
          }
        },
      });
    }
  }

  //倒计时
  countDown = () => {
    let { countDownM } = this.state;
    countDownM = countDownM - 1;
    let _this = this;
    this.setState({
      countDownM,
    }, () => {
      if (countDownM <= 0) {
        clearTimeout(_this.timeOutId);
      } else {
        _this.timeOutId = setTimeout(() => _this.countDown(), 1000);
      }
    });

  };

  checkSmsCode = (rule, value, callback) => {
    if (value&&(value.length < 6 || !(/^[0-9]+$/.test(value)))) {
      callback(`${sldComLanguage('请输入正确的短信验证码')}`);
    }else {
      callback();
    }
  };

  //确定事件
  sldConfirm = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        this.setState({ submiting: true });
        dispatch({
          type: 'promotion/bind_video_member',
          payload: values,
          callback: (res) => {
            if (res.state == 200) {
              sucTip(res.msg);
              this.get_list({ pageSize: pageSize });
              this.setState({
                modalVisible: false,
              });
            } else {
              failTip(res.msg);
            }
            this.setState({ submiting: false });
          },
        });
      }
    });
  };

  sldCancle = () => {
    this.setState({modalVisible:false})
  };

  //搜索事件
  search = (data) => {
    const values = { ...data };
    for(let i in values){
      if(values[i] == ''){
        delete values[i]
      }
    }
    this.setState({
      formValues: values,
      params: { pageSize: pageSize }
    });
    this.get_list({ pageSize: pageSize, ...values });
  };
  //搜索重置事件
  seaReset = () => {
    //搜索条件置为空
    this.setState({
      formValues: {},
      params: { pageSize: pageSize }
    });
    this.get_list({ pageSize: pageSize });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedRows, columns, initLoading, data, submiting, modalVisible, countDownM,search_data } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('视频带货绑定会员')}`, 0, 0, 10)}
        <div className={global.tableListForm}>

          <Search search_data={search_data}
                  seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}
          />
        </div>
        {/*公共功能条-start*/}
        <div className={global.operate_bg}>
          {sldIconBtn(() => this.add(), `${sldComLanguage('绑定会员')}`, 7, 7)}
        </div>
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            totalHeight={document.body.clientHeight - 200}
            selectedRows={selectedRows}
            data={data}
            rowKey={'bindId'}
            isCheck={false}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'main')}
            onSldHandleSeleRow={this.onSldHandleSeleRow}
            resizeTable={(index, size) => this.resizeTable(index, size, 'columns', columns)}
            isColumnResize={true}
          />
          {/*标准表格-end*/}

        </Spin>
        {/*绑定会员对话框-start*/}
        <Modal
          destroyOnClose={true}
          maskClosable={false}
          title={`${sldComLanguage('绑定会员')}`}
          visible={modalVisible}
          width={450}
          onCancel={this.sldCancle}
          footer={[
            <Button key="back" onClick={this.sldCancle}>{sldComLanguage('取消')}</Button>,
            <Button key="submit" type="primary" loading={submiting} onClick={this.sldConfirm}>
              {sldComLanguage('确定')}
            </Button>,
          ]}
        >
          <div style={{width:450,marginBottom:30}}>
            <Form>
              {getSldEmptyH(30)}
              <FormItem
                {...formItemLayoutModal}
                label={`${sldComLanguage('手机号')}`}
              >
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true,
                    message: `${sldComLanguage('请输入手机号')}`,
                  }, {
                    pattern: mobile_reg,
                    message: `${sldComLanguage('请输入正确的手机号')}`,
                  }],
                })(
                  <Input
                    style={{width:'100%'}}
                    maxLength={11}
                    placeholder={sldComLanguage('请输入手机号')}
                    allowClear
                  />,
                )}
              </FormItem>


              <FormItem
                {...formItemLayoutModal}
                label={`${sldComLanguage('短信验证码')}`}
              >
                {getFieldDecorator('smsCode', {
                  rules: [
                    {
                      required: true,
                      message: `${sldComLanguage('请输入短信验证码')}`,
                    },
                    {
                      validator: this.checkSmsCode,
                    },
                  ],
                })(
                  <Input
                    style={{width:'100%'}}
                    maxLength={6}
                    placeholder={sldComLanguage('请输入短信验证码')}
                    suffix={<div className={`${global.flex_row_between_center} ${styles.get_sms_code_wrap}`}><span
                      className={`${styles.v_split}`}>|</span><span className={styles.sms_code}
                                                                    style={{ opacity: countDownM > 0 ? 0.3 : 1 }}
                                                                    onClick={() => this.getSmsCode()}>{countDownM ? `${countDownM}${sldComLanguage('s后重新获取')}` : `${sldComLanguage('获取验证码')}`}</span>
                    </div>}
                  />,
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
        {/*绑定会员对话框-end*/}
      </div>
    );
  }
}
