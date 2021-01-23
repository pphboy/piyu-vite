<template>
  <Headers />
  <router-view />
  <Footers />
</template>

<script>
import main from '/@/components/main';

export default {
  name: 'App',
  components: {
  },
	beforeCreate(){
		/* 
		  验证登录	
		 */
		if(main.local.get("piyu")){
			this.$store.state.login = true;
		}
	}
}
</script>
