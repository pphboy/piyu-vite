/**
 * 配置全局属性
 */

import api from '../info/ApiUtils';

import {App} from 'vue';

export function setupGlobalMethods(app : App){
	// console.log(Vue)
	app.config.globalProperties.$api = api;
	// console.log(Vue.config);
/* 	app.config.globalProperties.hello = ()=>{
		console.log("HelloWorld")
	}; */
}