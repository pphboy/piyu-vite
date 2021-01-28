<template>
	<a-row>
		<a-col :span="18">
		  <a-avatar :src="user.headImage" :size="64" icon="皮" />
		  <br><br>
			<a-upload
		    name="file"
		    :action="$api.API_UPLOAD_FILE"
		    :multiple="true"
		    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
		    :headers="headers"
		    :accept="'.png,.jpg'"
		    :showUploadList="false"
		    @change="handleChange"
		  >
		    <a-button> <a-icon type="upload" />上传头像</a-button>
		  </a-upload>
		  <br><br>
		</a-col>
		<a-col :span="18">
			<h3>生日</h3>
		  <a-date-picker v-model:value="user.birthDate" size="large" />
			<br><br>
		</a-col>
		<a-col :span="18">
			<h3>居住地</h3>
			<a-input maxlength="20" v-model:value="user.address" size="large" /><br>
			<br>
		</a-col>
		<a-col :span="18">
			<h3>支付宝账号 <a-tag color="error">请认真对待收款账号</a-tag></h3>
			<a-input v-model:value="user.alipayAccount" maxlength="20" size="large" /><br>
			<br>
		</a-col>
		<a-col :span="18">
			<h3>性别</h3>
			 <a-radio-group v-model:value="user.gender" @change="onChange">
				<a-radio :value="1">
					男
				</a-radio>
				<a-radio :value="2">
					女
				</a-radio>
				<a-radio :value="0">
					空
				</a-radio>
			</a-radio-group>
			<br><br>
		</a-col>
		<a-col :span="18">
			<h3>简介</h3>
			<a-textarea v-model:value="user.introduction" placeholder="关于皮鱼用户介绍" :rows="4"/>
			<br><br>
		</a-col>
		<a-col :span="18">
			<a-button type="primary" size="large" @click="saveUserInfo">保存信息</a-button>
		</a-col>
	</a-row>
</template>

<script lang="ts">
	import axois from 'axios';
	import {reactive} from 'vue';
	import api from '/@/info/ApiUtils';
	export default{
		name:"BasicUserInfo",
		setup(){
			let data = reactive({
				headers: {
	        authorization: 'authorization-text',
	      },
	      user:{
	      	introduction:null,
	      	gender:0, // 1，男，2，女，0 空,
	      	alipayAccount:null, // 支付宝账号
	      	birthDate:null, // 生日
	      	headImage:null, // 头像
	      	address:null, // 居住地
	      },
	      userc:null, //判断是否做出更改
			});

			axois.get(api.API_USER_INFO).then(res=>{
				// console.log(res);
				if(res.data.status){
					data.user = res.data.data;
					// 复制一个成一个新的对象，而不是赋值一个新的地址
					data.userc = Object.assign({},data.user);
				}
			}).catch(e=>{
				this.$message.error("网络出错，请联系管理员");
				console.log(e);
			});

			return data
		},
	
		methods:{
			saveUserInfo(){

				var vm = this;
				let ok = false;
				/*判断是空全部为空*/
				for(var a in vm.user){
					if(!vm.user[a]){
						ok = false;
					}else{
						ok = true;
						break;
					}
				}
				if(!ok){
					 this.$message.warning("您填点东西再提交吧 ~");
					 return;
				}
				// console.log(JSON.stringify(this.user));
				// console.log(JSON.stringify(this.userc));
				if(JSON.stringify(this.user) == JSON.stringify(this.userc)){
					this.$message.warning("请改点东西再提交吧 ~");
					return;
				}

				axois.post(this.$api.API_USER_INFO,vm.user).then(res=>{
					if(res.data.status){
						this.$message.success("更新用户数据成功");
					}else{
						this.$message.error(res.data.msg);
					}
				}).catch(e=>{
					this.$message.warning("网络错误，请联系管理员解决问题");
				})
			},
			onChange(){
				console.log(this.user.gender);
			},
			handleChange(info) {
	      if (info.file.status !== 'uploading') {
	        // console.log(info.file, info.fileList);
	      }
	      if(!info.file.response) return;

	      if (info.file.response.code === 0) {
	      	this.user.headImage = info.file.response.data.succMap[info.file.name];
	        this.$message.success(`${info.file.name} 头像 上传成功`);
	      } else{
	        this.$message.error(`${info.file.name} 头像 上传失败`);
	      }
	    },
		}
	}
</script>

<style>
</style>
