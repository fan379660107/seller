import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'common', ...(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/models/common.js').default) });
app.model({ namespace: 'decorate', ...(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/models/decorate.js').default) });
app.model({ namespace: 'global', ...(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/models/login.js').default) });
app.model({ namespace: 'manage', ...(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/models/manage.js').default) });
app.model({ namespace: 'menu', ...(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('C:/Users/範温柔/Desktop/商户后台/qijiwangluo2-master/seller/src/models/user.js').default) });
