import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin } from 'antd';
import {
  sldIconBtn,
  failTip,
  sucTip,
  sldPopConfirmDiy,
  sldLlineRtextAddGoodsAddMargin,
  dragSldTableColumn,
  sldHandlePaginationData,
  formItemLayoutModal,
  isEmptyObject,
  validatorNumbe,
  sldComLanguage,
  sldtbaleOpeBtnText,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import SldModal from '@/components/SldModal/SldModal';
import SldPreviewImg from '@/components/SldPreviewImg/SldPreviewImg';

let sthis = '';
@connect(({ product }) => ({
  product,
}))
@Form.create()
export default class Cate_lists extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      modal_width: 300,//图片预览宽度
      show_preview_modal: false,//预览图片modal框是否展示
      preview_img: '',//预览图片
      preview_alt_con: '',//预览图片内容
      expandedRowKeys: [],//展开的行
      show_table_modal_add: false,//是否显示input后缀搜索modal上的新增按钮，默认不显示
      modalSldAddVisible: false,//是否显示input后缀add的modal框，默认不显示
      tablesldSAddTitle: `${sldComLanguage('添加')}`,//input后缀add的modal框的标题   添加
      search_add_modal_width: 500,//input后缀add的modal框的宽度
      cur_type: '',//show_list表示表格搜索，add表示添加数据
      cur_operate_type: '',//当前操作对象
      search_modal_width: 600,//默认搜索，modal宽度
      tableTitle: '',
      data: {},
      formValues: {},
      modalTableVisible: false,//选择商品类型弹框
      submiting: false,//按钮loading
      loading: false,//按钮loading
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      modalVisible: false,
      modalVisibleAdv: false,//多图选择器是否显示，默认不显示
      cur_data: {},//多图选择器的数据
      origion_data: {
        width: 520,
        height: 210,
        admin_show_width: 260,
        admin_show_height: 105,
        data: [{
          imgPath: '',
          imgUrl: '',
          info: {},
          link_type: '',
          link_value: '',
          title: '',
        }, {
          imgPath: '',
          imgUrl: '',
          info: {},
          link_type: '',
          link_value: '',
          title: '',
        }, {
          imgPath: '',
          imgUrl: '',
          info: {},
          link_type: '',
          link_value: '',
          title: '',
        }],
      },//多图选择器的数据
      modalTitle: '设置分类广告',//多图选择器标题
      title: `${sldComLanguage('新增商品分类')}`,
      type: 'add',//'add'新增  'edit'编辑
      params: {},//搜索条件
      curData: {},//编辑的数据
      addData: [{
        type: 'input',
        label: `${sldComLanguage('分类名称')}`,
        name: 'categoryName',
        placeholder: `${sldComLanguage('请输入分类名称')}`,
        initialValue: '',
        maxLength:20,
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入分类名称')}`,
        }],
      }, {
        type: 'inputnum',
        label: `${sldComLanguage('排序')}`,
        name: 'sort',
        extra: `${sldComLanguage('请输入0~255的数字,值越小,显示越靠前')}`,
        placeholder: `${sldComLanguage('请输入排序')}`,
        initialValue: '',
        rules: [{
          required: true,
          message: `${sldComLanguage('请输入排序')}`,
        }, { validator: (rule, value, callback) => validatorNumbe(rule, value, callback) }],
      }],//modal框的数据
      sele_cat_info: {},//添加/编辑的时候选择的分类信息
      columns: [
        {
          title: `${sldComLanguage('分类名称')}`,
          align: 'left',
          dataIndex: 'categoryName',
          width: 300,
        },
        {
          title: `${sldComLanguage('排序')}`,
          dataIndex: 'sort',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('创建时间')}`,
          dataIndex: 'createTime',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('更新时间')}`,//更新时间
          dataIndex: 'updateTime',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('操作')}`,
          align: 'center',
          width: 100,
          render: (text, record) => (
            <Fragment>
              {sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, () => this.editCat(record))}
              {/*删除后不可恢复，是否确定删除？*/}
              {record.children == undefined &&
              <Fragment>
                <span className={global.splitLine}></span>
                {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operateCat(record.categoryId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                  sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
              </Fragment>
              }
              {record.grade <= 2 &&
              <Fragment>
                <span className={global.splitLine}></span>
                {sldtbaleOpeBtnText(`${sldComLanguage('添加下级分类')}`, () => this.addNextCat(record))}
              </Fragment>
              }
            </Fragment>
          ),
        },
      ],
    };
  }

  cat_data = {
    type: 'TreeSelectDIy',
    label: `${sldComLanguage('上级分类')}`,
    name: 'pid',
    placeholder: `${sldComLanguage('请选择上级分类')}`,
    initialValue: '',
    help: `${sldComLanguage('默认为最顶级')}`,
    disabled: false,
    data: [],
    sele_key: 'categoryId',
    sele_name: 'categoryName',
    allowClear: true,
    onSelect: (value, node, extra) => this.sldHandleSelCat(value, node, extra),
  };

  componentDidMount() {
    this.get_list({ pid: 0 });//grade为1表示获取一级数据
  }

  componentWillUnmount() {

  }

  //获取数据列表
  get_list = (params, grade = '') => {
    const { dispatch } = this.props;
    let { data, expandedRowKeys } = this.state;
    dispatch({
      type: 'product/get_cate_list_by_id',
      payload: params,
      callback: (res) => {
        //grade为1直接赋值
        if (grade != '') {
          for (let i in data.list) {
            if (grade == 1) {
              if (data.list[i].categoryId == params.pid) {
                data.list[i].children = res.data;
                break;
              }
            } else {
              if (data.list[i].children != undefined) {
                for (let j in data.list[i].children) {
                  if (data.list[i].children[j].categoryId == params.pid) {
                    data.list[i].children[j].children = res.data;
                    break;
                  }
                }
              }
            }
          }
        } else {
          data.list = res.data;
        }
        this.setState({
          data: data,
          expandedRowKeys: grade == '' ? [] : expandedRowKeys,
        });
      },
    });
  };

  //显示modal弹框_弹框专属
  showAllUnit = (val) => {
    let { tableTitle, search_modal_width } = this.state;
    if (val == 'search_goods_type') {
      tableTitle = `${sldComLanguage('请选择商品类型')}`;
      search_modal_width = 800;
    }
    this.setState({
      modalTableVisible: true,
      cur_operate_type: val,
      cur_type: 'show_list',
      tableTitle: tableTitle,
      search_modal_width: search_modal_width,
    });
  };

  //选择分类事件
  sldHandleSelCat = (value, node, extra) => {
    let { addData } = this.state;
    let tmp_info = node.props.extra;
    this.setState({
      sele_cat_info: tmp_info,
      addData,
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
      this.setState({
        params: params,
      });
      this.get_list(params);
    }
  };

  //新增功能
  addCat = () => {
    let { addData } = this.state;
    addData = addData.filter(item => item.name != 'category3Image' && item.name != 'pid');
    for (let i = 0; i < addData.length; i++) {
      if (addData[i].name == 'categoryName') {
        addData.splice(i + 1, 0, this.cat_data);
      }
      addData[i].initialValue = '';
    }
    this.setState({
      modalVisible: true,
      type: 'add',
      title: `${sldComLanguage('添加商品分类')}`,
      addData,
      sele_cat_info: {},
    });//添加商品分类
  };

  //添加下级功能
  addNextCat = (val) => {
    let { addData } = this.state;
    addData = addData.filter(item => item.name != 'pid' && item.name != 'category3Image');
    for (let i = 0; i < addData.length; i++) {
      if (addData[i].name == 'categoryName') {
        addData.splice(i + 1, 0, this.cat_data);
        addData[i].initialValue = '';
      } else {
        if (addData[i].name == 'pid') {
          addData[i].initialValue = val.categoryName;
          addData[i].disabled = true;
        } else {
          addData[i].initialValue = '';
        }
      }
    }
    this.setState({
      modalVisible: true,
      type: 'add',
      title: `${sldComLanguage('添加下级分类')}`,
      addData,
      sele_cat_info: val,
    });//添加下级分类
  };


  //编辑商品分类
  editCat = (val) => {
    let { addData } = this.state;
    addData = addData.filter(item => item.name != 'pid' && item.name != 'category3Image');
    for (let i = 0; i < addData.length; i++) {
      addData[i].initialValue = val[addData[i].name];
    }
    this.setState({
      type: 'edit',
      title: `${sldComLanguage('编辑商品分类')}`,
      addData: addData,
      modalVisible: true,
      curData: val,
      sele_cat_info: { grade: val.grade },
    });
  };

  //分类操作事件 type add:添加 edit:编辑 del:删除  adv:设置一级分类的广告
  operateCat = (id, type) => {
    let params = {};
    const { dispatch } = this.props;
    let dis_type = '';
    if (type == 'add') {
      dis_type = 'product/add_goods_cat';
      params = id;
    } else if (type == 'edit') {
      dis_type = 'product/edit_goods_cat';
      params = id;
    } else if (type == 'del') {
      dis_type = 'product/del_goods_cat';
      params.categoryId = id;
    } else if (type == 'adv') {
      dis_type = 'product/edit_goods_cat_adv';
      params = id;
    }
    this.setState({ submiting: true });
    dispatch({
      type: dis_type,
      payload: params,
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_list({ id: 0 });
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
    const { curData, type, sele_cat_info, addData } = this.state;
    let sld_params = {};
    sld_params.categoryName = val.categoryName;
    sld_params.sort = val.sort;
    //三级分类图片
    for (let i in addData) {
      if (addData[i].name == 'category3Image') {
        if (addData[i].img_succ_info.path != undefined) {
          sld_params.categoryImage = addData[i].img_succ_info.path;
        } else {
          failTip(`${sldComLanguage('请上传图片')}`);
          return false;
        }
      }
    }
    if (type == 'edit') {
      sld_params.categoryId = curData.categoryId;
      this.operateCat(sld_params, 'edit');
    } else {
      sld_params.grade = isEmptyObject(sele_cat_info) ? 1 : sele_cat_info.grade * 1 + 1;
      sld_params.state = 1;
      sld_params.pid = isEmptyObject(sele_cat_info) ? 0 : sele_cat_info.categoryId;//父分类id,一级分类==0
      this.operateCat(sld_params, 'add');
    }
  };

  sldHandleCancle = () => {
    this.setState({ modalVisible: false, modalVisibleAdv: false });
  };


  //表格拖动
  resizeTable = (index, size, type, data) => {
    let datas = dragSldTableColumn(index, size, data);
    this.setState({ [type]: datas });
  };

  onExpand = (expanded, record) => {
    let { expandedRowKeys } = this.state;
    if (expanded) {
      expandedRowKeys.push(record.categoryId);
      this.get_list({ pid: record.categoryId }, record.grade);
    } else {
      expandedRowKeys = expandedRowKeys.filter(item => item != record.categoryId);
    }
    this.setState({ expandedRowKeys });
  };

  sldHandleConfirmAdv = (val) => {
    const { curData } = this.state;
    this.operateCat({ cateId: curData.categoryId, categoryData: JSON.stringify(val) }, 'adv');
  };

  render() {
    const { selectedRows, modalVisible, title, addData, columns, submiting, data, loading, expandedRowKeys, preview_img, show_preview_modal, modal_width, preview_alt_con } = this.state;
    return (
      <div className={global.common_page}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('分类管理')}`, 0, 0, 10)}
        <Spin spinning={loading}>
          { /*公共功能条-start*/}
          <div className={global.operate_bg}>
            {sldIconBtn(() => this.addCat(), `${sldComLanguage('新增分类')}`, 7, 0)}
          </div>
          { /*公共功能条-end*/}
          { /*标准表格-start*/}
          <StandardTable
            expandedRowKeys={expandedRowKeys}
            selectedRows={selectedRows}
            data={data}
            rowKey={'categoryId'}
            isCheck={false}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'main')}
            sldpagination={false}
            resizeTable={(index, size) => this.resizeTable(index, size, 'columns', columns)}
            isColumnResize={true}
            onExpand={this.onExpand}
          />
          { /*标准表格-end*/}
          { /*新增/编辑对话框-start*/}
          <SldModal
            zIndex={1}
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
          {/*图片预览-start*/}
          <SldPreviewImg img={preview_img} show_preview_modal={show_preview_modal} modal_width={modal_width}
                         preview_alt_con={preview_alt_con} closePreviewModal={() => this.viewImg(false)}/>
          {/*图片预览-end*/}
        </Spin>
      </div>
    );
  }
}
