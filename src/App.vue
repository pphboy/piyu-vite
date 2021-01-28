<template>
  <Headers />
  <router-view />
  <Footers />
</template>

<script>
import main from '/@/components/main';
import {reactive,getCurrentInstance} from 'vue';

export default {
  name: 'App',
  components: {
  },
  setup(){
    const {ctx} = getCurrentInstance();
    let user = main.local.get("piyu");
    /*此地省略了服务器验证，后面写*/

    if(user){
      ctx.$store.state.login = true;
      ctx.$store.state.userInfo.headImage = user.headImage;
      ctx.$store.state.userInfo.username = user.username;
    }else{
      ctx.$router.push({name:"Index"});
    }
  },
}
</script>
