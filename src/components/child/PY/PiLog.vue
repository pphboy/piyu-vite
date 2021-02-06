<!-- 
  皮志
 -->
<template>
  <a-collapse :bordered="false" @change="change" v-model:activeKey="activeKey" accordion>
    <a-collapse-panel class="af" :key="d.date" v-for="d in listData"  :header="d.date">
      <a-list v-if="incomeList.length > 0" item-layout="vertical" size="large" :data-source="incomeList">
        <template #renderItem="{ item, index }">
          <a-list-item key="item.title">
            <a-list-item-meta  :description="item.description">
              <template #title >
                 卖了 <a style="color:skyblue;" @click="$router.push({name:'Pi',params:{pid:item.id}})">{{ item.title }}</a>赚{{item.price.toFixed(2)}} ￥
              </template>
            </a-list-item-meta>
            {{ item.createDate}}
          </a-list-item>
        </template>
      </a-list>
      <a-list v-if="payList.length > 0" item-layout="vertical" size="large" :data-source="payList">
        <template #renderItem="{ item, index }">
          <a-list-item key="item.title">
            <a-list-item-meta  :description="item.description">
              <template #title >
                花 {{item.price.toFixed(2)}} ￥ 买了 <a style="color:skyblue;" @click="$router.push({name:'Pi',params:{pid:item.id}})">{{ item.title }}</a>
              </template>
            </a-list-item-meta>
            {{ item.createDate}}
          </a-list-item>
        </template>
      </a-list>
    </a-collapse-panel>
  </a-collapse>
  
</template>

<script lang='ts'>
  import axios from 'axios';
  import api from '/@/info/ApiUtils.ts';
  import {reactive,getCurrentInstance} from 'vue';

  export default{
    props:{
      username:String,
    },
    setup(props){
      const {ctx} = getCurrentInstance();
      let data = reactive({
        activeKey:null,
        listData:[],
        payList:[],
        incomeList:[],
        getDate(){
          axios.get(api.API_TRADE_PILOG,{
            params:{
              username:props.username
            }
          }).then(res=>{
            console.log(res,"加载皮志日期");
            if(res.data.status){
              data.listData = res.data.data;
            }else{
              ctx.$message.error(res.data.msg);
            }
          }).catch(e=>{
            console.log(e);
            ctx.$message.error("网络错误，请联系管理员");
          });
        }
      });

      return data;
    },
    beforeCreate(){
      this.getDate();
    },
    methods:{
      change(s){
        // console.log(s);
        s?this.getLog(s):null;
      },
      getLog(date){
        axios.get(api.API_TRADE_REAL_PILOG,{
          params:{
            username:this.username,
            date:date
          }
        }).then(res=>{
          console.log(res,"REAL PILOG");
          if(res.data.status){
            this.payList = res.data.data.pay;
            this.incomeList = res.data.data.income;;
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch(e=>{
          console.log(e);
          this.$message.error("网络错误，请联系管理员");
        });
      },
      getPage(keywords){
        console.log(keywords,"PiArticle");
      }
    }
  }
</script>

<style scoped>
  .af{
    font-size:24px;
    font-weight: solid;
  }
</style>