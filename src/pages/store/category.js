import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin, Switch } from 'antd';
import {
  sldIconBtn,
  failTip,
  sucTip,
  sldLlineRtextAddGoodsAddMargin,
  dragSldTableColumn,
  sldHandlePaginationData,
  formItemLayoutModal,
  validatorNumbe,
  sldComLanguage,
  sldtbaleOpeBtnText,
  sldPopConfirmDiy,
  list_com_page_more,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import SldModal from '@/components/SldModal/SldModal';

let pageSize = list_com_page_more;
let sthis = '';
@connect(({ store }) => ({
  store,
}))
@Form.create()
export default class Category extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      data: {},
      formValues: {},
      submiting: false,//按钮loading
      loading: false,//按钮loading
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      modalVisible: false,
      title: `${sldComLanguage('新增商品分类')}`,
      type: 'add',//'add'新增  'edit'编辑
      params: {},//搜索条件
      curData: {},//编辑的数据
      addData: [{
        type: 'input',
        label: `${sldComLanguage('分类名称')}`,
        name: 'innerLabelName',
        extra: `${sldComLanguage('最多输入6个字')}`,
        placeholder: `${sldComLanguage('请输入分类名称')}`,
        initialValue: '',
        maxLength:6,
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入分类名称')}`,
        }],
      }, {
        type: 'inputnum',
        label: `${sldComLanguage('排序')}`,
        name: 'innerLabelSort',
        extra: `${sldComLanguage('请输入0~255的数字,值越小,显示越靠前')}`,
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
      }],//modal框的数据
      columns: [
        {
          title: `${sldComLanguage('分类名称')}`,
          align: 'left',
          dataIndex: 'innerLabelName',
          width: 150,
        },
        {
          title: `${sldComLanguage('排序')}`,
          dataIndex: 'innerLabelSort',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('显示状态')}`,//显示状态
          dataIndex: 'isShow',
          align: 'center',
          width: 80,
          render: (text, record) => (
            <Switch
              onChange={(checked) => this.operateCat({
                innerLabelId: record.innerLabelId,
                isShow: checked ? 1 : 0,
              }, 'switch')}
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
              {sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, () => this.editCat(record))}

              {record.parentInnerLabelId == 0 &&
              <Fragment>
                <span className={global.splitLine}></span>
                {sldtbaleOpeBtnText(`${sldComLanguage('添加下级分类')}`, () => this.addNextCat(record))}{/*添加下级分类*/}
              </Fragment>
              }

              {(record.children == undefined || (record.children != undefined && (record.children == null || record.children.length == 0))) &&
              <Fragment>
                <span className={global.splitLine}></span>
                {/*删除后不可恢复，是否确定删除？*/}
                {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operateCat(record.innerLabelId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                  sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
              </Fragment>
              }
            </Fragment>
          ),
        },
      ],
    };
  }

  cat_data = {
    type: 'select',
    label: `${sldComLanguage('上级分类')}`,
    name: 'parentInnerLabelId',
    placeholder: `${sldComLanguage('请选择上级分类')}`,
    sel_data: [],
    sele_key: 'innerLabelId',
    sele_name: 'innerLabelName',
    diy: true,
  };

  componentDidMount() {
    this.get_list();
  }

  componentWillUnmount() {

  }

  //获取数据列表
  get_list = (params = {}) => {
    const { dispatch } = this.props;
    let { data } = this.state;
    dispatch({
      type: 'store/get_category_list',
      payload: { ...params, pageSize: pageSize },
      callback: (res) => {
        if (res.state == 200) {
          data.list = res.data;
          this.cat_data.sel_data = res.data;
          this.setState({
            data: data,
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
    if (type == 'main') {
      const { formValues } = this.state;
      const params = sldHandlePaginationData(pagination, filtersArg, sorter, formValues);
      pageSize = params.pageSize;
      this.setState({
        params: params,
      });
      this.get_list(params);
    }
  };

  //新增功能
  addCat = () => {
    let { addData } = this.state;
    addData = addData.filter(item => item.name != 'parentInnerLabelId');
    for (let i = 0; i < addData.length; i++) {
      if (addData[i].name == 'innerLabelName') {
        addData.splice(i + 1, 0, JSON.parse(JSON.stringify(this.cat_data)));
      }
      addData[i].initialValue = '';
    }
    this.setState({
      modalVisible: true,
      type: 'add',
      title: `${sldComLanguage('新增店铺分类')}`,
      addData,
    });//添加商品分类
  };

  //添加下级功能
  addNextCat = (val) => {
    let { addData } = this.state;
    addData = addData.filter(item => item.name != 'parentInnerLabelId');
    for (let i = 0; i < addData.length; i++) {
      if (addData[i].name == 'innerLabelName') {
        addData.splice(i + 1, 0, JSON.parse(JSON.stringify(this.cat_data)));
      }
      if (addData[i].name == 'parentInnerLabelId') {
        addData[i].initialValue = val.innerLabelId;
        addData[i].disable = true;
      } else {
        addData[i].initialValue = '';
      }
    }
    this.setState({
      modalVisible: true,
      type: 'add',
      title: `${sldComLanguage('添加下级分类')}`,
      addData,
    });
  };

  //编辑商品分类
  editCat = (val) => {
    let { addData } = this.state;
    addData = addData.filter(item => item.name != 'parentInnerLabelId');
    for (let i = 0; i < addData.length; i++) {
      addData[i].initialValue = val[addData[i].name];
    }
    this.setState({
      type: 'edit',
      title: `${sldComLanguage('编辑店铺分类')}`,//编辑店铺分类
      addData: addData,
      modalVisible: true,
      curData: val,
    });
  };

  //分类操作事件 type add:添加 edit:编辑 del:删除
  operateCat = (id, type) => {
    let params = {};
    const { dispatch } = this.props;
    let dis_type = '';
    if (type == 'add') {
      dis_type = 'store/add_category';
      params = id;
    } else if (type == 'edit') {
      dis_type = 'store/edit_category';
      params = id;
    } else if (type == 'switch') {
      dis_type = 'store/switch_category';
      params = id;
    } else if (type == 'del') {
      dis_type = 'store/del_category';
      params.innerLabelId = id;
    }
    this.setState({ submiting: true });
    dispatch({
      type: dis_type,
      payload: params,
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list();
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

  sldHandleConfirm = (val) => {
    const { curData, type } = this.state;
    let sld_params = {};
    sld_params.innerLabelName = val.innerLabelName;
    sld_params.innerLabelSort = val.innerLabelSort;
    sld_params.isShow = val.isShow ? 1 : 0;
    if (type == 'edit') {
      sld_params.innerLabelId = curData.innerLabelId;
      this.operateCat(sld_params, 'edit');
    } else {
      sld_params.parentInnerLabelId = val.parentInnerLabelId ? val.parentInnerLabelId : 0;//父分类id,一级分类==0
      this.operateCat(sld_params, 'add');
    }
  };

  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  //表格拖动
  resizeTable = (index, size, type, data) => {
    let datas = dragSldTableColumn(index, size, data);
    this.setState({ [type]: datas });
  };

  render() {
    const { selectedRows, modalVisible, title, addData, columns, submiting, data, loading } = this.state;

    return (
      <div className={global.common_page}>
        {sldLlineRtextAddGoodsAddMargin('#FA6F1E', `${sldComLanguage('店铺分类管理')}`, 0, 0, 5)}
        <Spin spinning={loading}>
          { /*公共功能条-start*/}
          <div className={global.operate_bg}>
            {sldIconBtn(() => this.addCat(), `${sldComLanguage('新增分类')}`, 7, 0)}
          </div>
          { /*公共功能条-end*/}
          { /*标准表格-start*/}
          <StandardTable
            totalHeight = {document.body.clientHeight - 170}
            selectedRows={selectedRows}
            data={data}
            rowKey={'innerLabelId'}
            isCheck={false}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'main')}
            sldpagination={false}
            resizeTable={(index, size) => this.resizeTable(index, size, 'columns', columns)}
            isColumnResize={true}
          />
          { /*标准表格-end*/}
          { /*新增/编辑对话框-start*/}
          <SldModal
            zIndex={11}
            width={500}
            title={title}
            submiting={submiting}
            modalVisible={modalVisible}
            sldHandleConfirm={(val) => this.sldHandleConfirm(val)}
            sldHandleCancle={this.sldHandleCancle}
            formItemLayoutModal={formItemLayoutModal}
            content={addData}
          />
          { /*新增/编辑对话框-end*/}
        </Spin>
      </div>
    );
  }
}
