<template>
  <a-row>
    <a-col :span="24">
      <br>
      <h3>评论发布</h3>
    </a-col>
    <a-col :span="24">
      <!-- {{pid}} -->
    </a-col>
    <a-col :span="24"><a-textarea placeholder="请输入评论的内容" style="width:300px;"/></a-col>
    <a-col :span="24">
      <br>
      <a-button type="primary">发表</a-button>
      <hr style="color:gray;">
    </a-col>
  </a-row>
</template>

<script lang="ts">
  import axios from 'axios';
  import {reactive} from 'vue';
  export default{
    props:{
      pid:null,
    },
    name:'SendComment',
    setup(){

    },
    methods:{

    }
  }   
</script>

<style scoped>
  
</style>