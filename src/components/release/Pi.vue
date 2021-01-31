<!-- 
  皮物 界面
 -->

<template>
  <a-layout-content style="padding:10px;">
    <a-card style="min-height:587px;margin:0;padding:0;">
      <a-page-header :title="product.title" @back="() => $router.go(-1)">
        <template #tags>
          <a-tag color="blue">
            分类
          </a-tag>
        </template>
        <template slot="extra">
          <a-button key="3">
            Operation
          </a-button>
          <a-button key="2">
            Operation
          </a-button>
          <a-button key="1" type="primary">
            Primary
          </a-button>
        </template>
        <a-row>
           <a-col :span="18">
              <!-- a标签存放用户的空间的路径   -->
              <a style="color:black;">{{product.maker.username}}</a> <a-avatar    :src="product.maker.headImage" />
              {{product.createDate}} · 151 次点击
           </a-col>
          <a-col v-if="product.address" :span="6">
            <a-button style="float:right;" type="dashed">购买</a-button>
           </a-col>
        </a-row>
        <a-row v-if="product.address" type="flex" style="margin-top:13px;">
            <a-statistic title="价格" prefix="￥" :value="product.price.toFixed(2)" />
            <a-statistic
              title="运费"
              prefix="￥"
              :value="product.freight.toFixed(2)"
              :style="{
                margin: '0 32px',
              }"
            />
            <a-statistic title="发货地址" :value="product.address" />
        </a-row>
      </a-page-header>
      <!-- 内容 -->
      <a-card>
        <div id="md" v-html="md.render(product.content)"></div>
      </a-card>
      <!-- 发表评论 -->
      <SendComment :pid="'我是皮物界面的id'" />
      <!-- 评论组件 -->
      <Comment :pid="'我是皮物界面的id'" />
    </a-card>
  </a-layout-content>
</template>

<script lang='ts'>
  import Comment from '/@/components/child/Pi/Comment.vue';
  import SendComment from '/@/components/child/Pi/SendComment.vue';
  import {reactive,getCurrentInstance,h} from 'vue'; 
  import axios from 'axios';
  import api from '/@/info/ApiUtils.ts';
  import MarkdownIt from 'markdown-it';

  export default{
    components:{
      Comment,SendComment,
    },
    setup(){
      let data = reactive({
        md: new MarkdownIt(),
        images:[],
        product:{
          address: "湖南",
          classId: 2,
          maker:{
            headImage:'http://localhost:81/img/2021-01-28/20210128163815295598afdd6d49ff905bf7cb8bdc3595.jpg',
            username:"pipihao",
          },
          content: "# 湖南帅小伙写代码↵↵![直播.png](http://localhost:81/img/2021-01-29/202101292023056aa4cb85179f4367aae171b3a2d02f03.png)↵",
          createDate: "2021-23-29 20:01:19",
          downShelf: false,
          freight: 1,
          id: "6d0e0264e3674a1c",
          piProductClass: {id: 2, className: "技术", createDate: "2021-01-26 10:45:47"},
          price: 1,
          soldStatus: false,
          status: true,
          title: "随便写点什么东西了",
          tradeStatus: false,
        },
        vditor:null,
      });
      const {ctx} = getCurrentInstance();

      console.log(ctx.$route);

      
      return data;
    },
    mounted(){
      var vm = this;
      console.log(vm.$route.params.pid);
      /*发送请求皮物*/
      axios.get(api.API_PIPRODUCT_MANAGER_GET,{
        params:{
          pid:vm.$route.params.pid,
        }
      }).then(res=>{
        // var reg = /\[.*\]\((.*)\)/gi;
        // this.images = this.product.content.match(reg);
        // console.log(res);
        if(res.data.status){
          this.product = res.data.data;
          document.title = `${this.product.title}-皮鱼`;
        }else{
          this.$message.error(res.data.msg);
          this.$router.push("/");
        }
      }).catch(e=>{
        console.log(e);
        this.$message.error("网络错误");
      });
    },
    methods:{

    }
  }
</script>

<style scoped>
  #md{
    /*max-width: 500px;*/
  }
  :deep() #md img{
    width:800px;
  }


</style>