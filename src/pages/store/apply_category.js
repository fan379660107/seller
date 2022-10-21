import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin } from 'antd';
import {
	sldIconBtn, failTip, sucTip, sldSearch, list_com_page_size_10, dragSldTableColumn, sldHandlePaginationData, getTableNum, sldComLanguage, sldPopConfirmDiy, sldtbaleOpeBtnText,formItemLayoutModal
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import Search from '@/components/Search/Search';
import SldModal from '@/components/SldModal/SldModal';

let pageSize = list_com_page_size_10;
@connect(({ express,common,project }) => ({
  express,
  common,
  project,
}))
@Form.create()
export default class apply_category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initLoading: false,
      modalVisible: false,
			submiting: false,
			data: {},//列表数据
			selectedRows: [],
			selectedRowKeys: [],//selectedRows的key
			title: '',
			type: 'add',//'add'新增  'edit'编辑
			params: { pageSize: pageSize },//搜索条件
			upload_img_info: {},//上传的图片信息
			operateData: [],//操作的数据
			formValues: {},//搜索条件、
      select_cat:[{
        width:350,
        type: 'select_cat',
        label: `${sldComLanguage('经营类型')}`,
        name: 'goodsCategoryIds',
        item_height: 300,
        placeholder: `${sldComLanguage('请选择开店时长')}`,
        tree_data: [],
        selected_keys:[],//选择的key数组
        onCheck:this.handleCatCheck,
        required: true,
      }],//选择经营类目
			columns: [
				{
					title: ' ',
					dataIndex: 'bindId',
					align: 'center',
					width: 55,
					render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
				},
				{
					title: `${sldComLanguage('分类信息')}`,
					dataIndex: 'goodsCateName',
					align: 'center',
					width: 150,
				},
        {
          title: `${sldComLanguage('分佣比例')}`,
          dataIndex: 'scaling',
          align: 'center',
          width: 80,
        },
        {
          title: `${sldComLanguage('状态')}`,
          dataIndex: 'stateValue',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('拒绝理由')}`,
          dataIndex: 'refuseReason',
          align: 'center',
          width: 100,
        },
				{
					title: `${sldComLanguage('操作')}`,
					width: 100,
					align: 'center',
					render: (text, record) => (
						<Fragment>
              {/*删除后不可恢复，是否确定删除？*/}
              {record.state == 2
                ?'--'
                :sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operate(record.bindId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
						</Fragment>
					),
				},
			],
			search_data: [{
        type: 'select',
        label: `${sldComLanguage('申请状态')}`,
        name: 'state',
        placeholder: `${sldComLanguage('请选择申请状态')}`,
        sel_data: [
          { key: '', name: `${sldComLanguage('全部')}` },
          { key: '1', name: `${sldComLanguage('待审核')}` },
          { key: '2', name: `${sldComLanguage('审核通过')}` },
          { key: '3', name: `${sldComLanguage('审核失败')}` },
        ],
      }],
		};
	}

	cur_edit_id = '';//当前操作数据id
  select_cat_id = [];//选择的分类id数组，格式：1级-2级-3级

	componentDidMount() {
		this.get_list({ pageSize: pageSize });
    this.getSystemCat()
	}

  //选择分类事件
  handleCatCheck = (checkedKeys, e) => {
    let {select_cat} = this.state;
    this.select_cat_id = [];
    if(e.checkedNodes.length>0){
      e.checkedNodes.map(item_one=>{
        if(item_one.props.grade == 3){
          let tmp_data = item_one.props.path.split('/');
          this.select_cat_id.push(`${tmp_data[1]}-${tmp_data[2]}-${item_one.props.categoryId}`);
        }
      })
    }
    select_cat[0].selected_keys = checkedKeys;
    this.setState({select_cat})
  };

  //获取平台分类
  getSystemCat = () => {
    let {select_cat} = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'project/get_system_cat_tree_grade3',
      callback: (res) => {
        if(res.state == 200){
          if (res.data.length > 0) {
            res.data.map(item => {
              item.key = item.categoryId;
              item.title = item.categoryName;
              if (item.children != null&&item.children.length>0) {
                item.children.map(second => {
                  second.key = second.categoryId;
                  second.title = second.categoryName;
                  if (second.children != null&&second.children.length>0) {
                    second.children.map(third => {
                      third.key = third.categoryId;
                      third.title = third.categoryName;
                    });
                  }else{
                    second.disableCheckbox = true;
                  }
                });
              }else{
                item.disableCheckbox = true;
              }
            });
          }
          select_cat[0].tree_data = res.data
        }
        this.setState({select_cat})
      },
    });
  }

	//操作  del：删除  apply: 申请
  operate = (id, type) => {
		const { params } = this.state;
		const { dispatch } = this.props;
		let dis_type = '';
		let param_data = {};
		if (type == 'del') {
			dis_type = 'store/del_applied_category';
			param_data.bindId = id;
		}else if (type == 'apply') {
      dis_type = 'store/apply_category';
      param_data = id;
    }
		dispatch({
			type: dis_type,
			payload: param_data,
			callback: (res) => {
				if (res.state == 200) {
					sucTip(res.msg);
					this.get_list(params);
				} else {
					failTip(res.msg);
				}
				this.setState({ submiting: false,modalVisible:false, });
			},
		});
	};

	//获取数据列表
	get_list = (params) => {
		this.setState({ initLoading: true });
		const { dispatch } = this.props;
		dispatch({
			type: 'store/get_applied_category_lists',
			payload: params,
			callback: (res) => {
				this.setState({ initLoading: false });
				if (res.state == 200) {
					if ((res.data.list==null||res.data.list.length == 0) && this.state.params.current > 1) {
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

  sldHandleCancle = () => {
    this.setState({ modalVisible: false });
  };

  sldHandleConfirm = (val) => {
    if(this.select_cat_id.length == 0){
      failTip(`${sldComLanguage('请选择经营类目')}`);
      return false;
    }
    this.operate({goodsCateIds:this.select_cat_id.join(',')},'apply');
  };

  applyCategory = () => {
    let {select_cat} = this.state;
    select_cat[0].selected_keys = [];
    this.select_cat_id = [];
    this.setState({modalVisible:true,select_cat})
  }

  render() {
		const { selectedRows, search_data, columns, initLoading, data,submiting,modalVisible,select_cat } = this.state;
		return (
			<div className={global.common_page} style={{ flex: 1,padding:0 }}>
				<div className={global.tableListForm}>
					<Search search_data={search_data}
						seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}
					/>
				</div>
				{/*公共功能条-start*/}
				<div className={global.operate_bg}>
          {sldIconBtn(() => this.applyCategory(), `${sldComLanguage('申请经营类目')}`, 7, 7)}
				</div>
				<Spin spinning={initLoading}>
					{/*标准表格-start*/}
					<StandardTable
						selectedRows={selectedRows}
						data={data}
						rowKey={'bindId'}
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
          title={`${sldComLanguage('申请经营类目')}`}
          submiting={submiting}
          width={400}
          modalVisible={modalVisible}
          sldHandleConfirm={(val) => this.sldHandleConfirm(val)}
          sldHandleCancle={this.sldHandleCancle}
          formItemLayoutModal={formItemLayoutModal}
          content={select_cat}
        />
        {/*新增/编辑对话框-end*/}
			</div>

		);
	}
}
