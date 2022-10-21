import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Form, Spin, Modal,
} from 'antd';
import {
  failTip,
  list_com_page_size_10,
  isEmptyObject,
  getTableNum,
  sldComLanguage,
  sldHandlePaginationData,
  dragSldTableColumn,
  getSldComImg,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import Search from '@/components/Search/Search';

let pageSize = list_com_page_size_10;
let sthis = '';
@connect(({ pc_home, project }) => ({
  pc_home,
  project,
}))
@Form.create()
export default class SldSelGoodsSingleDiy extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      modalTableSeleData: {},
      expandedRowKeys: [],
      link_type: props.link_type,//链接类型，goods
      modalVisible: false,//是否展示modal框
      width: 900,//modal框宽带
      modaltitle: `${sldComLanguage('选择器')}`,
      params: { pageSize: pageSize },//搜索条件
      search_data: [{
        type: 'input',
        label: `${sldComLanguage('商品名称')}`,
        name: 'goodsName',
        placeholder: `${sldComLanguage('请输入商品名称')}`,
      }],//筛选器
      loading: false,
      data: {},//表格的数据
      selectedRows: [],
      selectedRowKeys: [],
      columns: [],
      sldpagination: true,//是否展示分页
    };

  }

  init_flag = true;

  goods_columns = [
    {
      title: ' ',
      dataIndex: 'goodsId',
      align: 'center',
      width: 55,
      render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
    },
    {
      title: `${sldComLanguage('商品图片')}`,
      dataIndex: 'mainImage',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return getSldComImg(text,200,200,35,35);
      },
    },
    {
      title: `${sldComLanguage('商品名称')}`,
      dataIndex: 'goodsName',
      align: 'center',
      width: 200,
    },
    {
      title: `${sldComLanguage('商品价格(元)')}`,
      dataIndex: 'goodsPrice',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('销量')}`,//销量
      dataIndex: 'actualSales',
      align: 'center',
      width: 100,
    },
  ];

  voucher_columns = [
    {
      title: ' ',
      dataIndex: 'couponId',
      align: 'center',
      width: 55,
      render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
    },
    {
      title: `${sldComLanguage('优惠券名称')}`,//优惠券名称
      dataIndex: 'couponName',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('优惠券类型')}`,//优惠券类型
      dataIndex: 'couponTypeValue',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('优惠券内容')}`,//优惠券内容
      dataIndex: 'couponContent',
      align: 'center',
      width: 150,
    },
    {
      title: `${sldComLanguage('未领取数量')}`,//未领取数量
      dataIndex: 'remainNum',
      align: 'center',
      width: 100,
      // render: (text, record, index) => record.publishNum * 1 - record.receivedNum * 1,
    },
  ];

  cat_columns = [
    {
      title: `${sldComLanguage('分类名称')}`,
      align: 'left',
      dataIndex: 'categoryName',
      width: 250,
    },
  ];

  topic_columns_mobile = [
    {
      title: ' ',
      dataIndex: 'decoId',
      align: 'center',
      width: 30,
      render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
    }, {
      title: `${sldComLanguage('专题名称')}`,
      align: 'center',
      dataIndex: 'name',
      width: 200,
    }, {
      title: `${sldComLanguage('创建时间')}`,
      align: 'center',
      dataIndex: 'createTime',
      width: 150,
    },
    {
      title: `${sldComLanguage('修改时间')}`,
      dataIndex: 'updateTime',
      align: 'center',
      width: 150,
    },
  ];

  topic_columns_pc = [
    {
      title: ' ',
      dataIndex: 'decoId',
      align: 'center',
      width: 30,
      render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
    }, {
      title: `${sldComLanguage('专题名称')}`,
      align: 'center',
      dataIndex: 'decoName',
      width: 200,
    }, {
      title: `${sldComLanguage('创建时间')}`,
      align: 'center',
      dataIndex: 'createTime',
      width: 150,
    },
    {
      title: `${sldComLanguage('修改时间')}`,
      dataIndex: 'updateTime',
      align: 'center',
      width: 150,
    },
  ];

  rowKey = '';//table 行唯一标识

  componentDidMount() {
    if (this.props.link_type != '') {
      this.get_list({ pageSize: pageSize });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let { columns, modaltitle, search_data, sldpagination } = this.state;
    if (nextProps.link_type == 'goods' || nextProps.link_type == 'category' || nextProps.link_type == 'topic' || nextProps.link_type == 'voucher') {
      if (nextProps.link_type == 'goods') {
        columns = this.goods_columns;
        modaltitle = `${sldComLanguage('选择商品')}`;
        search_data = [{
          type: 'input',
          label: `${sldComLanguage('商品名称')}`,
          name: 'goodsName',
          placeholder: `${sldComLanguage('请输入商品名称')}`,
        }];//筛选器
        sldpagination = true;
        this.rowKey = 'goodsId';
      } else if (nextProps.link_type == 'category') {
        columns = this.cat_columns;
        modaltitle = `${sldComLanguage('选择分类')}`;
        search_data = [];
        sldpagination = false;
        this.rowKey = 'categoryId';
      } else if (nextProps.link_type == 'topic') {
        if (nextProps.client == 'mobile') {
          //移动端装修
          columns = this.topic_columns_mobile;
          search_data = [{
            type: 'input',
            label: `${sldComLanguage('专题名称')}`,
            name: 'name',
            placeholder: `${sldComLanguage('请输入专题名称')}`,
          }];//筛选器
        } else {
          //PC装修
          columns = this.topic_columns_pc;
          search_data = [{
            type: 'input',
            label: `${sldComLanguage('专题名称')}`,
            name: 'decoName',
            placeholder: `${sldComLanguage('请输入专题名称')}`,
          }];//筛选器
        }
        modaltitle = `${sldComLanguage('请选择专题')}`;
        sldpagination = true;
        this.rowKey = 'decoId';

      } else if (nextProps.link_type == 'voucher') {
        columns = this.voucher_columns;
        modaltitle = `${sldComLanguage('选择优惠券')}`;//选择优惠券
        search_data = [{
          type: 'input',
          label: `${sldComLanguage('优惠券名称')}`,//优惠券名称
          name: 'couponName',
          placeholder: `${sldComLanguage('请输入优惠券名称')}`,//请输入优惠券名称
        }];//筛选器
        sldpagination = true;
        this.rowKey = 'couponId';
      }
      this.setState({
        search_data,
        link_type: nextProps.link_type,
        modalVisible: true,
        columns,
        modaltitle,
        sldpagination,
      }, () => {
        let param = { pageSize: pageSize };
        if (nextProps.link_type == 'category') {
          param.categoryId = 0;
        }
        sthis.get_list(param);
      });
    }
  }

  componentWillUnmount() {

  }

  //获取数据列表
  get_list = (params, grade = '') => {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    let { link_type, data, expandedRowKeys } = this.state;
    let dis_type = '';
    let new_params = { ...params };
    if (link_type == 'goods') {
      //获取商品数据
      dis_type = 'project/get_goods_lists';
      new_params.state = 3;//在售状态
      if(this.props.params!=undefined){
        new_params = {...new_params,...this.props.params}
      }
    } else if (link_type == 'category') {
      //获取分类数据
      dis_type = 'project/get_cate_list_by_id';
      new_params = params;
    } else if (link_type == 'voucher') {
      //获取优惠券数据
      dis_type = 'project/get_voucher_list';
      new_params = params;
    } else if (link_type == 'topic') {
      if (this.props.client != undefined && this.props.client == 'mobile') {
        //移动端专题
        dis_type = 'project/get_diy_page_lists';
        new_params.type = 'topic';
      } else {
        //获取PC专题列表，启用状态
        dis_type = 'project/get_pc_diy_page_list';
        new_params.decoType = 'topic';
        new_params.isEnable = 1;//只获取启用状态
      }

    }
    dispatch({
      type: dis_type,
      payload: new_params,
      callback: (res) => {
        this.setState({ loading: false });
        if (res.state == 200) {
          if (link_type == 'goods' || link_type == 'topic' || link_type == 'voucher') {
            data = res.data;
          } else if (link_type == 'category') {
            //id为0直接赋值
            if (grade != '') {
              for (let i in data.list) {
                if (grade == 1) {
                  if (data.list[i].categoryId == params.categoryId) {
                    data.list[i].children = res.data.list;
                    break;
                  }
                } else {
                  if (data.list[i].children != undefined) {
                    for (let j in data.list[i].children) {
                      if (data.list[i].children[j].categoryId == params.categoryId) {
                        data.list[i].children[j].children = res.data.list;
                        break;
                      }
                    }
                  }
                }
              }
            } else {
              data.list = res.data.list;
            }
          }
          this.setState({
            data,
            expandedRowKeys: grade == '' ? [] : expandedRowKeys,
          });
        }
      },
    });
  };

  handleSelectRows = (rows, rowkeys) => {
    //针对翻页无法保存选择的行数据处理
    let { selectedRows, selectedRowKeys } = this.state;
    let pre_sele_rows_keyarray = [];
    for (let i in selectedRows) {
      pre_sele_rows_keyarray.push(selectedRows[i][this.rowKey]);
    }
    //去掉的话要删掉行数据
    for (let i in selectedRowKeys) {
      if (rowkeys.indexOf(selectedRowKeys[i]) == -1) {
        selectedRows = selectedRows.filter(item => item[this.rowKey] != selectedRowKeys[i]);
      }
    }
    //没有的话追加行数据
    for (let i in rowkeys) {
      if (pre_sele_rows_keyarray.indexOf(rowkeys[i]) == -1) {
        let cur_row = rows.filter(item => item[this.rowKey] == rowkeys[i])[0];
        selectedRows.push(cur_row);
      }
    }
    this.setState({
      selectedRows: selectedRows,
      selectedRowKeys: rowkeys,
    });
  };

  //搜索事件
  search = (data) => {
    this.setState({
      formValues: data,
      params: { pageSize: pageSize }
    });
    this.get_list({ pageSize: pageSize, ...data });
  };
  //搜索重置事件
  seaReset = () => {
    //搜索条件置为空
    this.setState({
      formValues: {},
      selectedKeys: [' '],
      params: { pageSize: pageSize }
    });
    this.get_list({ pageSize: pageSize });
  };

  sldConfirm = () => {
    let { modalTableSeleData } = this.state;
    if (!isEmptyObject(modalTableSeleData)) {
      let temp = JSON.parse(JSON.stringify(modalTableSeleData));
      this.setState({
        modalVisible: false,
        link_type: '',
        params: { pageSize: pageSize },
        modalTableSeleData: {},//清空选择的数据
      });
      this.props.seleSku(temp);
    } else {
      failTip(`${sldComLanguage('请选择数据')}`);
    }
  };

  //关闭modal之后重置数据
  closeReset = () => {
    this.init_flag = true;
  };

  //取消事件
  sldCancle = () => {
    this.props.sldHandleCancle();
    this.setState({
      modalVisible: false,
      link_type: '',
      params: { pageSize: pageSize },
      modalTableSeleData: {},//清空选中的数据
    });
  };

  //选中单行的操作
  onSldHandleSeleRow = (record) => {
    let { modalTableSeleData, link_type } = this.state;
    modalTableSeleData = {};
    //剔除无用数据
    if (link_type == 'goods') {
      modalTableSeleData.goodsId = record.goodsId;
      modalTableSeleData.goodsName = record.goodsName;
      modalTableSeleData.goodsPrice = record.goodsPrice;
      modalTableSeleData.actualSales = record.actualSales;
      modalTableSeleData.mainImgUrl = record.mainImage;
      modalTableSeleData.defaultProductId = record.productId;
    } else if (link_type == 'topic') {
      if (this.props.client == 'mobile') {
        modalTableSeleData.id = record.decoId;
        modalTableSeleData.name = record.name;
      } else {
        modalTableSeleData.decoId = record.decoId;
        modalTableSeleData.decoName = record.decoName;
      }
    } else if (link_type == 'category') {
      modalTableSeleData.categoryId = record.categoryId;
      modalTableSeleData.categoryName = record.categoryName;
      modalTableSeleData.grade = record.grade;
      modalTableSeleData.pid = record.pid;
    } else if (link_type == 'voucher') {
      modalTableSeleData.couponId = record.couponId;
      modalTableSeleData.couponName = record.couponName;
    }
    this.setState({
      modalTableSeleData,
    });
  };

  onExpand = (expanded, record) => {
    let { expandedRowKeys } = this.state;
    if (expanded) {
      expandedRowKeys.push(record.categoryId);
      this.get_list({ categoryId: record.categoryId }, record.grade);
    } else {
      expandedRowKeys = expandedRowKeys.filter(item => item != record.categoryId);
    }
    this.setState({ expandedRowKeys });
  };

  //表格列拖动
  resizeTable = (index, size, type, data) => {
    let datas = dragSldTableColumn(index, size, data);
    this.setState({ [type]: datas });
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


  render() {
    const { link_type } = this.props;
    const { modalVisible, modaltitle, width, data, columns, search_data, loading, sldpagination, expandedRowKeys } = this.state;
    return (
      <Modal destroyOnClose={true}
             onOk={this.sldConfirm}
             afterClose={this.closeReset}
             onCancel={this.sldCancle} visible={modalVisible} width={width} title={modaltitle}>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className={global.common_page} style={{ flex: 1 }}>
            {link_type != 'category' &&
            <div className={global.tableListForm}>
              <div style={{ position: 'relative' }}>
                <Search search_data={search_data} top={0} seaSubmit={(data) => this.search(data)}
                        seaReset={() => this.seaReset()}/>
              </div>
            </div>
            }
            <Scrollbars autoHeight
                        autoHeightMin={50}
                        autoHeightMax={document.body.clientHeight - 300}>
              <Spin spinning={loading}>
                {/*标准表格-start*/}
                <StandardTable
                  expandedRowKeys={expandedRowKeys}
                  selectedRows={[]}
                  selectedRowKeys={[]}
                  data={data}
                  rowKey={this.rowKey}
                  isCheck={false}
                  columns={columns}
                  onSldHandleSeleRow={this.onSldHandleSeleRow}
                  onSelectRow={this.handleSelectRows}
                  flag_show_sele_data={true}
                  sldpagination={sldpagination}
                  onExpand={this.onExpand}
                  onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'main')}
                  resizeTable={(index, size) => this.resizeTable(index, size, 'columns', columns)}
                  isColumnResize={true}
                />
                {/*标准表格-end*/}
              </Spin>
            </Scrollbars>
          </div>
        </div>
      </Modal>
    );
  }
}
