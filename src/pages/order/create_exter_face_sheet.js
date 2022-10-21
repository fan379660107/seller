/*
* 批量生成电子面单
* */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Button, Form, Modal, Select } from 'antd';
import {
  sldSvgIcon,
  failTip,
  sucTip,
  dragSldTableColumn,
  formItemLayoutModal,
  getSldEmptyH,
  sldComLanguage,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';

const FormItem = Form.Item;
@connect(({ order, common }) => ({
  order,
  common,
}))
@Form.create()
export default class CreateExterFaceSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,//1为选择物流公司，2为展示生成电子面单的结果
      exterFaceSheetModalTitle: '批量生成电子面单',//批量生成、打印电子面单弹框标题
      exterFaceSheetModalWidth: 500,//批量生成、打印电子面单弹框宽度
      exterFaceSheetModalVisible: false,//批量生成、打印电子面单弹框是否显示，默认不显示
      exterFaceSheetSubmiting: false,//提交按钮loading状态
      data: [],//列表数据
      title: '',
      type: 'add',
      columns: [
        {
          title: ' ',
          dataIndex: 'orderSn',
          align: 'center',
          width: 55,
          render: (text, record, index) => index + 1,
        },
        {
          title: `${sldComLanguage('订单号')}`,
          dataIndex: 'orderSn',
          align: 'center',
          width: 100,
        },
        {
          title: `${sldComLanguage('是否受限')}`,
          dataIndex: 'restrict',
          align: 'center',
          width: 150,
        },
        {
          title: `${sldComLanguage('受限原因')}`,
          dataIndex: 'restrictReason',
          align: 'center',
          width: 200,
        },
      ],
    };
  }

  componentDidMount() {
  }

  //表格拖动
  resizeTable = (index, size, type, data) => {
    let datas = dragSldTableColumn(index, size, data);
    this.setState({ [type]: datas });
  };


  //批量生成、打印电子面单弹框取消事件
  exterFaceSheetCancle = (flag=false) => {
    this.props.operateExterFaceSheetOptShowFlag(flag);
    //需要重置数据
    this.setState({
      step: 1,
      data: [],
    });
  };

  //批量生成电子面单弹框继续事件
  exterFaceSheetConfirm = () => {
    this.props.form.validateFieldsAndScroll(['expressId'], (err, values) => {
      if (!err) {
        let { step, data } = this.state;
        const { dispatch, orderData } = this.props;
        this.setState({ exterFaceSheetSubmiting: true });
        dispatch({
          type: 'order/create_exter_face_sheet',
          payload: { ...values, orderSns: orderData.join(',') },
          callback: res => {
            if (res.state == 200) {
              if (res.data.length != undefined && res.data.length) {
                step = 2;
                data = res.data;
              } else {
                sucTip(res.msg);
                this.exterFaceSheetCancle(true);
              }
            } else {
              failTip(res.msg);
            }
            this.setState({ exterFaceSheetSubmiting: false, step, data });
          },
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { columns, exterFaceSheetModalTitle, exterFaceSheetModalWidth, exterFaceSheetSubmiting, step, data } = this.state;
    const { exterFaceSheetOptShowFlag, expressList } = this.props;
    return (
      <Modal
        centered
        title={exterFaceSheetModalTitle}
        width={exterFaceSheetModalWidth}
        visible={exterFaceSheetOptShowFlag}
        onCancel={() => this.exterFaceSheetCancle()}
        footer={
          step == 1
            ? [
              <Button key="back" onClick={() => this.exterFaceSheetCancle()}>{sldComLanguage('取消')}</Button>,
              <Button key="submit" type="primary" loading={exterFaceSheetSubmiting}
                      onClick={(e) => this.exterFaceSheetConfirm(e)}>
                {sldComLanguage('继续')}
              </Button>]
            : [
              <Button key="submit" type="primary"
                      onClick={() => this.exterFaceSheetCancle()}>{sldComLanguage('我知道了')}</Button>,
            ]
        }
      >
        {step == 2 &&
        <Fragment>
          <div className={`${global.flex_row_start_center} ${global.sld_modal_top_tip}`}>
            <div style={{ lineHeight: 0 }}>
              {sldSvgIcon('#333', 15, 15, 'tishi3')}
            </div>
            <span style={{ fontSize: 13, marginLeft: 6 }}>{sldComLanguage('温馨提示')}：{sldComLanguage('以下是批量生成电子面单出错的数据，请查看具体原因')}</span>
          </div>
          {getSldEmptyH(40)}
        </Fragment>
        }

        {step == 1 &&
        <Form layout="horizontal">
          <FormItem
            label={sldComLanguage('物流公司')}
            {...formItemLayoutModal}
          >
            {getFieldDecorator('expressId', {
              rules: [{
                required: true,
                message: `${sldComLanguage('请选择物流公司')}`,
              }],
            })(
              <Select placeholder={sldComLanguage('请选择物流公司')}>
                {
                  expressList.length > 0 && expressList.map(item => <Option
                    value={item.expressId}>{item.expressName}</Option>)
                }
              </Select>,
            )}
          </FormItem>
        </Form>
        }

        {/*标准表格-start*/}
        {step == 2 && data.length &&
        <StandardTable
          selectedRows={[]}
          data={{ list: data, pagination: {} }}
          rowKey={'orderSn'}
          isCheck={false}
          columns={columns}
          onSelectRow={null}
          onChange={null}
          onSldHandleSeleRow={null}
          resizeTable={(index, size) => this.resizeTable(index, size, 'columns', columns)}
          isColumnResize={true}
          sldpagination={false}
        />
        }
        {/*标准表格-end*/}
      </Modal>
    );
  }
}
