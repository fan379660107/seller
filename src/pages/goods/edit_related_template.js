import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Form } from 'antd';
import {
  sldLlineRtextAddGoods,
  failTip,
  sucTip,
  getSldEmptyH,
  sldComLanguage,
  quillEscapeToHtml,
} from '@/utils/utils';
import global from '@/global.less';
import SldEditFormCom from '@/components/SldEditFormCom/SldEditFormCom';
import SldUEditor from '@/components/SldUEditor';
import { Scrollbars } from 'react-custom-scrollbars';

@connect(({ product, global }) => ({
  product, global,
}))
@Form.create()
export default class EditRelatedTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initEditorFlag: false,//加载百度编辑器
      getEditorContentFlag: false,//获取百度编辑器内容标识
      initEditorContent: '',//百度编辑器内容
      flag: false,
      template_con: '',//关联版式内容
      query: props.location.query,
      operate_data: [{
        type: 'input',
        label: `${sldComLanguage('版式名称')}`,
        name: 'templateName',
        placeholder: `${sldComLanguage('请输入版式名称')}`,
        initialValue: '',
        maxLength: 10,
        rules: [{
          required: true,
          whitespace: true,
          message: `${sldComLanguage('请输入版式名称')}`,
        }],
      }],
      positionData: [{
        type: 'radio',
        label: `${sldComLanguage('版式位置')}`,
        name: 'templatePosition',
        placeholder: ``,
        initialValue: 1,
        sel_data: [{
          name: '顶部', key: 1,
        }, {
          name: '底部', key: 2,
        }],
        onChange: this.changePosition,
      }],
    };
  }

  componentDidMount() {
    const { query } = this.state;
    this.props.dispatch({
      type: 'global/getLayoutCollapsed',
    });
    if (query.id != undefined && query.id > 0) {
      this.get_detail();
    } else {
      this.setState({ initEditorFlag: true });
    }
  }

  componentWillUnmount() {

  }

  //获取关联版式详情
  get_detail = () => {
    const { dispatch } = this.props;
    let { operate_data, query, positionData } = this.state;
    dispatch({
      type: 'product/get_related_template_detail',
      payload: { templateId: query.id },
      callback: (res) => {
        for (let i in operate_data) {
          operate_data[i].initialValue = res.data[operate_data[i].name];
        }
        for (let pos in positionData) {
          positionData[pos].initialValue = res.data[positionData[pos].name];
        }
        this.setState({
          operate_data,
          positionData,
          initEditorContent: quillEscapeToHtml(res.data.templateContent),
          flag: true,
          initEditorFlag: true,
        });
      },
    });
  };

  changePosition = (val) => {
    let { positionData } = this.state;
    let tmpData = positionData.filter(item => item.name == 'templatePosition')[0];
    tmpData.initialValue = val;
    this.setState({ positionData });
  };

  handleSaveAllData = () => {
    this.setState({ getEditorContentFlag: true });
  };

  //保存并新增事件
  saveData = (editorCon) => {
    let _this = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        values.templateContent = editorCon;
        const { query } = this.state;
        values.templateId = query.id;
        let dis_type = '';
        if (query.id != undefined && query.id > 0) {
          dis_type = 'product/edit_related_template';
        } else {
          dis_type = 'product/add_related_template';
        }
        dispatch({
          type: dis_type,
          payload: values,
          callback: (res) => {
            if (res.state == 200) {
              sucTip(res.msg);
              _this.props.history.goBack();
            } else {
              failTip(res.msg);
            }
          },
        });
      }
    });
  };

  //获取编辑器内容
  getEditorContent = (con) => {
    this.saveData(con);
    this.setState({ getEditorContentFlag: false });
  };

  render() {
    const { operate_data, positionData, query, flag, initEditorFlag, getEditorContentFlag, initEditorContent } = this.state;
    return (
      <div className={global.common_page_20}
           style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        {sldLlineRtextAddGoods('#69A2F2', `${sldComLanguage('基本信息')}`)}
        <Scrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 140}
        >
        <div className={global.tableListFormAdd}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Form onSubmit={() => this.handleSaveAllData()} layout="inline">
              <SldEditFormCom form={this.props.form} search_data={operate_data}/>
              {getSldEmptyH(10)}
              {(query.id == undefined || (query.id != undefined && flag)) &&
              <SldEditFormCom form={this.props.form} search_data={positionData}/>}
              {getSldEmptyH(15)}
              {sldLlineRtextAddGoods('#69A2F2', `${sldComLanguage('内容编辑')}`)}
              <div className={global.goods_sku_tab} style={{ marginTop: 20, position: 'relative' }}>
                {initEditorFlag &&
                <SldUEditor id={'agreement'} getContentFlag={getEditorContentFlag}
                            getEditorContent={this.getEditorContent} initEditorContent={initEditorContent}/>
                }
              </div>

              <div className={global.m_diy_bottom_wrap}
                   style={{ position: 'fixed', left: this.props.global.collapsed ? 90 : 160 }}>
                <div onClick={() => this.props.history.goBack()} className={global.add_goods_bottom_btn}>
                  {sldComLanguage('返回')}
                </div>

                <div onClick={() => this.handleSaveAllData()}
                     className={`${global.add_goods_bottom_btn} ${global.add_goods_bottom_btn_sel}`}>
                  {sldComLanguage('保存并返回')}
                </div>
              </div>
            </Form>
          </div>
        </div>
        </Scrollbars>
      </div>
    );
  }
}
