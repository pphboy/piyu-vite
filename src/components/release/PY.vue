<template>
  <a-layout-content>
    <a-row>
      <!-- 左侧 -->
      <!-- 显示用户信息 -->
      <a-col :span="2"></a-col>
      <a-col :span="4" style="padding:5px;">
          <a-avatar style="margin-left:60px;margin-top:20px;" src="http://localhost:81/img/2021-02-02/202102020942309fa25c11607d4887a8004b4cbcc74317.jpg" :size="130">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <br><br>
          <div style="text-align: center;">
            <h2 >皮皮豪</h2>
            <h4 style="padding:0;margin:0;">@pipihao</h4>
            <p>皮鱼第一个用户，加油陌生人，你也会成为我这样的皮鱼玩家。</p>
            <div v-if="key == 'piProduct' || key== 'piArticle'" >
              <a-input-search
                v-model:value="keyword"
                placeholder="搜索皮物"
                style="width: 200px;margin-bottom:12px;"
                @search="onSearch" />
            </div>
          </div>
          <a-button style="margin-left:60px;"><SettingOutlined />个人设置</a-button>
          <a-row style="text-align: center;">
            <a-col :span="12"><a><h2 style="margin:0;padding:0;" class="lfont">999</h2>
            <font color="black">Followers</font></a></a-col>
            <a-col :span="12"><a><h2 style="margin:0;padding:0;" class="lfont">999</h2>
            <font color="black">Following</font></a></a-col>
          </a-row>
      </a-col>
      <!-- 右侧 -->
      <a-col :span="16">
           <a-card
              :bordered="false"
              style="width:100%;min-height: 587px"
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
              <PiArticle  v-if="key == 'piArticle'" />
              <PiProduct v-if="key == 'piProduct'" />
              <PiLog  v-if="key == 'piLog'"/>
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
  import {reactive} from 'vue';
  import api from "/@/info/ApiUtils.ts";
  import { UserOutlined,SettingOutlined,HomeOutlined,ShopOutlined,ContainerOutlined,HistoryOutlined} from '@ant-design/icons-vue';

  export default{
    components:{UserOutlined,SettingOutlined,HomeOutlined,ShopOutlined,ContainerOutlined,HistoryOutlined,
      PiArticle,PiLog,PiProduct
    },
    data(){
      return {
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
    beforeCreate(){
      var vm = this;
      console.log(vm.$route);
    },
    methods:{
      onTabChange(key, type) {
        console.log(key, type);
        this[type] = key;
        // this.keyword=null;
      },
      onSearch(keywords){
        var vm = this;
        console.log(keywords);
        // console.log(PiProduct);
        if(vm.key == 'piProduct'){
          PiProduct.methods.getPage(keywords);
        }else if(vm.key == 'piArticle'){
          PiArticle.methods.getPage(keywords);
        }
      }
    }
  }
</script>


<style scoped>
  

  .lfont{
    color:#005980;
  }
</style>