import React from 'react';
import { sldComLanguage } from '@/utils/utils';

const modal_pageSize_com = 10;
import moment from 'moment';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export const comm_cur_page_global = { cur: 1 };//对象可以修改值


/*
* java—规格列表
* */
export function column_spec_list() {
  return [
    {
      title: ' ',
      dataIndex: 'specId',
      align: 'center',
      width: 55,
      render: (text, record, index) => {
        return (comm_cur_page_global.cur - 1) * modal_pageSize_com + index + 1;
      },
    },
    {
      title: `${sldComLanguage('规格名称')}`,
      align: 'center',
      dataIndex: 'specName',
      width: 150,
    },
    {
      title: `${sldComLanguage('创建时间')}`,
      dataIndex: 'createTime',
      width: 150,
    },
    {
      title: `${sldComLanguage('排序')}`,
      dataIndex: 'sort',
    },
  ];
}

/*
* java—品牌列表
* */
export function column_brand_list() {
  return [
    {
      title: ' ',
      dataIndex: 'brandId',
      align: 'center',
      width: 55,
      render: (text, record, index) => {
        return (comm_cur_page_global.cur - 1) * modal_pageSize_com + index + 1;
      },
    },
    {
      title: `${sldComLanguage('品牌名称')}`,
      align: 'center',
      dataIndex: 'brandName',
      width: 150,
    },
    {
      title: `${sldComLanguage('创建时间')}`,
      dataIndex: 'createTime',
      width: 150,
    },
  ];
}

/*
* java—检索属性列表
* */
export function column_attr_list() {
  return [
    {
      title: ' ',
      dataIndex: 'attributeId',
      align: 'center',
      width: 55,
      render: (text, record, index) => {
        return (comm_cur_page_global.cur - 1) * modal_pageSize_com + index + 1;
      },
    },
    {
      title: `${sldComLanguage('属性名称')}`,
      align: 'center',
      dataIndex: 'attributeName',
      width: 150,
    },
    {
      title: `${sldComLanguage('创建时间')}`,
      dataIndex: 'createTime',
      width: 150,
    },
    {
      title: `${sldComLanguage('排序')}`,
      dataIndex: 'sort',
      width: 100,
    },
  ];
}


/*
 * 店铺——表头数据
 * */
export const column_shop_search = [
  {
    title: ' ',
    dataIndex: 'id',
    align: 'center',
    width: 30,
    render: (text, record, index) => {
      return (comm_cur_page_global.cur - 1) * modal_pageSize_com + index + 1;
    },
  },
  {
    title: `${sldComLanguage('店铺名称')}`,
    dataIndex: 'sellerName',
  },
  {
    title: `${sldComLanguage('店铺等级')}`,
    dataIndex: 'sellerGrade',
  }, {
    title: `${sldComLanguage('店铺创建时间')}`,
    dataIndex: 'createTime',
  },
];


/*
 * 客户收货地址列表
 * */
export const column_client_recipients = [
  {
    title: `${sldComLanguage('收货人')}`,
    dataIndex: 'name',
    width: 100,
  },
  {
    title: `${sldComLanguage('手机号')}`,
    dataIndex: 'mobile',
    width: 110,
  },
  {
    title: `${sldComLanguage('电话')}`,
    dataIndex: 'tel',
    width: 100,
  },
  {
    title: `${sldComLanguage('地区')}`,
    dataIndex: 'area_str',
    width: 150,
  },
  {
    title: `${sldComLanguage('邮编')}`,
    dataIndex: 'zip',
    width: 80,
  },
  {
    title: `${sldComLanguage('详细地址')}`,
    dataIndex: 'addr',
    width: 100,
  },
  {
    title: `${sldComLanguage('操作')}`,
    render: (text, record) => {
      return (record.use != 1 ? <a href='javascript:void(0)'>{sldComLanguage('使用该地址')}</a> :
        <span>{sldComLanguage('已选地址')}</span>);
    },
  },
];


/*
* 会员管理——会员经验规格
* */
export const column_exp_rules = [{
  type: 'inputnum',
  label: `${sldComLanguage('会员注册')}`,
  extra: `${sldComLanguage('会员注册送经验值数量')}`,
  name: 'register',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('每日登录')}`,
  extra: `${sldComLanguage('会员每天第一次登陆送经验值数量')}`,
  name: 'login',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('订单评论')}`,
  extra: `${sldComLanguage('会员评论商品送经验值数量')}`,
  name: 'orderEvaluate',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('会员购物')}`,
  extra: `${sldComLanguage('会员购物时送经验值的比例。如设定10，则表示会员消费200元时，送经验值：200/10=20，即送20经验值')}`,
  name: 'orderBuy',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('购物送值上限')}`,
  extra: `${sldComLanguage('会员购物时送经验值的上限。如设定100，会员消费金额根据上述规则换算后需要送出105经验值，则取上限值只送出100经验值')}`,
  name: 'orderMax',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'radio_select',
  label: `${sldComLanguage('使用状态')}`,
  name: 'state',
  placeholder: `${sldComLanguage('请选择使用状态')}`,
  sel_data: [{ key: '1', value: `${sldComLanguage('开启')}` }, { key: '2', value: `${sldComLanguage('关闭')}` }],
}, {
  type: 'button',
  label: '',
  name: 'button',
}];

/*
* 系统配置——基本配置——配置管理——积分配置
* */
export const point_set_data = [{
  type: 'inputnum',
  label: `${sldComLanguage('积分换算比例')}`,
  extra: `${sldComLanguage('用户下单使用积分时换算成人民币的比例，如填100表示100个积分当做1元钱使用')}`,
  name: 'integralScale',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'button',
  label: '',
  name: 'button',
}];
/*
* 系统配置——基本配置——配置管理——索引初始化
* */
export const index_init_data = [{
  type: 'single_checkbox',
  label: `${sldComLanguage('索引初始化')}`,
  name: 'isInit',
  check_con: `${sldComLanguage('是')}`,
  initialValue: false,
  extra: `${sldComLanguage('索引初始化是清除solr里面所有的索引文件，下一次定时器从头开始执行建立索引。\n')}` +
    `${sldComLanguage('建议在必要时才使用此功能')}`,
}, {
  type: 'button',
  label: '',
  name: 'button',
}];
/*
* 系统配置——基本配置——配置管理——搜索词设置
* */
export const search_word_data = [{
  type: 'input',
  label: `${sldComLanguage('关键词')}`,
  name: 'keyword',
  placeholder: `${sldComLanguage('请输入关键词')}`,
  extra: `${sldComLanguage('关键字用英文逗号（,）隔开')}`,
  rules: [{
    required: true,
    whitespace: true,
    message: `${sldComLanguage('请输入关键词')}`,
  }],
}, {
  type: 'single_checkbox',
  label: `${sldComLanguage('敏感词过滤')}`,
  name: 'keywordFilter',
  check_con: `${sldComLanguage('过滤')}`,
  initialValue: false,
  extra: `${sldComLanguage('启用敏感词过滤之后，输入敏感词将搜索不到任何结果')}`,
}, {
  type: 'button',
  label: '',
  name: 'button',
}];

/*
* 会员管理——会员积分规则
* */
export const column_integ_rules = [{
  type: 'inputnum',
  label: `${sldComLanguage('会员注册')}`,
  extra: `${sldComLanguage('会员注册送积分数量')}`,
  name: 'register',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('每日登陆')}`,
  extra: `${sldComLanguage('会员每天第一次登陆送积分数量')}`,
  name: 'login',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('会员签到')}`,
  extra: `${sldComLanguage('会员签到送积分数量')}`,
  name: 'sign',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('订单评论')}`,
  extra: `${sldComLanguage('会员评论商品送积分数量')}`,
  name: 'orderEvaluate',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('会员购物')}`,
  extra: `${sldComLanguage('会员购物时送积分的比例。如设定10，则表示会员消费200元时，送积分：200/10=20，即送20积分')}`,
  name: 'orderBuy',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('购物送值上限')}`,
  extra: `${sldComLanguage('会员购物时送积分的上限。如设定100，会员消费金额根据上述规则换算后需要送出105积分，则取上限值只送出100积分')}`,
  name: 'orderMax',
  placeholder: '',
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'radio_select',
  label: `${sldComLanguage('使用状态')}`,
  name: 'state',
  placeholder: `${sldComLanguage('请选择使用状态')}`,
  sel_data: [{ key: '1', value: `${sldComLanguage('开启')}` }, { key: '2', value: `${sldComLanguage('关闭')}` }],
}, {
  type: 'button',
  label: '',
  name: 'button',
}];

/*
* 会员管理——等级配置
* */
export const column_grade_config = [{
  type: 'inputnum',
  label: `${sldComLanguage('注册会员经验值')}`,
  help: '',
  name: 'grade1',
  placeholder: `${sldComLanguage('请输入注册会员经验值')}`,
  initialValue: '',
  disabled: true,
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('铜牌会员经验值')}`,
  help: '',
  name: 'grade2',
  placeholder: `${sldComLanguage('请输入铜牌会员经验值')}`,
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('银牌会员经验值')}`,
  help: '',
  name: 'grade3',
  placeholder: `${sldComLanguage('请输入银牌会员经验值')}`,
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('金牌会员经验值')}`,
  help: '',
  name: 'grade4',
  placeholder: `${sldComLanguage('请输入金牌会员经验值')}`,
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('钻石会员经验值')}`,
  help: '',
  name: 'grade5',
  placeholder: `${sldComLanguage('请输入钻石会员经验值')}`,
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'button',
  label: '',
  name: 'button',
}];

/*
* 会员管理——经验值减少配置
* */
export const column_grade_config_down = [{
  type: 'inputnum',
  label: `${sldComLanguage('注册会员年度减少值')}`,
  name: 'grade1',
  placeholder: `${sldComLanguage('请输入注册会员年度减少值')}`,
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('铜牌会员年度减少值')}`,
  name: 'grade2',
  placeholder: `${sldComLanguage('请输入铜牌会员年度减少值')}`,
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('银牌会员年度减少值')}`,
  name: 'grade3',
  placeholder: `${sldComLanguage('请输入银牌会员年度减少值')}`,
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('金牌会员年度减少值')}`,
  name: 'grade4',
  placeholder: `${sldComLanguage('请输入金牌会员年度减少值')}`,
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'inputnum',
  label: `${sldComLanguage('钻石会员年度减少值')}`,
  name: 'grade5',
  placeholder: `${sldComLanguage('请输入钻石会员年度减少值')}`,
  initialValue: '',
  rules: [{
    required: true,
    message: `${sldComLanguage('该项必填')}`,
  }],
}, {
  type: 'button',
  label: '',
  name: 'button',
}];

/*
* 会员管理——充值列表
* */
export const column_balance_pay_log = [
  {
    title: ' ',
    dataIndex: 'id',
    align: 'center',
    width: 55,
  },
  {
    title: `${sldComLanguage('会员账号')}`,
    dataIndex: 'memberName',
    width: 100,
  },
  {
    title: `${sldComLanguage('支付方式名称')}`,
    dataIndex: 'paymentName',
    width: 100,
  },
  {
    title: `${sldComLanguage('支付金额')}`,
    dataIndex: 'payMoney',
    width: 90,
  },
  {
    title: `${sldComLanguage('支付状态')}`,
    dataIndex: 'payState',
    width: 80,
  },
  {
    title: `${sldComLanguage('支付订单号')}`,
    dataIndex: 'paySn',
    width: 150,
  },
  {
    title: `${sldComLanguage('支付交易流水号')}`,
    dataIndex: 'tradeSn',
    width: 200,
  },
  {
    title: `${sldComLanguage('创建时间')}`,
    dataIndex: 'createTime',
    width: 150,
  },
  {
    title: `${sldComLanguage('支付完成时间')}`,
    dataIndex: 'payFinishTime',
    width: 150,
  },
];

/*
* 退货状态
* */
export const common_return_state = [
  { key: '1', name: `${sldComLanguage('未处理')}` },
  // { key: '2', name: '审核通过' },
  // { key: '3', name: '用户发货' },
  // { key: '4', name: '店铺收货' },
  // { key: '5', name: '不予处理' },
];
/*
* 换货状态
* */
export const common_exchange_state = [
  { key: '1', name: `${sldComLanguage('未处理')}` },
  // { key: '2', name: '审核通过' },
  // { key: '3', name: '用户发回退件' },
  // { key: '4', name: '商家收到退件' },
  // { key: '5', name: '商家发出换件' },
  // { key: '6', name: '原件退还' },
  // { key: '7', name: '不予处理' },
];

/*
* 换货状态
* */
export const flash_banner_search_data = [{
  type: 'select',
  label: `${sldComLanguage('使用场景')}`,
  name: 'q_pcMobile',
  placeholder: `${sldComLanguage('请选择使用场景')}`,
  sel_data: [
    { key: '1', name: 'PC' },
    { key: '2', name: 'Mobile' },
  ],
}, {
  type: 'select',
  label: `${sldComLanguage('状态')}`,
  name: 'q_state',
  placeholder: `${sldComLanguage('请选择状态')}`,
  sel_data: [
    { key: '1', name: `${sldComLanguage('启用')}` },
    { key: '0', name: `${sldComLanguage('不启用')}` },
  ],
}];

/*
* 添加/编辑装修模板提示数据
* */
export function add_tpl_tip() {
  return [
    `${sldComLanguage('点击编辑按钮，添加或编辑改模块内容，并根据弹出框体中的提示文字完成内容提交')}`,
    `${sldComLanguage('设置完成后，可点击返回模板列表按钮，回到模板列表页进行其他模板设置操作')}`,
    `${sldComLanguage('小提示：该模版编辑预览页面为实际展示页面效果，所添加编辑的内容即见即所得。')}`,
  ];
}

/*
* 单条广告编辑的modal框提示
* */
export function tpl_adv_01_modal_tip() {
  return [
    `${sldComLanguage('请严格根据提示要求上传规定尺寸的广告图片')}`,
    `${sldComLanguage('编辑项中的“操作”指点击该内容所产生的链接地址，可通过下拉选项选择不同的方式')}`,
  ];
}

/*
* PC装修四栏广告的modal框提示
* */
export function tpl_adv_06_modal_tip() {
  return [
    `${sldComLanguage('一行4张图片，宽度按照指定要求传，高度不限，建议4张图的高度一致')}`,
    `${sldComLanguage('请严格根据提示要求上传规定尺寸的广告图片')}`,
    `${sldComLanguage('编辑项中的“操作”指点击该内容所产生的链接地址，可通过下拉选项选择不同的方式')}`,
  ];
}

/*
* PC装修三栏广告的modal框提示
* */
export function tpl_adv_07_modal_tip() {
  return [
    `${sldComLanguage('一行3张图片，宽度按照指定要求传，高度不限，建议3张图的高度一致')}`,
    `${sldComLanguage('请严格根据提示要求上传规定尺寸的广告图片')}`,
    `${sldComLanguage('编辑项中的“操作”指点击该内容所产生的链接地址，可通过下拉选项选择不同的方式')}`,
  ];
}

/*
* PC装修五栏广告的modal框提示
* */
export function tpl_adv_08_modal_tip() {
  return [
    `${sldComLanguage('一行5张图片，宽度按照指定要求传，高度不限，建议5张图的高度一致')}`,
    `${sldComLanguage('请严格根据提示要求上传规定尺寸的广告图片')}`,
    `${sldComLanguage('编辑项中的“操作”指点击该内容所产生的链接地址，可通过下拉选项选择不同的方式')}`,
  ];
}

/*
* pc首页开屏图的modal框提示
* */
export const pc_home_modal_tip = [
  `${sldComLanguage('“弹出广告开关” 开启后,会员访问PC端商城首页时，会弹出一个图片广告')}`,
  `${sldComLanguage('“弹出方式” 可以设置弹出广告是只弹出一次还是每次访问都会弹出。设置成“仅弹出一次”后访问首页时仅弹出一次。而设置成 “每次访问都弹出”后 ，弹出一次后间隔1个小时后会再次弹出')}`,
  `${sldComLanguage('“广告图片” 可以设置弹出广告显示的图片')}`,
  `${sldComLanguage('“跳转链接” 可以设置点击图片的跳转地址')}`,
];

/*
* pc首页开屏图的select 选择数据
* */
export function pc_home_modaladv_sele_data() {
  return [
    { label: `${sldComLanguage('只弹出一次')}`, value: 'one' },
    { label: `${sldComLanguage('每次访问都弹出')}`, value: 'more' },
  ];
}

/*
* 装修连接选择器-PC端
* */
export function diy_link_type() {
  return [
    { key: '', name: `${sldComLanguage('无操作')}` },
    { key: 'url', name: `${sldComLanguage('链接地址')}` },
    { key: 'keyword', name: `${sldComLanguage('关键字')}` },
    { key: 'goods', name: `${sldComLanguage('商品')}` },
  ];
}


/*
* 装修连接选择器-移动端
* */
export function m_diy_link_type() {
  return [
    { key: '', name: `${sldComLanguage('无操作')}` },
    { key: 'url', name: `${sldComLanguage('链接地址')}` },
    { key: 'keyword', name: `${sldComLanguage('关键字')}` },
    { key: 'goods', name: `${sldComLanguage('商品')}` },
  ];
}

/*
* 商品类型列表
* */
export function type_list_column() {
  return [
    {
      title: ' ',
      align: 'center',
      dataIndex: 'typeId',
      fixed: 'left',
      width: 50,
      render: (text, record, index) => {
        return (comm_cur_page_global.cur - 1) * modal_pageSize_com + index + 1;
      },
    },
    {
      title: `${sldComLanguage('类型名称')}`,
      align: 'center',
      dataIndex: 'typeName',
      width: 150,
    },
    {
      title: `${sldComLanguage('关联规格')}`,
      align: 'center',
      dataIndex: 'goodsSpecList',
      width: 250,
      render: (text) => {
        let spec_names = '';
        if (text.length > 0) {
          text.map((item, index) => {
            spec_names += (index == 0 ? '' : '|') + item.specName;
          });
        }
        return spec_names;
      },
    }, {
      title: `${sldComLanguage('关联品牌')}`,
      align: 'center',
      dataIndex: 'goodsBrandList',
      width: 250,
      render: (text) => {
        let brand_names = '';
        if (text != null && text.length > 0) {
          text.map((item, index) => {
            brand_names += (index == 0 ? '' : '|') + item.brandName;
          });
        }
        return brand_names;
      },
    },
    {
      title: `${sldComLanguage('排序')}`,
      dataIndex: 'sort',
    },


  ];
}

/*
* 生产企业列表
* */
export function enterprise_list_column() {
  return [
    {
      title: ' ',
      align: 'center',
      dataIndex: 'enterprisesId',
      fixed: 'left',
      width: 50,
      render: (text, record, index) => {
        return (comm_cur_page_global.cur - 1) * modal_pageSize_com + index + 1;
      },
    },
    {
      title: `${sldComLanguage('企业名称')}`,
      align: 'center',
      dataIndex: 'enterprisesName',
      width: 150,
    }, {
      title: `${sldComLanguage('企业简称')}`,
      align: 'center',
      dataIndex: 'enterprisesAbbreviation',
      width: 150,
    }, {
      title: `${sldComLanguage('企业注册地址')}`,
      align: 'center',
      dataIndex: 'enterprisesAddress',
      width: 250,
    }, {
      title: `${sldComLanguage('企业曾用名')}`,
      align: 'center',
      dataIndex: 'enterpriseFormerName',
      width: 150,
    },
    {
      title: `${sldComLanguage('所在地域')}`,
      dataIndex: 'locationValue',
    },
  ];
}

export const resize_style = { background: 'transparent', borderWidth: 0 };

/*
* 空数组
* */
export const sld_com_empty_arrar_2 = [1, 2];
export const sld_com_empty_arrar_3 = [1, 2, 3];
export const sld_com_empty_arrar_4 = [1, 2, 3, 4];
export const sld_com_empty_arrar_5 = [1, 2, 3, 4, 5];
export const sld_com_empty_arrar_6 = [1, 2, 3, 4, 5, 6];
export const sld_com_empty_arrar_7 = [1, 2, 3, 4, 5, 6, 7];
export const sld_com_empty_arrar_8 = [1, 2, 3, 4, 5, 6, 7, 8];
export const sld_com_empty_arrar_9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const sld_m_diy_tpzh_style = [{
  img: require('../assets/m_diy_img/tpzh/show_style0.png'),
  sele_style: 0,
}, {
  img: require('../assets/m_diy_img/tpzh/show_style1.png'),
  sele_style: 1,
}, {
  img: require('../assets/m_diy_img/tpzh/show_style2.png'),
  sele_style: 2,
}, {
  img: require('../assets/m_diy_img/tpzh/show_style3.png'),
  sele_style: 3,
}, {
  img: require('../assets/m_diy_img/tpzh/show_style4.png'),
  sele_style: 4,
}, {
  img: require('../assets/m_diy_img/tpzh/show_style5.png'),
  sele_style: 5,
}, {
  img: require('../assets/m_diy_img/tpzh/show_style6.png'),
  sele_style: 6,
}, {
  img: require('../assets/m_diy_img/tpzh/show_style7.png'),
  sele_style: 7,
}];

/*
* 修改配置成功后，需点击右上角更新配置按钮更新配置才可生效
* */
export const sld_need_update_setting = [`${sldComLanguage('修改配置成功后，需点击右上角更新配置按钮更新配置才可生效')}`];


/*
*  修改域名配置的提示
* */
export const sld_domain_manage_tip = [`${sldComLanguage('域名更改一定要确保正确，否则将影响该系统的使用')}`];

/*
*  订单配置-订单导出的配置的提示
* */
export const sld_order_export_tip = [`${sldComLanguage('选中的字段将在订单导出的时候导出该数据，修改配置成功后，需点击右上角更新配置按钮更新配置才可生效')}`];

/*
*  系统配置-基本配置-保存按钮
* */
export const sld_config_save_btn = {
  type: 'button',
  label: '',
  name: 'button',
};


export function week_day() {
  return [`${sldComLanguage('周日')}`, `${sldComLanguage('周一')}`, `${sldComLanguage('周二')}`, `${sldComLanguage('周三')}`, `${sldComLanguage('周四')}`, `${sldComLanguage('周五')}`, `${sldComLanguage('周六')}`];
}

/*
*  运营配置-平台收款账号配置提示
* */
export const sld_sys_amount_tip = [`${sldComLanguage('填写平台收款账号的信息，相关信息会出现在需要向平台汇款的页面，修改配置成功后，需点击右上角更新配置按钮更新配置才可生效')}`];


//TAB切换购物车图标
export const cart_icon_data = [
  {
    icon: 'gouwuche',
    width: 23,
    type: 1,
    padding: 5,
  }, {
    icon: 'shoppingCart',
    width: 23,
    type: 2,
    padding: 5,
  }, {
    icon: 'add-sy',
    width: 23,
    type: 3,
    padding: 5,
  }, {
    icon: 'ziyuan110',
    width: 23,
    type: 4,
    padding: 5,
  }, {
    icon: 'jinzhi',
    width: 19,
    type: 5,
    padding: 7,
  },
];
//TAB切换购物车展示图标
export const show_cart_icon_data = [
  {
    icon: 'gouwuche',
    width: 20,
    type: 1,
  }, {
    icon: 'shoppingCart',
    width: 18,
    type: 2,
  }, {
    icon: 'add-sy',
    width: 22,
    type: 3,
  }, {
    icon: 'ziyuan110',
    width: 22,
    type: 4,
  },
];

//短视频空图片
export const video_defalut_img = {
  one: require('../assets/m_diy_img/svideo/center_empty_one.png'),
  two: require('../assets/m_diy_img/svideo/center_empty_two.png'),
  three: require('../assets/m_diy_img/svideo/center_empty_three.png'),
  four: require('../assets/m_diy_img/svideo/center_empty_four.png'),
  five: require('../assets/m_diy_img/svideo/center_empty_five.png'),
};

//直播空图片
export const live_defalut_img = {
  one: require('../assets/m_diy_img/live/center_empty_one.png'),
  two: require('../assets/m_diy_img/live/center_empty_two.png'),
};

//活动组默认图片
export const activity_default_img = {
  pin: require('../assets/m_diy_img/activity/center_pin.png'),
  discount: require('../assets/m_diy_img/activity/center_discount.png'),
  group_buy: require('../assets/m_diy_img/activity/center_group_buy.png'),
};

//活动组活动类型
export function sld_m_diy_activity_style() {
  return [{
    img: require('../assets/m_diy_img/activity/show_style_pin.png'),
    sele_style: 'pin',
    name: `${sldComLanguage('拼团')}`,
  }, {
    img: require('../assets/m_diy_img/activity/show_style_discount.png'),
    sele_style: 'discount',
    name: `${sldComLanguage('限时折扣')}`,
  }, {
    img: require('../assets/m_diy_img/activity/show_style_group_buy.png'),
    sele_style: 'group_buy',
    name: `${sldComLanguage('团购')}`,
  }];
}

//公告风格
export const sld_m_diy_notice_style = [{
  img: require('../assets/m_diy_img/notice/show_style1.png'),
  left_img: require('../assets/m_diy_img/notice/left_icon_1.png'),
  sele_style: 'one',
}, {
  img: require('../assets/m_diy_img/notice/show_style2.png'),
  left_img: require('../assets/m_diy_img/notice/left_icon_2.png'),
  sele_style: 'two',
}];

/*
* 手机装修顶部分类导航数据
* */
export const m_diy_swiper_data = [{
  img: require('../assets/m_diy_img/top_nav_cat/swiper1.png'),
  bg_color: '#E81832',
}, {
  img: require('../assets/m_diy_img/top_nav_cat/swiper2.png'),
  bg_color: '#1C6BFC',
}, {
  img: require('../assets/m_diy_img/top_nav_cat/swiper3.png'),
  bg_color: '#11986B',
}];


//多语言匹配—— key为前端对应的语言类型，val为接口需要的语言类型
export const language_type = [{
  key: 'zh-CN',
  val: 'zh',
}, {
  key: 'en-US',
  val: 'en',
}];

//数字转为对应的汉字
export function num_to_num() {
  return {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
  };
}

/*
* 流量统计-流量总览-浏览访问数据
* */
export function statFlowViewNumData() {
  return {
    icon: require('@/assets/flow_head_icon-2.png'),
    title: `${sldComLanguage('浏览访问')}`,
    list: [
      {
        name: `${sldComLanguage('店铺访客数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，店铺内所有页面被访问的去重人数')}`,
        mapKey: 'visitorNum',
        mapDifferentKey: 'preVisitorNum',
        differenceNum: '',
      },
      {
        name: `${sldComLanguage('店铺浏览量')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，店铺内所有页面被访问的次数')}`,
        mapKey: 'viewNum',
        mapDifferentKey: 'preViewNum',
        differenceNum: '',
      },
      {
        name: `${sldComLanguage('人均浏览量')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('店铺浏览量/店铺访客数')}`,
        mapKey: 'perViewNum',
        mapDifferentKey: 'prePerViewNum',
        differenceNum: '',
      },
      {
        name: `${sldComLanguage('商品访客数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，访问店铺内商品详情页的去重人数')}`,
        mapKey: 'goodsVisitorNum',
        mapDifferentKey: 'preGoodsVisitorNum',
        differenceNum: '',
      },
      {
        name: `${sldComLanguage('商品浏览量')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，访问店铺内商品详情页的人次数')}`,
        mapKey: 'goodsViewNum',
        mapDifferentKey: 'preGoodsViewNum',
        differenceNum: '',
      },
    ],
  };
}

/*
* 流量统计-流量总览-成交转化数据
* */
export function statFlowOrderPayRateData() {
  return {
    icon: require('@/assets/flow_head_icon-1.png'),
    title: `${sldComLanguage('成交转化')}`,
    list: [
      {
        name: `${sldComLanguage('支付人数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，统计时间内，成功付款的去重人数，拼团在成团时计入付款人数；定金预售在尾款支付时计入付款人数；')}`,
        mapKey: 'orderPayMemberNum',
        mapDifferentKey: 'preOrderPayMemberNum',
        differenceNum: '',
      },
      {
        name: `${sldComLanguage('支付订单数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，该店铺下所有已支付订单的总数量')}`,
        mapKey: 'orderPayNum',
        mapDifferentKey: 'preOrderPayNum',
        differenceNum: '',
      },
      {
        name: `${sldComLanguage('支付金额(元)')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，所有支付订单金额之和，会员储值不计算在内。\n')}` +
          `${sldComLanguage('拼团在成团时计入支付金额；定金预售在尾款支付时计入支付金额。')}`,
        mapKey: 'orderPayAmount',
        mapDifferentKey: 'preOrderPayAmount',
        differenceNum: '',
        isMoney: true,
      },
      {
        name: `${sldComLanguage('支付客单价(元)')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，付款金额/付款人数')}`,
        mapKey: 'orderPayAtv',
        mapDifferentKey: 'preOrderPayAtv',
        differenceNum: '',
        isMoney: true,
      },
      {
        name: `${sldComLanguage('浏览-支付转化率')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，支付人数/店铺访客数')}`,
        mapKey: 'pvPayRate',
        mapDifferentKey: 'prePvPayRate',
        differenceNum: '',
      },
    ],
  };
}

/*
* 流量统计30天变化趋势类型
* */
export function statFlowChangeTrendTypeData() {
  return {
    'visitorNum': `${sldComLanguage('店铺访客数')}`,
    'viewNum': `${sldComLanguage('店铺浏览量')}`,
    'perViewNum': `${sldComLanguage('人均浏览量')}`,
    'goodsVisitorNum': `${sldComLanguage('商品访客数')}`,
    'goodsViewNum': `${sldComLanguage('商品浏览量')}`,
    'orderPayMemberNum': `${sldComLanguage('支付人数')}`,
    'orderPayNum': `${sldComLanguage('支付订单数')}`,
    'pvPayRate': `${sldComLanguage('浏览-支付转化率')}`,
  };
}

/*
* 流量统计30天变化趋势模块筛选项数据
* */
export function statFlowChangeTrendTypeSelectedData() {
  return [
    { label: `${sldComLanguage('店铺访客数')}`, value: 'visitorNum' },
    { label: `${sldComLanguage('店铺浏览量')}`, value: 'viewNum' },
    { label: `${sldComLanguage('人均浏览量')}`, value: 'perViewNum' },
    { label: `${sldComLanguage('商品访客数')}`, value: 'goodsVisitorNum' },
    { label: `${sldComLanguage('商品浏览量')}`, value: 'goodsViewNum' },
    { label: `${sldComLanguage('支付人数')}`, value: 'orderPayMemberNum' },
    { label: `${sldComLanguage('支付订单数')}`, value: 'orderPayNum' },
    { label: `${sldComLanguage('浏览-支付转化率')}`, value: 'pvPayRate' },
  ];
}

/*
* 流量统计模块柱状图样式
* */
export function statFlowBarColor() {
  return {
    two: ['name', ['l(270) 0:rgba(173, 197, 255, 1) 1:rgba(87, 131, 255, 1)', 'l(270) 0:rgba(147, 238, 210, 0.85) 1:rgba(90, 216, 166, 0.85)']],
    single: ['name', ['l(270) 0:rgba(173, 197, 255, 1) 1:rgba(87, 131, 255, 1)']],
  };
}

/*
* 统计模块时间搜索初始化参数(昨日的起止时间)
* */
export function statDateSearchParams() {
  return {
    startTime: (moment().subtract(1, 'days').format('YYYY-MM-DD') + ' 00:00:00'),
    endTime: (moment().subtract(1, 'days').format('YYYY-MM-DD') + ' 23:59:59:999'),
  };
}

/*
* 统计模块时间搜索初始化参数(昨日、近7天、近30天的起止时间)
* */
export function statDateThreeSearchParams() {
  return [
    {
      startTime: (moment().subtract(1, 'days').format('YYYY-MM-DD') + ' 00:00:00'),
      endTime: (moment().subtract(1, 'days').format('YYYY-MM-DD') + ' 23:59:59:999'),
    },
    {
      startTime: (moment().subtract(7, 'days').format('YYYY-MM-DD') + ' 00:00:00'),
      endTime: (moment().subtract(1, 'days').format('YYYY-MM-DD') + ' 23:59:59:999'),
    },
    {
      startTime: (moment().subtract(30, 'days').format('YYYY-MM-DD') + ' 00:00:00'),
      endTime: (moment().subtract(1, 'days').format('YYYY-MM-DD') + ' 23:59:59:999'),
    },
  ];
}

/*
* 商品统计模块商品总览数据
* */
export function statGoodsPreviewData() {
  return [
    {
      name: `${sldComLanguage('商品SPU总数')}`,
      isShowOperate: false,
      num: '',
      differenceNum: '',
      bg: require('@/assets/goods_item_bg_1.png'),
      mapValue: 'goodsTotalNum',
      mapDifferentValue: '',
      isDifferenceShow: false,
      customParams: [
        { key: `${sldComLanguage('在售商品数')}`, value: '' },
        { key: `${sldComLanguage('违规下架商品数')}`, value: '' },
      ],
    },
    {
      name: `${sldComLanguage('动销商品数')}`,
      isShowOperate: true,
      num: '',
      differenceNum: '',
      bg: require('@/assets/goods_item_bg_2.png'),
      mapValue: 'movableGoodsNum',
      mapDifferentValue: 'preMovableGoods',
      isDifferenceShow: true,
    },
    {
      name: `${sldComLanguage('新增商品数')}`,
      isShowOperate: true,
      num: '',
      differenceNum: '',
      bg: require('@/assets/goods_item_bg_3.png'),
      mapValue: 'newGoodsNum',
      mapDifferentValue: 'preNewGoods',
      isDifferenceShow: true,
    },
    {
      name: `${sldComLanguage('支付金额(元)')}`,
      isShowOperate: true,
      num: '',
      differenceNum: '',
      bg: require('@/assets/goods_item_bg_4.png'),
      isDifferenceShow: true,
      mapValue: 'orderPayAmount',
      mapDifferentValue: 'preOrderPay',
    },
    {
      name: `${sldComLanguage('下单数')}`,
      isShowOperate: true,
      num: '',
      differenceNum: '',
      bg: require('@/assets/goods_item_bg_5.png'),
      mapValue: 'orderSubmitNum',
      mapDifferentValue: 'preOrderSubmit',
      isDifferenceShow: true,
    },
  ];
}

/*
* 商品统计模块商品动销趋势的筛选项
* */
export function statGoodsSalesTendTypeData() {
  return [
    { label: `${sldComLanguage('新增商品数')}`, value: 'newGoodsList' },
    { label: `${sldComLanguage('动销商品数')}`, value: 'movableGoodsList' },
    { label: `${sldComLanguage('下单数')}`, value: 'orderNumList' },
    { label: `${sldComLanguage('下单金额')}`, value: 'orderAmountList' },
    { label: `${sldComLanguage('支付订单数')}`, value: 'orderPayNumList' },
    { label: `${sldComLanguage('支付金额')}`, value: 'orderPayAmountList' },
  ];
}

/*
* 商品统计模块商品动销趋势图表的line颜色
* */
export function statGoodsSalesTendLineColor() {
  return ['city', 'rgba(30, 135, 240, 1)'];
}

/*
* 商品统计模块商品动销趋势图表的area颜色
* */
export function statGoodsSalesTendAreaColor() {
  return ['city',
    ['l(90) 0:rgba(30, 135, 240, 0.38) 0.5:rgba(30, 135, 240, 0.18) 1:rgba(30, 135, 240, 0)',
    ],
  ];
}

/*
* 用户分析模块用户总览数据
* */
export function statMemberOverViewData() {
  return [
    {
      name: `${sldComLanguage('用户总数')}`,
      isShowOperate: false,
      num: '',
      differenceNum: '',
      bg: require('@/assets/store_item_bg_1.png'),
      mapValue: 'memberNum',
      mapDifferentValue: '',
      isDifferenceShow: false,
    },
    {
      name: `${sldComLanguage('新增用户数')}`,
      isShowOperate: true,
      num: '',
      differenceNum: '',
      bg: require('@/assets/store_item_bg_2.png'),
      mapValue: 'newMemberNum',
      mapDifferentValue: 'preNewMember',
      isDifferenceShow: true,
    },
    {
      name: `${sldComLanguage('店铺访客数')}`,
      isShowOperate: true,
      num: '',
      differenceNum: '',
      bg: require('@/assets/store_item_bg_3.png'),
      mapValue: 'visitorNum',
      mapDifferentValue: 'preVisitor',
      isDifferenceShow: true,
    },
    {
      name: `${sldComLanguage('支付人数')}`,
      isShowOperate: true,
      num: '',
      differenceNum: '',
      bg: require('@/assets/store_item_bg_4.png'),
      mapValue: 'payMemberNum',
      mapDifferentValue: 'prePayMember',
      isDifferenceShow: true,
    },
  ];
}

/*
* 用户分析模块变化趋势的筛选项
* */
export function statMemberChangeTrendTypeData() {
  return [
    { label: `${sldComLanguage('新增用户数')}`, value: 'newMemberNum' },
    { label: `${sldComLanguage('店铺访客数')}`, value: 'visitorNum' },
    { label: `${sldComLanguage('下单人数')}`, value: 'orderSubmitMemberNum' },
    { label: `${sldComLanguage('支付人数')}`, value: 'orderPayMemberNum' },
    { label: `${sldComLanguage('关注店铺人数')}`, value: 'collectionStoreNum' },
  ];
}

/*
* 用户分析模块变化趋势图表的line颜色
* */
export function statMemberChangeTrendLineColor() {
  return ['city', 'rgba(91, 143, 249, 1)-rgba(90, 216, 166, 1)-rgba(93, 112, 146, 1)-rgba(246, 189, 22, 1)-rgba(232, 104, 74, 1)'];
}

/*
* 用户分析模块变化趋势图表的area颜色
* */
export function statMemberChangeTrendAreaColor() {
  return ['city',
    ['l(90) 0:rgba(91, 143, 249, 1) 0.5:rgba(91, 143, 249, 1) 1:rgba(91, 143, 249, 1)',
      'l(90) 0:rgba(90, 216, 166, 1)) 0.5:rgba(90, 216, 166, 1) 1:rgba(90, 216, 166, 1)',
      'l(90) 0:rgba(93, 112, 146, 1)) 0.5:rgba(93, 112, 146, 1) 1:rgba(93, 112, 146, 1)',
      'l(90) 0:rgba(246, 189, 22, 1)) 0.5:rgba(246, 189, 22, 1) 1:rgba(246, 189, 22, 1)',
      'l(90) 0:rgba(232, 104, 74, 1)) 0.5:rgba(232, 104, 74, 1) 1:rgba(232, 104, 74, 1)',
    ],
  ];
}

/*
* 实时分析模块今日实时数据
* */
export function statRealTimeTodayData() {
  return {
    icon: require('@/assets/real_icon_2.png'),
    title: `${sldComLanguage('今日实时')}`,
    list: [
      {
        name: `${sldComLanguage('今日销售额(元)')}`,
        value: '',
        isHelpIcon: false,
        tip: `${sldComLanguage('今日0时至当前时间的销售额')}`,
        mapKey: 'orderPayAmount',
        isMoney: true,
      },
      {
        name: `${sldComLanguage('新增用户数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，注册并首次访问店铺的用户数')}`,
        mapKey: 'newMemberNum',
      },
      {
        name: `${sldComLanguage('新增商品数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，店铺新增商品spu数')}`,
        mapKey: 'newGoodsNum',
      },
      {
        name: `${sldComLanguage('动销商品数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，销量不为0的商品数')}`,
        mapKey: 'salingGoodsNum',
      },
      {
        isBr: true,
      },
      {
        name: `${sldComLanguage('店铺访客数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，店铺内所有页面被访问的去重人数')}`,
        mapKey: 'visitorNum',
      },
      {
        name: `${sldComLanguage('店铺浏览量')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，店铺内所有页面被访问的次数')}`,
        mapKey: 'viewNum',
      },
      {
        name: `${sldComLanguage('商品访客数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，访问店铺内商品详情页的去重人数')}`,
        mapKey: 'goodsVisitorNum',
      },
      {
        name: `${sldComLanguage('商品浏览量')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，访问店铺内商品详情页的人次数')}`,
        mapKey: 'goodsViewNum',
      },
      {
        isBr: true,
      },
      {
        name: `${sldComLanguage('下单数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，客户成功提交订单的笔数')}`,
        mapKey: 'orderSubmitNum',
      },
      {
        name: `${sldComLanguage('下单人数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，成功提交订单的去重人数')}`,
        mapKey: 'orderSubmitMemberNum',
      },
      {
        name: `${sldComLanguage('下单金额(元)')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，客户成功提交订单的总金额')}`,
        mapKey: 'orderSubmitAmount',
        isMoney: true,
      },
      {
        name: `${sldComLanguage('下单客单价(元)')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，下单金额/下单人数')}`,
        mapKey: 'orderSubmitAtv',
        isMoney: true,
      },
      {
        name: `${sldComLanguage('访问-下单转化率')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，下单人数/店铺访客数')}`,
        mapKey: 'pvSubmitRate',
      },
      {
        isBr: true,
      },
      {
        name: `${sldComLanguage('支付订单数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，该店铺下所有已支付订单的总数量')}`,
        mapKey: 'orderPayNum',
      },
      {
        name: `${sldComLanguage('支付人数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，成功付款的去重人数，拼团在成团时计入付款人数；定金预售在尾款支付时计入付款人数；')}`,
        mapKey: 'orderPayMemberNum',
      },
      {
        name: `${sldComLanguage('支付金额(元)')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，所有支付订单金额之和，会员储值不计算在内。\n' +
          '拼团在成团时计入支付金额；定金预售在尾款支付时计入支付金额。')}`,
        mapKey: 'orderPayAmount',
        isMoney: true,
      },
      {
        name: `${sldComLanguage('支付客单价(元)')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，支付金额/支付人数')}`,
        mapKey: 'orderPayAtv',
        isMoney: true,
      },
      {
        name: `${sldComLanguage('访问-支付转化率')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('统计时间内，支付人数/店铺访客数')}`,
        mapKey: 'pvPayRate',
      },
    ],
  };
}

/*
* 实时分析模块店铺汇总数据
* */
export function statRealTimeStoreData() {
  return {
    icon: require('@/assets/real_icon_1.png'),
    title: `${sldComLanguage('店铺汇总')}`,
    list: [
      {
        name: `${sldComLanguage('销售总额(元)')}`,
        value: '',
        isHelpIcon: false,
        tip: ``,
        mapKey: 'orderPayAmountTotal',
        isMoney: true,
      },
      {
        name: `${sldComLanguage('用户总数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('在本店铺有过浏览行为的历史去重人数总和')}`,
        mapKey: 'memberNum',
      },
      {
        name: `${sldComLanguage('在售商品数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('截止至当前时间状态为在售的商品数量')}`,
        mapKey: 'saleGoodsNum',
      },
      {
        name: `${sldComLanguage('关注店铺人数')}`,
        value: '',
        isHelpIcon: true,
        tip: `${sldComLanguage('截止至当前时间，关注店铺的累计用户数')}`,
        mapKey: 'followMemberNum',
      },
    ],
  };
}

/*
* 交易分析模块转化率类型数据
* */
export function statTradeChartsInfoGatherData() {
  return [
    {
      value: `${sldComLanguage('浏览')}`,
      iconSrc: require('@/assets/charts_li_icon-3.png'),
    },
    {
      value: `${sldComLanguage('下单')}`,
      iconSrc: require('@/assets/charts_li_icon-1.png'),
    },
    {
      value: `${sldComLanguage('支付')}`,
      iconSrc: require('@/assets/charts_li_icon-2.png'),
    },
  ];
}

/*
* 交易分析模块交易总览数据
* */
export function statTradeOverViewData() {
  return [
    {
      children: [
        {
          label: `${sldComLanguage('店铺浏览量')}`,
          num: '',
          differenceNum: '',
          isUp: false,
          tip: `${sldComLanguage('统计时间内，店铺内所有页面被访问的次数')}`,
          mapValue: 'viewNum',
          mapDifferentValue: 'previousViewNum',
        },
        {
          label: `${sldComLanguage('店铺访客数')}`,
          num: '',
          differenceNum: '',
          isUp: false,
          tip: `${sldComLanguage('统计时间内，店铺内所有页面被访问的去重人数')}`,
          mapValue: 'visitorNum',
          mapDifferentValue: 'previousVisitorNum',
        },
      ],
    },
    {
      children: [
        {
          label: `${sldComLanguage('下单金额(元)')}`,
          num: '',
          differenceNum: '',
          isUp: false,
          tip: `${sldComLanguage('统计时间内，全平台用户成功提交订单的金额总和')}`,
          mapValue: 'orderSubmitAmount',
          mapDifferentValue: 'previousOrderSubmitAmount',
          isMoney: true,
        },
        {
          label: `${sldComLanguage('下单数')}`,
          num: '',
          differenceNum: '',
          isUp: false,
          tip: `${sldComLanguage('统计时间内，全平台用户成功提交订单的笔数总和')}`,
          mapValue: 'orderSubmitNum',
          mapDifferentValue: 'previousOrderSubmitNum',
        },
        {
          label: `${sldComLanguage('下单人数')}`,
          num: '',
          differenceNum: '',
          isUp: false,
          tip: `${sldComLanguage('统计时间内，全平台成功提交订单的去重人数总和')}`,
          mapValue: 'orderSubmitMemberNum',
          mapDifferentValue: 'previousOrderSubmitMemberNum',
        },
        {
          label: `${sldComLanguage('下单客单价(元)')}`,
          num: '',
          differenceNum: '',
          isUp: false,
          tip: `${sldComLanguage('统计时间内，全平台下单金额/下单人数')}`,
          mapValue: 'orderSubmitAtv',
          mapDifferentValue: 'previousOrderSubmitAtv',
          isMoney: true,

        },
      ],
    },
    {
      children: [
        {
          label: `${sldComLanguage('支付金额(元)')}`,
          num: '',
          differenceNum: '',
          isUp: false,
          tip: `${sldComLanguage('统计时间内，全平台用户成功支付的金额总和')}`,
          mapValue: 'orderPayAmount',
          mapDifferentValue: 'previousOrderPayAmount',
          isMoney: true,

        },
        {
          label: `${sldComLanguage('支付订单数')}`,
          num: '',
          differenceNum: '',
          isUp: false,
          tip: `${sldComLanguage('统计时间内，全平台用户成功支付的订单数量总和')}`,
          mapValue: 'orderPayNum',
          mapDifferentValue: 'previousOrderPayNum',
        },
        {
          label: `${sldComLanguage('支付人数')}`,
          num: '',
          differenceNum: '',
          isUp: false,
          tip: `${sldComLanguage('统计时间内，全平台成功付款的去重人数总和')}`,
          mapValue: 'orderPayMemberNum',
          mapDifferentValue: 'previousOrderPayMemberNum',
        },
        {
          label: `${sldComLanguage('支付客单价(元)')}`,
          num: '',
          differenceNum: '',
          isUp: false,
          tip: `${sldComLanguage('统计时间内，全平台支付金额/下单人数')}`,
          mapValue: 'orderPayAtv',
          mapDifferentValue: 'previousOrderPayAtv',
          isMoney: true,
        },
      ],
    },
  ];
}

/*
* 交易分析模块近30天变化趋势的筛选项
* */
export function statTradeChangeTrendTypeData() {
  return [
    { label: `${sldComLanguage('下单金额/支付金额')}`, value: 'orderSubmitAmount' },
    { label: `${sldComLanguage('下单数/支付订单数')}`, value: 'orderSubmitNum' },
    { label: `${sldComLanguage('下单客单价/支付客单价')}`, value: 'orderSubmitAtv' },
    { label: `${sldComLanguage('店铺浏览量')}`, value: 'viewNum' },
    { label: `${sldComLanguage('浏览-支付转化率')}`, value: 'pvPayRate' },
  ];
}

/*
* 交易分析模块柱状图颜色
* */
export function statTradeBarColor() {
  return {
    two: ['name', ['l(270) 0:rgba(173, 197, 255, 1) 1:rgba(87, 131, 255, 1)', 'l(270) 0:rgba(147, 238, 210, 0.85) 1:rgba(90, 216, 166, 0.85)']],
    single: ['name', ['l(270) 0:rgba(173, 197, 255, 1) 1:rgba(87, 131, 255, 1)']],
  };
}

/*
* 首页概况今日统计数据
* */
export function simpleStatTodayData() {
  return [
    {
      update_time: '',
      label: '今日交易概况',
      children: [
        {
          key: '下单数',
          value: '',
          tip: '统计时间内，客户成功提交订单的笔数。',
          mapKey: 'orderSubmitNum',
        },
        {
          key: '下单金额(元)',
          value: '',
          tip: '统计时间内，客户成功提交订单的总金额。',
          mapKey: 'orderSubmitAmount',
          isMoney: true,
        },
        {
          key: '支付订单数',
          value: '',
          tip: '统计时间内，该店铺下所有已支付订单的总数量。',
          mapKey: 'orderPayNum',
        },
        {
          key: '支付金额(元)',
          value: '',
          tip: '统计时间内，所有支付订单金额之和，会员储值不计算在内。拼团在成团时计入支付金额；定金预售在尾款支付时计入支付金额。',
          mapKey: 'orderPayAmount',
          isMoney: true,
        },
      ],
    },
    {
      update_time: '',
      label: '今日流量概况',
      children: [
        {
          key: '店铺访客数',
          value: '',
          tip: '统计时间内，店铺内所有页面被访问的去重人数。',
          mapKey: 'visitorNum',
        },
        {
          key: '店铺浏览量',
          value: '',
          tip: '统计时间内，店铺内所有页面被访问的次数。',
          mapKey: 'viewNum',
        },
        {
          key: '商品访客数',
          value: '',
          tip: '统计时间内，访问店铺内商品详情页的去重人数。',
          mapKey: 'goodsVisitorNum',
        },
        {
          key: '商品浏览量',
          value: '',
          tip: '统计时间内，访问店铺内商品详情页的次数。',
          mapKey: 'goodsViewNum',
        },
      ],
    },
    {
      update_time: '',
      label: '今日商品概况',
      children: [
        {
          key: '商品总数',
          value: '',
          tip: '截止至当前时间，店铺内商品spu总数。',
          mapKey: 'goodsNum',
        },
        {
          key: '新增商品数',
          value: '',
          tip: '统计时间内，店铺新增商品spu数。',
          mapKey: 'newGoodsNum',
        },
        {
          key: '在售商品数',
          value: '',
          tip: '截止至当前时间状态为在售的商品数量。',
          mapKey: 'saleGoodsNum',
        },
        {
          key: '动销商品数',
          value: '',
          tip: '统计时间内，销量不为0的商品数。',
          mapKey: 'salingGoodsNum',
        },
      ],
    },
    {
      update_time: '',
      label: '今日用户概况',
      children: [
        {
          key: '用户总数',
          value: '',
          tip: '在本店铺有过浏览行为的历史去重人数总和。',
          mapKey: 'memberNum',
        },
        {
          key: '新增用户数',
          value: '',
          tip: '统计时间内，注册并首次访问店铺的用户数。',
          mapKey: 'newMemberNum',
        },
        {
          key: '支付客单价(元)',
          value: '',
          tip: '统计时间内，支付金额/支付人数。',
          mapKey: 'orderPayAtv',
          isMoney: true,
        },
        {
          key: '支付人数',
          value: '',
          tip: '统计时间内，成功付款的去重人数，拼团在成团时计入支付人数；定金预售在尾款支付时计入支付人数。',
          mapKey: 'orderPayMemberNum',
        },
      ],
    },
  ];
}

/*
* 首页概况今日待处理数据
* */
export function simpleStatWaitEventData() {
  return [
    {
      label: '待发货',
      num: '',
      mapKey: 'deliverOrderNum',
      path: '/order/order_deliver',
    },
    {
      label: '售后中订单',
      num: '',
      mapKey: 'orderReturnNum',
      path: '/order/service',
    },
    {
      label: '违规商品',
      num: '',
      mapKey: 'sysLowerGoodsNum',
      path: '/goods/goods_list?tab=4',
    }, {
      label: '待确定结算单',
      num: '',
      mapKey: 'confirmBillNum',
      path: '/bill/lists',
    },
  ];
}

/*
* 发布商品-虚拟商品—预留信息限制的筛选项
* */
export function reserveInfoLimitType() {
  return [
    { value: `${sldComLanguage('手机号')}`, key: 1 },
    { value: `${sldComLanguage('身份证号')}`, key: 2 },
    { value: `${sldComLanguage('数字格式')}`, key: 3 },
    { value: `${sldComLanguage('文本格式')}`, key: 4 },
    { value: `${sldComLanguage('邮箱格式')}`, key: 5 },
  ];
}
