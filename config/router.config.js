export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  // 商户入驻路由
  {
    path: '/apply',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/CheckSettle'],
    routes: [
      // { path: '/apply', redirect: '/user/login' },
      //start
      //入驻
      {
        path: '/apply/settled',
        icon: 'usergroup-add',
        name: '',
        component: './settledManage/settled/index',
      },
      //入驻协议
      {
        path: '/apply/settled_protocol',
        icon: 'file-done',
        name: 'apply_protocol',
        component: './settledManage/protocol/index',
      },
      //店铺基本信息
      {
        path: '/apply/base_info',
        icon: 'trophy',
        name: 'apply_base_info',
        component: './settledManage/baseInfo/index',
      },
      //经营信息
      {
        path: '/apply/business_info',
        icon: 'dollar',
        name: 'apply_business_info',
        component: './settledManage/businessInfo/index',
      },
      //店铺开通
      {
        path: '/apply/open_up',
        icon: 'control',
        name: 'apply_open_up',
        component: './settledManage/openUp/open_up',
      },
    ],
  },
  //PC装修页面
  {
    path: '/store/decorate_pc_home_to_edit',
    component: '../layouts/UserLayout',
    Routes: ['src/pages/CheckLogin'],
    routes: [
      { path: '/store/decorate_pc_home_to_edit', component: './store/pc_diy/edit_diy_page' },
    ],
  },
  //商品详情
  {
    path: '/goods/goods_detail',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/goods/goods_detail', component: './goods/goods_common_detail' },
    ],
  },
  //订单详情
  {
    path: '/order/order_detail',
    component: '../layouts/UserLayout',
    name: '',
    routes: [
      { path: '/order/order_detail', component: './order/order_common_detail' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/CheckLogin'],
    routes: [
      // { path: '/', redirect: '/basic/simple_stat' },
      //概况页
      {
        path: '/basic/simple_stat',
        icon: 'setting',
        name: 'basic_simple_stat',
        component: './basic/simple_stat',
      },
      //商品列表
      {
        path: '/goods/goods_list',
        icon: 'shopping',
        name: 'goods_goods_list',
        component: './goods/goods_list',
      },
      //发布商品
      {
        path: '/goods/goods_list_to_add',
        icon: '',
        name: '',
        component: './goods/add_goods',
      },
      //仓库中商品
      {
        path: '/goods/goods_storage_list',
        icon: 'project',
        name: 'goods_goods_storage_list',
        component: './goods/goods_storage_lists_title',
      },
      //仓库中商品_发布商品
      {
        path: '/goods/goods_storage_list_to_add',
        icon: '',
        name: '',
        component: './goods/add_goods',
      },
      //待审核商品
      {
        path: '/goods/goods_check_list',
        icon: 'audit',
        name: 'goods_goods_check_list',
        component: './goods/goods_check_lists_title',
      },
      //待审核商品_发布商品
      {
        path: '/goods/goods_check_list_to_add',
        icon: '',
        name: '',
        component: './goods/add_goods',
      },
      //关联版式
      {
        path: '/goods/related_template',
        icon: 'api',
        name: 'goods_related_template',
        component: './goods/related_template',
      },
      //编辑关联版式
      {
        path: '/goods/related_template_to_edit',
        name: '',
        component: './goods/edit_related_template',
      },
      //自定义属性组
      {
        path: '/goods/attribute_group',
        icon: 'layout',
        name: 'goods_attribute_group',
        component: './goods/attribute_group',
      },
      //自定义属性列表
      {
        path: '/goods/attribute_group_to_detail',
        name: '',
        component: './goods/attribute_list',
      },
      //商品导入
      {
        path: '/goods/goods_import',
        icon: 'cloud-upload',
        name: 'goods_import',
        component: './goods/goods_import',
      },
      //商品资料库导入
      {
        path: '/goods/goods_import_to_platform',
        name: '',
        component: './goods/platform_goods_import',
      },
      //Excel导入
      {
        path: '/goods/goods_import_to_excel',
        name: '',
        component: './goods/excel_import',
      },
      //商品资料详情页面
      {
        path: '/goods/goods_import_to_add',
        name: '',
        component: './goods/platform_goods_detail',
      },
   

      //订单列表
      {
        path: '/order/order_lists',
        icon: 'container',
        name: 'order_order_lists',
        component: './order/order_lists',
      },
      //拼团订单列表
      {
        path: '/order/spell_group_order_lists',
        icon: 'solution',
        name: 'spell_group__order_lists',
        component: './order/spell_group/order_lists',
      },
      //拼团订单详情
      {
        path: '/order/spell_group_order_lists_to_detail',
        icon: '',
        name: '',
        component: './order/order_detail',
      },
      //订单详情
      {
        path: '/order/order_lists_to_detail',
        name: '',
        component: './order/order_detail',
      },
      //订单发货
      {
        path: '/order/order_deliver',
        icon: 'rocket',
        name: 'order_order_deliver',
        component: './order/order_deliver',
      },
      //售后管理
      {
        path: '/order/service',
        icon: 'transaction',
        name: 'service',
        component: './order/service/index',
      },
      //售后管理——仅退款——退款详情
      {
        path: '/order/service_refund_lists_to_detail',
        name: '',
        component: './order/service/detail',
      },
      //售后管理——退货退款——退款详情
      {
        path: '/order/service_return_lists_to_detail',
        name: '',
        component: './order/service/detail',
      },
      //评价管理
      {
        path: '/order/evaluation',
        icon: 'message',
        name: 'order_evaluation',
        component: './order/evaluation',
      },
      //物流管理
      {
        path: '/order/express',
        icon: 'read',
        name: 'express',
        component: './order/express/index',
      },
      //新增运费模板
      {
        path: '/order/express_transport_to_add',
        icon: 'setting',
        name: '',
        component: './order/express/add_transport',
      },
      //地址管理
      {
        path: '/order/address_list',
        icon: 'environment',
        name: 'order_address_list',
        component: './order/address_list',
      },
      //打印设置
      {
        path: '/order/print_setting',
        icon: 'setting',
        name: 'order_print_setting',
        component: './order/print_setting',
      },
      //店铺设置
      {
        path: '/store/setting',
        icon: 'shop',
        name: 'store_setting',
        component: './store/setting',
      },
      // 店铺PC装修
      {
        path: '/store/decorate_pc',
        icon: 'cluster',
        name: 'diy_decorate_pc',
        component: './store/pc_diy/index',
      },
      // 新增/编辑模版
      {
        path: '/store/decorate_pc_instance_template_lists_to_edit',
        name: '',
        component: './store/pc_diy/add_template',
      },
      // 店铺移动端首页装修
      {
        path: '/store/decorate_mhome',
        icon: 'mobile',
        name: 'diy_decorate_mhome',
        component: './store/m_diy/m_diy_lists',
      },
      // 店铺移动端装修页面
      {
        path: '/store/decorate_mhome_to_edit',
        name: '',
        component: './store/m_diy/edit_m_diy_page',
      },
      //店铺信息
      {
        path: '/store/info',
        icon: 'profile',
        name: 'store_info',
        component: './store/info',
      },
      // 店铺分类
      {
        path: '/store/category',
        icon: 'appstore',
        name: 'store_category',
        component: './store/category',
      },
      //品牌申请
      {
        path: '/store/brand_lists',
        icon: 'trademark',
        name: 'store_brand_lists',
        component: './store/brand_lists',
      },
      // 消息接收设置
      {
        path: '/store/msg_setting',
        icon: 'setting',
        name: 'store_msg_setting',
        component: './store/msg_setting',
      },
      // 消息接收设置
      {
        path: '/store/msg_lists',
        icon: 'bell',
        name: 'store_msg_lists',
        component: './store/msg_lists',
      },
      //账号管理
      {
        path: '/store/account',
        icon: 'trademark',
        name: 'account',
        component: './store/account/index',
      },
      //结算——结算账号
      {
        path: '/bill/account',
        icon: 'property-safety',
        name: 'bill_account',
        component: './bill/account_lists',
      },
      //结算——结算账单
      {
        path: '/bill/lists',
        icon: 'transaction',
        name: 'bill_list',
        component: './bill/lists',
      },
      //结算——结算账单详情
      {
        path: '/bill/lists_to_detail',
        icon: 'transaction',
        name: '',
        component: './bill/detail',
      },

      //积分商城——发布商品
      {
        path: '/point/goods_list_to_add',
        icon: 'export',
        name: '',
        component: './point/goods/add_goods',
      },
      //积分商城——商品列表
      {
        path: '/point/goods_list',
        icon: 'shopping',
        name: 'point_goods_list',
        component: './point/goods/goods_list',
      },
      //积分商城——导入商城商品
      {
        path: '/point/goods_list_to_import',
        icon: '',
        name: '',
        component: './point/goods/select_mall_goods',
      },
      //积分商城——订单管理
      {
        path: '/point/order_list',
        icon: 'profile',
        name: 'point_order_list',
        component: './point/order/order_lists',
      },
      //积分商城——订单详情
      {
        path: '/point/order_list_to_detail',
        name: '',
        component: './point/order/order_detail',
      },
      //积分商城——结算管理
      {
        path: '/point/bill_list',
        icon: 'pay-circle',
        name: 'point_bill_list',
        component: './point/bill/lists',
      },
      //积分商城——结算详情
      {
        path: '/point/bill_list_to_detail',
        name: '',
        component: './point/bill/detail',
      },
      
      //实时分析
      {
        path: '/statistics/realtime',
        icon: 'dashboard',
        name: 'statistics_realtime',
        component: './statistics/realtime',
      },
      //交易分析
      {
        path: '/statistics/trade',
        icon: 'dollar',
        name: 'statistics_trade',
        component: './statistics/trade',
      },
      //流量分析
      {
        path: '/statistics/flow',
        icon: 'line-chart',
        name: 'statistics_flow',
        component: './statistics/flow',
      },
      //商品分析
      {
        path: '/statistics/goods',
        icon: 'deployment-unit',
        name: 'statistics_goods',
        component: './statistics/goods',
      },
      //用户分析
      {
        path: '/statistics/member',
        icon: 'solution',
        name: 'statistics_member',
        component: './statistics/member',
      },
      //应用——应用中心
      {
        path: '/marketing/center',
        icon: 'chrome',
        name: 'marketing_center',
        component: './marketing/center',
      },
      //优惠券
      {
        path: '/marketing/coupon_list',
        icon: 'red-envelope',
        name: 'promotion_coupon_list',
        component: './marketing/coupon/coupon_list',
      },
      //添加优惠券
      {
        path: '/marketing/coupon_list_to_add',
        icon: '',
        name: '',
        component: './marketing/coupon/add_coupon',
      },
      //优惠券详情
      {
        path: '/marketing/coupon_list_to_view',
        icon: '',
        name: '',
        component: './marketing/coupon/view_coupon',
      },
      //优惠券领取列表
      {
        path: '/marketing/coupon_list_to_receive_list',
        icon: '',
        name: '',
        component: './marketing/coupon/member_receive_lists',
      },
      // //满优惠
      // {
      //   path: '/marketing/full_discount',
      //   icon: 'gift',
      //   name: 'promotion_full_discount',
      //   component: './marketing/full/discount',
      // },
      //满减活动
      {
        path: '/marketing/full_acm',
        icon: 'fire',
        name: 'promotion_full_acm',
        component: './marketing/full/full_acm_list',
      },
      //发布满减活动
      {
        path: '/marketing/full_acm_to_add',
        icon: '',
        name: '',
        component: './marketing/full/add_full_acm',
      },
      //阶梯满减
      {
        path: '/marketing/full_asm',
        icon: 'gold',
        name: 'promotion_full_asm',
        component: './marketing/full/full_asm_list',
      },
      //发布阶梯满减活动
      {
        path: '/marketing/full_asm_to_add',
        icon: '',
        name: '',
        component: './marketing/full/add_full_asm',
      },
      //满N元折扣
      {
        path: '/marketing/full_ald',
        icon: 'money-collect',
        name: 'promotion_full_ald',
        component: './marketing/full/full_ald_list',
      },
      //发布满N元折扣活动
      {
        path: '/marketing/full_ald_to_add',
        icon: '',
        name: '',
        component: './marketing/full/add_full_ald',
      },
      //满N件折扣
      {
        path: '/marketing/full_nld',
        icon: 'medicine-box',
        name: 'promotion_full_nld',
        component: './marketing/full/full_nld_list',
      },
      //发布满N元折扣活动
      {
        path: '/marketing/full_nld_to_add',
        icon: '',
        name: '',
        component: './marketing/full/add_full_nld',
      },
      //秒杀活动
      {
        path: '/marketing/seckill',
        icon: 'thunderbolt',
        name: 'promotion_seckill',
        component: './marketing/seckill/list',
      },
      //参加秒杀活动
      {
        path: '/marketing/seckill_to_add',
        icon: '',
        name: '',
        component: './marketing/seckill/add_seckill',
      },
      //参加秒杀活动的商品列表
      {
        path: '/marketing/seckill_bind_goods',
        icon: '',
        name: '',
        component: './marketing/seckill/joined_goods_list',
      },

         //盲盒活动列表
         {
          path: '/blindBox/blindBox_list',
          component: '../layouts/UserLayout',
          name: 'blindBox_list',
          routes: [
            { path: '/blindBox/blindBox_list', component: './blindBox/blindBox_list' },
          ],
        },
        
           //盲盒拼团详情
      {
        path: '/marketing/spell_group_to_view',
        icon: '',
        name: '',
        component: './marketing/spell_group/view_spell_group',
      },
      //拼团的盲盒列表
      {
        path: '/marketing/spell_group_bind_goods',
        icon: '',
        name: '',
        component: './marketing/spell_group/joined_goods_list',
      },
      //拼团盲盒活动订单
      {
        path: '/marketing/spell_group_order',
        icon: '',
        name: '',
        component: './marketing/spell_group/order_lists',
      },
      //拼团盲盒活动订单详情
      {
        path: '/marketing/spell_group_order_to_detail',
        icon: '',
        name: '',
        component: './order/order_detail',
      },
      // //拼团团队盲盒列表
      // {
      //   path: '/marketing/spell_group_team_list',
      //   icon: '',
      //   name: '',
      //   component: './marketing/spell_group/team_list',
      // },


      //拼团活动列表
      {
        path: '/marketing/spell_group',
        icon: 'flag',
        name: 'promotion_spell_group',
        component: './marketing/spell_group/all_list',
      },
      //发布拼团活动
      {
        path: '/marketing/spell_group_to_add',
        icon: '',
        name: '',
        component: './marketing/spell_group/add_spell_group',
      },
        //发布盲盒活动
        {
          path: '/blindBox/blindBox_list_to_add',
          icon: '',
          name: '',
          component: './blindBox/blindBox_to_add',
        },
      //拼团详情
      {
        path: '/marketing/spell_group_to_view',
        icon: '',
        name: '',
        component: './marketing/spell_group/view_spell_group',
      },
      //拼团的商品列表
      {
        path: '/marketing/spell_group_bind_goods',
        icon: '',
        name: '',
        component: './marketing/spell_group/joined_goods_list',
      },
      //拼团活动订单
      {
        path: '/marketing/spell_group_order',
        icon: '',
        name: '',
        component: './marketing/spell_group/order_lists',
      },
      //拼团活动订单详情
      {
        path: '/marketing/spell_group_order_to_detail',
        icon: '',
        name: '',
        component: './order/order_detail',
      },
      //拼团团队列表
      {
        path: '/marketing/spell_group_team_list',
        icon: '',
        name: '',
        component: './marketing/spell_group/team_list',
      },
      //阶梯团活动
      {
        path: '/marketing/ladder_group',
        icon: 'build',
        name: 'promotion_ladder_group',
        component: './marketing/ladder_group/all_list',
      },
      //参加阶梯团活动
      {
        path: '/marketing/ladder_group_to_add',
        icon: '',
        name: '',
        component: './marketing/ladder_group/add_ladder_group',
      },
      //阶梯团详情
      {
        path: '/marketing/ladder_group_to_view',
        icon: '',
        name: '',
        component: './marketing/ladder_group/view_ladder_group',
      },
      //阶梯团——团队列表
      {
        path: '/marketing/ladder_group_team_list',
        icon: '',
        name: '',
        component: './marketing/ladder_group/team_list',
      },
      //预售活动
      {
        path: '/marketing/presale',
        icon: 'gift',
        name: 'promotion_presale',
        component: './marketing/presale/list',
      },
      //预售查看详情
      {
        path: '/marketing/presale_to_view',
        icon: '',
        name: '',
        component: './marketing/presale/view_presale',
      },
      //预售的商品列表
      {
        path: '/marketing/presale_bind_goods',
        icon: '',
        name: '',
        component: './marketing/presale/joined_goods_list',
      },
      //新建预售活动
      {
        path: '/marketing/presale_to_add',
        icon: '',
        name: '',
        component: './marketing/presale/add_presale',
      },
      //video-start
      //视频带货
      {
        path: '/marketing/video',
        icon: 'instagram',
        name: 'promotion_video',
        component: './marketing/video/member_list',
      },
      //video-end
      {
        component: '404',
      },
    ],
  },
];
