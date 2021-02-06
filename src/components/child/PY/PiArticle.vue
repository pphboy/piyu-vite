<!-- 
  皮帖
 -->
<template>
   <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="piList">
    <template #renderItem="{ item, index }">
      <a-list-item key="item.title">
        <template #actions>
          <span>
            <component v-bind:is="'StarOutlined'" style="margin-right: 8px" />
            {{ item.collectNumber }}
          </span>
          <span>
            <component v-bind:is="'LikeOutlined'" style="margin-right: 8px" />
            {{ item.likeNumber }}
          </span>
        </template>
        <template #extra>
          <img
            width="272"
            alt="logo"
            :src="getImage(item.content)"
          />
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
              <a @click="$router.push({name:'Pi',params:{pid:item.id}})" :href="item.href">{{ item.title }}</a>
          </template>
        </a-list-item-meta>
        {{ item.content.substring(0,60) }}
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang='ts'>
  import { StarOutlined, LikeOutlined, MessageOutlined
    ,StarOutlined,
    LikeOutlined,
  } from '@ant-design/icons-vue';
  import axios from 'axios';
  import api from '/@/info/ApiUtils.ts';
  import {reactive,watch,getCurrentInstance,toRefs,defineComponent,ref} from 'vue';

  export default defineComponent({
    props:{
      username:String,
      keywords:String,
    },
    components:{
      StarOutlined,
      LikeOutlined,
    },
    setup(props){
      const {ctx} = getCurrentInstance();
      let data = reactive({
        piList:[],
        pagination: {
          onChange: page => {
            console.log(page);
            getPage()
          },
          total:10,
          current:1,
          pageSize: 10,
          size:'small',
        },
        getPage(){
          console.log(this);
          console.log(this.username,"PiProduct");
          var vm = this;
          axios.post(api.API_USER_SPACE_ARTICLE,{
            page:data.pagination.current,
            size:data.pagination.pageSize,
            username:props.username,
            keywords:props.keywords
          }).then(res=>{
            console.log(res,"PIARTICLE GETPAGE");
            if(res.data.status){
              data.pagination.total = res.data.data.total;
              data.piList = res.data.data.list;
            }else{
              ctx.$message.warning(res.data.msg);
            }
          }).catch(e=>{
            console.log(e);
            ctx.$message.error("网络错误，请联系管理员");
          });
        },
        actions: [
          { type: 'StarOutlined', text: '156' },
          { type: 'LikeOutlined', text: '156' },
        ],
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