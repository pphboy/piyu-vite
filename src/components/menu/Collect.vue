<!-- 我的收藏记录 -->
<template>
  <a-layout-content style="padding:5px;" >
    <a-card title="收藏记录" style="min-height:577px;">
      <a-row >
        <a-col :span='24'>
           <a-input-search
              size="large"
              v-model:value="keywords"
              placeholder="搜索已收藏皮物"
              style="width: 400px"
              @search="onSearch()"
            />
            <h3 style="display: inline-block;margin-left: 30px;">已收藏皮物数: {{total}}</h3> 
            <br><br>
        </a-col>  

        <a-col v-if="orderList.length > 0" :span="24">
           <a-card>
             <a-list item-layout="horizontal" :data-source="orderList">
              <template #renderItem="{ item, index }">
                <a-list-item>
                  <template #actions>
                    {{item.createDate}}
                    <a-button @click="remove(item.id)" type="danger">取消收藏</a-button>  
                  </template>
                  <a-list-item-meta
                    :description="item.content.substring(0,20)"
                  >
                    <template #title>
                      <a @click="$router.push({name:'Pi',params:{pid:item.id}})">{{ item.title }}</a>
                    </template>
                    <template #avatar>
                      <a-avatar :src="item.maker.headImage" />
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
           </a-card>
            <br>
            <a-pagination  @change="changePage" v-model:current="page" :pageSize="size" :total="total" show-less-items />
        </a-col>
      </a-row>
    </a-card>
  </a-layout-content>
</template>

<script lang="ts">
  import {reactive,getCurrentInstance} from 'vue';
  import api from '/@/info/ApiUtils.ts';
  import axios from 'axios';

  export default{
    setup(){
      const {ctx} = getCurrentInstance();
      let data = reactive({
        searching:false,
        keywords:null,
        page:1,
        size:10,
        total:0,
        getPage(keywords){
          axios.post(api.API_COLLECT_USER,{
            page:data.page,
            size:data.size,
            keywords:keywords
          }).then(res=>{
            // console.log(res);
            if(res.data.status){
              data.orderList = res.data.data.list;
              data.total = res.data.data.total;
            }else{
              if(!data.searching){
                ctx.$message.error(res.data.msg);
              }else{
                ctx.$message.warning(`没有 ${data.keywords} 相关的已收藏皮物`);
              }
            }
          }).catch(e=>{
            console.log(e);
            ctx.$message.error("网络错误，请联系管理员");
          });
        },
        orderList: []
      });
      data.getPage();
      return data;
    },
    methods:{
      remove(id){
        axios.post(api.API_COLLECT,{
            piId:id
        }).then(res=>{
          if(res.data.status ){
            this.$message.success(res.data.msg);
            this.getPage(this.keywords);
          }else{
            this.$message.warning(res.data.msg);
          }
        }).catch(e=>{
          console.log(e);
          this.$message.error("网络错误，请联系管理员");
        });
      },
      onSearch(){
        // console.log(this.keywords);
        this.getPage(this.keywords);
        this.searching = true;
      },
      changePage(){
        if(this.searching) this.getPage(this.keywords);
        else this.getPage();
      }
    }
  }
</script>

<style scoped>
    
</style>