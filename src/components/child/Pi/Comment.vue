<template>
<div>
  <a-row>
    <a-col :span="24">
      <br>
      <h3>评论发布</h3>
    </a-col>
    <a-col :span="24">
      <!-- {{pid}} -->
    </a-col>
    <a-col :span="24"><a-textarea v-model:value="comment.content" placeholder="请输入评论的内容" style="width:300px;"/></a-col>
    <a-col :span="24">
      <br>
      <a-button type="primary" @click="save">发表</a-button>
      <hr style="color:gray;">
    </a-col>
  </a-row>

  <a-card v-if="total < 1">
    <h3>没有评论快点来抢楼吧</h3>
  </a-card>

  <a-comment v-for="(c,index) in commentList" :key="index">
    <template #actions>
      <span key="comment-basic-like">
        <a-tooltip title="Like">
          <template v-if="action === `liked${index}`">
            <LikeFilled @click="like(index)" />
          </template>
          <template v-else>
            <LikeOutlined @click="like(index)" />
          </template>
        </a-tooltip>
        <span style="padding-left: '8px';cursor: 'auto'">
          {{ c.likeNumber?c.likeNumber:0 }}
        </span>
      </span>
      <span key="comment-basic-dislike">
        <a-tooltip title="Dislike">
          <template v-if="action === `disliked${index}`">
            <DislikeFilled @click="dislike(index)" />
          </template>
          <template v-else>
            <DislikeOutlined @click="dislike(index)" />
          </template>
        </a-tooltip>
        <span style="padding-left: '8px';cursor: 'auto'">
          {{ c.rubbishNumber?c.rubbishNumber:0 }}
        </span>
      </span>
      <span @click="showModal(c)" key="comment-basic-reply-to">回复</span>
    </template>
     <a-card style="padding:0;margin:0;" v-if="c.comments.length > 0">
        <a-comment v-for="(c,ci) in (more == c.id ?c.comments:c.comments.slice(0, 3))" :key="ci"  >
          <template #actions>
            <span @click="showModal(c,true)" key="comment-basic-reply-to">回复</span>
          </template>
          <template #author><a>{{c.user.username}}:{{c.id}}</a></template>
          <template #avatar>
            <a-avatar
              :src="c.user.headImage?c.user.headImage:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'"
              alt="Han Solo"
            />
          </template>
          <template #content>
            <p>
              {{c.content}} <a-tag color="green" v-if="c.cTwoComment != null">回复=>{{c.cTwoComment.id}}:{{`${c.cTwoComment.user.username}:${c.cTwoComment.content.substring(0,10)}...`}}</a-tag>
            </p>
          </template>
          <template #datetime>
            <a-tooltip :title="moment(c.createDate,'YYYY-MM-DD HH:mm:ss').fromNow()">
              <span>{{ moment(c.createDate,'YYYY-MM-DD HH:mm:ss').fromNow() }}</span>
            </a-tooltip>
          </template>
        </a-comment>
        <!-- 大于4条就会出现这个按钮 -->
        <a-button v-if="c.comments.length > 3" @click="showMore(c)">MORE</a-button>
      </a-card>
    <template #author><a>{{c.user.username}}</a></template>
    <template #avatar>
      <a-avatar
        :src="c.user.headImage?c.user.headImage:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'"
        alt="Han Solo"
      />
    </template>
    <template #content>
      <p>
        {{c.content}}
      </p>
    </template>
    <template #datetime>
      <a-tooltip :title="moment(c.createDate,'YYYY-MM-DD HH:mm:ss').fromNow()">
        <span>{{ moment(c.createDate,'YYYY-MM-DD HH:mm:ss').fromNow() }}</span>
      </a-tooltip>
    </template>
  </a-comment>
   <a-pagination v-if="total>10" @change="getNext" size="small" :pageSize="pageInfo.size" :total="total" />

</div>
<a-modal v-if="visible" okText="回复" cancelText="取消回复" v-model:visible="visible" 
  :title="`回复=> ${copyeComment.content.toString().substring(0,20)}`" @ok="handleOk">
  <a-textarea v-model:value="toComment.content" placeholder="请输入回复内容" />
</a-modal>
</template>
<script lang="ts">
import moment from 'moment';
import axios from 'axios';
import api from '/@/info/ApiUtils.ts';
import main from '/@/components/main';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue';

export default {
  props:['pid'],
  components: {
    LikeFilled,
    LikeOutlined,
    DislikeFilled,
    DislikeOutlined,
  },
  data() {
    return {
      more:false,
      copyeComment:{}, //复制 comment
      toComment:{  //回复评论所使用的对象
        content:null,
        cid:null,
        piId:null,
        ctwoId:null,
      },
      visible:false,
      comment:{
        cid: null,
        content: null,
        createDate: null,
        likeNumber: null,
        rubbishNumber: null,
      },
      pageInfo:{
        page:1,
        size:10
      },
      commentList:[],
      total:0,
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
    };
  },
  created(){
    // console.log(this.pid,"created");
    this.pageInfo.pid = this.pid;
    this.getPage();
  },
  methods: {
    /*加载或隐藏评论*/
    showMore(c){
      if(this.more == c.id){
        this.more = null;
      }else{
        this.more = c.id;
      }
    },
    /*确认*/
    handleOk(){
      if(!this.toComment.content){
        this.$message.error("请输入回复内容，再回复");
        return;
      }
      console.log(this.toComment);
      
      axios.put(api.API_COMMENT,this.toComment).then(res=>{
        // console.log(res);
        if(res.data.status){
          this.$message.success("评论成功");
          this.getPage();
          this.toComment = {  //回复评论所使用的对象
            content:null,
            cid:null,
            ctwo_id:null,
          };
          this.visible = false;
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch(e=>{
        console.log(e);
        this.$message.error("网络错误，请联系管理员");
      });

      
    },
    showModal(c,status){
      this.visible = true;
      console.log(c);
      this.copyeComment = c;
      this.toComment.piId = c.piId;
      console.log("打开");
      if(status){
        this.toComment.ctwoId = c.id;
        this.toComment.cid = c.cid;
      }else{
        this.toComment.ctwoId = null;
        this.toComment.cid = c.id;
      }
      
    },
    reset(){
      this.comment = {
        cid: null,
        content: null,
        createDate: null,
        likeNumber: null,
        rubbishNumber: null,
        user:main.local.get('piyu'),
      };
    },
    save(){
      if(!this.$store.state.login){
        this.$message.warning("请登录后再评论");
        this.$router.push({name:"Login"});
        return;
      }
      this.comment.piId = this.pid;
      
      /*此处向服务器发送数据*/
      axios.put(api.API_COMMENT,this.comment).then(res=>{
        // console.log(res);
        if(res.data.status){
          this.$message.success("评论成功");
          this.getPage();
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch(e=>{
        console.log(e);
        this.$message.error("网络错误，请联系管理员");
      });
      this.reset();
    },
    /**
     * 分页
     */
    getNext(page){
      // console.log(page,"page");
      this.pageInfo.page = page;
      this.getPage();
    },
    getPage(){
      var vm = this;
      axios.post(api.API_COMMENT_PI,this.pageInfo).then(res=>{
        // console.log(res);
        if(res.data.status){
          vm.total = res.data.data.total;
          vm.commentList = res.data.data.list;
        }else{
          console.log(res.data.msg);
          // this.$message.error(res.data.msg);
        }
      }).catch(e=>{
        console.log(e);
        this.$message.error("网络错误，请联系管理员");
      });
    },
    like(index) {
      // this.likes = 1;
      // this.dislikes = 0;
      axios.post(api.API_COMMENT_LIKE,{
        cid: this.commentList[index].id,
        like:1
      }).then(res=>{
        // console.log(res);
        if(res.data.status){
          this.commentList[index].likeNumber++;
          this.$message.success("点赞成功");
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch(e=>{
        console.log(e);
        this.$message.error("网络错误，请联系管理员");
      });
      this.action = `liked${index}`;
    },
    dislike(index) {
      console.log(this.commentList[index],"dis");
      axios.post(api.API_COMMENT_LIKE,{
        cid: this.commentList[index].id,
        like:0
      }).then(res=>{
        // console.log(res);
        if(res.data.status){
          this.$message.success("踩成功");
          this.commentList[index].rubbishNumber++;
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch(e=>{
        console.log(e);
        this.$message.error("网络错误，请联系管理员");
      });
      this.action = `disliked${index}`;
    },
  },
};
</script>

<style scoped>
  
</style>