//slodon_配置服务器接口地址
module.exports = {
  apiUrl: 'http://121.40.97.153:9002/',
  // apiUrl:  'http://10.131.7.219:8000/',
  // apiUrl: 'https://seller.liduoduosd.com/',
  imUrl: 'https://im.liduoduosd.com/', //im,//im访问地址人工
  uploadLimit: 20, //上传限制，单位M
  addGoodsSpecLimit: 3, //发布商品添加规格项限制的数量
  addGoodsSpecValLimit: 10, //发布商品添加规格值限制的数量
  specialFlag:
    window.location.host.indexOf('jbbcsellerdev.slodon.cn') +
    window.location.host.indexOf('localhost') +
    window.location.host.indexOf('seller.55sld.com'),
};

/** copyright *** slodon *** version-v4.1 *** date-2022-07-22 ***主版本v4.1**/
