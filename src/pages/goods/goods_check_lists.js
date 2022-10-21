/*
* 商品管理——待审核商品
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
  list_com_page_more,
} from '@/utils/utils';
import global from '@/global.less';
import styles from './product.less';
import StandardTable from '@/components/StandardTable';
import Search from '@/components/Search/Search';
import SldModal from '@/components/SldModal/SldModal';

let pageSize = list_com_page_size_10;
@connect(({ product }) => ({
  product,
}))
@Form.create()
export default class GoodsCheckLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_width:700,
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
        type: 'input',
        label: `${sldComLanguage('商品名称')}`,
        name: 'goodsName',
        placeholder: `${sldComLanguage('请输入商品名称')}`,
      },{
        type: 'input',
        label: `${sldComLanguage('商品货号')}`,
        name: 'goodsCode',
        placeholder: `${sldComLanguage('请输入商品货号')}`,
      },{
        type: 'input',
        label: `${sldComLanguage('条形码')}`,
        name: 'barCode',
        placeholder: `${sldComLanguage('请输入商品条形码')}`,
      },{
        type: 'tree_select',
        label: `${sldComLanguage('店铺分类')}`,
        name: 'StoreCategoryId',
        placeholder: `${sldComLanguage('请选择店铺分类')}`,
        data: [],
      }, {
        type: 'select',
        label: `${sldComLanguage('审核状态')}`,
        name: 'auditState',
        placeholder: `${sldComLanguage('请选择会员状态')}`,
        sel_data: [
          { key: '', name: `${sldComLanguage('全部')}` },
          { key: '2', name: `${sldComLanguage('待审核')}` },
          { key: '4', name: `${sldComLanguage('审核拒绝')}` },
        ],
      }],
      view_spec_data: [{
        type: 'scroll_table',
        name: '',
        label: ``,
        width: 740,
        content: '',
        data: [],
        columns: this.goods_spec_columns,
        rowKey: 'productId',
      }],//查看规格
      formValues: {},//搜索条件
      addData:[{
        type: 'select',
        label: `${sldComLanguage('顶部版式')}`,
        name: 'topTemplateId',
        placeholder: `${sldComLanguage('请选择顶部关联版式')}`,
        sel_data: [],
        sele_key: 'templateId',
        sele_name: 'templateName',
        diy: true,
      },{
        type: 'select',
        label: `${sldComLanguage('底部版式')}`,
        name: 'bottomTemplateId',
        placeholder: `${sldComLanguage('请选择底部关联版式')}`,
        sel_data: [],
        sele_key: 'templateId',
        sele_name: 'templateName',
        diy: true,
      }],//设置关联版式的数据
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
            return <div className={`${styles.goods_info} ${global.com_flex_row_flex_start}`}>
              <div className={styles.goods_img}>{getSldListGoodsImg80(text)}</div>
              <div className={`${global.com_flex_column_space_between} ${styles.goods_detail}`}>
                <span className={styles.goods_name}>
                  {record.goodsName}
                </span>
                <span className={styles.goods_brief}>
                  {record.categoryPath}
                </span>
              </div>
            </div>;
          },
        },
        {
          title: `${sldComLanguage('商品价格')}`,
          dataIndex: 'goodsPrice',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('商品库存')}`,
          dataIndex: 'goodsStock',
          align: 'center',
          width: 100,
          render: (text, record, index) => {
            return <span style={{color:record.warning?'#FF490A':'#696969',fontWeight:record.warning?'700':'500'}}>{text}</span>;
          },
        },
        {
          title: `${sldComLanguage('是否推荐')}`,
          dataIndex: 'storeIsRecommend',
          align: 'center',
          width: 100,
          render: (text, record) => {
            return text==1?`${sldComLanguage('推荐')}`:`${sldComLanguage('不推荐')}`
          },
        },
        {
          title: `${sldComLanguage('审核状态')}`,
          dataIndex: 'stateValue',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('拒绝理由')}`,
          dataIndex: 'auditReason',
          align: 'center',
          width: 150,
          render: (text, record) =>{
            return (text?text:'')+(record.auditComment?(','+record.auditComment):'')
          }
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
                pathname: '/goods/add_goods',
                query: {
                  id: record.goodsId,
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
      dataIndex: 'productId',
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
      width: 200,
      render: (text, record, index) => {
        return <div style={{width:200,wordBreak:'normal',wordWrap:'break-word'}}>{text}</div>;
      },
    },
    {
      title: `${sldComLanguage('价格(元)')}`,
      dataIndex: 'productPrice',
      align: 'center',
      width: 110,
    },
    {
      title: `${sldComLanguage('库存')}`,
      dataIndex: 'productStock',
      align: 'center',
      width: 100,
      render: (text, record, index) => {
        return <span style={{color:record.warning?'#FF490A':'#696969',fontWeight:record.warning?'700':'500'}}>{text}</span>;
      },
    },
    {
      title: `${sldComLanguage('货号')}`,
      dataIndex: 'productCode',
      align: 'center',
      width: 150,
    },
    {
      title: `${sldComLanguage('条形码')}`,
      dataIndex: 'barCode',
      align: 'center',
      width: 150,
    },
  ];

  componentDidMount() {
    this.get_list({ pageSize: pageSize });
    this.getTemplateList();
    this.getStoreCat();//获取店铺分类
  }

  //获取店铺分类
  getStoreCat = () => {
    const { dispatch } = this.props;
    let { search_data } = this.state;
    let dis_type = 'product/get_store_category_list';
    let payload = { pageSize: list_com_page_more };
    dispatch({
      type: dis_type,
      payload: payload,
      callback: (res) => {
        if (res.state == 200) {
          let tmp_data = search_data.filter(item => item.name == 'StoreCategoryId')[0];
          for (let i in res.data) {
            res.data[i].key = res.data[i].innerLabelId;
            res.data[i].value = res.data[i].innerLabelId;
            res.data[i].title = res.data[i].innerLabelName;
            if (res.data[i].children != null && res.data[i].children.length > 0) {
              res.data[i].children.map(item => {
                item.key = item.innerLabelId;
                item.value = item.innerLabelId;
                item.title = item.innerLabelName;
              });
            }
          }
          tmp_data.data = res.data;
          this.setState({ search_data });
        }
      },
    });
  };


  //设置关联版式
  setTemplate = () => {
    let {addData} = this.state;
    this.setState({
      operateData: JSON.parse(JSON.stringify(addData)),
      title:`${sldComLanguage('设置关联版式')}`,
      modal_width: 500,
      modalVisible: true,
      type: 'template',
      show_foot: true,
    })
  }

  sldHandleConfirm = (val) => {
    const { selectedRowKeys } = this.state;
    val.goodsIds = selectedRowKeys.join(',');
    if(val.topTemplateId == undefined&&val.bottomTemplateId == undefined){
      failTip(`${sldComLanguage('请至少选择一个模版')}`);
      return false;
    }
    this.operateGoods(val,'template');
  };

  // 查看规格
  viewSpec = (val) => {
    let { view_spec_data,operateData } = this.state;
    operateData = JSON.parse(JSON.stringify(view_spec_data));
    operateData[0].columns = this.goods_spec_columns;
    operateData[0].data = val.productList;
    this.setState({
      modalVisible: true,
      show_foot:false,
      title:`${sldComLanguage('查看规格')}`,
      modal_width:760,
      operateData
    });
  };

  //商品操作
  operateGoods = (id, type) => {
    this.setState({submiting:true});
    const { params } = this.state;
    const { dispatch } = this.props;
    let param_data = {};
    let dis_type = '';
    if (type == 'lockup') {
      dis_type = 'product/lockup_goods';
      param_data = id;
    } else if (type == 'recommend') {
      dis_type = 'product/set_goods_recommend';
      param_data = id
    } else if (type == 'del') {
      dis_type = 'product/del_goods';
      param_data = id
    } else if (type == 'template') {
      dis_type = 'product/set_related_template';
      param_data = id
    }
    dispatch({
      type: dis_type,
      payload: param_data,
      callback: (res) => {
        this.setState({submiting:false});
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list(params);
          this.setState({
            selectedRows: [],
            selectedRowKeys: [],
            modalVisible:false
          })
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
      type: 'product/get_goods_lists',
      payload: { ...params, state: 2 },
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

  //获取关联版式列表
  getTemplateList = () => {
    const { dispatch } = this.props;
    let {addData} = this.state;
    dispatch({
      type: 'product/get_related_template_lists',
      payload: { pageSize: list_com_page_more },
      callback: (res) => {
        this.setState({ initLoading: false });
        if (res.state == 200) {
          let topData = res.data.list.filter(item=>item.templatePosition == 1);
          let bottomData = res.data.list.filter(item=>item.templatePosition == 2);
          for(let i in addData){
            if(addData[i].name == 'topTemplateId'){
              addData[i].sel_data = topData;
            }else{
              addData[i].sel_data = bottomData;
            }
          }
          this.setState({addData})
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
      values.startTime = values.search_create_time[0] ? values.search_create_time[0].format(dateFormat)+' 00:00:00' : '';
      values.endTime = values.search_create_time[1] ? values.search_create_time[1].format(dateFormat)+' 23:59:59' : '';
      values.search_create_time = '';
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

  render() {
    const { selectedRows, selectedRowKeys, search_data, columns, initLoading, data, modalVisible,operateData,title,modal_width,show_foot,submiting } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1,paddingTop:0 }}>
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
              //确认删除选中的商品吗？
            }, `${sldComLanguage('删除')}`, 7, 0, 15, 15, 3, 'piliangshanchu', '#F21414') : sldPopConfirm('leftBottom', `${sldComLanguage('确认删除选中的商品吗？')}`, () => this.operateGoods({goodsIds:selectedRowKeys.join(',')}, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`, sldIconBtn(null, `${sldComLanguage('删除')}`, 7, 0, 15, 15, 3, 'piliangshanchu', '#F21414'), 0, 0, '#F21414')}

            {selectedRowKeys.length == 0 ? sldIconBtn(() => {
              failTip(`${sldComLanguage('请先选中数据')}`);
              //确认将选中的商品设置为推荐商品吗？
            }, `${sldComLanguage('设置推荐')}`, 7, 0, 15, 15, 3, 'nav-tuijian', '#ffa70f') : sldPopConfirm('leftBottom', `${sldComLanguage('确认将选中的商品设置为推荐商品吗？')}`, () => this.operateGoods({goodsIds:selectedRowKeys.join(','),isRecommend:1}, 'recommend'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`, sldIconBtn(null, `${sldComLanguage('设置推荐')}`, 7, 0, 15, 15, 3, 'nav-tuijian', '#ffa70f'), 0, 0, '#ffa70f')}

            {selectedRowKeys.length == 0 ? sldIconBtn(() => {
              failTip(`${sldComLanguage('请先选中数据')}`);
              //确认将选中的商品取消推荐吗？
            }, `${sldComLanguage('取消推荐')}`, 7, 0, 15, 15, 3, 'quxiaotuijian2', '#0f419c') : sldPopConfirm('leftBottom', `${sldComLanguage('确认将选中的商品取消推荐吗？')}`, () => this.operateGoods({goodsIds:selectedRowKeys.join(','),isRecommend:0}, 'recommend'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`, sldIconBtn(null, `${sldComLanguage('取消推荐')}`, 7, 0, 15, 15, 3, 'quxiaotuijian2', '#0f419c'), 0, 0, '#0f419c')}

            {selectedRowKeys.length == 0
              ? sldIconBtn(() => {
                failTip(`${sldComLanguage('请先选中数据')}`);
                //确认为选中的商品设置关联版式吗？
              }, `${sldComLanguage('设置关联版式')}`, 7, 0, 14, 14, 3, 'glsz', '#0c93f2')
              : sldIconBtn(() => this.setTemplate(), `${sldComLanguage('设置关联版式')}`, 7, 0, 14, 14, 3, 'glsz', '#0c93f2')}
          </div>
        </div>
        {/*公共功能条-end*/}
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            bordered={false}
            selectedRows={selectedRows}
            data={data}
            rowKey={'goodsId'}
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
