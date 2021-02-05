<!-- 
  皮物
 -->
<template>
  <a-row>
    <a-col>

    </a-col>
    <a-col :span="24">
     <a-card v-for="i in 8" :key="i" hoverable style="width: 234px;float: left;margin:3px;">
        
        <template #cover>
          <img style="object-fit: cover;height: 200px;width: 100%;"  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="我是标题，我是标题，我是标题">
          <template #description>
            <h3>123 ￥</h3>
            <p>{{'我是文章内容，我是文章内容123'.substring(0,10)}}...</p>
          </template>
        </a-card-meta>
      </a-card> 
    </a-col>
    <a-col :span="24">
      <br>
      <a-pagination style="float:right;" size="small" :total="50" />
    </a-col>
  </a-row>
</template>

<script lang='ts'>
  import axios from 'axios';
  import api from '/@/info/ApiUtils.ts';
  import {reactive,getCurrentInstance} from 'vue';

  export default{
    methods:{
      getPage(keywords){
        console.log(keywords,"PiProduct");
      }
    }
  }
</script>

<style scoped>
  
</style>