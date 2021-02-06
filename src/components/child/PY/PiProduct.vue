<!-- 
  皮物
 -->
<template>
  <a-row>
    <a-col>
    </a-col>
    <a-col :span="24">
       <!-- {{size}}
      {{username}}
      {{keywords}}
      {{page}} -->
     <a-card @click="$router.push({name:'Pi',params:{pid:p.id}})" v-for="(p,index) in piList" :key="index" hoverable style="width: 234px;float: left;margin:3px;">
        
        <template #cover>
          <img style="object-fit: cover;height: 200px;width: 100%;"  :src="getImage(p.content)" />
        </template>
        <a-card-meta :title="p.title">
          <template #description>
            <h3>{{p.price.toFixed(2)}} ￥</h3>
            <p>{{p.content.substring(0,10)}}...</p>
          </template>
        </a-card-meta>
      </a-card> 
    </a-col>
    <a-col :span="24">
      <br>
     
      <a-pagination @change="getPage" :pageSize="size" v-model:current="page" :total="total" style="float:right;" size="small"  />
    </a-col>
  </a-row>
</template>

<script lang='ts'>
  import axios from 'axios';
  import api from '/@/info/ApiUtils.ts';
  import {reactive,watch,getCurrentInstance,toRefs,defineComponent,ref} from 'vue';

  export default defineComponent({
    props:{
      username:String,
      keywords:String,
    },
    setup(props){
      const {ctx} = getCurrentInstance();
      let data = reactive({
        page:1,
        size:8,
        total:10,
        piList:[],
      });
      const refData = toRefs(data);
      return {...refData,};
    },
    watch:{
      keywords(s){
        console.log(s);
        this.getPage();
      }
    },
    created(){
      /*加载数据*/
      this.getPage();
    },
    methods:{
      getPage(){
        console.log(this);
        console.log(this.username,"PiProduct");
        var vm = this;
        axios.post(api.API_USER_SPACE_PRODUCT,{
          page:vm.page,
          size:vm.size,
          username:vm.username,
          keywords:vm.keywords
        }).then(res=>{
          console.log(res,"PIPRODUCT GETPAGE");
          if(res.data.status){
            this.total = res.data.data.total;
            this.piList = res.data.data.list;
          }else{
            this.$message.warning(res.data.msg);
          }
        }).catch(e=>{
          console.log(e);
          this.$message.error("网络错误，请联系管理员");
        });
      },
      search(){
        return this;
      },
      /*取内容的第一张图片*/
      getImage(str){
        let reg = /!\[.*\]\((.*)\)/g;
        if(!str.match(reg)){
          return "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
        }
        let temp = str.matchAll(reg);
        /**
         * 取第一张图片
         */
        for(const a of temp){
          // console.log(a[1]);
          return a[1];
        }
      }
    }
  })
</script>

<style scoped>
  
</style>