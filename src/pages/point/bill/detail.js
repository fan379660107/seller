import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Form, Modal } from 'antd';
import {
  sldCommonTitle,
  getTableNum,
  list_com_page_size_10,
  sldLlineRtextAddGoods,
  getSldHorLine,
  sldIconBtnBg,
  sldComLanguage,
  sucTip,
  failTip,
  sldPopConfirmDiy,
  sldtbaleOpeBtnText,
  getSldEmptyH,
} from '@/utils/utils';
import global from '@/global.less';
import bill from './bill.less';
import SldTableRowTwo from '@/components/SldTableRowTwo';
import { Scrollbars } from 'react-custom-scrollbars';
import StandardTable from '@/components/StandardTable';
import SldPreviewImg from '@/components/SldPreviewImg/SldPreviewImg';
import Link from 'umi/link';
import router from 'umi/router';

const { confirm } = Modal;
let pageSize = list_com_page_size_10;
let sthis =  '';
@connect(({ point }) => ({
  point,
}))
@Form.create()
export default class BillDetail extends Component {
  constructor(props) {
    super(props);
    sthis = this;
    this.state = {
      preview_img:  '',
      show_preview_modal: false,
      modal_width: 500,//modal框的宽度
      show_foot: true,//是否展示modal框的底部操作按钮
      title:  '',//modal框title
      submiting: false,
      modalVisible: false,
      query: props.location.query,
      params: { pageSize: pageSize },//搜索条件
      bill_base_data: [{
        type: 'show_text',
        label: `${sldComLanguage('结算单号')}` ,
        name: 'billSn',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('结算起止时间')}` ,
        name: 'startTime',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('店铺名称')}` ,
        name: 'storeName',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('店铺联系人')}` ,
        name: 'contactName',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_text',
        label: `${sldComLanguage('店铺联系电话')}` ,
        name: 'contactPhone',
        extra: ``,
        item_height: 42,
        text: ``,
      }],//结算信息
      bill_detail_data: {},//结算单详情数据
      operateData: [],//modal框数据
      bill_progress_data: [{
        code: 'createBill',
        state: `${sldComLanguage('生成结算单')}` ,
        time:''  ,
        state_code: 1,
        cur_state: 'cur',
      }, {
        code: 'storeConfirm',
        state: `${sldComLanguage('店铺确认')}` ,
        time:  '',
        state_code: 2,
        cur_state: 'no',
      }, {
        code: 'systemCheck',
        state: `${sldComLanguage('平台审核')}` ,
        time:  '',
        state_code: 3,
        cur_state: 'no',
      }, {
        code: 'finish',
        state: `${sldComLanguage('结算完成')}` ,
        time: '' ,
        state_code: 4,
        cur_state: 'no',
      }],//结算进度数据
      bill_settle_img: [{
        type: 'show_text',
        label: `${sldComLanguage('打款备注')}` ,
        name: 'paymentRemark',
        extra: ``,
        item_height: 42,
        text: ``,
      }, {
        type: 'show_goods_img_more',
        label: `${sldComLanguage('结算凭证')}`,
        name: 'paymentEvidence',
        initialValue:  '',
        data: [],
        item_height: 142,
        preView: this.viewImg,
      }],//结算凭证
    };
  }

  columns_order = [
    {
      title: ' ',
      dataIndex: 'bindId',
      align: 'center',
      width: 30,
      render: (text, record, index) => getTableNum(this.state.params, pageSize, index),
    },
    {
      title: `${sldComLanguage('订单号')}` ,
      dataIndex: 'orderSn',
      align: 'center',
      width: 120,
    },
    {
      title: `${sldComLanguage('使用积分')}`,
      dataIndex: 'integral',
      align: 'center',
      width: 100,
    },{
      title: `${sldComLanguage('积分抵扣金额(元)')}`,
      dataIndex: 'integralCashAmount',
      align: 'center',
      width: 100,
    }, {
      title: `${sldComLanguage('支付现金(元)')}`,
      dataIndex: 'cashAmount',
      align: 'center',
      width: 100,
    },
    {
      title: `${sldComLanguage('兑换日期')}` ,
      dataIndex: 'createTime',
      align: 'center',
      width: 120,
    },
    {
      title: `${sldComLanguage('完成日期')}` ,
      dataIndex: 'finishTime',
      align: 'center',
      width: 120,
    }, {
      title: `${sldComLanguage('操作')}`,
      align: 'center',
      width: 100,
      render: (text, record) => (
        <Link to={{
          pathname: '/point/order_list_to_detail',
          query: {
            orderSn: record.orderSn,
          },
        }}>
          {sldtbaleOpeBtnText(`${sldComLanguage('查看')}` , () => null)}
        </Link>
      ),
    }];//订单商品规格表头


  componentDidMount() {
    const { query } = this.state;
    this.get_bill_detail(query.id);
  }

  //获取结算详情
  get_bill_detail = (id) => {
    const { dispatch } = this.props;
    let { bill_base_data, bill_detail_data, bill_progress_data, bill_settle_img } = this.state;
    dispatch({
      type: 'point/get_bill_detail',
      payload: { billId: id },
      callback: async (res) => {
        if (res.state == 200) {
          bill_detail_data = res.data;

          //结算账户信息
          for (let reagent in bill_base_data) {
            if (bill_base_data[reagent].name == 'startTime') {
              bill_base_data[reagent].text = bill_detail_data.startTime + ' ~ ' + bill_detail_data.endTime;
            } else {
              bill_base_data[reagent].text = bill_detail_data[bill_base_data[reagent].name];
            }
          }

          bill_settle_img.map(item => {
            if (item.name == 'paymentEvidence') {
              item.data = [{ imageUrl: bill_detail_data[item.name] }];
            } else {
              item.text = bill_detail_data[item.name];
            }
          });

          for (let pro in bill_progress_data) {
            if (pro < bill_detail_data.logList.length) {
              bill_progress_data[pro].time = bill_detail_data.logList[pro].createTime;
            }
            if (bill_detail_data.state < bill_progress_data[pro].state_code) {
              bill_progress_data[pro].cur_state = 'no';
            } else if (bill_detail_data.state == bill_progress_data[pro].state_code) {
              bill_progress_data[pro].cur_state = 'cur';
            } else {
              bill_progress_data[pro].cur_state = 'pass';
            }
          }

          this.setState({
            loading: false,
            bill_base_data,//订单信息
            bill_detail_data,
            bill_progress_data,
            bill_settle_img,
          });
        }
      },
    });
  };

  //预览图片/关闭预览图片
  viewImg = (flag, img =  '') => {
    this.setState({
      preview_img: img,
      show_preview_modal: flag,
    });
  };

  //确认结算单操作，如果没有设置结算账号，提示要先设置
  checkConfirm = () => {
    const { dispatch } = this.props;
    let { query } = this.state;
    dispatch({
      type: 'point/confirm_bill',
      payload: { billId: query.id },
      callback: async (res) => {
        if (res.state == 200) {
          sucTip(res.msg);
          this.get_bill_detail(query.id);
        } else if (res.state == 255) {
          failTip(res.msg);
        } else if (res.state == 267) {
          //提示操作框
          confirm({
            style: { padding: 24, background: '#fff', borderRadius: 5 },
            title: `${sldComLanguage('温馨提示')}` ,
            content: res.msg,
            okText: `${sldComLanguage('确定')}` ,
            okType: 'primary',
            cancelText: `${sldComLanguage('取消')}` ,
            onOk() {
              //跳转到结算账号页面
              router.push('/bill/account');
            },
            onCancel() {
            },
          });
        }
      },
    });
  };

  render() {
    const { bill_base_data, bill_detail_data, bill_progress_data, bill_settle_img, preview_img, show_preview_modal } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        <div className={global.flex_com_space_between} style={{ margin: 10, marginTop: 0 }}>
          {sldLlineRtextAddGoods('#69A2F2', `${sldComLanguage('结算详情')}`)}
          {sldIconBtnBg(() => {
            this.props.history.goBack();
          }, 'fanhui', `${sldComLanguage('返回上级页面')}`, '#fff', 7, 0, 15, 15, 5)}
        </div>
        {getSldHorLine(1)}
        <Scrollbars
          autoHeight
          autoHeightMin={100}
          autoHeightMax={document.body.clientHeight - 100}>
          <div className={`${global.flex_row_center_start} ${bill.progress}`}>
            {bill_progress_data.map((item, index) => {
              return <div key={index}
                          className={`${global.flex_column_start_center} ${bill.item}`}>
                <div className={`${bill.top} ${global.flex_row_center_center}`}>
                  <span className={`${bill.left_line}`}/><img
                  src={require(`@/assets/bill/${index + 1}_${item.cur_state}.png`)}/><span
                  className={`${bill.right_line}`}/>
                </div>
                <span className={`${bill.state}`}>{item.state}</span>
                <span className={`${bill.time}`}>{item.time}</span>
              </div>;
            })}
          </div>
          {bill_detail_data.state == 1 &&
          <div className={`${bill.state_part} ${global.flex_column_start_center}`}>
            <span className={bill.title}>{sldComLanguage('等待店铺确认')}</span>
            {sldPopConfirmDiy('leftBottom', `${sldComLanguage('我已确认核对该账单，确认无误')}`, () => this.checkConfirm(), `${sldComLanguage('确定')}`, `${sldComLanguage('取消')}`,
              <div className={bill.invoice_btn}>{sldComLanguage('确认结算单')}</div>)}

          </div>
          }
          {bill_detail_data.state == 2 &&
          <div className={`${bill.state_part} ${global.flex_column_start_center}`}>
            <span className={bill.title}>{sldComLanguage('等待平台审核')}</span>
          </div>
          }
          {bill_detail_data.state == 3 &&
          <div className={`${bill.state_part} ${global.flex_column_start_center}`}>
            <span className={bill.title}>{sldComLanguage('等待平台结算')}</span>
          </div>
          }
          {bill_detail_data.state == 4 &&
          <div className={`${bill.state_part} ${global.flex_column_start_center}`}>
            <span className={bill.title}>{sldComLanguage('结算完成')}</span>
          </div>
          }
          {sldCommonTitle(`${sldComLanguage('结算信息')}` , '#333', 5, 15, 15)}
          <div className={`${bill.detail_total_part} ${global.flex_row_start_center}`}>
            <img src={require('@/assets/bill/detail_total_icon.png')}/>
            <span className={bill.amount_total}>&nbsp;{sldComLanguage('结算金额￥')}{bill_detail_data.settleAmount} = &nbsp;</span>
            <span
              className={bill.amount_detail}> {sldComLanguage('现金使用金额￥')}{bill_detail_data.cashAmount} + {sldComLanguage('积分抵扣金额￥')}{bill_detail_data.integralCashAmount}</span>

          </div>


          {sldCommonTitle(`${sldComLanguage('结算信息')}` , '#333', 5, 15, 15)}
          <SldTableRowTwo r_color={'#333'} l_color={'#999'} l_fontw={500} r_fontw={600} form={this.props.form}
                          data={bill_base_data}/>

          {bill_detail_data.state == 4 &&
          <Fragment>
            {sldCommonTitle(`${sldComLanguage('结算凭证')}` , '#333', 5, 15, 15)}
            <SldTableRowTwo part_width={100} lwidth={10} rwidth={90} form={this.props.form}
                            data={bill_settle_img}/>
          </Fragment>
          }

          {sldCommonTitle(`${sldComLanguage('结算订单信息')}` , '#333', 5, 15, 15)}
          <StandardTable
            selectedRows={[]}
            data={{ list: bill_detail_data.orderList, pagination: {} }}
            size={'small'}
            rowKey={'orderSn'}
            isCheck={false}
            columns={this.columns_order}
            sldpagination={false}
          />
          {getSldEmptyH(40)}
        </Scrollbars>
        {/*图片预览-start*/}
        <SldPreviewImg img={preview_img} show_preview_modal={show_preview_modal} modal_width={500}
                       preview_alt_con={`${sldComLanguage('商品图片')}` } closePreviewModal={() => this.viewImg(false)}/>
        {/*图片预览-end*/}
      </div>

    );
  }
}
