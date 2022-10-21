/*
* 公共头部
* type 1 顶部标题和提示不在当前组件里
* type 2 顶部标题和提示都在当前组件里
* */
import React, { Component, Fragment } from 'react';
import ALibbSvg from '../ALibbSvg';
import styles from './index.less';
import global from '@/global.less';
import { showMoreHelpTip, getSldEmptyH, commonSetting, sldComLanguage } from '@/utils/utils';

export default class SldComHeader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sld_show_tip: true,
		};
	}

	componentDidMount() {

	}

	toggleTip = () => {
    let _this = this;
    this.setState({
			sld_show_tip: !this.state.sld_show_tip,
		},()=>{
      if(_this.props.handleToggleTip){
        _this.props.handleToggleTip(_this.state.sld_show_tip);
      }
    });
	};

	render() {
		const { title, type, tip_title, tip_data } = this.props;
		const { sld_show_tip } = this.state;
		return (
			<Fragment>
				{type == 1 &&
				<div className={`${styles.top_part} ${global.flex_row_start_center}`}>
					<span className={styles.title}>{title}</span>
          {commonSetting.operateTipSwitch&&
          <a title={sld_show_tip?`${sldComLanguage('隐藏提示')}`:`${sldComLanguage('显示提示')}`} href={'javascript:void(0)'} className={styles.tip} onClick={() => this.toggleTip()}>
            <ALibbSvg fill={'#ff9864'} width={16} height={16} type={'ziyuan18'}/>
          </a>
          }
				</div>
				}

				{type == 2 &&
				<Fragment>
					<div className={`${styles.top_part} ${global.flex_row_start_center}`}>
						<span className={styles.title}>{title}</span>
            {commonSetting.operateTipSwitch&&
            <a title={sld_show_tip?`${sldComLanguage('隐藏提示')}`:`${sldComLanguage('显示提示')}`} href={'javascript:void(0)'} className={styles.tip} onClick={() => this.toggleTip()}>
              <ALibbSvg fill={'#ff9864'} width={16} height={16} type={'ziyuan18'}/>
            </a>
            }
					</div>
					{sld_show_tip &&
					<Fragment>
						{getSldEmptyH(10)}
						{showMoreHelpTip(tip_title, tip_data)}
					</Fragment>
					}
					{getSldEmptyH(10)}
				</Fragment>

				}

			</Fragment>
		);
	}
}
