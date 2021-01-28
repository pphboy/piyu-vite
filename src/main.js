import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import main from '/@/components/main';

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { Form } from 'ant-design-vue';

import Header from "./components/common/Header.vue";
import Footer from "./components/common/Footer.vue";

import {setupGlobalMethods} from "./utils/globalMethod";

const Vue = createApp(App);

axios.defaults.headers.common['token'] = main.local.get("piyu").token;

document.title = "皮鱼_开发版";

Vue.use(router)
  .use(store)
  .use(Antd)
  .use(Form)
	//下面是组件
	.component("Footers", Footer)
	.component("Headers", Header)
	// 挂载的element
  .mount("#app");

// 设置 全局 属性
setupGlobalMethods(Vue);
    
