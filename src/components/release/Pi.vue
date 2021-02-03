<!-- 
  皮物 界面
 -->

<template>
  <a-layout-content v-if="product.maker" style="padding:10px;">
    <a-card style="min-height:587px;margin:0;padding:0;">
      <a-page-header :title="product.title" @back="() => $router.go(-1)">
        <template #tags>
          <a-tag color="blue">
            {{product.piProductClass.className}}
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
            <!-- 已售 -->
            <a-button v-if="product.tradeStatus" style="float:right;" type="danger">已售</a-button>
            <!-- 未售 -->
            <a-button v-if="$store.state.login && !product.tradeStatus " style="float:right;" type="dashed" @click="showModal">购买</a-button>
            <!-- 未登录 -->
            <a-tag v-if="!$store.state.login" color="red" style="float:right;">登录后即可购买</a-tag>
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
      <div v-if="pid">
        <!-- 评论组件 -->
        <Comment :pid="pid" />
      </div>
    </a-card>
  </a-layout-content>
  <a-modal v-if="product.address" v-model:visible="visible" :title="`购买皮物: ${product.title}`" cancelText="取消" okText="确认购买" @ok="handleOk" >
    <h3>选择收货地址</h3>
    <a-select label-in-value v-model:value="checkContact" style="width: 300px" >
      <a-select-option v-for="(c,index) in contactList" :key="index" :value="index">
        {{`${c.name}-${c.phone}-${c.county}`}}
      </a-select-option>
    </a-select>
    <h3>价格: {{(product.price).toFixed(2)}}￥</h3>
    <a-tag>备注: 点击购买即可</a-tag>
  </a-modal>
</template>

<script lang='ts'>
  import Comment from '/@/components/child/Pi/Comment.vue';
  import {reactive,getCurrentInstance,h} from 'vue'; 
  import axios from 'axios';
  import api from '/@/info/ApiUtils.ts';
  import MarkdownIt from 'markdown-it';

  export default{
    components:{
      Comment,
    },
    setup(){
      let data = reactive({
        checkContact:{key:0},
        contactList:[],
        visible:false, // 显示modal
        md: new MarkdownIt(),
        images:[],
        pid:null,
        product:{/*
          address: "",
          classId: 2,
          maker:{
            headImage:'http://localhost:81/img/2021-01-28/20210128163815295598afdd6d49ff905bf7cb8bdc3595.jpg',
            username:"pipihao",
          },
          content: "",
          createDate: "2021-23-29 20:01:19",
          downShelf: false,
          freight: 1,
          id:null,
          piProductClass: {id: 2, className: "技术", createDate: "2021-01-26 10:45:47"},
          price: 1,
          soldStatus: false,
          status: true,
          title: "随便写点什么东西了",
          tradeStatus: false,
        */},
        vditor:null,
      });
      const {ctx} = getCurrentInstance();


      console.log(ctx.$route);
      
      return data;
    },
    mounted(){
      var vm = this;
      console.log(vm.$route.params.pid);
      vm.pid = vm.$route.params.pid;
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

          /*判断是否登录*/
          if(vm.$store.state.login){
            /*加入足迹*/
            axios.put(api.API_FOOTPRINT,{
              piProductId:res.data.data.id,
            }).then(res=>{
              if(res.data.status){
                // console.log(res.data.msg);
              }else{
                console.log(res.data.msg);
              }
            }).catch(e=>{
              console.log(e);
              vm.$message.error("网络错误，请联系管理员");
            });
          }
         
        }else{
          this.$message.error(res.data.msg);
          this.$router.push("/");
        }
      }).catch(e=>{
        console.log(e);
        this.$message.error("网络错误，请联系管理员");
      });
    },
    methods:{
      showModal(){
        var vm = this;
        /*金额这种东西在后端判断*/
        if(vm.contactList.length>0){
          vm.visible = true;
        }else{
          axios.get(api.API_ADDRESS).then(res=>{
            // console.log(res);
            if(res.data.status){
              /*最后才显示购买*/
              vm.visible = true;
              vm.contactList = res.data.data;
              for(var c in vm.contactList){
                if(vm.contactList[c].default){
                  vm.checkContact = {key:Number(c)};
                  // console.log(vm.checkContact,"vm.checkContact");
                  break;
                }
              }
            }else{
              vm.$message.warning("请添加联系人再购买");
            }
          }).catch(e=>{
            console.log(e);
            vm.$message.error("网络错误,请联系管理员");
          });
        }
      },
      /**
       * 点击modal的时候，加载的收货地址
       */
      getContact(){

      },
      /*购买*/
      handleOk(){
        var vm = this;
        console.log(vm.checkContact);
        /*发送支付数据*/
        axios.put(api.API_TRADE,{
          piProductId:vm.pid,
          addressId:vm.contactList[vm.checkContact.key].id,
        }).then(res=>{
          console.log(res);
          if(res.data.status){
            vm.$message.success(`购买成功 -订单号:${res.data.data}`);
            /*改变当前皮物状态*/
            vm.product.tradeStatus = true;
          }else{
            vm.$message.error(res.data.msg);
          }
        }).catch(e=>{
          console.log(e);
          vm.$message.error("网络错误,请联系管理员");
        });
        vm.visible = false;
      } 
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