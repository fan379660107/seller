import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form } from 'antd';
import {
  list_com_page_size_10,
  sldHandlePaginationData,
  dragSldTableColumn,
  getTableNum,
  sldComLanguage,
} from '@/utils/utils';
import global from '@/global.less';
import styles from './print_order_detail.less';
import StandardTable from '@/components/StandardTable';

let pageSize = list_com_page_size_10;
@connect(({ order }) => ({
  order,
}))
@Form.create()
export default class PrintOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link_type: '',
      initLoading: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      formValues: {},//搜索条件
      goods_data: [],
      base_data: [
        {
          code: 'storeName',
          name: `${sldComLanguage('店铺名称')}`,
          value: '',
        }, {
          code: 'orderSn',
          name: `${sldComLanguage('订单编号')}`,
          value: '',
        }, {
          code: 'receiverName',
          name: `${sldComLanguage('收货人姓名')}`,
          value: '',
        }, {
          code: 'receiverMobile',
          name: `${sldComLanguage('收货人手机号')}`,
          value: '',
        }, {
          code: 'receiverAddress',
          name: `${sldComLanguage('收货地址')}`,
          value: '',
        }, {
          code: 'createTime',
          name: `${sldComLanguage('下单时间')}`,
          value: '',
        },
      ],//基本信息数据
      columns: [
        {
          title: '',
          dataIndex: 'productId',
          align: 'center',
          width: 30,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('商品名称')}`,
          align: 'center',
          dataIndex: 'goodsName',
          width: 150,
        }, {
          title: `${sldComLanguage('商品规格')}`,
          align: 'center',
          dataIndex: 'specValues',
          render: (text) => text ? text : '--',
        },
        {
          title: `${sldComLanguage('数量')}`,
          align: 'center',
          dataIndex: 'productNum',
          width: 50,
        }, {
          title: `${sldComLanguage('单价(元)')}`,
          align: 'center',
          dataIndex: 'productShowPrice',
          width: 80,
        },
        {
          title: `${sldComLanguage('小计(元)')}`,
          align: 'center',
          width: 80,
          render: (text, record, index) => record.productNum * record.productShowPrice.toFixed(2),
        },
      ],
    };
  }

  componentDidMount() {
    let { base_data } = this.state;
    for (let i in base_data) {
      base_data[i].value = this.props.data[base_data[i].code];
    }
    this.setState({ base_data });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let { base_data, goods_data } = this.state;
    for (let i in base_data) {
      base_data[i].value = nextProps.data[base_data[i].code];
    }
    goods_data = nextProps.data.orderProductListVOList;
    this.setState({ base_data, goods_data });
  }

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

  //表格列拖动
  resizeTable = (index, size, type, data) => {
    let datas = dragSldTableColumn(index, size, data);
    this.setState({ [type]: datas });
  };

  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { selectedRows, columns, base_data, goods_data } = this.state;
    return (
      <div className={`${global.common_page} ${styles.order_print}`} style={{ flex: 1 }} id={'test'}>
        <div className={`${styles.title}`}>{sldComLanguage('发货明细单')}</div>
        <div className={`${global.flex_row_start_center} ${styles.base_info}`}>
          {
            base_data.map((item, index) => {
              return <div key={index} className={`${styles.item}`}><span>{item.name}：</span><span>{item.value}</span>
              </div>;
            })
          }
        </div>
        {/*标准表格-start*/}
        <StandardTable
          selectedRows={selectedRows}
          data={{ list: goods_data, pagination: {} }}
          rowKey={'productId'}
          isCheck={false}
          columns={columns}
          onSelectRow={this.handleSelectRows}
          onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'main')}
          onSldHandleSeleRow={this.onSldHandleSeleRow}
          resizeTable={(index, size) => this.resizeTable(index, size, 'columns', columns)}
          isColumnResize={true}
          sldpagination={false}
          totalHeight={3000}
        />
        {/*标准表格-end*/}
      </div>
    );
  }
}
