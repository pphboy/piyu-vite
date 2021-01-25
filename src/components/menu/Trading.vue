<!-- 
    交易记录
 -->
<template>
  <a-layout-content style="padding:5px;" >
    <a-card title="皮物交易记录" style="min-height:577px;">
      <a-row >
        <a-col :span='24'>
           <a-input-search
              size="large"
              v-model:value="keywords"
              placeholder="搜索已购皮物"
              style="width: 400px"
              @search="keywords?onSearch():null"
            />
            <h3 style="display: inline-block;margin-left: 30px;">已交易订单总金额: {{(9999/100).toFixed(2)}}元</h3> 
            <br><br>
        </a-col>  

        <a-col :span="24">
           <a-card>
             <a-list item-layout="horizontal" :data-source="orderList">
              <template #renderItem="{ item, index }">
                <a-list-item>
                  <template #actions>
                      <h3>价格: {{(item.price/100).toFixed(2)}}元</h3>
                      <span style="color:gray;">{{item.createTime}}</span>
                    </template>
                  <a-list-item-meta
                    :description="item.description"
                  >
                    <template #title>
                      <a @click="$router.push(`/article/${item.articleId}`)">{{ item.articleTitle }}</a>
                    </template>
                    <template #avatar>
                      <a-avatar :src="item.headImage" />
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
           </a-card>
            <br>
            <a-pagination  @change="changePage" v-model:current="current" :total="50" show-less-items />
        </a-col>
      </a-row>
    </a-card>
  </a-layout-content>
</template>

<script lang="ts">
    import {reactive} from 'vue';

  export default{
    setup(){
      let data = reactive({
        keywords:null,
        current:1,
        orderList: [
          {
            price:111, // 单位分
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
            price:111, // 单位分
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
            price:111, // 单位分
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
            price:111, // 单位分
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },{
            price:111, // 单位分
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
            price:111, // 单位分
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
            price:111, // 单位分
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
            price:111, // 单位分
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
        ]
      });

      return data;
    },
    methods:{
      onSearch(){
        console.log("onSearch");
      },
      changePage(){
        console.log(this.current);
      }
    }
  }
</script>

<style scoped>
    
</style>