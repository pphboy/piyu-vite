import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import main from '/@/components/main';


import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { Form } from 'ant-design-vue';

// 解析markdown
import Header from "./components/common/Header.vue";
import Footer from "./components/common/Footer.vue";

import {setupGlobalMethods} from "./utils/globalMethod";

const Vue = createApp(App);

if(main.local.get("piyu")){
    axios.defaults.headers.common['token'] = main.local.get("piyu").token;
}

document.title = "皮鱼_开发版";


Vue.use(router)
  .use(store)
  .use(Antd)
  .use(Form)
	//下面是组件
	.component("Footers", Footer)
	.component("Headers", Header);

// 如果开启了typescript 需要额外安装 npm install @types/highlight.js
// 通过 import * as hljs from 'highlight.js' 引入

// 挂载的element
Vue.mount("#app");

// 设置 全局 属性
setupGlobalMethods(Vue);
    
