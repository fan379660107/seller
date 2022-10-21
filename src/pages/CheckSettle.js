import React from 'react';
import Redirect from 'umi/redirect';
import {
  saveSettleData,
  getSettleData,
} from '@/utils/utils';
import { apiUrl } from '@/utils/sldconfig';

export default ({ children }) => {
  //用户登陆过期之后直接跳转登录页面(58分钟)
  let cur_time = new Date().getTime();
  let start_time = localStorage.getItem('time');
  if (typeof start_time == 'undefined' || start_time == null) {
    return <Redirect to="/user/login"/>;
  } else {
    if (cur_time - start_time > 58*60*1000) {
      //用户token过期之后重新根据refresh_token获取token(58分钟，token的有效期是60分钟)
      let param = new FormData();
      param.append('grant_type', 'refresh_token');
      param.append('refresh_token', localStorage.getItem('sld_refresh_token'));
      fetch(apiUrl + 'v3/sellerLogin/oauth/token', {
        credentials: 'include',
        headers: {
          Authorization: 'Basic VVcxS2FsVXlWbk5pUjFaNTpVMjFHTWxsVlFrUmlNMEkxVlcxc2JtRklVa0ZWTW5oMldrYzVkUT09',
        },
        method: 'POST',
        body: param,
      }).then(response => response.json())
        .then(res => {
          if (res.state == 200) {
            localStorage.setItem('sld_token', res.data.access_token);
            localStorage.setItem('sld_refresh_token', res.data.refresh_token);
          } else {
            return <Redirect to="/user/login"/>;
          }
        });
    } else if (cur_time - start_time > ((24 * 60 * 15 - 2) * 60 * 1000)) {
      //用户登陆过期之后直接跳转登录页面(14天23小时58分钟，refresh_token的有效期是15天)
      return <Redirect to="/user/login"/>;
    }
  }
  // return <Redirect to={`/apply/settled_protocol`}/>;
  let settle_path = [
    '/apply/settled_protocol',//入驻协议
    '/apply/base_info',//店铺基本信息
    '/apply/business_info',//经营信息
    '/apply/open_up',//店铺开通
  ];
  let cur_step = getSettleData('cur_step');
  for (let i in settle_path) {
    if (settle_path[i] == children.props.location.pathname) {
      if (i > cur_step) {
        return <Redirect to={`${settle_path[cur_step]}`}/>;
      }else{
        return children;;
      }
    }
  }
  // return children;
};
