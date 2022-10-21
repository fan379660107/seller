import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { Button, Checkbox, } from 'antd';
import {
  sldComLanguage,
  sldLlineRtextAddGoodsAddMargin,
  saveSettleData,
  getSettleData,
  quillEscapeToHtml,
} from '@/utils/utils';
import global from '@/global.less';
import styles from './index.less';
import { Scrollbars } from 'react-custom-scrollbars';

@connect(({ settled, loading }) => ({
  settled,
}))
export default class Protocol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      disabled: true,
      checked:false,
    };
  }

  componentDidMount() {
    this.get_agreement()
  }

  get_agreement = () => {
    const { dispatch } = this.props;
    let {checked} = this.state;
    let _this = this;
    dispatch({
      type: 'settled/get_agreement',
      callback: res => {
        if (res.state == 200) {
          if(getSettleData('agree_protocol')!=undefined&&getSettleData('agree_protocol')){
            checked = getSettleData('agree_protocol')
            _this.handleToGoAgree(getSettleData('agree_protocol'));
          }
          this.setState({
            title: res.data.title,
            content: quillEscapeToHtml(res.data.content),
            checked
          })
        }
      }
    })
  }

  handleToGoAgree = (e) => {
    if (e) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
    this.setState({checked:e})
    saveSettleData('agree_protocol',e);
  }

  handleAgree = () => {
    //只有小于当前的才需要更新
    if(getSettleData('cur_step')*1 < 1){
      saveSettleData('cur_step', 1);
    }
    this.props.history.push('/apply/base_info')
  }


  render() {
    const { title, content, disabled,checked } = this.state;
    return (
      <div className={global.common_page} style={{ flex: 1 }}>
        {sldLlineRtextAddGoodsAddMargin('#69A2F2', `${sldComLanguage('签订入驻协议')}`, 0, 0, 5)}
        <div className={styles.agreement}>
          <div className={styles.title}>{title}</div>
          <Scrollbars
            autoHeight
            autoHeightMin={50}
            autoHeightMax={document.body.clientHeight - 360}
          >
          <div className={styles.content} dangerouslySetInnerHTML={{__html: content}}></div>
          </Scrollbars>
        </div>

        <Checkbox style={{fontSize: '14px', marginTop: '10px'}} checked={checked} onChange={(e)=>this.handleToGoAgree(e.target.checked)}>我已阅读并同意以上协议~</Checkbox>

        {((getSettleData('state') && getSettleData('state') == 3) || !getSettleData('state')) &&
        <div style={{ textAlign: 'center' }}>
          <Button type='primary' onClick={this.handleAgree} className={styles.confirmBtn}
                  disabled={disabled}>下一步</Button>
        </div>
        }

      </div>

    );
  }
}
