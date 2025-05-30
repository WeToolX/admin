// 请求接口地址 如果没有配置自动获取当前网址路径
const VUE_APP_API_URL = `https://haoduigou.com/adminapi`;

const Setting = {
  // 路由前缀
  routePre: '/admin',
  // 接口请求地址
  apiBaseURL: VUE_APP_API_URL,
  // 路由模式，可选值为 history 或 hash
  routerMode: 'history',
  // 页面切换时，是否显示模拟的进度条
  showProgressBar: true,
};

export default Setting;
