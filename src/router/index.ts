import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Index from "../components/Index.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Login from "../components/normal/Login.vue";
import Register from "../components/normal/Register.vue";
import ReleasePage from "../components/release/ReleasePage.vue";
import UserInfo from "../components/menu/UserInfo.vue";
import PiProduct from "/@/components/menu/PiProduct.vue";
import Wallet from "/@/components/menu/Wallet.vue";
import ShopAddress from "/@/components/menu/ShopAddress.vue";
import Trading from "/@/components/menu/Trading.vue";
import FootPrint from "/@/components/menu/FootPrint.vue";
import Pi from "/@/components/release/Pi.vue";
import MorePiArticle from "/@/components/release/MorePiArticle.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/MorePiArticle",
    name: "MorePiArticle",
    component: MorePiArticle,
    meta: {title:'皮帖-皮鱼',keyword:'皮帖-皮鱼',description:'皮帖-皮鱼'},
  },
  {
    path: "/Pi/:pid",
    name: "Pi",
    component: Pi,
    meta: {title:'皮物皮帖-皮鱼',keyword:'皮物皮帖-皮鱼',description:'皮物皮帖-皮鱼'},
  },
  {
    path: "/FootPrint",
    name: "FootPrint",
    component: FootPrint,
    meta: {title:'历史足迹-皮鱼',keyword:'历史足迹-皮鱼',description:'历史足迹-皮鱼'},
  },
  {
    path: "/Trading",
    name: "Trading",
    component: Trading,
    meta: {title:'交易记录-皮鱼',keyword:'交易记录-皮鱼',description:'交易记录-皮鱼'},
  },
	{
	  path: "/ShopAddress",
	  name: "ShopAddress",
	  component: ShopAddress,
	  meta: {title:'收货地址-皮鱼',keyword:'收货地址-皮鱼',description:'收货地址-皮鱼'},
	},
	{
	  path: "/Wallet",
	  name: "Wallet",
	  component: Wallet,
	  meta: {title:'钱包-皮鱼',keyword:'钱包-皮鱼',description:'钱包-皮鱼'},
	},
	{
	  path: "/PiProduct",
	  name: "PiProduct",
	  component: PiProduct,
	  meta: {title:'我的皮物-皮鱼',keyword:'我的皮物-皮鱼',description:'我的皮物-皮鱼'},
	},
	{
	  path: "/UserInfo",
	  name: "UserInfo",
	  component: UserInfo,
	  meta: {title:'个人信息-皮鱼',keyword:'个人信息-皮鱼',description:'个人信息-皮鱼'},
	},
  {
    path: "/HelloWorld",
    name: "HelloWorld",
    component: HelloWorld
    // meta: {title:'皮鱼',keyword:'皮鱼',description:'皮鱼'},
  },
	{
	  path: "/ReleasePage",
	  name: "ReleasePage",
	  component: ReleasePage,
	  meta: {
	    title: "皮物发布界面",
	    keyword: "皮物发布界面",
	    description: "皮物发布界面"
	  }
	},
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {title:'皮鱼首页',keyword:'皮鱼首页',description:'皮鱼首页'},
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      title: "皮鱼登录界面",
      keyword: "皮鱼登录界面",
      description: "皮鱼登录界面"
    }
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
    meta: {
      title: "皮鱼注册界面",
      keyword: "皮鱼注册界面",
      description: "皮鱼注册界面"
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
