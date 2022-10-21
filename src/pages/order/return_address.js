import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin, Switch } from 'antd';
import {
  sldIconBtn,
  failTip,
  sucTip,
  getSldEmptyH,
  list_com_page_size_10,
  dragSldTableColumn,
  sldHandlePaginationData,
  formItemLayoutModal,
  getTableNum,
  sldComLanguage,
  getSldCopyData,
  sldtbaleOpeBtnText,
  sldPopConfirmDiy,
  mobile_reg,
  showMoreHelpTip,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import SldModal from '@/components/SldModal/SldModal';
import Search from '@/components/Search/Search';
import areaData from '@/assets/area.json';
let pageSize = list_com_page_size_10;
@connect(({ order, common }) => ({
  order,
  common,
}))
@Form.create()
export default class ReturnAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: false,
      submiting: false,
      data: {},//列表数据
      selectedRows: [],
      selectedRowKeys: [],//selectedRows的key
      title: '',
      addressType: props.type,//地址类型：1-发货地址；2-收货地址
      type: 'add',
      params: { pageSize: pageSize },//搜索条件
      upload_img_info: {},//上传的图片信息
      operateData: [],//操作的数据
      addData: [{
        type: 'input',
        label: `${sldComLanguage('联系人')}`,
        name: 'contactName',
        placeholder: `${sldComLanguage('请输入联系人')}`,
        extra: `${sldComLanguage('最多输入6个字')}`,
        initialValue: '',
        maxLength:6,
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入联系人')}`,
        }],
      }, {
        type: 'input',
        label: `${sldComLanguage('手机号')}`,
        name: 'telphone',
        placeholder: `${sldComLanguage('请输入手机号')}`,
        initialValue: '',
        rules: [{
          required: true,
          message: `${sldComLanguage('请输入手机号')}`,
        }, {
          pattern: mobile_reg,
          message: `${sldComLanguage('请输入正确的手机号')}`,
        }],
      }, {
        type: 'cascader_common',
        label: props.type == 1 ? `${sldComLanguage('发货地址')}` : `${sldComLanguage('退货地址')}`,
        name: 'area',
        data: areaData,//三级地址
        fieldNames: { label: 'regionName', value: 'regionCode', children: 'children' },
        placeholder: `${sldComLanguage('请选择')}${props.type == 1 ? sldComLanguage('发货地址') : sldComLanguage('退货地址')}`,//请选择退货地址
        initialValue: [],
        onChange: this.getAreaInfo,
        rules: [{
          required: true,
          message: `${sldComLanguage('请选择')}${props.type == 1 ? sldComLanguage('发货地址') : sldComLanguage('退货地址')}`,//请选择退货地址
        }],
      },
        {
          type: 'textarea',
          label: `${sldComLanguage('详细地址')}`,
          name: 'address',
          placeholder: `${sldComLanguage('请输入详细地址')}`,
          extra: `${sldComLanguage('最多40个字')}`,
          initialValue: '',
          maxLength:40,
          rules: [{
            required: true,
            whitespace: true,
            message: `${sldComLanguage('请输入详细地址')}`,
          }],
        },
        {
          type: 'switch',
          label: `${sldComLanguage('设为默认地址')}`,
          name: 'isDefault',
          placeholder: ``,
          initialValue: 1,
        },
      ],//modal框的数据
      formValues: {},//搜索条件、
      columns: [
        {
          title: ' ',
          dataIndex: 'addressId',
          align: 'center',
          width: 55,
          render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
        },
        {
          title: `${sldComLanguage('联系人')}`,
          dataIndex: 'contactName',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('手机号')}`,
          dataIndex: 'telphone',
          align: 'center',
          width: 150,
        },
        {
          title: props.type == 1 ? `${sldComLanguage('发货地址')}` : `${sldComLanguage('退货地址')}`,
          dataIndex: 'address',
          align: 'center',
          width: 200,
        },
        {
          title: `${sldComLanguage('设为默认')}`,
          dataIndex: 'isDefault',
          align: 'center',
          width: 80,
          render: (text, record) => (
            <Switch
              onChange={(checked) => this.operateAddress({
                addressId: record.addressId,
                isDefault: checked ? 1 : 0,
              }, 'set_default')}
              checked={text == 1 ? true : false}
              valuepropname={'checked'}/>
          ),
        },
        {
          title: `${sldComLanguage('操作')}`,
          width: 100,
          align: 'center',
          render: (text, record) => (
            <Fragment>
              {sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, () => this.editAddress(record))}
              <span className={global.splitLine}></span>
              {/*删除后不可恢复，是否确定删除？*/}
              {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operateAddress(record.addressId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
            </Fragment>
          ),
        },
      ],
      search_data: [{
        type: 'input',
        label: `${sldComLanguage('联系人')}`,
        name: 'contactName',
        placeholder: `${sldComLanguage('请输入联系人')}`,
      }, {
        type: 'input',
        label: `${sldComLanguage('手机号')}`,
        name: 'telphone',
        placeholder: `${sldComLanguage('请输入手机号')}`,
      }],
    };
  }

  cur_edit_id = '';//当前操作数据id
  sel_area_name = '';//选择的地区名称
  componentDidMount() {
    this.get_list({ pageSize: pageSize });
  }

  //编辑退货地址
  editAddress = (val) => {
    let { addData, operateData, addressType } = this.state;
    operateData = getSldCopyData(addData);
    for (let i in operateData) {
      if (operateData[i].name == 'area') {
        let tmp_area_code = [];
        let tmp_key = ['provinceCode', 'cityCode', 'areaCode'];
        for (let i in tmp_key) {
          if (tmp_key[i] != undefined && tmp_key[i]) {
            tmp_area_code.push(val[tmp_key[i]]);
          }
        }
        operateData[i].initialValue = tmp_area_code;
      } else {
        operateData[i].initialValue = val[operateData[i].name];
      }
    }
    this.cur_edit_id = val.addressId;//当前操作数据id
    this.sel_area_name = val.areaInfo;
    this.setState({
      type: 'edit',
      title: `${sldComLanguage('编辑')}${addressType == 1 ? sldComLanguage('发货') : sldComLanguage('退货')}${sldComLanguage('地址')}`,
      operateData,
      modalVisible: true,
    });//编辑退货地址
  };

  //退货地址操作  del：删除 edit：编辑 set_default：设置默认地址
  operateAddress = (id, type) => {
    const { params,formValues } = this.state;
    const { dispatch } = this.props;
    let dis_type = '';
    let param_data = {};
    if (type == 'del') {
      dis_type = 'order/del_return_address';
      param_data.addressId = id;
    } else if (type == 'edit') {
      dis_type = 'order/edit_return_address';
      param_data = id;
    } else if (type == 'set_default') {
      dis_type = 'order/set_return_address_default';
      param_data = id;
    }
    dispatch({
      type: dis_type,
      payload: param_data,
      callback: (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.sel_area_name = '';//清空选择的地区名称
          this.get_list({...params,...formValues});
          this.setState({ modalVisible: false });
        } else {
          failTip(res.msg);
        }
        this.setState({ submiting: false });
      },
    });
  };

  //添加退货地址
  addAddress = () => {
    let { addData, operateData, addressType } = this.state;
    operateData = getSldCopyData(addData);
    this.setState({
      modalVisible: true,
      type: 'add',
      title: `${sldComLanguage('添加')}${addressType == 1 ? sldComLanguage('发货') : sldComLanguage('退货')}${sldComLanguage('地址')}`,
      operateData,
    });//添加退货地址
  };

  //获取数据列表
  get_list = (params) => {
    this.setState({ initLoading: true });
    const { dispatch } = this.props;
    const { addressType } = this.state;
    dispatch({
      type: 'order/get_return_address_lists',
      payload: { ...params, type: addressType },
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

  //获取地址信息
  getAreaInfo = (area) => {
    this.sel_area_name = '';
    for (let i in area) {
      this.sel_area_name += area[i].regionName;
    }
  };

  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  sldHandleConfirm = (val) => {
    const { addressType, type } = this.state;
    const { dispatch } = this.props;
    let _this = this;
    if (val.area) {
      val.provinceCode = val.area[0] != undefined ? val.area[0] : '';
      val.cityCode = val.area[1] != undefined ? val.area[1] : '';
      val.areaCode = val.area[2] != undefined ? val.area[2] : '';
      delete val.area;
    }
    val.areaInfo = this.sel_area_name;
    val.isDefault = val.isDefault ? 1 : 0;
    this.setState({ submiting: true });
    if (type == 'edit') {
      val.addressId = this.cur_edit_id;
      this.operateAddress(val, 'edit');
    } else {
      val.type = addressType;
      dispatch({
        type: 'order/add_return_address',
        payload: val,
        callback: (res) => {
          if (res.state == 200) {
            sucTip(res.msg);
            this.sel_area_name = '';//清空选择的地区名称
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

  //搜索事件
  search = (data) => {
    const values = { ...data };
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

  render() {
    const { selectedRows, search_data, columns, initLoading, data, submiting, operateData, modalVisible, title, addressType } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1, padding: 0 }}>
        {showMoreHelpTip(``, [`${sldComLanguage('发货地址取下面的默认地址')}`])}
        <div className={global.tableListForm}>
          <Search search_data={search_data}
                  seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}
          />
        </div>
        {/*公共功能条-start*/}
        <div className={global.operate_bg}>
          {sldIconBtn(() => this.addAddress(), `${sldComLanguage('添加')}${addressType == 1 ? sldComLanguage('发货') : sldComLanguage('退货') }${sldComLanguage('地址')}`, 7, 7)}
        </div>
        <Spin spinning={initLoading}>
          {/*标准表格-start*/}
          <StandardTable
            selectedRows={selectedRows}
            data={data}
            rowKey={'addressId'}
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
          width={500}
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
