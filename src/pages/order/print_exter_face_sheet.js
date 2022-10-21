/*
* 批量打印电子面单
* */
import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Button, Form, Modal } from 'antd';
import {
  sldSvgIcon,
  failTip,
  dragSldTableColumn,
  getSldEmptyH,
  sldComLanguage,
} from '@/utils/utils';
import global from '@/global.less';
import StandardTable from '@/components/StandardTable';

@connect(({ order }) => ({
  order,
}))
@Form.create()
export default class PrintExterFaceSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exterFaceSheetModalWidth: 500,//批量生成、打印电子面单弹框宽度
      exterFaceSheetSubmiting: false,//提交按钮loading状态
      columns: [
        {
          title: ' ',
          dataIndex: 'orderSn',
          align: 'center',
          width: 55,
          render: (text, record, index) => index+1,
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
  exterFaceSheetCancle = () => {
    this.props.operateExterFaceSheetOptShowFlag();
  };

  //批量生成、打印电子面单弹框确认事件
  exterFaceSheetConfirm = () => {
    const { dispatch, allowPrintOrderSnArray } = this.props;
    dispatch({
      type: 'order/print_exter_face_sheet',
      payload: { orderSns: allowPrintOrderSnArray.join(',') },
      callback: res => {
        if (res.state == 200) {
          if(res.data){
            window.open(res.data, '_blank');
          }
          this.exterFaceSheetCancle();
        } else {
          failTip(res.msg);
        }
      },
    });
  };


  render() {
    const { columns, exterFaceSheetModalWidth, exterFaceSheetSubmiting } = this.state;
    const { exterFaceSheetOptShowFlag, orderData, allowPrintOrderSnArray } = this.props;
    return (
      <Modal
        centered
        title={sldComLanguage('批量打印电子面单')}
        width={exterFaceSheetModalWidth}
        visible={exterFaceSheetOptShowFlag}
        onCancel={() => this.exterFaceSheetCancle()}
        footer={
          allowPrintOrderSnArray.length > 0
            ? [
              <Button key="back" onClick={() => this.exterFaceSheetCancle()}>{sldComLanguage('取消')}</Button>,
              <Button key="submit" type="primary" loading={exterFaceSheetSubmiting}
                      onClick={(e) => this.exterFaceSheetConfirm(e)}>
                {sldComLanguage('继续')}
              </Button>,
            ]
            : [
              <Button key="submit" type="primary"
                      onClick={() => this.exterFaceSheetCancle()}>{sldComLanguage('我知道了')}</Button>,
            ]
        }
      >
        <div className={`${global.flex_row_start_center} ${global.sld_modal_top_tip}`}>
          <div style={{ lineHeight: 0 }}>
            {sldSvgIcon('#333', 15, 15, 'tishi3')}
          </div>
          <span style={{ fontSize: 13, marginLeft: 6 }}>{sldComLanguage('温馨提示：')}{allowPrintOrderSnArray.length>0?sldComLanguage('点击继续操作只打印符合条件的记录'):sldComLanguage('没有符合条件的记录，无法打印')}</span>
        </div>
        {getSldEmptyH(40)}
        {/*标准表格-start*/}
        <StandardTable
          selectedRows={[]}
          data={{ list: orderData, pagination: {} }}
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
        {getSldEmptyH(10)}
        {/*标准表格-end*/}
      </Modal>
    );
  }
}
