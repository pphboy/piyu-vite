<!-- 
    交易记录
 -->
<template>
  <a-layout-content style="padding:5px;" >
    <a-card title="皮物浏览记录" style="min-height:577px;">
      <a-row >
        <a-col :span='24'>
            <h3 style="display: inline-block;margin-left: 30px;">浏览历史总皮物数量: {{total}} 个</h3> 
            <br><br>
        </a-col>  

        <a-col :span="24">
           <a-card>
             <a-list item-layout="horizontal" :data-source="footprintList">
              <template #renderItem="{ item, index }">
                <a-list-item>
                  <template #actions>
                      <span style="color:gray;">{{item.createTime}}</span>
                    </template>
                  <a-list-item-meta
                    :description="item.piProduct.content.substring(0,30)+'...'"
                  >
                    <template #title>
                      <a @click="$router.push({name:'Pi',params:{pid:item.piProductId}})">{{ item.piProduct.title }}</a>
                    </template>
                    <template #avatar>
                      <a-avatar :src="item.piProduct.maker.headImage" />
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
        current:1,
        page:1,
        size:10,
        total:0,
        footprintList: [
          /*{
                "id": 1,
                "userId": 10006,
                "piProductId": "c5f336a644184170",
                "piProduct": {
                    "id": "c5f336a644184170",
                    "maker": {
                        "username": "test123",
                        "gender": null,
                        "address": null,
                        "introduction": null,
                        "registerDate": null,
                        "lastLoginTime": null,
                        "birthDate": null,
                        "headImage": "http://localhost:81/img/2021-01-28/20210128203429959e640b4586482fa42f81ba6c163162.jpg",
                        "alipayAccount": null,
                        "updateDate": null
                    },
                    "title": "发个皮帖",
                    "classId": 1,
                    "piProductClass": null,
                    "price": null,
                    "address": null,
                    "content": "是的，我有一个皮帖要发。\n\n什么是皮帖？\n\n与皮物相对应的，就是皮帖。\n\n![1612229904555.jpg](http://localhost:81/img/2021-02-02/202102020939298f641139e0994cccae63369c8ce35c5e.jpg)\n",
                    "status": true,
                    "downShelf": false,
                    "soldStatus": false,
                    "createDate": "2021-02-02 09:39:34",
                    "freight": null,
                    "tradeStatus": null,
                    "likeNumber": null,
                    "rubbishNumber": null
                },
                "createTime": "2021-02-02T17:31:49.000+00:00"
            },*/
        ],
        getPage(){
          axios.post(api.API_FOOTPRINT,{
            page:data.page,
            size:data.size
          }).then(res=>{
            // console.log(res);
            if(res.data.status){
              data.footprintList = res.data.data.list;
              data.total = res.data.data.total;
            }else{
              ctx.$message.error(res.data.msg);
            }
          }).catch(e=>{
            console.log(e);
            ctx.$message.error("网络错误，请联系管理员");
          });
        }
      });
      data.getPage();
      return data;
    },
    methods:{
      changePage(){
        this.getPage();
      }
    }
  }
</script>

<style scoped>
    
</style>