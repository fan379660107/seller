import { sldCommonService } from '@/utils/utils';

export default {
  namespace: 'reason',
  state: {
    loading: false,//加载状态
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {},
};
