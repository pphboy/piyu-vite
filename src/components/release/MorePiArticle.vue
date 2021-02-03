<template>
  <a-layout-content style="padding:5px;">
    <a-row>
      <a-col :span="10">
        <a-input-search
           class="search"
           v-model:value="keywords"
            placeholder="输入想要搜索的内容"
            enter-button="Search"
            size="large"
            @search="onSearch"
          />
      </a-col>
    </a-row>
    <a-card style="min-height:567px;margin-top:10px;">
       <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
        <template #renderItem="{ item, index }">
          <a-list-item key="item.title">
            <template #actions>
              <span >
                <!-- 收藏 -->
                <component is="StarOutlined" style="margin-right: 8px" />
                {{ 999 }}
              </span>
              <span >
                <!-- 点赞 -->
                <component is="LikeOutlined" style="margin-right: 8px" />
                {{ 999 }}
              </span>
              <span>
                <!-- 评论 -->
                <component is="MessageOutlined" style="margin-right: 8px" />
                {{ 999 }}
              </span>
            </template>
            <template #extra>
              <a-tooltip :title="moment(item.createDate,'YYYY-MM-DD HH:mm:ss').fromNow()">
                <span>{{ moment(item.createDate,'YYYY-MM-DD HH:mm:ss').fromNow() }}</span>
              </a-tooltip>
            </template>
            <a-list-item-meta :description="item.description">
              <template #title>
                <a @click="$router.push({name:'Pi',params:{pid:item.id}})">{{ item.title }}</a>
              </template>
              <template #avatar><a-avatar :src="item.maker.headImage"/></template>
            </a-list-item-meta>
            {{ item.content }}
          </a-list-item>
        </template>
      </a-list>
      <br><br>
    </a-card>
  </a-layout-content>
</template>

<script lang="ts">
  import {defineComponent,getCurrentInstance,reactive} from 'vue';
  import api from '/@/info/ApiUtils.ts';
  import axios from 'axios';
  import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
  import moment from 'moment';

  export default defineComponent({
    components:{
        StarOutlined, LikeOutlined, MessageOutlined 
    },
    setup(){
      const {ctx} = getCurrentInstance();
      let data = reactive({
        moment,
        listData:[],
        pagination: {
          onChange: page => {
            data.getPage(page);
          },
          pageSize: 10,
          total:0,
        },
        keywords:null,
       
        getPage(page){
          axios.post(api.API_PIPRODUCT_ARTICLE,{
             page:page,
             size:data.pagination.pageSize,
             keywords:data.keywords
          }).then(res=>{
            console.log(res);
            if(res.data.status){
              data.listData = res.data.data.list;
              data.pagination.total = res.data.data.total;
            }else{

            }
          }).catch(e=>{
            console.log(e);
            ctx.$message.error("网络错误，请联系管理员");
          });
        }
      });
      data.getPage(1);
      return data;
    },
    methods:{
      onSearch(){
        this.getPage(1);
      }
    }

  });
</script>

<style scoped>
  
</style>