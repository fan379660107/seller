import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin } from 'antd';
import {
  failTip,
  sucTip,
  list_com_page_size_10,
  dragSldTableColumn,
  getTableNum,
  sldComLanguage,
  sldPopConfirm,
  dateFormat,
  sldHandlePaginationData,
  sldtbaleOpeBtnText,
  sldIconBtn,
  sldLlineRtextAddGoodsAddMargin,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import Search from '@/components/Search/Search';
import router from 'umi/router';

let pageSize = list_com_page_size_10;
@connect(({ store }) => ({
  store,
}))
@Form.create()
export default class MsgLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_width: 700,
      modalVisibleDetail: false,
      initLoading: false,
      submiting: false,
      show_foot: false,
      modalVisible: false,//是否显示规格弹框
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: `${sldComLanguage('商品规格')}`,
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      search_data: [{
        type: 'select',
        label: `${sldComLanguage('通知类型')}`,
        name: 'tplType',
        placeholder: `${sldComLanguage('请选择通知类型')}`,
        sel_data: [
          { key: '', name: `全部` },
          { key: 'goods_news', name: `${sldComLanguage('商品消息')}` },
          { key: 'seller_order_news', name: `${sldComLanguage('订单消息')}` },
          { key: 'seller_after_sale_news', name: `${sldComLanguage('售后消息')}` },
          { key: 'bill_news', name: `${sldComLanguage('结算消息')}` },
        ],
      }, {
        type: 'select',
        label: `${sldComLanguage('通知状态')}`,
        name: 'msgState',
        placeholder: `${sldComLanguage('请选择通知状态')}`,
        sel_data: [
          { key: '', name: `${sldComLanguage('全部')}` },
          { key: '1', name: `${sldComLanguage('已读')}` },
          { key: '0', name: `${sldComLanguage('未读')}` },
        ],
      }, {
        type: 'rangepicker',
        label: `${sldComLanguage('通知时间')}`,
        name: 'search_create_time',
        placeholder1: `${sldComLanguage('开始时间')}`,
        placeholder2: `${sldComLanguage('结束时间')}`,
      }],
      formValues: {},//搜索条件
      operateData: [],
      columns: [
        {
          title: ' ',
          align: 'center',
          dataIndex: 'receiveId',
          width: 30,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('通知内容')}`,
          dataIndex: 'msgContent',
          align: 'center',
          width: 200,
        },
        {
          title: `${sldComLanguage('通知类型')}`,
          dataIndex: 'tplTypeName',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('通知状态')}`,
          dataIndex: 'msgStateValue',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('通知时间')}`,
          dataIndex: 'msgSendTime',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('操作')}`,
          align: 'center',
          width: 100,
          render: (text, record, index) => (
            <Fragment>
              {sldtbaleOpeBtnText(`${sldComLanguage('查看')}`, () => this.goNextPage(record, index))}
            </Fragment>
          ),
        },
      ],
    };
  }


  componentDidMount() {
    this.get_list({ pageSize: pageSize });
  }

  goNextPage = (record, index) => {
    let msgLinkInfo = JSON.parse(record.msgLinkInfo.replace(/&quot;/g,"\""));
    let afsSn = msgLinkInfo.afsSn;
    let type = msgLinkInfo.type;
    let orderSn = msgLinkInfo.orderSn;
    let _url = '';
    let { data } = this.state;
    const { dispatch } = this.props;
    let param_data = { receiveIds: data['list'][index].receiveId };
    dispatch({
      type: 'store/set_msg_readed',
      payload: param_data,
      callback: (res) => {
        if (res.state == 200) {
          switch (type) {
            case 'refund_news':
              _url = '/order/service_refund_lists_to_detail?afsSn=' + afsSn;
              break;
            case 'return_news':
              _url = '/order/service_return_lists_to_detail?afsSn=' + afsSn;
              break;
            case 'goods_violation_news':
              _url = '/goods/goods_list';
              break;
            case 'goods_news':
              _url = '/goods/goods_list';
              break;
            case 'goods_audit_news':
              _url = '/goods/goods_check_list';
              break;
            case 'order_news':
              _url = '/order/order_lists_to_detail?orderSn=' + orderSn;
              break;
            case 'bill_news':
              _url = '/bill/lists_to_detail?id=' + msgLinkInfo.billId;
              break;
          }
          router.push(_url);
        } else {
          failTip(res.msg);
        }
      },
    });

  };

  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'store/get_msg_list',
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

  //商品操作
  operate = (id, type) => {
    this.setState({ submiting: true });
    const { params } = this.state;
    const { dispatch } = this.props;
    let param_data = {};
    let dis_type = '';
    if (type == 'del') {
      dis_type = 'store/del_msg';
      param_data = id;
    } else if (type == 'read') {
      dis_type = 'store/set_msg_readed';
      param_data = id;
    }
    dispatch({
      type: dis_type,
      payload: param_data,
      callback: (res) => {
        this.setState({ submiting: false });
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list(params);
          this.setState({
            selectedRows: [],
            selectedRowKeys: [],
            modalVisible: false,
          });
        } else {
          failTip(res.msg);
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

  //搜索事件
  search = (data) => {
    const values = { ...data };
    //时间处理
    if (values.search_create_time) {
      values.startTime = values.search_create_time[0] ? values.search_create_time[0].format(dateFormat) + ' 00:00:00' : '';
      values.endTime = values.search_create_time[1] ? values.search_create_time[1].format(dateFormat) + ' 23:59:59' : '';
      values.search_create_time = '';
    }
    for (let i in values) {
      if (values[i] == '') {
        delete values[i];
      }
    }
    this.setState({
      formValues: values,
      params: { pageSize: pageSize },
    });
    this.get_list({ pageSize: pageSize, ...values });
  };
  //搜索重置事件
  seaReset = () => {
    //搜索条件置为空
    this.setState({
      formValues: {},
      params: { pageSize: pageSize },
    });
    this.get_list({ pageSize: pageSize });
  };

  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { selectedRows, selectedRowKeys, search_data, columns, initLoading, data } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('消息列表')}`, 0, 0, 10)}{/* 消息列表*/}
        <div className={global.tableListForm}>
          <Search search_data={search_data}
                  seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}/>
        </div>
        {/*公共功能条-start*/}
        <div className={global.operate_bg}
             style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {selectedRowKeys.length == 0 ? sldIconBtn(() => {
              failTip(`${sldComLanguage('请先选中数据')}`);
              //确认删除选中的消息吗？
            }, `${sldComLanguage('批量删除')}`, 7, 0, 15, 15, 3, 'shenhejujue', '#fa0920') : sldPopConfirm('leftBottom', `${sldComLanguage('确认删除选中的消息吗？')}`, () => this.operate({ receiveIds: selectedRowKeys.join(',') }, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`, sldIconBtn(null, `${sldComLanguage('批量删除')}`, 7, 0, 15, 15, 3, 'shenhejujue', '#fa0920'), 0, 0, '#fa0920')}

            {selectedRowKeys.length == 0 ? sldIconBtn(() => {
              failTip(`${sldComLanguage('请先选中数据')}`);
              //确认将选中的商品取消推荐吗？
            }, `${sldComLanguage('批量标为已读')}`, 7, 0, 19, 19, 3, 'shenhetongguo', '#0fb39a') : sldPopConfirm('leftBottom', `${sldComLanguage('确认将选中的消息标为已读吗？')}`, () => this.operate({ receiveIds: selectedRowKeys.join(',') }, 'read'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`, sldIconBtn(null, `${sldComLanguage('批量标为已读')}`, 7, 0, 19, 19, 3, 'shenhetongguo', '#0fb39a'), 0, 0, '#0fb39a')}

          </div>
        </div>
        {/*公共功能条-end*/}
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            totalHeight={document.body.clientHeight - 200}
            bordered={false}
            selectedRows={selectedRows}
            data={data}
            rowKey={'receiveId'}
            isCheck={true}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'main')}
            onSldHandleSeleRow={this.onSldHandleSeleRow}
            resizeTable={(index, size) => this.resizeTable(index, size, 'columns', columns)}
            isColumnResize={true}
          />
          {/*标准表格-end*/}
        </Spin>

      </div>

    );
  }
}
