import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { Form } from 'ant-design-vue';

import Header from "./components/common/Header.vue";
import Footer from "./components/common/Footer.vue";

// import {setupGlobalMethods} from "/@/utils/globalMethod";


export const Vue = createApp(App);


document.title = "皮鱼_开发版";

Vue.use(store)
  .use(router)
  .use(Antd)
  .use(Form)
    //下面是组件
    .component("Footers", Footer)
    .component("Headers", Header)
  .mount("#app");

// 设置 全局 属性
// setupGlobalMethods(Vue);
    
