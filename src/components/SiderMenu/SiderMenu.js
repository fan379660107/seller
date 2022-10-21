import React, { PureComponent, Suspense } from 'react';
import { Form, Layout } from 'antd';
import classNames from 'classnames';
import Link from 'umi/link';
import styles from './index.less';
import PageLoading from '../PageLoading';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';
import { Scrollbars } from 'react-custom-scrollbars';
import global from '@/global.less';
import { connect } from 'dva/index';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;

@connect(({ project }) => ({
  project,
}))
@Form.create()
export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
      system_tel: '',//平台电话
      system_email: '',//平台邮箱
    };
  }

  componentDidMount() {
    this.get_system_info();
  }

  //获取平台电话和邮箱
  get_system_info = () => {
    const { dispatch } = this.props;
    let { system_tel, system_email } = this.state;
    dispatch({
      type: 'project/get_system_info',
      payload: { str: 'basic_site_phone,basic_site_email' },
      callback: (res) => {
        if (res.state == 200) {
          res.data.map(item => {
            if (item.name == 'basic_site_phone') {
              system_tel = item.value;
            } else if (item.name == 'basic_site_email') {
              system_email = item.value;
            }
          });
          this.setState({
            system_tel,
            system_email,
          });
        }
      },
    });
  };

  static getDerivedStateFromProps(props, state) {
    const { pathname } = state;
    if (props.location.pathname !== pathname) {
      return {
        pathname: props.location.pathname,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render() {
    const { collapsed, onCollapse, fixSiderbar, theme, location } = this.props;
    const { openKeys, system_tel, system_email } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };
    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderbar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });
    const cur_top_nav_info = localStorage.getItem('cur_top_nav_info') != null ? JSON.parse(localStorage.getItem('cur_top_nav_info')) : '';
    let cur_top_nav = cur_top_nav_info ? (cur_top_nav_info.filter(item => item.top_nav == this.props.location.pathname.split('/')[1])[0] || {}) : {};
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={150}
        theme={theme}
        className={siderClassName}
      >
        <div className={`${global.flex_row_start_center} ${styles.left_nav}`}>
          <img className={`${styles.left_nav_top_icon}`} src={cur_top_nav.left_icon}/>
          {!collapsed && cur_top_nav.name != undefined &&
          <div className={`${global.flex_column_center_start}`}>
            <span className={`${styles.left_nav_top_title}`}>{cur_top_nav.name}</span>
            <span
              className={`${styles.left_nav_top_subtitle}`}>{cur_top_nav.top_nav.trim().toLowerCase().replace(cur_top_nav.top_nav[0], cur_top_nav.top_nav[0].toUpperCase())}</span>
          </div>
          }
        </div>

        <div className={styles.custom_left_slide_class}>
          <Suspense fallback={<PageLoading/>}>
            <div className={`${styles.slide_link_panel}`}>
              <div className={`${styles.link_title}`}>联系方式：</div>
              <ul>
                <li className={`${global.flex_row_start_start}`}>
                  <div className={`${styles.left_icon}`}>
                    <img src={require('@/assets/slide_icon_2.png')} alt=''/>
                  </div>
                  <div title={system_tel} className={`${styles.right_label}`}>{system_tel}</div>
                </li>
                <li className={`${global.flex_row_start_start}`}>
                  <div className={`${styles.left_icon}`}>
                    <img src={require('@/assets/slide_icon_1.png')} alt=''/>
                  </div>
                  <div title={system_email} className={`${styles.right_label}`}>{system_email}</div>
                </li>
              </ul>
            </div>
            <Scrollbars autoHeight
                        autoHeightMin={50}
                        autoHeightMax={document.body.clientHeight-230}>
              <BaseMenu
                {...this.props}
                mode="inline"
                handleOpenChange={this.handleOpenChange}
                onOpenChange={this.handleOpenChange}
                style={{ padding: '6px 0', width: '100%' }}
                {...defaultProps}
              />
            </Scrollbars>
          </Suspense>
        </div>

      </Sider>

    );
  }
}
