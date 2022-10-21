/*
* 商品管理——在售商品
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
  sldPopConfirm,
  dateFormat,
  sldHandlePaginationData,
  sldtbaleOpeBtnText,
  sldIconBtn,
  formItemLayoutModal,
  getSldListGoodsImg80,
  showHelpTip,
  getSldEmptyH,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import Search from '@/components/Search/Search';
import SldModal from '@/components/SldModal/SldModal';

let pageSize = list_com_page_size_10;
@connect(({ point,common }) => ({
  point,common
}))
@Form.create()
export default class GoodsOnlineLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_height:0,
      showTip:'',//积分现金比例提示
      modal_width: 700,
      modalVisibleDetail: false,
      initLoading: false,
      submiting: false,
      show_foot: false,
      modalVisible: false,//是否显示规格弹框
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '商品规格',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      search_data: [{
        type: 'input',
        label: `${sldComLanguage('商品名称')}`,
        name: 'goodsName',
        placeholder: `${sldComLanguage('请输入商品名称')}`,
      }, {
        type: 'input',
        label: `${sldComLanguage('商品货号')}`,
        name: 'goodsCode',
        placeholder: `${sldComLanguage('请输入商品货号')}`,
      }, {
        type: 'input',
        label: `${sldComLanguage('条形码')}`,
        name: 'barCode',
        placeholder: `${sldComLanguage('请输入商品条形码')}`,
      },{
        type: 'select',
        label: `${sldComLanguage('商品类型')}`,
        name: 'isVirtualGoods',
        placeholder: `${sldComLanguage('请选择商品类型')}`,
        sel_data: [
          { key: '', name: `${sldComLanguage('全部')}` },
          { key: 1, name: `${sldComLanguage('实物商品')}` },
          { key: 2, name: `${sldComLanguage('虚拟商品')}` },
        ],
      }, {
        type: 'rangepicker',
        label: `${sldComLanguage('发布时间')}`,
        name: 'search_create_time',
        placeholder1: `${sldComLanguage('开始时间')}`,
        placeholder2: `${sldComLanguage('结束时间')}`,
      }],
      view_spec_data: [{
        type: 'scroll_table',
        name:'' ,
        label: ``,
        width: 780,
        content:'' ,
        data: [],
        columns: this.goods_spec_columns,
        rowKey: 'integralProductId',
      }],//查看规格
      formValues: {},//搜索条件
      operateData: [],
      columns: [
        {
          title: ' ',
          align: 'center',
          width: 30,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('商品信息')}`,
          dataIndex: 'mainImage',
          align: 'center',
          width: 250,
          render: (text, record) => {
            return <div className={`${global.goods_info} ${global.com_flex_row_flex_start}`}>
              {record.isVirtualGoods == 2&&<span className={`${global.virtual_goods_flag}`}>虚拟</span>}
              <div className={global.goods_img}>{getSldListGoodsImg80(text)}</div>
              <div className={`${global.com_flex_column_space_between} ${global.goods_detail}`}>
                <span className={global.goods_name}>
                  {record.goodsName}
                </span>
                <span className={global.goods_brief}>
                  {record.goodsBrief}
                </span>
              </div>
            </div>;
          },
        },
        {
          title: `${sldComLanguage('商品价格')}`,
          dataIndex: 'cashPrice',
          align: 'center',
          width: 100,
          render: (text, record, index) => {
            return `${record.integralPrice}${sldComLanguage('积分')}${text ? (' + ¥' + text) : ''}`;
          },
        },
        {
          title: `${sldComLanguage('商品库存')}`,
          dataIndex: 'goodsStock',
          align: 'center',
          width: 100,
          render: (text, record, index) => {
            return <span style={{
              color: record.warning ? '#FF490A' : '#696969',
              fontWeight: record.warning ? '700' : '500',
            }}>{text}</span>;
          },
        },
        {
          title: `${sldComLanguage('销量')}`,
          dataIndex: 'actualSales',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('发布时间')}`,
          dataIndex: 'createTime',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('操作')}`,
          align: 'center',
          width: 100,
          render: (text, record) => (
            <Fragment>
              {sldtbaleOpeBtnText(`${sldComLanguage('查看规格')}`, () => this.viewSpec(record))}
              <span className={global.splitLine}></span>
              <Link to={{
                pathname: '/point/goods_list_to_add',
                query: {
                  id: record.integralGoodsId,
                },
              }}>
                {sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, () => null)}
              </Link>
            </Fragment>
          ),
        },
      ],
    };
  }

  goods_spec_columns = [
    {
      title: ' ',
      dataIndex: 'integralProductId',
      align: 'center',
      width: 30,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: `${sldComLanguage('商品规格')}`,
      dataIndex: 'specValues',
      align: 'center',
      width: 150,
      render: (text, record, index) => {
        return <div style={{ width: 200, wordBreak: 'normal', wordWrap: 'break-word' }}>{text}</div>;
      },
    },
    {
      title: `${sldComLanguage('价格(元)')}`,
      dataIndex: 'cashPrice',
      align: 'center',
      width: 150,
      render: (text, record, index) => {
        return `${record.integralPrice}${sldComLanguage('积分')}${text ? (' + ¥' + text) :'' }`;
      },
    },
    {
      title: `${sldComLanguage('库存')}`,
      dataIndex: 'productStock',
      align: 'center',
      width: 100,
      render: (text, record, index) => {
        return <span style={{
          color: record.warning ? '#FF490A' : '#696969',
          fontWeight: record.warning ? '700' : '500',
        }}>{text}</span>;
      },
    },
    {
      title: `${sldComLanguage('货号')}`,
      dataIndex: 'productCode',
      align: 'center',
      width: 120,
    },
    {
      title: `${sldComLanguage('条形码')}`,
      dataIndex: 'barCode',
      align: 'center',
      width: 120,
    },
  ];

  componentDidMount() {
    this.get_list({ pageSize: pageSize });
    this.get_common_setting();
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () =>{
    const {search_height} = this.state;
    if(this.refs.search_part!=undefined){
      if(this.refs.search_part.clientHeight != search_height){
        this.setState({search_height:this.refs.search_part.clientHeight})
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.updateFlag == 'online'){
      this.get_list({ pageSize: pageSize });
    }
  }

  // 查看规格
  viewSpec = (val) => {
    let { view_spec_data, operateData } = this.state;
    operateData = JSON.parse(JSON.stringify(view_spec_data));
    operateData[0].columns = this.goods_spec_columns;
    operateData[0].data = val.productList;
    this.setState({
      modalVisible: true,
      show_foot: false,
      title: `${sldComLanguage('查看规格')}`,
      modal_width: 800,
      operateData,
    });
  };

  //商品操作
  operateGoods = (id, type) => {
    this.setState({ submiting: true });
    const { params } = this.state;
    const { dispatch } = this.props;
    let param_data = {};
    let dis_type = '';
    if (type == 'lockup') {
      dis_type = 'point/lockup_goods';
      param_data = id;
    } else if (type == 'del') {
      dis_type = 'point/del_goods';
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
          if(type == 'lockup'){
            this.props.setUpdateFlag('storage')
          }
        } else {
          failTip(res.msg);
        }
      },
    });
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'point/get_goods_lists',
      payload: { ...params, state: 3 },
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

  //获取系统配置
  get_common_setting = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/getSetting',
      payload: {str:'integral_conversion_ratio'},
      callback: (res) => {
        if (res.state == 200) {
          this.setState({showTip:`${sldComLanguage('积分兑换现金比例为')}${res.data[0].value} ：1，${sldComLanguage('即')}${res.data[0].value}${sldComLanguage('积分')} = 1${sldComLanguage('元。')}`})
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

  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { selectedRows, selectedRowKeys, search_data, columns, initLoading, data, modalVisible, operateData, title, modal_width, show_foot, submiting,showTip,search_height } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1, paddingTop: 0 }}>
        {getSldEmptyH(10)}
        {showTip&&showHelpTip(showTip)}
        <div className={global.tableListForm} ref={'search_part'}>
          <Search search_data={search_data}
                  seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}/>
        </div>
        {/*公共功能条-start*/}
        <div className={global.operate_bg}
             style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Link to={{
              pathname: '/point/goods_list_to_add',
              query: {
                source: '/point/goods_list',
              },
            }}>
              {sldIconBtn(() => null, `${sldComLanguage('发布商品')}`, 7, 0, 12, 12, 3, 'fabu1', '#08A9B7')}
            </Link>
            <Link to={{
              pathname: '/point/goods_list_to_import',
            }}>
              {sldIconBtn(() => null, `${sldComLanguage('导入商城商品')}`, 7, 0, 15, 15, 3, 'daoru', '#39b55f')}
            </Link>
            {selectedRowKeys.length == 0 ? sldIconBtn(() => {
              failTip(`${sldComLanguage('请先选中数据')}`);
              //确认下架选中的商品吗？
            }, `${sldComLanguage('下架')}`, 7, 0, 13, 13, 3, 'ziyuan31', '#f9a006') : sldPopConfirm('leftBottom', `${sldComLanguage('确认下架选中的商品吗？')}`, () => this.operateGoods({ integralGoodsIds: selectedRowKeys.join(',') }, 'lockup'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`, sldIconBtn(null, `${sldComLanguage('下架')}`, 7, 0, 13, 13, 3, 'ziyuan31', '#f9a006'), 0, 0, '#f9a006')}

            {selectedRowKeys.length == 0 ? sldIconBtn(() => {
              failTip(`${sldComLanguage('请先选中数据')}`);
              //确认删除选中的商品吗？
            }, `${sldComLanguage('删除')}`, 7, 0, 15, 15, 3, 'piliangshanchu', '#F21414') : sldPopConfirm('leftBottom', `${sldComLanguage('确认删除选中的商品吗？')}`, () => this.operateGoods({ integralGoodsIds: selectedRowKeys.join(',') }, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`, sldIconBtn(null, `${sldComLanguage('删除')}`, 7, 0, 15, 15, 3, 'piliangshanchu', '#F21414'), 0, 0, '#F21414')}
          </div>
        </div>
        {/*公共功能条-end*/}
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            totalHeight={document.body.clientHeight- 260 - search_height}
            bordered={false}
            selectedRows={selectedRows}
            data={data}
            rowKey={'integralGoodsId'}
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

        { /*新增/编辑对话框-start*/}
        <SldModal
          width={modal_width}
          title={title}
          submiting={submiting}
          modalVisible={modalVisible}
          sldHandleConfirm={null}
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
