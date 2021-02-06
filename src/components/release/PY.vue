<template>
  <a-layout-content style="min-width: 1280px;">
    <a-row>
      <!-- 左侧 -->
      <!-- 显示用户信息 -->
      <a-col :span="2"></a-col>
      <a-col v-if="userInfo" :span="4" style="padding:5px;">
          <div style="text-align: center;margin-top:20px;">
            <a-avatar  :src="userInfo.headImage" :size="130">
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <br><br>
            <h2 >{{userInfo.nickname}}</h2>
            <h4 style="padding:0;margin:0;">@{{userInfo.username}}</h4>
            <p>{{userInfo.introduction}}</p>
            <div v-if="key == 'piProduct' || key== 'piArticle'" >
              <a-input-search
                v-model:value="temp"
                placeholder="搜索皮物"
                style="width: 200px;margin-bottom:12px;"
                @search="onSearch" />
            </div>
          </div>
          <a-row style="text-align: center;">
            <a-col :span="24">
              <a-button style="margin-bottom:10px;"><SettingOutlined />个人设置</a-button>
            </a-col>
            <a-col :span="24">
              <a-button @click="sendFollows" style="margin-bottom:10px;">{{following?"已关注":"关注"}}</a-button>
            </a-col>
            <a-col :span="12"><a @click="$router.push({name:'Followers',params:{username:username}})"><h2 style="margin:0;padding:0;" class="lfont">{{userInfo.followers}}</h2>
            <font color="black">Followers</font></a></a-col>
            <a-col :span="12"><a @click="$router.push({name:'Following',params:{username:username}})" ><h2 style="margin:0;padding:0;" class="lfont">{{userInfo.following}}</h2>
            <font color="black">Following</font></a></a-col>
          </a-row>
      </a-col>
      <!-- 右侧 -->
      <a-col :span="16">
           <a-card
              v-if="username"
              :bordered="false"
              style="width:100%;min-height: 587px;"
              :tab-list="tabList"
              :active-tab-key="key"
              @tabChange="key => onTabChange(key, 'key')"
            >
              <template #customRender="item">
                <span>
                  <ShopOutlined v-if="item.key == 'piProduct'" />
                 <ContainerOutlined v-if="item.key == 'piArticle'"/> 
                  <HistoryOutlined v-if="item.key == 'piLog'"/> 
                   {{ item.name}} </span>
              </template>
              <PiArticle  :username="username" :keywords="keyword" v-if="key == 'piArticle'" />
              <PiProduct :username="username" :keywords="keyword" v-if="key == 'piProduct'" />
              <PiLog :username="username" v-if="key == 'piLog'"/>
            </a-card>
      </a-col>
      <a-col :span="2"></a-col>
    </a-row>
  </a-layout-content>
</template>

<script lang="ts">
  import PiProduct from '/@/components/child/PY/PiProduct.vue';
  import PiArticle from '/@/components/child/PY/PiArticle.vue';
  import PiLog from '/@/components/child/PY/PiLog.vue';
  import axios from 'axios';
  import {toRefs,reactive,defineComponent,ref} from 'vue';
  import api from "/@/info/ApiUtils.ts";
  import { UserOutlined,SettingOutlined,HomeOutlined,ShopOutlined,ContainerOutlined,HistoryOutlined} from '@ant-design/icons-vue';

  export default defineComponent({
    components:{UserOutlined,SettingOutlined,HomeOutlined,ShopOutlined,ContainerOutlined,HistoryOutlined,
      PiArticle,PiLog,PiProduct
    },
    data(){
      return {
        temp:null,
        userInfo:null,
        following:false,
        username:null,
        keyword:null,
        tabList: [
          {
            key: 'piProduct',  //皮物
            name:"皮物",
            slots: { tab: 'customRender' },
          },
          {
            key: 'piArticle',  //皮帖
            name:'皮帖',
            slots: { tab: 'customRender' },
          },
          {
            key: 'piLog', //日志，就是收入和发布的日志
            name:"皮志",
            slots: { tab: 'customRender' },
          },
        ],
        key: "piProduct",
      }
    },
    watch:{
      "$route.params":function(){
        var vm = this;
        if(this.$route.params.username){
          axios.get(api.API_USER_INDEX_INFO,{
            params:{
              username:vm.$route.params.username
            }
          }).then(res=>{
            console.log(res,"加载用户信息");
            /*如果没有用户信息，则跳转到404界面*/
            if(res.data.status){
              vm.userInfo = res.data.data.userInfo;
              vm.following = res.data.data.following;
              vm.username = vm.$route.params.username;
            }else{
              vm.$message.error(res.data.msg);
              vm.$router.push({name:'error'});
            }
          }).catch(e=>{
            console.log(e);
          });
        }
      }
    },
    beforeCreate(){
      var vm = this;
      console.log(vm.$route.params.username);
      axios.get(api.API_USER_INDEX_INFO,{
        params:{
          username:vm.$route.params.username
        }
      }).then(res=>{
        console.log(res,"加载用户信息");
        /*如果没有用户信息，则跳转到404界面*/
        if(res.data.status){
          vm.userInfo = res.data.data.userInfo;
          vm.following = res.data.data.following;
          vm.username = vm.$route.params.username;
        }else{
          vm.$message.error(res.data.msg);
          vm.$router.push({name:'error'});
        }
      }).catch(e=>{
        console.log(e);
      });
      
    },
    methods:{
      sendFollows(){
        var vm = this;
        var username = vm.$route.params.username;
        axios.put(api.API_FOLLOWS,{
          username:username
        }).then(res=>{
          console.log(res);
          if(res.data.status){
            vm.$message.success(res.data.msg);
            vm.following = !vm.following;
            if(res.data.data){
              vm.userInfo.followers --;
            }else{
              vm.userInfo.followers ++;
            }
          }else{
            vm.$message.error(res.data.msg);
          }
        }).catch(e=>{
          console.log(e);
          vm.$message.error("网络错误，请联系管理员");
        });

      },
      onTabChange(key, type) {
        this.temp = null;
        console.log(key, type);
        this[type] = key;
      },
      onSearch(keywords){
        var vm = this;
        this.keyword = keywords;
      }
    }
  })
</script>


<style scoped>
  

  .lfont{
    color:#005980;
  }
</style>