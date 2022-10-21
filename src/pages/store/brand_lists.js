import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Spin } from 'antd';
import {
	sldIconBtn,
	failTip,
	sucTip,
	sldSearchValClear,
	list_com_page_size_10,
	formItemLayoutModal,
  sldPopConfirmDiy,
	getTableNum,
	sldComLanguage,
  sldtbaleOpeBtnText,
	dragSldTableColumn,
	sldHandlePaginationData,
	getSldComImg,
  showMoreHelpTip,
  getSldEmptyH,
  getSldComShowMoreTtex,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';
import SldModal from '@/components/SldModal/SldModal';
import SldPreviewImg from '@/components/SldPreviewImg/SldPreviewImg';
import { apiUrl } from '@/utils/sldconfig.js';
import SldComHeader from '@/components/SldComHeader';

const brandTip = [`${sldComLanguage('审核通过后，申请品牌和分类的绑定关系生效，发布商品的时候选择该分类即可选择该品牌。分类需绑定到第三级。')}`];
let pageSize = list_com_page_size_10;
@connect(({ store }) => ({
  store,
}))
@Form.create()
export default class BrandLists extends Component {
	constructor(props) {
		super(props);
		this.state = {
      scroll_h:42,
			search_con: '',
			initLoading: false,
			submiting: false,
			show_preview_modal: false,//预览图片modal框是否展示
			preview_img: '',//预览图片
			preview_alt_con: '',//预览图片内容
			modalTableVisible: false,//input 后缀弹出框是否显示
			data: {},//列表数据
			selectedRows: [],
			selectedRowKeys: [],//selectedRows的key
			title: '',
			type: 'add',//'add'新增  'edit'编辑
			params: { pageSize: pageSize },
			upload_img_info: {},//上传的图片信息
			addData: [{
				type: 'input',
				label: `${sldComLanguage('品牌名称')}`,
				name: 'brandName',
				placeholder: `${sldComLanguage('请输入品牌名称')}`,
				extra: `${sldComLanguage('最多输入20个字')}`,
				initialValue: '',
        maxLength:20,
				rules: [{
					required: true,
          whitespace: true,
					message: `${sldComLanguage('请输入品牌名称')}`,
				}],
			},
        {
				type: 'upload_img_upload',
				label: `${sldComLanguage('品牌LOGO')}`,
				name: 'image',
        extra: `${sldComLanguage('建议上传宽153*高54的图片')}`,
				fileList: [],
				img_info: {},
				upload_name: 'file',
        required: true,
				upload_url: apiUrl + `v3/oss/common/upload?source=sellerBrand`,
				uploadPreview: this.uploadImgPre,
				uploadChange: (info) => this.uploadImg(info, 'image'),
				initialValue: '',
			},{
          type: 'cascader_common_load',
          label: `${sldComLanguage('品牌分类')}`,//品牌分类
          name: 'category',//
          placeholder: `${sldComLanguage('请选择要绑定的商品分类')}`,//请选择要绑定的商品分类
          extra: `${sldComLanguage('必须选到第三级分类')}`,//必须选到第三级分类
          initialValue: '',
          data:[],
          fieldNames:{
            label: 'categoryName',
            value: 'categoryId',
            children: 'children',
          },
          onChange: this.handleGoodsCategroy,
          loadData: this.loadData,
          rules: [{
            required: true,
            message: `${sldComLanguage('请选择要绑定的商品分类')}`,//请选择要绑定的商品分类
          }],
        },{
				type: 'textarea',
				label: `${sldComLanguage('品牌描述')}`,
				extra: `${sldComLanguage('最多输入200个字')}`,
				disable: true,
				name: 'brandDesc',
				placeholder: `${sldComLanguage('请输入品牌描述')}`,
				initialValue: '',
        maxLength: 200,
			},
			],//modal框的数据
			formValues: {},//搜索条件、
			columns: [
				{
					title: ' ',
					dataIndex: 'brandId',
					align: 'center',
					width: 55,
					render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
				},
				{
					title: `${sldComLanguage('品牌名称')}`,
					dataIndex: 'brandName',
					align: 'center',
					width: 100,
				},
				{
					title: `${sldComLanguage('品牌LOGO')}`,
					dataIndex: 'imageUrl',
					align: 'center',
          width: 100,
          render: (text) => {
            return getSldComImg(text,160,60,85,30);//图片预览
          },
				},
        {
          title: `${sldComLanguage('品牌分类')}`,//品牌分类
          dataIndex: 'goodsCategoryPath',
          align: 'center',
          width: 100,
        },
				{
					title: `${sldComLanguage('品牌描述')}`,
					dataIndex: 'brandDesc',
					align: 'center',
					width: 100,
          render: (text) => {
            return getSldComShowMoreTtex(text,50,200);
          },
				},
				{
					title: `${sldComLanguage('审核状态')}`,//审核状态
					dataIndex: 'stateValue',
					align: 'center',
					width: 80,
				},
        {
          title: `${sldComLanguage('拒绝理由')}`,//拒绝理由
          dataIndex: 'failReason',
          align: 'center',
          width: 100,
          render: (text) => {
            return text?getSldComShowMoreTtex(text,50,200):'--';
          },
        },
				{
					title: `${sldComLanguage('操作')}`,
					align: 'center',
					width: 80,
					render: (text, record) => (
						<Fragment>
              {record.state != 1&&
                <Fragment>
                  {sldtbaleOpeBtnText(`${sldComLanguage('编辑')}`, () => this.editBrand(record))}
                  <span className={global.splitLine}></span>
                </Fragment>
              }

              {/*删除后不可恢复，是否确定删除？*/}
              {sldPopConfirmDiy('leftBottom', `${sldComLanguage('删除后不可恢复，是否确定删除')}`, () => this.operateBrand(record.brandId, 'del'), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
                sldtbaleOpeBtnText(`${sldComLanguage('删除')}`, () => null))}
						</Fragment>
					),
				},
			],
		};
	}

	cur_edit_id = '';//当前操作数据id
  cur_sele_cat = [];//当前选择的分类数组

	componentDidMount() {
		this.get_list({ pageSize: pageSize });
		this.getGoodsCategroy(0,1);
	}

	//获取商户绑定的商品分类
  getGoodsCategroy = (id, grade = 0) => {
    const { dispatch } = this.props;
    let { addData } = this.state;
    let dis_type = 'manage/getVendorGoodsCategoryById';
    dispatch({
      type: dis_type,
      payload: { categoryId: id, grade:grade },
      callback: (res) => {
        res.data.map(item=>{
          if(item.children == null){
            item.isLeaf=true
          }else{
            item.isLeaf=false
          }
          delete item.children;
          })
        for(let i in addData){
          if(addData[i].name == 'category'){
            if (grade == 1) {
              addData[i].data = res.data;
            }else if(grade == 2){
              let tmpData = addData[i].data.filter(item=>item.categoryId == id)[0];
              tmpData.children = res.data;
            }else if(grade == 3){
              let tmpData = addData[i].data.filter(item=>item.categoryId == id)[0];
              tmpData.children = res.data;
            }
            break;
          }
        }
        this.setState({ addData });
      },
    });
  };

	//处理品牌分类选择
  handleGoodsCategroy = (val) => {
	  this.cur_sele_cat = val;
  }

	//处理品牌分类选择
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const { dispatch } = this.props;
    let { addData } = this.state;
    let dis_type = 'manage/getVendorGoodsCategoryById';
    let target_grade = selectedOptions[selectedOptions.length-1].grade*1+1;
    dispatch({
      type: dis_type,
      payload: { categoryId: targetOption.categoryId, grade:target_grade},
      callback: (res) => {
        if(res.data.length > 0){
          res.data.map(item=>{
            if(item.children == null){
              item.isLeaf=true
            }else{
              item.isLeaf=false
            }
            delete item.children;
          })
          targetOption.children = res.data
        }else{
          targetOption.isLeaf=true
        }
        targetOption.loading = false;
        addData[2].data = JSON.parse(JSON.stringify(addData[2].data));
        this.setState({ addData });
      },
    });
  }

	//上传图片
	uploadImg = (info, type) => {
		let { addData } = this.state;
		if(info.file.status!=undefined&&info.file.status!='error') {
			for (let i in addData) {
				if (addData[i].name == type) {
					addData[i].fileList = info.fileList;
					addData[i].img_info = (info.file.response != undefined && info.fileList.length > 0 && info.file.response.data != undefined) ? info.file.response.data : [];
				}
			}
			this.setState({ addData });
		}
	};

	//预览图片
	uploadImgPre = (info) => {
	  let img = '';
	  if(info.response!=undefined&&info.response.data!=undefined){
      img = info.response.data.url;
    }else{
      img = info.url;
    }
		this.viewImg(true, img);
	};


	//编辑品牌
	editBrand = (val) => {
		let { addData } = this.state;
    this.props.dispatch({
      type: 'store/get_brand_detail',
      payload: { brandId: val.brandId },
      callback: (res) => {
        if(res.state == 200){
          for (let i in addData) {
           if (addData[i].name == 'image') {
              let fileList = [];
              let tmp_data = {};
              tmp_data.uid = val.brandId;
              tmp_data.name = val.image;
              tmp_data.status = 'done';
              tmp_data.url = val.imageUrl;
              fileList.push(tmp_data);
              addData[i].fileList = fileList;
              addData[i].img_info.path = val.image;
            }else if(addData[i].name == 'category'){
             let tar_data = res.data.brandAndCateVOList.filter(item=>item.categoryId == res.data.goodsCateId1)[0];
             tar_data.children.map(item=>{
               item.isLeaf = false;
               item.grade = 2;
             })
             let car_2 = tar_data.children.filter(item=>item.categoryId == res.data.goodsCateId2)[0];
             car_2.isLeaf = false;
             let car_3 = car_2.children.filter(item=>item.categoryId == res.data.goodsCateId3)[0];
             car_3.isLeaf = true;
             addData[i].initialValue = [res.data.goodsCateId1,res.data.goodsCateId2,res.data.goodsCateId3];
             res.data.brandAndCateVOList.map(item=>{
               item.isLeaf = false;
               item.grade = 1;
             });
             addData[i].data = res.data.brandAndCateVOList;
             this.cur_sele_cat = [{categoryId:res.data.goodsCateId1},{categoryId:res.data.goodsCateId2},{categoryId:res.data.goodsCateId3}]
           }else{
              addData[i].initialValue = val[addData[i].name];
            }
          }
          this.cur_edit_id = val.brandId;//当前操作数据id
          this.setState({ type: 'edit', title: `${sldComLanguage('编辑品牌')}`, addData: addData, modalVisible: true });
        }else{
          failTip(res.msg)
        }

      },
    });
	};

	//添加品牌
	addBrand = () => {
		let { addData } = this.state;
		for (let i in addData) {
			if (addData[i].type == 'single_checkbox') {
				addData[i].initialValue = false;
			} else if (addData[i].type == 'upload_img_upload') {
				addData[i].fileList = [];
				addData[i].img_info = {};
			} else {
				addData[i].initialValue = '';
			}
		}
		this.setState({ modalVisible: true, type: 'add', title: `${sldComLanguage('添加品牌')}`, addData: addData });
	};

	//获取数据列表
	get_list = (params) => {
		this.setState({ initLoading: true });
		const { dispatch } = this.props;
		dispatch({
			type: 'store/get_brand_apply_lists',
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
		const params = sldHandlePaginationData(pagination, filtersArg, sorter, formValues);
		pageSize = params.pageSize;
		this.setState({
			params: params,
		});
		this.get_list(params);
	};


	//表格拖动
	resizeTable = (index, size, type, data) => {
		let datas = dragSldTableColumn(index, size, data);
		this.setState({ [type]: datas });
	};

	sldHandleCancle = () => {
		this.setState({ modalVisible: false });
	};

	//品牌管理操作，edit 编辑，del 删除，recommend 推荐  unrecommend 不推荐,
	operateBrand = (id, type) => {
		const { dispatch } = this.props;
		let dis_type = '';
		let params = { brandId: id };
		if (type == 'edit') {
			dis_type = 'store/edit_brand';
			params = id;
		} else if (type == 'del') {
			dis_type = 'store/del_brand';
			params = {brandId:id}
		}
		dispatch({
			type: dis_type,
			payload: params,
			callback: (res) => {
				if (res.state == 200) {
					sucTip(res.msg);
					this.get_list(this.state.params);
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
		const { type, addData } = this.state;
		const { dispatch } = this.props;
		let _this = this;
    let params = {}
    params.brandName = val.brandName;
    params.brandDesc = val.brandDesc;
		for (let i in addData) {
			if (addData[i].name == 'image') {
				if (addData[i].img_info.path == undefined) {
					failTip(`${sldComLanguage('请上传品牌LOGO')}`);
					return false;
				} else {
          params.image = addData[i].img_info.path;
				}
			}
		}
		if(this.cur_sele_cat.length < 3){
		  failTip(`${sldComLanguage('分类必须选到三级才可以')}`);
		  return false;
    }else{
      params.categoryId = this.cur_sele_cat[2].categoryId;
    }

		this.setState({ submiting: true });
		if (type == 'edit') {
      params.brandId = this.cur_edit_id;
			this.operateBrand(params,'edit');
		} else {
			dispatch({
				type: 'store/apply_brand',
				payload: params,
				callback: (res) => {
					if (res.state == 200) {
            sucTip(res.msg);
						_this.get_list({ pageSize: pageSize });
						this.setState({
							modalVisible: false,
							formValues: {},
							search_con: '',
						});
					} else {
						failTip(res.msg);
					}
					this.setState({ submiting: false });
				},
			});
		}
	};

	//预览图片/关闭预览图片
	viewImg = (flag, img = '', text = '') => {
		this.setState({
			preview_img: img,
			preview_alt_con: text,
			show_preview_modal: flag,
		});
	};

	//搜索
	sldSearch = (val) => {
		let { formValues } = this.state;
		formValues.brandName = val;
		this.setState({ formValues,params: { pageSize: pageSize } });
		this.get_list({ pageSize: pageSize, ...formValues });
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

  handleToggleTip = () => {
    let {sld_show_tip} = this.state;
    this.setState({
      sld_show_tip:!sld_show_tip,
      scroll_h: sld_show_tip ? 0:42,
    });
  }

	render() {
		const { selectedRows, search_con, columns, initLoading, data, submiting, addData, modalVisible, title, preview_img, preview_alt_con, show_preview_modal,sld_show_tip,scroll_h } = this.state;
		return (
			<div className={global.common_page} style={{ flex: 1 }}>
        <SldComHeader
          type={1}
          title={`${sldComLanguage('品牌管理')}`}//品牌管理
          handleToggleTip={()=>this.handleToggleTip()}
        />
        {showMoreHelpTip(``, brandTip,8,sld_show_tip)}
        {getSldEmptyH(10)}
				<div className={global.operate_bg}>
					{sldIconBtn(() => this.addBrand(), `${sldComLanguage('新增品牌')}`, 7, 7)}
					{sldSearchValClear(`${sldComLanguage('请输入品牌名称')}`, 291, this.sldSearch, `${sldComLanguage('搜索')}`, search_con, this.sldSearChange, this.sldSearClear, 65)}
				</div>
				<Spin spinning={initLoading}>
					{/*标准表格-start*/}
					<StandardTable
            totalHeight={document.body.clientHeight - 150-scroll_h-15}
						selectedRows={selectedRows}
						data={data}
						rowKey={'brandId'}
						isCheck={false}
						columns={columns}
						onSelectRow={this.handleSelectRows}
						onSldHandleSeleRow={this.onSldHandleSeleRow}
						onChange={(pagination, filtersArg, sorter) => this.handleTablePagination(pagination, filtersArg, sorter, 'main')}
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
					content={addData}
				/>
				{/*新增/编辑对话框-end*/}

				{/*图片预览-start*/}
				<SldPreviewImg img={preview_img} show_preview_modal={show_preview_modal} modal_width={300}
							   preview_alt_con={preview_alt_con} closePreviewModal={() => this.viewImg(false)}/>
				{/*图片预览-end*/}

			</div>

		);
	}
}
