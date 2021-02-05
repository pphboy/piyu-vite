<!-- 粉丝列表 -->
<template>
  <a-layout-content style="padding:10px;">
    <a-card style="min-height: 567px;">
      <a-row>
        <a-col :span="24">
          <a-button title="返回" @click="$router.go(-1)" style="margin-top:15px;margin-right: 10px;">
            <template #icon><LeftCircleOutlined /></template> 
          </a-button>
          <a-avatar :src="headImage" :size="64">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <h2 style="display: inline; margin-left: 10px;">{{nickname}}的粉丝列表</h2>
        </a-col>
        <a-col :span="24">
          <br>
          <a-card>
            <a-list :pagination="pagination" item-layout="horizontal" :data-source="fansList">
              <template #renderItem="{ item, index }">
                <a-list-item>
                  <a-list-item-meta
                    :description="item.introduction?item.introduction:'无个人介绍'"
                  >
                    <template #title>
                      <a @click="$router.push({name:'PY',params:{username:item.username}})">{{ item.nickname}}</a>
                    </template>
                    <template #avatar>
                      <a-avatar :src="item.headImage" />
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </a-layout-content>
</template>

<script lang="ts">
  import axios from 'axios';
  import api from '/@/info/ApiUtils.ts';
  import {reactive,getCurrentInstance} from 'vue';
  import { useRoute } from "vue-router";
  import { LeftCircleOutlined } from '@ant-design/icons-vue';

  export default{
    components:{
      LeftCircleOutlined
    },
    setup(){
      const {ctx} = getCurrentInstance();
      const router = useRoute(); // 获取路由参数

      console.log(router.params);
      let data = reactive({
        fansList:[],
        nickname:null,
        headImage:null,
        pagination: {
          onChange: page => {
            console.log(page);
            data.getPage(page);
          },
          total:0,
          pageSize: 10,
          size:'small'
        },
        getPage(page){
          axios.post(api.API_FOLLOWS_FOLLOWERS,{
            page:page,
            size:data.pagination.pageSize,
            username:router.params.username
          }).then(res=>{
            // console.log(res);
            if(res.data.status){
              data.nickname = res.data.data.user.nickname;
              data.headImage = res.data.data.user.headImage;
              data.fansList = res.data.data.pageInfo.list;
              data.pagination.total = res.data.data.pageInfo.total;
              // console.log(data);
            }else{
              if(res.data.data){
                ctx.$message.warning(res.data.msg);
              }else{
                /*如果数据为空，则说明无此用户,则需要跳到404*/
                ctx.$message.warning(res.data.msg);
                ctx.$router.push({name:'error'})
              }
            }
          }).catch(e=>{
            // console.log(e);
            ctx.$message.error("网络错误，请联系管理员");
          });
        }
      });

      data.getPage(1);
      return data;
    }
  }
</script>

<style scoped>
  
</style>