/*
* 满优惠——满N件折扣
* */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin } from 'antd';
import Link from 'umi/link';
import {
  failTip,
  sucTip,
  list_com_page_size_10,
  dragSldTableColumn,
  getTableNum,
  sldComLanguage,
  dateFormat,
  sldHandlePaginationData,
  sldtbaleOpeBtnText,
  sldIconBtn,
  formItemLayoutModal,
  getSldEmptyH,
  sldLlineRtextAddGoodsAddMargin,
  sldPopConfirmDiy,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import Search from '@/components/Search/Search';
import SldPreviewImg from '@/components/SldPreviewImg/SldPreviewImg';
import SldModal from '@/components/SldModal/SldModal';

let pageSize = list_com_page_size_10;
@connect(({ promotion }) => ({
  promotion,
}))
@Form.create()
export default class FullNldList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operateData: [],
      modal_width: 700,//查看规格的modal框宽度
      preview_img: '',
      preview_alt_con: '',
      show_preview_modal: false,
      modalVisibleDetail: false,
      initLoading: false,
      submiting: false,
      show_foot: false,
      modalVisible: false,//是否显示规格弹框
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: `${sldComLanguage('优惠券规格')}`,
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      addData: [{
        type: 'select',
        label: `${sldComLanguage('下架理由')}`,
        name: 'offlineReason',
        placeholder: `${sldComLanguage('请选择下架理由')}`,
        sel_data: [],
        sele_key: 'reasonId',
        sele_name: 'content',
        diy: true,
        rules: [{
          required: true,
          message: `${sldComLanguage('请选择下架理由')}`,
        }],
      }, {
        type: 'textarea',
        label: `${sldComLanguage('备注')}`,
        name: 'offlineComment',
        placeholder: `${sldComLanguage('请输入违规下架理由')}`,
        extra: `${sldComLanguage('最多输入100字')}`,
        maxLength: 100,
      }],//下架数据
      search_data: [{
        type: 'input',
        label: `${sldComLanguage('活动名称')}`,
        name: 'fullName',
        placeholder: `${sldComLanguage('请输入活动名称')}`,
      },{
        type: 'rangepicker',
        label: `${sldComLanguage('活动时间')}`,
        name: 'search_activity_time',
        placeholder1: `${sldComLanguage('开始时间')}`,
        placeholder2: `${sldComLanguage('结束时间')}`,
      }, {
        type: 'select',
        label: `${sldComLanguage('活动状态')}`,
        name: 'state',
        placeholder: `${sldComLanguage('请选择活动状态')}`,
        sel_data: [
          { key: '', name: `${sldComLanguage('全部')}` },
          { key: '1', name: `${sldComLanguage('待发布')}` },
          { key: '2', name: `${sldComLanguage('未开始')}` },
          { key: '3', name: `${sldComLanguage('进行中')}` },
          { key: '5', name: `${sldComLanguage('已失效')}` },
          { key: '4', name: `${sldComLanguage('已结束')}` },
        ],
      }, ],
      view_spec_data: [{
        type: 'scroll_table',
        name: '',
        label: ``,
        width: 680,
        content: '',
        data: [],
        columns: this.goods_spec_columns,
        rowKey: 'id',
        scroll: { y: 300 },
      }],//查看规格
      formValues: {},//搜索条件
      columns: [
        {
          title: ' ',
          dataIndex: 'fullId',
          align: 'center',
          width: 30,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('活动名称')}`,
          dataIndex: 'fullName',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('活动时间')}`,
          dataIndex: 'startTime',
          align: 'center',
          width: 100,
          render: function(text, record) {
            return <div className={global.voucher_time_wrap}>
              <p>{text}</p>
              <p>~</p>
              <p>{record.endTime}</p>
            </div>;
          },
        },
        {
          title: `${sldComLanguage('活动状态')}`,
          dataIndex: 'stateValue',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('操作')}`,
          align: 'center',
          width: 100,
          render: (text, record) => (
            <Fragment>
              <Link to={{
                pathname: '/marketing/full_nld_to_add',
                query: {
                  id: record.fullId,
                  tar:'view'
                },
              }}>
                {sldtbaleOpeBtnText(`${sldComLanguage('查看')}`, () => null)}
              </Link>
              <span className={global.splitLine}></span>
              <Link to={{
                pathname: '/marketing/full_nld_to_add',
                query: {
                  id: record.fullId,
                  tar:'copy'
                },
              }}>
                {sldtbaleOpeBtnText(`${sldComLanguage('复制')}`, () => null)}
              </Link>
              {/* 只有待发布的才可以编辑 */}
              {record.state == 1&&
                <Fragment>
                  <span className={global.splitLine}></span>
                  <Link to={{
                    pathname: '/marketing/full_nld_to_add',
                    query: {
                      id: record.fullId,
                      tar:'edit'
                    },
                  }}>
                    {sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, () => null)}
                  </Link>
                </Fragment>
              }
              {/* 只有待发布的才可以发布 */}
              {record.state == 1&&
              <Fragment>
                <span className={global.splitLine}></span>
                {sldPopConfirmDiy('leftBottom', `${sldComLanguage('发布后不可撤销，是否确定发布？')}`,  () => this.operate(record.fullId, 'publish'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                  sldtbaleOpeBtnText(`${sldComLanguage('发布')}`, () => null))}
              </Fragment>
              }
              {/* 只有未开始、进行中的才可以失效 */}
              {(record.state == 2||record.state == 3)&&
              <Fragment>
                <span className={global.splitLine}></span>
                {sldPopConfirmDiy('leftBottom', `${sldComLanguage('确定失效该活动吗？')}`, () => this.operate(record.fullId, 'invalid'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                  sldtbaleOpeBtnText(`${sldComLanguage('失效')}`, () => null))}
              </Fragment>
              }
              {/* 只有待发布、已失效、已结束的才可以删除 */}
              {(record.state == 1||record.state == 4||record.state == 5)&&
              <Fragment>
                <span className={global.splitLine}></span>
                {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}？`, () => this.operate(record.fullId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                  sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
              </Fragment>
              }
            </Fragment>
          ),
        },
      ],
    };
  }

  goods_spec_columns = [
    {
      title: ' ',
      dataIndex: 'id',
      align: 'center',
      width: 30,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: `${sldComLanguage('规格名称')}`,
      dataIndex: 'specValue',
      align: 'center',
      width: 400,
    },
    {
      title: `${sldComLanguage('编码')}`,
      dataIndex: 'productCode',
      align: 'center',
      width: 200,
    },
  ];

  operate_ids = '';//当前操作的优惠券id串
  reason_list = [];

  componentDidMount() {
    this.get_list({ pageSize: pageSize });
  }

  // 查看规格
  viewSpec = (data) => {
    let { view_spec_data } = this.state;
    view_spec_data[0].data = data;
    this.setState({
      view_spec_data,
      modalVisible: true,
    });
  };

  //优惠券操作  type: invalid 失效 copy 复制  del 删除
  operate = (id, type) => {
    const { params } = this.state;
    const { dispatch } = this.props;
    let param_data = {};
    let dis_type = '';
    if (type == 'invalid') {
      dis_type = 'promotion/invalid_full_nld';
      param_data.fullId = id;
    } else if (type == 'copy') {
      dis_type = 'promotion/copy_full_nld';
      param_data.fullId = id;
    } else if (type == 'del') {
      dis_type = 'promotion/del_full_nld';
      param_data.fullId = id;
    } else if (type == 'publish') {
      dis_type = 'promotion/publish_full_nld';
      param_data.fullId = id;
    }
    this.setState({ submiting: true });
    dispatch({
      type: dis_type,
      payload: param_data,
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list(params);
          this.setState({
            modalVisible: false,
          });
        } else {
          failTip(res.msg);
        }
        this.setState({ submiting: false });
      },
    });
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'promotion/get_full_nld_list',
      payload: { ...params },
      callback: (res) => {
        this.setState({ initLoading: false });
        if (res.state == 200) {
          if (res.data.length == 0 && this.state.params.current > 1) {
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

  //预览图片/关闭预览图片
  viewImg = (flag, img = '', text = '') => {
    this.setState({
      preview_img: img,
      preview_alt_con: text,
      show_preview_modal: flag,
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

  //搜索事件
  search = (data) => {
    const values = { ...data };
    //活动时间处理
    if (values.search_activity_time) {
      values.startTime = values.search_activity_time[0] ? values.search_activity_time[0].format(dateFormat) + ' 00:00:00' : '';
      values.endTime = values.search_activity_time[1] ? values.search_activity_time[1].format(dateFormat)+ ' 23:59:59' : '';
      delete values.search_activity_time;
    }
    for (let i in values) {
      if (values[i] == '') {
        delete values[i];
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

  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  lockUpGoods = (ids) => {
    let { addData, operateData } = this.state;
    operateData = JSON.parse(JSON.stringify(addData));
    this.operate_ids = ids;
    this.setState({
      operateData,
      modal_width: 500,
      title: `${sldComLanguage('违规下架优惠券')}`,
      modalVisible: true,
      show_foot: true,
    });
  };

  sldHandleConfirm = (val) => {
    let selectd_reason = this.reason_list.filter(item => item.reasonId == val.offlineReason)[0];
    val.offlineReason = selectd_reason.content;
    val.fullIds = this.operate_ids;
    this.operate(val, 'down');
  };

  render() {
    const { selectedRows, selectedRowKeys, search_data, columns, initLoading, data, show_preview_modal, preview_img, preview_alt_con, view_spec_data, modalVisible, title, modal_width, operateData, show_foot, submiting } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1, paddingTop: 0 }}>
        {getSldEmptyH(10)}
        {sldLlineRtextAddGoodsAddMargin('#FA6F1E', `${sldComLanguage('满N件折扣活动')}`, 0, 0, 10)}
        <div className={global.tableListForm}>
          <Search search_data={search_data}
                  seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}/>
        </div>
        {/*公共功能条-start*/}
        <div className={global.operate_bg}>
          <Link to={{
            pathname: '/marketing/full_nld_to_add',
          }}>
            {sldIconBtn(() => null, `${sldComLanguage('新建满N件折扣活动')}`, 7, 0, 12, 12, 3, 'fabu1', '#08A9B7')}
          </Link>
        </div>
        {/*公共功能条-end*/}
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            totalHeight={document.body.clientHeight - 200}
            bordered={false}
            selectedRows={selectedRows}
            data={data}
            rowKey={'fullId'}
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

        {/*图片预览-start*/}
        <SldPreviewImg img={preview_img} show_preview_modal={show_preview_modal} modal_width={900}
                       preview_alt_con={preview_alt_con} closePreviewModal={() => this.viewImg(false)}/>
        {/*图片预览-end*/}
        { /*新增/编辑对话框-start*/}
        <SldModal
          width={modal_width}
          title={title}
          submiting={submiting}
          modalVisible={modalVisible}
          sldHandleConfirm={(val) => this.sldHandleConfirm(val)}
          sldHandleCancle={this.sldHandleCancle}
          formItemLayoutModal={formItemLayoutModal}
          content={operateData}
          show_foot={show_foot}
        />
        { /*新增/编辑对话框-end*/}
      </div>

    );
  }
}
