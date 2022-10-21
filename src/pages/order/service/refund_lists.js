import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin } from 'antd';
import Link from 'umi/link';
import {
  dragSldTableColumn,
  sldHandlePaginationData,
  list_com_page_size_10,
  sldComLanguage,
  dateFormat,
  sldtbaleOpeBtnText,
  getTableNum,
  getSldListGoodsImg80,
} from '@/utils/utils';
import global from '@/global.less';
import order from './order.less';
import Search from '@/components/Search/Search';
import StandardTable from '@/components/StandardTable';

let pageSize = list_com_page_size_10;
let comm_cur_page = 1;//当前页数
let sthis = '';
@connect(({ service }) => ({
  service,
}))
@Form.create()
export default class RefundLists extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      search_height: 0,
      loading: false,
      data: {},
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      curData: {},//编辑的数据
      search_data: [{
        type: 'input',
        label: `${sldComLanguage('订单号')}`,
        name: 'orderSn',
        placeholder: `${sldComLanguage('请输入订单号')}`,
      }, {
        type: 'input',
        label: `${sldComLanguage('退款编号')}`,
        name: 'afsSn',
        placeholder: `${sldComLanguage('请输入退款编号')}`,
      }, {
        type: 'input',
        label: `${sldComLanguage('会员名')}`,
        name: 'memberName',
        placeholder: `${sldComLanguage('请输入会员名')}`,
      }, {
        type: 'rangepicker',
        label: `${sldComLanguage('申请时间')}`,
        name: 'search_apply_time',
        placeholder1: `${sldComLanguage('开始时间')}`,
        placeholder2: `${sldComLanguage('结束时间')}`,
      },
        {
          type: 'select',
          label: `${sldComLanguage('退款状态')}`,
          name: 'state',
          placeholder: `${sldComLanguage('请选择退款状态')}`,
          sel_data: [
            { key: '', name: `${sldComLanguage('全部')}` },
            { key: '100', name: `${sldComLanguage('待商家审核')}` },
            { key: '200', name: `${sldComLanguage('待平台处理')}` },
            { key: '202', name: `${sldComLanguage('售后关闭')}` },
            { key: '300', name: `${sldComLanguage('退款成功')}` },
          ],
        },
      ],
      formValues: {},//搜索条件
      columns: [{
        title: '',
        dataIndex: 'afsSn',
        align: 'center',
        width: 55,
        render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
      },
        {
          title: `${sldComLanguage('商品信息')}`,
          dataIndex: 'productImage',
          align: 'center',
          width: 200,
          render: (text, record) => {
            return <div className={`${order.goods_info} ${global.com_flex_row_flex_start}`}>
              <div className={order.goods_img}>{getSldListGoodsImg80(text)}</div>
              <div className={`${global.com_flex_column_space_between} ${order.goods_detail}`}>
                <span className={order.goods_name}>
                  {record.goodsName}
                </span>
                <span className={order.goods_brief} style={{ marginBottom: 0 }}>
                  {sldComLanguage('订单编号：')}{record.orderSn}
                </span>
                <span className={order.goods_brief} style={{ marginBottom: 0 }}>
                  {sldComLanguage('退款编号：')}{record.afsSn}
                </span>
              </div>
            </div>;
          },
        },
        {
          title: `${sldComLanguage('退款金额(元)')}`,
          dataIndex: 'returnMoneyAmount',
          align: 'center',
          width: 100,
        }, {
          title: `${sldComLanguage('买家会员名')}`,
          dataIndex: 'memberName',
          align: 'center',
          width: 100,
        }, {
          title: `${sldComLanguage('申请时间')}`,
          dataIndex: 'applyTime',
          align: 'center',
          width: 100,
        }, {
          title: `${sldComLanguage('退款状态')}`,
          dataIndex: 'stateValue',
          align: 'center',
          width: 100,
        }, {
          title: `${sldComLanguage('操作')}`,
          align: 'center',
          width: 100,
          render: (text, record) => (
            <Link
              to={{
                pathname: '/order/service_refund_lists_to_detail',
                query: {
                  afsSn: record.afsSn,
                },
              }}
            >
              {sldtbaleOpeBtnText(`${sldComLanguage('查看详情')}`, () => null)}
            </Link>
          ),
        }],
    };
  }

  componentDidMount() {
    this.get_list({ pageSize: pageSize });
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { search_height } = this.state;
    if (this.refs.search_part != undefined) {
      if (this.refs.search_part.clientHeight != search_height) {
        this.setState({ search_height: this.refs.search_part.clientHeight });
      }
    }
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'service/get_refund_list',
      payload: { ...params, returnType: 1 },
      callback: (res) => {
        this.setState({ loading: false });
        if (res.state == 200) {
          if (params.current > 1 && res.data.list.length == 0 && this.state.params.current > 1) {
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

  handleTablePagination = (pagination, filtersArg, sorter, type = 'main') => {
    if (type == 'main') {
      const { formValues } = this.state;
      const params = sldHandlePaginationData(pagination, filtersArg, sorter, formValues);
      comm_cur_page = pagination.current;
      pageSize = params.pageSize;
      this.setState({
        params: params,
      });
      this.get_list(params);
    }
  };

  //搜索事件
  search = (data) => {
    const values = { ...data };
    //时间处理
    if (values.search_apply_time) {
      values.startTime = values.search_apply_time[0] ? values.search_apply_time[0].format(dateFormat) + ' 00:00:00' : '';
      values.endTime = values.search_apply_time[1] ? values.search_apply_time[1].format(dateFormat) + ' 23:59:59' : '';
      values.search_apply_time = '';
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

  //表格拖动
  resizeTable = (index, size, type, data) => {
    let datas = dragSldTableColumn(index, size, data);
    this.setState({ [type]: datas });
  };

  //搜索模块点击展开/收起
  moreSearchToggle = () => {
    const { search_height } = this.state;
    if (this.refs.search_part != undefined) {
      if (this.refs.search_part.clientHeight != search_height) {
        this.setState({ search_height: this.refs.search_part.clientHeight });
      }
    }
  };

  render() {
    const { search_data, data, loading, columns, search_height } = this.state;
    return (
      <div className={global.common_page}
           style={{ flex: 1, flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        <div>
          <div className={global.tableListForm} ref={'search_part'}>
            <Search search_data={search_data} moreSearchToggle={() => this.moreSearchToggle()}
                    seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}
            />
          </div>

          <Spin spinning={loading}>
            <StandardTable
              totalHeight={document.body.clientHeight - 140 - search_height - 15}
              data={data}
              rowKey={'afsSn'}
              isCheck={false}
              columns={columns}
              onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'main')}
              resizeTable={(index, size) => this.resizeTable(index, size, 'columns', columns)}
              isColumnResize={true}
              showMarkColor={true}
            />
          </Spin>

        </div>
      </div>

    );
  }
}
