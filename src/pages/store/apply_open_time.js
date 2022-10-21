import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin } from 'antd';
import {
  sldIconBtn,
  failTip,
  sucTip,
  list_com_page_size_10,
  dragSldTableColumn,
  sldHandlePaginationData,
  getTableNum,
  sldComLanguage,
  sldPopConfirmDiy,
  sldtbaleOpeBtnText,
  showMoreHelpTip,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import OpenTimeModal from './open_time_modal';
import { getSldEmptyH } from '../../utils/utils';

let pageSize = list_com_page_size_10;
@connect(({ express, common, project }) => ({
  express,
  common,
  project,
}))
@Form.create()
export default class ApplyOpenTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_expired_time: '',
      initLoading: false,
      modalVisible: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      upload_img_info: {},//上传的图片信息
      operateData: [],//操作的数据
      formValues: {},//搜索条件、
      payData: {},//付款数据
      columns: [
        {
          title: ' ',
          dataIndex: 'renewId',
          align: 'center',
          width: 55,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('店铺等级')}`,
          dataIndex: 'gradeName',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('收费标准(元/年)')}`,
          dataIndex: 'price',
          align: 'center',
          width: 120,
        },
        {
          title: `${sldComLanguage('续签时长(年)')}`,
          dataIndex: 'duration',
          align: 'center',
          width: 120,
        },
        {
          title: `${sldComLanguage('付款金额(元)')}`,
          dataIndex: 'payAmount',
          align: 'center',
          width: 120,
        },
        {
          title: `${sldComLanguage('续签起止有效期')}`,
          dataIndex: 'startTime',
          align: 'center',
          width: 150,
          render: function(text, record) {
            return <div className={global.voucher_time_wrap}>
              <p>{text}</p>
              <p>~</p>
              <p>{record.endTime}</p>
            </div>;
          },
        },
        {
          title: `${sldComLanguage('状态')}`,
          dataIndex: 'stateValue',
          align: 'center',
          width: 100,
        }, {
          title: `${sldComLanguage('付款方式')}`,
          dataIndex: 'paymentName',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('操作')}`,
          width: 100,
          align: 'center',
          render: (text, record) => (
            record.state != 2
              ? <Fragment>
                {sldtbaleOpeBtnText(`${sldComLanguage('付款')}`, () => this.pay(record))}
                <span className={global.splitLine}></span>
                {/*删除后不可恢复，是否确定删除？*/}
                {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operate(record.renewId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                  sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
              </Fragment>
              : '--'

          ),
        },
      ],
    };
  }

  cur_edit_id = '';//当前操作数据id

  componentDidMount() {
    this.get_store_info();
    this.get_list({ pageSize: pageSize });
  }

  //付款事件
  pay = (val) => {
    let { payData } = this.state;
    payData.paySn = val.paySn;
    payData.renewId = val.renewId;
    this.setState({ payData, modalVisible: true });
  };

  //操作  del：删除  apply: 申请
  operate = (id, type) => {
    const { params } = this.state;
    const { dispatch } = this.props;
    let dis_type = '';
    let param_data = {};
    if (type == 'del') {
      dis_type = 'store/del_apply_renew';
      param_data.renewId = id;
    } else if (type == 'apply') {
      dis_type = 'store/apply_category';
      param_data = id;
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
        this.setState({ submiting: false, modalVisible: false });
      },
    });
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'store/get_renew_list',
      payload: params,
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

  //获取店铺到期时间
  get_store_info = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'store/get_store_expired_time',
      payload: params,
      callback: (res) => {
        if (res.state == 200) {
          this.setState({ store_expired_time: res.data.storeExpireTime });
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

  sldCancle = () => {
    this.setState({ modalVisible: false });
  };

  sldConfirm = (val) => {
    if (this.select_cat_id.length == 0) {
      failTip(`${sldComLanguage('请选择经营类目')}`);
      return false;
    }
    this.operate({ goodsCateIds: this.select_cat_id.join(',') }, 'apply');
  };

  apply = () => {
    this.setState({ modalVisible: true, payData: {} });
  };

  //支付完成之后更新页面数据
  payComplete = () => {
    this.get_store_info();
    this.get_list({ pageSize: pageSize });
  };

  render() {
    const { selectedRows, columns, initLoading, data, store_expired_time, modalVisible, payData } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1, padding: 0 }}>
        {showMoreHelpTip('', [`${sldComLanguage('您的店铺已签约至')}${store_expired_time}`], 10)}
        {getSldEmptyH(10)}
        {/*公共功能条-start*/}
        <div className={global.operate_bg}>
          {sldIconBtn(() => this.apply(), `${sldComLanguage('申请续签')}`, 7, 7)}
        </div>
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            selectedRows={selectedRows}
            data={data}
            rowKey={'renewId'}
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
        {/*申请续签对话框-start*/}
        <OpenTimeModal modalVisible={modalVisible} closeModal={() => this.sldCancle()} payData={payData}
                       payComplete={() => this.payComplete()}/>
        {/*申请续签对话框-end*/}
      </div>

    );
  }
}
