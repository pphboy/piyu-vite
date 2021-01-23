/* 
	本类为一个全局的操作类
 */

export default {
	/* Local */
	local:{
		// 存取local
		set:function(name,info){
			localStorage.setItem(name, JSON.stringify(info));
		},
		get:function(name){
			return JSON.parse(localStorage.getItem(name));
		}
	},
	loging:false,
}