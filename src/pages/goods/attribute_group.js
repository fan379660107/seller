import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin, Switch } from 'antd';
import {
  sldIconBtn,
  failTip,
  sucTip,
  sldPopConfirmDiy,
  list_com_page_size_10,
  dragSldTableColumn,
  sldHandlePaginationData,
  formItemLayoutModal,
  validatorNumbe,
  getTableNum,
  sldComLanguage,
  sldtbaleOpeBtnText,
  getSldCopyData,
  sldLlineRtextAddGoodsAddMargin,
  sldSearchValClear,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import SldModal from '@/components/SldModal/SldModal';
import Link from 'umi/link';

let pageSize = list_com_page_size_10;
@connect(({ product }) => ({
  product,
}))
@Form.create()
export default class AttributeGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_con: '',//搜索框内容
      initLoading: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      type: 'add',//'add'新增  'edit'编辑
      params: { pageSize: pageSize },//搜索条件
      operateData: [],//操作数据
      addData: [{
        type: 'input',
        label: `${sldComLanguage('分组名称')}`,
        name: 'groupName',
        extra: `${sldComLanguage('最多输入6个字')}`,
        placeholder: `${sldComLanguage('请输入分组名称')}`,
        initialValue: '',
        maxLength:6,
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入分组名称')}`,
        }],
      }, {
        type: 'inputnum',
        label: `${sldComLanguage('排序')}`,
        name: 'sort',
        extra: `${sldComLanguage('请输入0~255的数字,数字越小顺序越靠前')}`,
        placeholder: `${sldComLanguage('请输入排序')}`,
        initialValue: '',
        rules: [{
          required: true,
          message: `${sldComLanguage('请输入排序')}`,
        }, { validator: (rule, value, callback) => validatorNumbe(rule, value, callback) }],
      }, {
        type: 'switch',
        label: `${sldComLanguage('启用')}`,
        name: 'isShow',
        placeholder: ``,
        initialValue: 1,
      },
      ],//modal框的数据
      formValues: {},//搜索条件
      columns: [
        {
          title: ' ',
          dataIndex: 'groupId',
          align: 'center',
          width: 30,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('分组名称')}`,
          dataIndex: 'groupName',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('排序')}`,
          dataIndex: 'sort',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('启用状态')}`,
          dataIndex: 'isShow',
          align: 'center',
          width: 80,
          render: (text, record) => (
            <Switch checkedChildren={`${sldComLanguage('启用')}`}
                    onChange={(checked) => this.operateAttr({groupId:record.groupId,isShow:checked ? 1 : 0}, 'edit')}
                    unCheckedChildren={`${sldComLanguage('停用')}`}
                    checked={text == 1 ? true : false}
                    valuepropname={'checked'}/>
          ),
        },
        {
          title: `${sldComLanguage('操作')}`,
          align: 'center',
          width: 100,
          render: (text, record) => (

            <Fragment>
              <Link to={{
                pathname: '/goods/attribute_group_to_detail',
                query: {
                  id: record.groupId,
                },
              }}>
                {sldtbaleOpeBtnText(`${sldComLanguage('查看')}`, () => null)}
              </Link>
              <span className={global.splitLine}></span>
              {sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, () => this.editAttr(record))}
              <span className={global.splitLine}></span>
              {/*删除后不可恢复，是否确定删除？*/}
              {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operateAttr(record.groupId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
            </Fragment>
          ),
        },
      ],
    };
  }

  cur_edit_id = '';//当前操作数据id
  componentDidMount() {
    this.get_list({ pageSize: pageSize });
  }

  //编辑属性
  editAttr = (val) => {
    let { addData, operateData } = this.state;
    operateData = getSldCopyData(addData);
    for (let i in operateData) {
      if(operateData[i].name == 'attributeValues'){
        operateData[i].initialValue = val[operateData[i].name].join(',');
      }else{
        operateData[i].initialValue = val[operateData[i].name];
      }
    }
    this.cur_edit_id = val.groupId;//当前操作数据id
    this.setState({
      type: 'edit',
      title: `${sldComLanguage('编辑属性')}`,
      operateData,
      modalVisible: true,
    });//编辑属性
  };

  //属性操作  del：删除 stop：停用 start：启用 edit：编辑
  operateAttr = (id, type) => {
    this.setState({ submiting: true });
    const { params } = this.state;
    const { dispatch } = this.props;
    let dis_type = '';
    let param_data = {};
    if (type == 'del') {
      dis_type = 'product/del_attribute_group';
      param_data.groupIds = id;
    } else if (type == 'edit') {
      dis_type = 'product/edit_attribute_group';
      param_data = id;
    }
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

  //添加属性
  addAttr = () => {
    let { addData, operateData } = this.state;
    operateData = getSldCopyData(addData);
    this.setState({
      modalVisible: true,
      type: 'add',
      title: `${sldComLanguage('添加属性')}`,
      operateData,
    });//添加属性
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'product/get_attribute_group_lists',
      payload: params,
      callback: (res) => {
        this.setState({ initLoading: false });
        if (res.state == 200) {
          if (res.data.length == 0 && this.state.params.currentPage > 1) {
            params.currentPage = params.currentPage - 1;
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


  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  sldHandleConfirm = (val) => {
    const { type } = this.state;
    const { dispatch } = this.props;
    let _this = this;
    val.isShow = val.isShow ? 1 : 0;
    this.setState({ submiting: true });
    if (type == 'edit') {
      val.groupId = this.cur_edit_id;
      this.operateAttr(val, 'edit');
    } else {
      dispatch({
        type: 'product/add_attribute_group',
        payload: val,
        callback: (res) => {
          if (res.state == 200) {
            sucTip(res.msg);
            _this.get_list({ pageSize: pageSize });
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
  };

  //搜索框内容的变化
  sldSearChange = (val) => {
    this.setState({
      search_con: val.target.value,
    });
  };

  //清空搜索内容
  sldSearClear = () => {
    this.setState({
      search_con: '',
    });
    this.sldSearch('');
  };

  //搜索
  sldSearch = (val) => {
    let { params, formValues } = this.state;
    params.groupName = val;
    formValues.groupName = val;
    this.setState({ pageSize: pageSize, ...formValues,params: { pageSize: pageSize } });
    this.get_list(params);
  };

  render() {
    const { selectedRows, columns, initLoading, data, submiting, operateData, modalVisible, title, search_con } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('自定义属性')}`, 0, 0, 5)}
        <div className={global.operate_bg}>
          {sldIconBtn(() => this.addAttr(), `${sldComLanguage('添加属性分组')}`, 7, 7)}
          {/*请输入属性名称     搜索*/}
          {sldSearchValClear(`${sldComLanguage('请输入属性名称')}`, 291, this.sldSearch, `${sldComLanguage('搜索')}`, search_con, this.sldSearChange, this.sldSearClear, 65)}
        </div>
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            totalHeight={document.body.clientHeight - 150 - 15}
            selectedRows={selectedRows}
            data={data}
            rowKey={'groupId'}
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
        {/*新增/编辑对话框-start*/}
        <SldModal
          title={title}
          submiting={submiting}
          width={500} Promotion_flash_sale
          modalVisible={modalVisible}
          sldHandleConfirm={(val) => this.sldHandleConfirm(val)}
          sldHandleCancle={this.sldHandleCancle}
          formItemLayoutModal={formItemLayoutModal}
          content={operateData}
        />
        {/*新增/编辑对话框-end*/}

      </div>

    );
  }
}
