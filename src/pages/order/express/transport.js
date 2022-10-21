import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin } from 'antd';
import {
	sldIconBtn, failTip, sucTip, list_com_page_size_10, dragSldTableColumn, sldHandlePaginationData, sldLlineRtextAddGoodsAddMargin, getTableNum, sldComLanguage, sldPopConfirmDiy, sldtbaleOpeBtnText
} from '@/utils/utils';
import Link from 'umi/link';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import Search from '@/components/Search/Search';

let pageSize = list_com_page_size_10;
@connect(({ express,common }) => ({
  express,
  common,
}))
@Form.create()
export default class Transport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initLoading: false,
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
			columns: [
				{
					title: ' ',
					dataIndex: 'freightTemplateId',
					align: 'center',
					width: 55,
					render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
				},
				{
					title: `${sldComLanguage('模板名称')}`,
					dataIndex: 'templateName',
					align: 'center',
					width: 100,
				},
        {
          title: `${sldComLanguage('计费方式')}`,
          dataIndex: 'chargeTypeValue',
          align: 'center',
          width: 80,
        },
        {
          title: `${sldComLanguage('操作时间')}`,
          dataIndex: 'updateTime',
          align: 'center',
          width: 100,
        },
				{
					title: `${sldComLanguage('操作')}`,
					width: 100,
					align: 'center',
					render: (text, record) => (
						<Fragment>
              <Link to={{
                pathname: '/order/express_transport_to_add',
                query: {
                  id: record.freightTemplateId,
                  info: JSON.stringify(record),
                  type:'copy',
                },
              }}>
                {
                  sldtbaleOpeBtnText(`${sldComLanguage('复制')}`, null)
                }
              </Link>
              <span className={global.splitLine}></span>
              <Link to={{
                pathname: '/order/express_transport_to_add',
                query: {
                  id: record.freightTemplateId,
                  info: JSON.stringify(record),
                  type:'edit',
                },
              }}>
                {
                  sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, null)
                }
              </Link>
              <span className={global.splitLine}></span>
              {/*删除后不可恢复，是否确定删除？*/}
              {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operateTransport(record.freightTemplateId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
						</Fragment>
					),
				},
			],
			search_data: [{
				type: 'input',
				label: `${sldComLanguage('模板名称')}`,
				name: 'templateName',
				placeholder: `${sldComLanguage('请输入模板名称')}`,
			}
			],
		};
	}

	cur_edit_id = '';//当前操作数据id
	componentDidMount() {
		this.get_list({ pageSize: pageSize });
	}

	//物流模板操作  del：删除  edit：编辑 copy：复制
  operateTransport = (id, type) => {
		const { params } = this.state;
		const { dispatch } = this.props;
		let dis_type = '';
		let param_data = {};
		if (type == 'del') {
			dis_type = 'express/del_transport';
			param_data.freightTemplateId = id;
		} else if (type == 'copy') {
			dis_type = 'express/copy_transport';
      param_data.freightTemplateId = id;
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
				this.setState({ submiting: false });
			},
		});
	};

	//获取数据列表
	get_list = (params) => {
		this.setState({ initLoading: true });
		const { dispatch } = this.props;
		dispatch({
			type: 'common/get_transport_lists',
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

	render() {
		const { selectedRows, search_data, columns, initLoading, data } = this.state;
		return (
			<div className={global.common_page} style={{ flex: 1,padding:0 }}>
				<div className={global.tableListForm}>
					<Search search_data={search_data}
						seaSubmit={(data) => this.search(data)} seaReset={() => this.seaReset()}
					/>
				</div>
				{/*公共功能条-start*/}
				<div className={global.operate_bg}>
          <Link to={{
            pathname: '/order/express_transport_to_add',
            query: {
              source: '/order/express_transport',
            },
          }}>
            {sldIconBtn(() => null, `${sldComLanguage('新增运费模板')}`, 7, 7)}
          </Link>
				</div>
				<Spin spinning={initLoading}>
					{/*标准表格-start*/}
					<StandardTable
						selectedRows={selectedRows}
						data={data}
						rowKey={'freightTemplateId'}
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
			</div>

		);
	}
}
