// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

// Vue 核心
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// 国际化
import { i18n } from '@/i18n/index.js';

// 配置和工具
import config from '@/config';
import settings from '@/setting';
import Auth from '@/libs/wechat';
import dialog from '@/libs/dialog';
import timeOptions from '@/libs/timeOptions';
import scroll from '@/libs/loading';
import * as tools from '@/libs/tools';
import * as filters from './filters'; // 全局过滤器
import schema from 'async-validator';

// 自定义组件和工具
import modalForm from '@/utils/modalForm';
import exportExcel from '@/utils/newToExcel.js';
import videoCloud from '@/utils/videoCloud';
import { modalSure } from '@/utils/public';
import { authLapse } from '@/utils/authLapse';
import Pagination from '@/components/Pagination';
import pagesHeader from '@/components/pagesHeader';

// 指令
import importDirective from '@/directive';
import { directive as clickOutside } from 'v-click-outside-x';

// 插件
import installPlugin from '@/plugin';
import Element from 'element-ui';
import TreeTable from 'tree-table-vue';
import VOrgTree from 'v-org-tree';
import VXETable from 'vxe-table';
import Viewer from 'v-viewer';
import VueDND from 'awe-dnd';
import formCreate from '@form-create/element-ui';
import VueCodeMirror from 'vue-codemirror';
import VueTreeList from 'vue-tree-list';
import vuescroll from 'vuescroll'; // 移动端滚动插件
import VueClipboard from 'vue-clipboard2'; // 复制到粘贴板插件
import VueAwesomeSwiper from 'vue-awesome-swiper'; // swiper
import VueLazyload from 'vue-lazyload'; // 懒加载
import moment from 'moment'; // 日期处理

// 样式导入
import '@/assets/icons/iconfont.css';
import '@/assets/iconfont/iconfont.css';
import '@/theme/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfontYI/iconfontYI.css';
import './plugin/emoji-awesome/css/google.min.css';
import 'xe-utils';
import 'vxe-table/lib/style.css';
import 'v-org-tree/dist/v-org-tree.css';
import './styles/index.scss';
import 'swiper/css/swiper.css';
import 'viewerjs/dist/viewer.css';
import 'codemirror/lib/codemirror.css';
import 'vxe-table/lib/index.css';
import 'vue-happy-scroll/docs/happy-scroll.css';

// 创建事件总线
Vue.prototype.bus = new Vue();

// 全局组件挂载
Vue.component('Pagination', Pagination);
Vue.component('pagesHeader', pagesHeader);

// 日期配置
Vue.prototype.$moment = moment;
moment.locale('zh-cn');

// Element Message 配置
const messages = ['success', 'warning', 'info', 'error'];
messages.forEach((type) => {
  Element.Message[type] = (options) => {
    if (typeof options === 'string') {
      options = {
        message: options,
        // 默认配置
        duration: 2000,
        showClose: false,
      };
    }
    options.type = type;
    return Element.Message(options);
  };
});

// 插件配置和注册
VueClipboard.config.copyText = true; // 复制到粘贴板插件
Vue.use(Element, { i18n: (key, value) => i18n.t(key, value), size: 'small' });
Vue.use(formCreate);
Vue.use(VueCodeMirror);
Vue.use(VueDND);
Vue.use(TreeTable);
Vue.use(VOrgTree);
Vue.use(VueAwesomeSwiper);
Vue.use(VXETable);
Vue.use(vuescroll);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/no.png'),
  loading: require('./assets/images/moren.jpg'),
  attempt: 1,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'],
});
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
  },
});
Vue.use(VueClipboard);
Vue.use(VueTreeList);

// 注册admin内置插件
installPlugin(Vue);

// 生产环境关掉提示
Vue.config.productionTip = false;

// 全局注册应用配置
window.Promise = Promise;
Vue.prototype.$config = config;
Vue.prototype.$routeProStr = settings.routePre;
Vue.prototype.$modalForm = modalForm;
Vue.prototype.$modalSure = modalSure;
Vue.prototype.$exportExcel = exportExcel;
Vue.prototype.$videoCloud = videoCloud;
Vue.prototype.$authLapse = authLapse;
Vue.prototype.$wechat = Auth;
Vue.prototype.$dialog = dialog;
Vue.prototype.$timeOptions = timeOptions;
Vue.prototype.$scroll = scroll;
Vue.prototype.$tools = tools;
Vue.prototype.$validator = function (rule) {
  return new schema(rule);
};

// 注册指令
importDirective(Vue);
Vue.directive('clickOutside', clickOutside);

// 注册全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 外部脚本加载
(function () {
  var hm = document.createElement('script');
  hm.src = 'https://cdn.oss.9gt.net/js/es.js?version=kyv5.4';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
})();

// 添加crmeb chat 统计
var __s = document.createElement('script');
__s.src = `${location.origin}/api/get_script`;
document.head.appendChild(__s);

// 创建Vue实例
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: (h) => h(App),
});
