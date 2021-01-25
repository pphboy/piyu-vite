<!-- 
    交易记录
 -->
<template>
  <a-layout-content style="padding:5px;" >
    <a-card title="皮物浏览记录" style="min-height:577px;">
      <a-row >
        <a-col :span='24'>
            <h3 style="display: inline-block;margin-left: 30px;">浏览历史总皮物数量: {{999}} 个</h3> 
            <br><br>
        </a-col>  

        <a-col :span="24">
           <a-card>
             <a-list item-layout="horizontal" :data-source="orderList">
              <template #renderItem="{ item, index }">
                <a-list-item>
                  <template #actions>
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
        current:1,
        orderList: [
          {
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },{
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
            articleId:123123, // 文章的id
            headImage:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            articleTitle:"皮物xxxxx----1",
            description:"简介-----------------------------",
            createTime:"2021-1-25 19:01:11"
          },
          {
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
      changePage(){
        console.log(this.current);
      }
    }
  }
</script>

<style scoped>
    
</style>