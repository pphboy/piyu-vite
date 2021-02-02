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
              placeholder="搜索已购皮物标题"
              style="width: 400px"
              @search="keywords?onSearch():null"
            />
            <h3 style="display: inline-block;margin-left: 30px;">已交易订单总数: {{total}}</h3> 
            <br><br>
        </a-col>  

        <a-col :span="24">
           <a-card>
             <a-list item-layout="horizontal" :data-source="orderList">
              <template #renderItem="{ item, index }">
                <a-list-item>
                  <template #actions>
                      <h3>价格: {{(item.piProduct.price).toFixed(2)}}元</h3>
                      <h3>运费: {{(item.piProduct.freight).toFixed(2)}}元</h3>
                      <span style="color:gray;">{{item.time}}</span>
                    </template>
                  <a-list-item-meta
                    :description="item.piProduct.content.substring(0,20)"
                  >
                    <template #title>
                      <a @click="$router.push({name:'Pi',params:{pid:item.piProduct.id}})">{{ item.piProduct.title }}</a>
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
        searching:false,
        keywords:null,
        page:1,
        size:10,
        total:0,
        getPage(keywords){
          axios.post(api.API_TRADE,{
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
                ctx.$message.warning(`没有 ${data.keywords} 相关的已购皮物`);
              }
            }
          }).catch(e=>{
            console.log(e);
            ctx.$message.error("网络错误，请联系管理员");
          });
        },
        orderList: [
          /*{
                "id": "b2342f218ceb48e2b36f681e98701f",
                "userId": 10007,
                "type": 1,
                "money": 198.00,
                "piProductId": "75ce8add78434731",
                "addressId": 11,
                "piProduct": {
                    "id": "75ce8add78434731",
                    "maker": {
                        "username": "pipihao",
                        "gender": null,
                        "address": null,
                        "introduction": null,
                        "registerDate": null,
                        "lastLoginTime": null,
                        "birthDate": null,
                        "headImage": "http://localhost:81/img/2021-02-02/202102020942309fa25c11607d4887a8004b4cbcc74317.jpg",
                        "alipayAccount": null,
                        "updateDate": null
                    },
                    "title": "来给技术加点料",
                    "classId": 2,
                    "piProductClass": null,
                    "price": 99.00,
                    "address": "南京",
                    "content": "作，得到社会支持，并受到社会多种条件的制约。这诸多的社会因素直接影响技术的成败和发展进程。所谓多元性，是指技术既可表现为有形的工具装备、机器设备、实体物质等硬件；也可以表现为无形的工艺、方法、规则等知识软件，还可以表现为虽不是实体物质而却又有物质载体的信息资料、设计图纸等。在作为物质手段和信息手段的现代技术中，技能已逐步失去原有的地位和作用，而只是技术的一个要素。\n\n![直播.png](http://localhost:81/img/2021-02-02/2021020215592855db3fd13e7e442a8eb4d57bc54df6c5.png)\n",
                    "status": true,
                    "downShelf": false,
                    "soldStatus": true,
                    "createDate": "2021-02-02 16:00:42",
                    "freight": 99.00,
                    "tradeStatus": true,
                    "likeNumber": null,
                    "rubbishNumber": null
                },
                "status": true,
                "time": "2021-02-02T16:15:39.000+00:00",
                "ruserId": 10006
            },*/
        ]
      });
      data.getPage();
      return data;
    },
    methods:{
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